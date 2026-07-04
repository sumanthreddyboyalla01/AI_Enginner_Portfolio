import { motion } from "motion/react";
import { Briefcase, Award } from "lucide-react";
import { Tilt3D } from "@/components/shared/Tilt3D";

import { roles } from "@/data/experience";

export function Experience() {
  return (
    <section
      className="relative overflow-hidden bg-background py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            — Experience —
          </div>
          <h2
            className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
            style={{
              background: "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.5 0.01 260) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Where I've built things
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />

          <ul className="space-y-8">
            {roles.map((r, i) => {
              const Icon = r.icon ?? Briefcase;
              const isRight = r.side === "right";
              return (
                <motion.li
                  key={r.role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative md:grid md:grid-cols-2 md:gap-10"
                >
                  <span className="absolute left-4 top-4 -translate-x-1/2 md:left-1/2">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent shadow-[0_0_16px_2px_oklch(0.78_0.15_80/60%)]" />
                  </span>

                  <Tilt3D
                    max={6}
                    scale={1.01}
                    className={`rounded-2xl md:col-span-1 ${isRight ? "md:col-start-2" : ""}`}
                  >
                    <article className="glass ml-10 rounded-2xl p-6 md:ml-0">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                        <Icon className="h-3.5 w-3.5 text-accent" />
                        <span>{r.period}</span>
                        <span className="opacity-50">·</span>
                        <span>{r.location}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl leading-tight">{r.role}</h3>
                      <div className="text-sm text-muted-foreground">{r.company}</div>
                      <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                        {r.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {r.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Tilt3D>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
