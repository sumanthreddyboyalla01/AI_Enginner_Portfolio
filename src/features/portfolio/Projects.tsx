import { motion } from "motion/react";
import { Github, ExternalLink, TrendingUp } from "lucide-react";
import rag from "@/assets/proj-rag.jpg";
import agents from "@/assets/proj-agents.jpg";
import evalImg from "@/assets/proj-eval.jpg";
import ft from "@/assets/proj-finetune.jpg";

const projects = [
  {
    title: "DocRAG — Enterprise Q&A over PDFs",
    blurb:
      "Hybrid retrieval RAG over unstructured docs with re-ranking, source citations, and eval harness.",
    img: rag,
    tags: ["RAG", "LangChain", "FAISS", "FastAPI"],
    metric: "92% retrieval precision on golden set",
    github: "https://github.com",
    demo: "https://huggingface.co",
  },
  {
    title: "AgentOps — Autonomous Research Agent",
    blurb:
      "LangGraph agent with tool-use (search, code, browse), plan-execute loop, and failure-mode traces.",
    img: agents,
    tags: ["LangGraph", "Agents", "Tool Use", "Observability"],
    metric: "3.1× task success vs. single-shot GPT-4o",
    github: "https://github.com",
    demo: "https://huggingface.co",
  },
  {
    title: "EvalLab — LLM Evaluation Harness",
    blurb:
      "Structured eval suite: faithfulness, answer-relevance, hallucination rate on curated golden sets.",
    img: evalImg,
    tags: ["Evals", "RAGAS", "Python", "CI"],
    metric: "Regression-gated PRs across 4 pipelines",
    github: "https://github.com",
    demo: "https://render.com",
  },
  {
    title: "PhiTune — Domain-adapted SLM",
    blurb:
      "LoRA fine-tune of a 3B model on a domain corpus with quantised inference and served via FastAPI.",
    img: ft,
    tags: ["PyTorch", "LoRA", "Quantisation", "HF"],
    metric: "+14 pts task accuracy over base model",
    github: "https://github.com",
    demo: "https://huggingface.co",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              /projects
            </div>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Shipped, <span className="italic text-accent">evaluated</span>,
              <br /> in production.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each project ships with a public repo, a live demo, and an evaluation number — not just
            screenshots.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-3xl p-1.5 transition-shadow hover:shadow-[0_30px_80px_-20px_oklch(0.78_0.15_80/25%)]"
            >
              <div className="relative overflow-hidden rounded-[calc(theme(borderRadius.3xl)-6px)]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>

              <div className="p-6 pt-5">
                <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                  <TrendingUp className="h-3 w-3" />
                  {p.metric}
                </div>

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

                <div className="mt-6 flex gap-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic-hover inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic-hover inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground hover:brightness-110"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
