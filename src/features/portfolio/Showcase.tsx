import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Award, Download } from "lucide-react";
import { projects, certificates, stack } from "@/data/showcase";
import { Tilt3D } from "@/components/shared/Tilt3D";

type Tab = "projects" | "certificates" | "tech";

export function Showcase() {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <section
      className="relative bg-background py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            — Showcase —
          </div>
          <h2
            className="font-sans text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight"
            style={{
              background: "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.5 0.01 260) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio Showcase
          </h2>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="glass flex items-center gap-1 rounded-full p-1">
            {(
              [
                ["projects", "Projects"],
                ["certificates", "Certificates"],
                ["tech", "Tech Stack"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider transition ${
                  tab === id
                    ? "bg-white text-[#050505]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {tab === "projects" && (
              <motion.div
                key="p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {projects.map((p) => (
                  <Tilt3D key={p.title} max={8} scale={1.015} className="rounded-2xl">
                    <article className="glass group overflow-hidden rounded-2xl p-1.5">
                      <div className="tilt-pop-sm overflow-hidden rounded-xl">
                        <img
                          src={p.img}
                          alt={p.title}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="tilt-pop-sm p-5">
                        <h3 className="font-display text-2xl">{p.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 flex gap-2">
                          <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="magnetic-hover inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10"
                          >
                            <Github className="h-3.5 w-3.5" /> Code
                          </a>
                          <a
                            href="#showcase"
                            className="magnetic-hover inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#050505] hover:brightness-95"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Live
                          </a>
                        </div>
                      </div>
                    </article>
                  </Tilt3D>
                ))}
              </motion.div>
            )}

            {tab === "certificates" && (
              <motion.div
                key="c"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mx-auto grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2"
              >
                {certificates.map((c) => (
                  <div key={c.title} className="glass flex items-start gap-4 rounded-2xl p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Award className="h-4 w-4 text-accent" />
                    </span>
                    <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{c.title}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {c.issuer} · {c.year}
                        </div>
                      </div>
                      {c.file && (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <a
                            href={c.file}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${c.title}`}
                            className="magnetic-hover inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider hover:bg-white/10"
                          >
                            <ExternalLink className="h-3 w-3" /> View
                          </a>
                          <a
                            href={c.file}
                            download={c.fileName}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Download ${c.title}`}
                            className="magnetic-hover inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider hover:bg-white/10"
                          >
                            <Download className="h-3 w-3" /> Save
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "tech" && (
              <motion.div
                key="t"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  — {stack.length} technologies · daily stack —
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                  {stack.map((s) => (
                    <Tilt3D key={s.n} max={18} scale={1.06} className="rounded-2xl">
                      <div className="glass flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl p-4">
                        <span
                          className="tilt-pop-md flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{
                            background: `${s.c}22`,
                            border: `1px solid ${s.c}44`,
                            boxShadow: `0 8px 24px -8px ${s.c}66`,
                          }}
                        >
                          {s.logo ? (
                            <img
                              src={s.logo}
                              alt={`${s.n} logo`}
                              loading="lazy"
                              className="h-6 w-6"
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                img.style.display = "none";
                                const fb = img.nextElementSibling as HTMLElement | null;
                                if (fb) fb.style.display = "inline";
                              }}
                            />
                          ) : null}
                          <span
                            className="text-xs font-bold"
                            style={{ color: s.c, display: s.logo ? "none" : "inline" }}
                          >
                            {s.n.slice(0, 2).toUpperCase()}
                          </span>
                        </span>
                        <div className="tilt-pop-sm font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {s.n}
                        </div>
                      </div>
                    </Tilt3D>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
