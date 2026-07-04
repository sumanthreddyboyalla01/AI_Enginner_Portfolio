import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Showcase", href: "#showcase" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 font-display text-base">
            S
          </span>
          <span className="font-mono text-[11px] tracking-[0.28em] text-foreground/90">
            SUMANTH <span className="text-muted-foreground">— APPLIED AI</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 text-xs font-medium tracking-wider uppercase text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden font-mono text-[11px] text-muted-foreground sm:block">{time}</div>
      </nav>
    </motion.header>
  );
}
