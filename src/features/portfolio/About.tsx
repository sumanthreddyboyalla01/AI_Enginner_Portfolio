import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EyeOff, Eye, User, MapPin } from "lucide-react";
import idPhoto from "@/assets/prince-id.jpg";
import { useLowPower } from "@/hooks/use-low-power";
import { Tilt3D } from "@/components/shared/Tilt3D";

const tags = ["Python", "PyTorch", "LangChain", "FastAPI"];

export function About({ onOpenAbout }: { onOpenAbout: () => void }) {
  const [showCard, setShowCard] = useState(true);
  const lowPower = useLowPower();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-24 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      {/* Hologram grid backdrop */}
      <div aria-hidden className="holo-grid" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-accent">+</span> Available for work
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-sans text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.9] tracking-tight"
            style={{
              background: "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.55 0.01 260) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Applied AI
            <br />
            Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            I build production-grade AI systems — RAG pipelines, autonomous agents, and evaluated
            LLM applications. Not demos: systems with golden sets, latency budgets, and SLA-backed
            quality.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setShowCard((v) => !v)}
              className="magnetic-hover inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/5 px-5 py-2.5 text-xs uppercase tracking-wider text-rose-300 hover:bg-rose-400/10"
            >
              {showCard ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" /> Hide Card
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Show Card
                </>
              )}
            </button>
            <button
              onClick={onOpenAbout}
              className="magnetic-hover inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white/10"
            >
              <User className="h-3.5 w-3.5" /> About Me
            </button>
          </div>
        </div>

        {/* Lanyard ID card */}
        <AnimatePresence mode="wait">
          {showCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: -60, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -60, rotateX: -30 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="mx-auto flex w-[260px] flex-col items-center"
              style={{ perspective: 900 }}
            >
              {/* lanyard */}
              <div className="relative h-20 w-full">
                <div
                  className="absolute left-[38%] top-0 h-full w-[46px] rotate-[-8deg] bg-gradient-to-b from-neutral-800 to-neutral-900"
                  style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }}
                >
                  <div className="mx-auto mt-2 w-full text-center font-mono text-[8px] tracking-[0.4em] text-white/60">
                    SUMANTH
                  </div>
                </div>
                <div className="absolute left-1/2 top-[70px] h-2.5 w-6 -translate-x-1/2 rounded-sm bg-neutral-700" />
              </div>

              <div className={lowPower ? "w-full" : "animate-lanyard w-full"}>
                <Tilt3D max={14} scale={1.04} className="rounded-2xl">
                  <div
                    className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-3 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)]"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(30,30,34,0.62) 0%, rgba(16,16,20,0.74) 100%)",
                      backdropFilter: "blur(18px) saturate(125%) brightness(0.92)",
                      WebkitBackdropFilter: "blur(18px) saturate(125%) brightness(0.92)",
                    }}
                  >
                    {/* subtle inner highlight for premium glass edge */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="tilt-pop-md relative overflow-hidden rounded-lg ring-1 ring-white/10">
                      <img
                        src={idPhoto}
                        alt="Boyalla Sumanth Reddy ID"
                        width={768}
                        height={960}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                        style={{ filter: "saturate(0.95) brightness(0.94)" }}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,10,14,0.10) 0%, rgba(10,10,14,0.28) 100%)",
                        }}
                      />
                    </div>

                    <div className="tilt-pop-sm pt-3 text-center">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                        Name
                      </div>
                      <div
                        className="mt-0.5 text-base leading-tight text-neutral-50"
                        style={{ fontFamily: '"Instrument Serif", serif' }}
                      >
                        Boyalla Sumanth Reddy
                      </div>

                      <div className="mt-2 font-mono text-[8px] uppercase tracking-widest text-neutral-400">
                        Role
                      </div>
                      <div className="text-[11px] font-medium text-neutral-100">
                        Applied AI Engineer
                      </div>
                    </div>
                  </div>
                </Tilt3D>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" /> Hyderabad, India
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
