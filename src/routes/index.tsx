import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import heroImg from "@/assets/prince-hero.jpg";
import { Nav } from "@/features/core/Nav";
import { Hero } from "@/features/core/Hero";
import { About } from "@/features/portfolio/About";
import { AboutOverlay } from "@/features/portfolio/AboutOverlay";
import { Preloader } from "@/components/shared/Preloader";
import { PerfGuard } from "@/components/shared/PerfGuard";
import { LazyMount } from "@/components/shared/LazyMount";
import { ParallaxScene } from "@/components/shared/ParallaxScene";
import { MotionToggle } from "@/components/shared/MotionToggle";
import { CubeNav } from "@/features/core/CubeNav";

// Heavy below-the-fold sections — code-split into their own chunks
const Showcase = lazy(() =>
  import("@/features/portfolio/Showcase").then((m) => ({ default: m.Showcase })),
);
const Experience = lazy(() =>
  import("@/features/portfolio/Experience").then((m) => ({ default: m.Experience })),
);
const Contact = lazy(() =>
  import("@/features/portfolio/Contact").then((m) => ({ default: m.Contact })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sumanth — Applied AI Engineer" },
      {
        name: "description",
        content:
          "Sumanth — Applied AI Engineer building production-grade RAG pipelines, autonomous agents, and evaluated LLM applications.",
      },
      { property: "og:title", content: "Sumanth — Applied AI Engineer" },
      {
        property: "og:description",
        content: "Production-grade RAG, agents, and evaluation-driven LLM systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" }],
  }),
});

function Index() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PerfGuard />
      <Preloader />
      <Nav />
      <Hero />
      <About onOpenAbout={() => setAboutOpen(true)} />
      <ParallaxScene />
      <LazyMount id="showcase" minHeight={1000}>
        <Suspense fallback={<div style={{ minHeight: 1000 }} />}>
          <Showcase />
        </Suspense>
      </LazyMount>
      <LazyMount id="experience" minHeight={800}>
        <Suspense fallback={<div style={{ minHeight: 800 }} />}>
          <Experience />
        </Suspense>
      </LazyMount>
      <LazyMount id="contact" minHeight={800}>
        <Suspense fallback={<div style={{ minHeight: 800 }} />}>
          <Contact />
        </Suspense>
      </LazyMount>

      <footer className="border-t border-white/5 bg-background py-10 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-center gap-2 text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/5 font-display text-sm">
              S
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em]">SUMANTH — APPLIED AI</span>
          </div>
          <p className="mt-3">
            © {new Date().getFullYear()} · Built with intent — evaluated, not just deployed.
          </p>
        </div>
      </footer>

      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <MotionToggle />
      <CubeNav />
    </main>
  );
}
