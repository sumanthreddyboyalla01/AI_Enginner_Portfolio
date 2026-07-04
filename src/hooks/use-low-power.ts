import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio:low-power";

/** Read the user's manual override (persisted). Returns true/false/null. */
function readOverride(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "1" ? true : v === "0" ? false : null;
}

/** Manually set (or clear) the low-power preference. Broadcasts an event
 *  so every `useLowPower()` consumer updates without a page reload. */
export function setLowPowerOverride(value: boolean | null) {
  if (typeof window === "undefined") return;
  if (value === null) window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  window.dispatchEvent(new Event("portfolio:low-power-change"));
}

/** True when heavy visual effects should be disabled — either because the
 *  device looks constrained OR because the user flipped the manual toggle. */
export function useLowPower(): boolean {
  const [low, setLow] = useState<boolean>(() => readOverride() ?? false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyAuto = () => {
      const override = readOverride();
      if (override !== null) {
        setLow(override);
        return;
      }

      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean; effectiveType?: string };
      };

      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

      const cores = nav.hardwareConcurrency ?? 8;
      const mem = nav.deviceMemory ?? 8;
      const conn = nav.connection;
      const slowNet =
        !!conn?.saveData || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");

      if (reducedMotion || cores <= 4 || mem <= 4 || slowNet) {
        setLow(true);
        return;
      }

      let last = performance.now();
      let long = 0;
      let total = 0;
      const stop = last + 500;
      const tick = (t: number) => {
        const dt = t - last;
        last = t;
        total++;
        if (dt > 22) long++;
        if (t < stop) requestAnimationFrame(tick);
        else if (total > 5 && long / total > 0.3) setLow(true);
      };
      requestAnimationFrame(tick);
    };

    applyAuto();
    const onChange = () => applyAuto();
    window.addEventListener("portfolio:low-power-change", onChange);
    return () => window.removeEventListener("portfolio:low-power-change", onChange);
  }, []);

  return low;
}
