import { useEffect, useState } from "react";
import { Zap, ZapOff } from "lucide-react";
import { setLowPowerOverride, useLowPower } from "@/hooks/use-low-power";

/** Small floating pill in the bottom-right that toggles heavy 3D / motion.
 *  Persists the choice; three states cycled: auto → on → off → auto. */
export function MotionToggle() {
  const low = useLowPower();
  const [override, setOverride] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => {
      if (typeof window === "undefined") return;
      const v = window.localStorage.getItem("portfolio:low-power");
      setOverride(v === "1" ? true : v === "0" ? false : null);
    };
    read();
    window.addEventListener("portfolio:low-power-change", read);
    return () => window.removeEventListener("portfolio:low-power-change", read);
  }, []);

  const cycle = () => {
    // auto (null) → force low (true) → force full (false) → auto
    const next = override === null ? true : override === true ? false : null;
    setLowPowerOverride(next);
  };

  const label =
    override === null
      ? low
        ? "Motion: Auto (Low)"
        : "Motion: Auto (Full)"
      : override
        ? "Motion: Reduced"
        : "Motion: Full";

  const Icon = low ? ZapOff : Zap;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Toggle motion and 3D effects"
      className="glass fixed bottom-4 right-4 z-[80] inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-foreground/80 shadow-lg backdrop-blur transition hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
