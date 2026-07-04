import { useEffect } from "react";
import { useLowPower } from "@/hooks/use-low-power";

/**
 * Applies a `.low-power` class to <html> when the device is detected
 * as low-power. CSS uses this to disable expensive blur, glows, and
 * infinite animations. Renders nothing.
 */
export function PerfGuard() {
  const low = useLowPower();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("low-power", low);
    return () => root.classList.remove("low-power");
  }, [low]);
  return null;
}
