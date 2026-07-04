import { motion } from "motion/react";

const stack = ["Python", "PyTorch", "LangChain / LangGraph", "FastAPI", "Hugging Face", "Docker"];

export function TechStack() {
  return (
    <section className="border-y border-white/5 bg-background py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Core stack
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {stack.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              className="glass cursor-default rounded-full px-5 py-2.5 text-sm text-foreground/90 shadow-[0_0_30px_-10px_oklch(0.78_0.15_80/40%)]"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
