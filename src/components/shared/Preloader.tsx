import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, User, Globe } from "lucide-react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="pre"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2"
          >
            {[Code2, User, Globe].map((Icon, i) => (
              <span key={i} className="glass flex h-9 w-9 items-center justify-center rounded-full">
                <Icon className="h-4 w-4 text-foreground/80" />
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-center text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Welcome to my
            <br />
            Portfolio Website
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Building AI systems that actually ship.
          </motion.p>

          <div className="mt-10 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-white/90 transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
