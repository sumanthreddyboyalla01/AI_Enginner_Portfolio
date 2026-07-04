import { useRef, type ReactNode } from "react";
import { useLowPower } from "@/hooks/use-low-power";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Scale on hover. */
  scale?: number;
  /** Show moving specular glare highlight. */
  glare?: boolean;
};

/**
 * Lightweight 3D mouse-tilt with optional specular glare.
 * - Runs on rAF via CSS variables (no React re-renders during move).
 * - Auto-disabled for low-power devices, touch-only pointers, and
 *   users with prefers-reduced-motion.
 */
export function Tilt3D({ children, className = "", max = 12, scale = 1.02, glare = true }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const low = useLowPower();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (low || e.pointerType === "touch") return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * max * 2; // rotateX
    const ry = (px - 0.5) * max * 2; // rotateY

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--tilt-scale", String(scale));
    });
  };

  const reset = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tilt-scale", "1");
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt-3d ${className}`}
      style={{ perspective: 1000 }}
    >
      <div className="tilt-3d__inner">
        {children}
        {glare && !low && <div aria-hidden className="tilt-3d__glare" />}
      </div>
    </div>
  );
}
