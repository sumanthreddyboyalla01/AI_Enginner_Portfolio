import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders `children` only once the wrapper scrolls near the viewport.
 * Keeps the DOM cheap by deferring heavy sections (parallax, grids,
 * imported chunks) until they're actually needed.
 */
export function LazyMount({
  children,
  minHeight = 600,
  rootMargin = "400px",
  id,
}: {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div id={id} ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  );
}
