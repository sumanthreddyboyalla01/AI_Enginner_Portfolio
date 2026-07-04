import { motion } from "motion/react";

const groups = [
  { title: "Languages", items: ["Python"] },
  { title: "Core CS", items: ["Data Structures & Algorithms", "OOP"] },
  {
    title: "AI / ML",
    items: ["PyTorch", "scikit-learn", "Hugging Face Transformers"],
  },
  {
    title: "LLM & Applied AI",
    items: [
      "Prompt Engineering",
      "RAG",
      "Vector Search (FAISS / ChromaDB)",
      "LangChain",
      "AI Agents",
      "LLM Evaluation",
    ],
  },
  {
    title: "Deployment",
    items: ["FastAPI", "Docker", "AWS / GCP basics"],
  },
  { title: "Tools", items: ["Git / GitHub", "VS Code"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            /skills
          </div>
          <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
            Only what I <span className="italic text-accent">actually</span> ship with.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl">{g.title}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span className="text-foreground/85">{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
