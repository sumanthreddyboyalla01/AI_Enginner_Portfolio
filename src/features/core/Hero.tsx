import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import heroImg from "@/assets/prince-hero.jpg";

export const Hero = React.memo(function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end overflow-hidden bg-background pt-24"
    >
      {/* center portrait */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="relative h-full w-full max-w-[680px]">
          <img
            src={heroImg}
            alt="Sumanth"
            width={1280}
            height={1280}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#050505] to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-6 pb-16 md:px-10 md:pb-20 lg:grid-cols-3">
        {/* Big name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-2"
        >
          <h1
            className="font-display text-[clamp(4.5rem,16vw,14rem)] leading-[0.85] tracking-tight"
            style={{
              background: "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.55 0.01 260) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SUMANTH
          </h1>
        </motion.div>

        {/* Right tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:justify-self-end lg:text-right"
        >
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            Building
            <br />
            AI Systems
            <br />
            That Actually
            <br />
            <span className="italic">Ship.</span>
          </p>
        </motion.div>
      </div>

      {/* bottom row */}
      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm"
        >
          Applied AI Engineer — RAG, agents, and{" "}
          <span className="text-foreground">evaluation-driven</span> LLM systems.
        </motion.p>

        <div className="flex items-center gap-2">
          <motion.a
            href="/Resume_Final.pdf"
            download
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="magnetic-hover inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#050505] hover:-translate-y-0.5 hover:brightness-95"
          >
            Resume <Download className="h-3.5 w-3.5" />
          </motion.a>
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="magnetic-hover glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono tracking-wider uppercase hover:-translate-y-0.5 hover:bg-white/10"
          >
            Applied AI <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
});
