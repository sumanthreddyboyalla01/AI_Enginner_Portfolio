import { useEffect, useRef, useState } from "react";
import { useLowPower } from "@/hooks/use-low-power";

type Face = { id: string; label: string; rot: string };

// Rotations that bring each face to the front.
const FACES: Face[] = [
  { id: "home", label: "Home", rot: "rotateY(0deg) rotateX(0deg)" },
  { id: "about", label: "About", rot: "rotateY(-90deg)" },
  { id: "showcase", label: "Work", rot: "rotateY(-180deg)" },
  { id: "contact", label: "Contact", rot: "rotateY(-270deg)" },
];

// Positions each face on the cube (side length 88px → translateZ 44px).
const FACE_TRANSFORMS = [
  "rotateY(0deg) translateZ(44px)", // Home  (front)
  "rotateY(90deg) translateZ(44px)", // About (right)
  "rotateY(180deg) translateZ(44px)", // Work  (back)
  "rotateY(270deg) translateZ(44px)", // Contact (left)
  "rotateX(90deg) translateZ(44px)", // top   (decorative)
  "rotateX(-90deg) translateZ(44px)", // bottom(decorative)
];

/**
 * 3D rotating cube navigation with luxury flip transitions:
 * - eased 900ms flip with a slight overshoot (custom cubic-bezier)
 * - scale + rotateZ pulse during the transition for physical weight
 * - purple glow bloom that ramps up mid-flip
 * - sheen sweep across the newly-active face
 * - label crossfade beneath the cube
 */
export function CubeNav() {
  const low = useLowPower();
  const [active, setActive] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const prev = useRef(0);

  useEffect(() => {
    if (low) return;
    const ids = FACES.map((f) => f.id);
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const i = ids.indexOf((best.target as HTMLElement).id);
          if (i >= 0) setActive(i);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [low]);

  // Trigger a brief "spin" pulse whenever the active face changes.
  useEffect(() => {
    if (prev.current === active) return;
    prev.current = active;
    setSpinning(true);
    const t = window.setTimeout(() => setSpinning(false), 950);
    return () => window.clearTimeout(t);
  }, [active]);

  if (low) return null;

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeRot = FACES[active]?.rot || "";
  const composed = spinning
    ? `${activeRot} rotateZ(8deg) scale(1.08)`
    : `${activeRot} rotateZ(0deg) scale(1)`;

  return (
    <div
      className="pointer-events-none fixed right-6 top-24 z-[70] hidden md:block"
      aria-label="Section navigator"
    >
      <div
        className="relative"
        style={{
          width: 88,
          height: 88,
          perspective: 700,
          filter: spinning
            ? "drop-shadow(0 0 24px oklch(0.68 0.18 310 / 55%))"
            : "drop-shadow(0 0 10px oklch(0.68 0.18 310 / 20%))",
          transition: "filter 700ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: composed,
            transition: "transform 900ms cubic-bezier(0.65, 0, 0.35, 1.35)",
          }}
        >
          {FACES.map((f, i) => {
            const isActive = i === active;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => jump(f.id)}
                aria-label={`Jump to ${f.label}`}
                className="pointer-events-auto absolute inset-0 flex items-center justify-center overflow-hidden rounded-md border border-white/15 bg-[oklch(0.14_0.02_280_/_0.7)] font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/85 backdrop-blur transition-colors hover:border-accent/60 hover:text-foreground"
                style={{
                  transform: FACE_TRANSFORMS[i],
                  boxShadow: isActive
                    ? "inset 0 0 30px oklch(0.68 0.18 310 / 35%), 0 8px 28px -6px oklch(0.68 0.18 310 / 45%)"
                    : "inset 0 0 20px oklch(0.68 0.18 310 / 15%), 0 8px 24px -8px rgba(0,0,0,0.6)",
                }}
              >
                {isActive && spinning && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, oklch(0.85 0.16 310 / 35%) 50%, transparent 70%)",
                      animation: "cube-sheen 1.6s ease-out",
                    }}
                  />
                )}
                <span
                  className="relative z-[1] transition-transform duration-500"
                  style={{
                    transform: isActive ? "translateZ(6px) scale(1.05)" : "none",
                  }}
                >
                  {f.label}
                </span>
              </button>
            );
          })}
          <div
            aria-hidden
            className="absolute inset-0 rounded-md border border-white/10 bg-[oklch(0.10_0.02_280_/_0.5)]"
            style={{ transform: FACE_TRANSFORMS[4] }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-md border border-white/10 bg-[oklch(0.10_0.02_280_/_0.5)]"
            style={{ transform: FACE_TRANSFORMS[5] }}
          />
        </div>
      </div>
      <div className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        <span
          key={active}
          className="inline-block"
          style={{ animation: "cube-label 500ms cubic-bezier(0.2,0.8,0.2,1)" }}
        >
          {FACES[active]?.label}
        </span>
      </div>
    </div>
  );
}
