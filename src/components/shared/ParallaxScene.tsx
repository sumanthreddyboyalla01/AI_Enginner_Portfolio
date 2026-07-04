import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useLowPower } from "@/hooks/use-low-power";

// Split three.js + @react-three/fiber into their own chunk — only fetched
// when the scene actually needs to render.
const ParallaxCanvas = lazy(() => import("./ParallaxCanvas"));

/**
 * Lazy 3D parallax scene.
 * - Chunk is only fetched once the wrapper is within 300px of the viewport
 *   (or immediately after the first user scroll — cuts perceived latency).
 * - The <Canvas> only mounts once the wrapper is actually in view.
 * - On low-power devices the entire scene is skipped and a static
 *   gradient fallback is shown instead.
 */
export function ParallaxScene() {
  const low = useLowPower();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  // Two-stage IntersectionObserver:
  //   1. Prefetch the chunk when the section is ~1.2 viewports away
  //      (close enough that the user will likely see it, far enough that
  //      the network request finishes before mount).
  //   2. Mount the <Canvas> only once the section is ~300px from view.
  useEffect(() => {
    if (low) return;
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const prefetchMargin = `${Math.round(vh * 1.2)}px`;

    let prefetched = false;
    const prefetchIO = new IntersectionObserver(
      (entries) => {
        if (!prefetched && entries.some((e) => e.isIntersecting)) {
          prefetched = true;
          // Warm the chunk during idle time so it doesn't compete with
          // whatever the user is currently scrolling past.
          const warm = () => {
            void import("./ParallaxCanvas");
          };
          if ("requestIdleCallback" in window) {
            (
              window as unknown as {
                requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void;
              }
            ).requestIdleCallback(warm, { timeout: 800 });
          } else {
            setTimeout(warm, 0);
          }
          prefetchIO.disconnect();
        }
      },
      { rootMargin: prefetchMargin },
    );

    const mountIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          mountIO.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    prefetchIO.observe(el);
    mountIO.observe(el);
    return () => {
      prefetchIO.disconnect();
      mountIO.disconnect();
    };
  }, [low]);

  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-background"
      style={{ contentVisibility: "auto", containIntrinsicSize: "480px" }}
    >
      <div
        ref={wrapRef}
        className="pointer-events-none relative mx-auto h-[420px] w-full max-w-[1400px] md:h-[520px]"
      >
        {/* Static gradient fallback — always painted, so there's no CLS */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 50% 50%, oklch(0.35 0.14 80 / 30%), transparent 70%)",
          }}
        />
        {!low && inView && (
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <ParallaxCanvas />
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}
