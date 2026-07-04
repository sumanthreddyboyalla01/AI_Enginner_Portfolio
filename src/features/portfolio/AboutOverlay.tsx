import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Download } from "lucide-react";

export function AboutOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="about"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-background"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 20%, oklch(0.3 0.14 260 / 22%), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-16">
            <button
              onClick={onClose}
              className="magnetic-hover glass mb-16 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:-translate-x-0.5 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="cursor-blink text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] tracking-tight"
            >
              About Myself
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground"
            >
              <p>
                I'm <span className="text-foreground">Sumanth</span> — an Applied AI Engineer
                obsessed with the gap between a slick demo and a system that actually holds up in
                production. If it isn't evaluated, I don't ship it.
              </p>
              <p>
                I build{" "}
                <span className="text-foreground">
                  RAG systems, autonomous agents, and fine-tuned LLM applications
                </span>{" "}
                with a bias for measurable quality — golden sets, retrieval precision, hallucination
                rate, latency budgets.
              </p>
              <p>Currently open to Applied AI / ML Engineer roles and internships.</p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              href="/Resume_Final.pdf"
              download="Sumanth_Resume.pdf"
              className="magnetic-hover mt-12 inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 text-sm font-medium text-[#050505] hover:-translate-y-0.5 hover:brightness-95"
            >
              <Download className="h-4 w-4" /> Download Resume
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
