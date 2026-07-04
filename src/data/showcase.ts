import type { Project, Certificate, TechStackItem } from "@/types/portfolio";
import viyatusCertUrl from "@/assets/certs/internship_certificate.pdf";
import aicteCertUrl from "@/assets/certs/AICTE Batch 1-268.pdf";
import googleAiCertUrl from "@/assets/certs/Google.pdf";
import relianceCertUrl from "@/assets/certs/Reliance Foundation.png";
import rag from "@/assets/proj-rag.jpg";
import agents from "@/assets/proj-agents.jpg";

export const projects: Project[] = [
  {
    title: "Enterprise Multi-Agent AI Workflow Automation Platform",
    blurb:
      "Multi-agent orchestration with LangGraph + LangChain + OpenAI: planning, execution and evaluation agents. +60% task-automation efficiency, +35% response accuracy via RAG & semantic retrieval (FAISS/ChromaDB), −40% unreliable outputs via golden-set + LLM-as-judge evals.",
    img: agents,
    tags: ["LangGraph", "LangChain", "RAG", "FAISS", "ChromaDB"],
  },
  {
    title: "Production RAG Knowledge Engine (Enterprise Document AI)",
    blurb:
      "Enterprise RAG for document Q&A with optimised chunking, embeddings, semantic search and metadata filtering. +45% answer accuracy, −35% hallucinations via citations and context ranking, −70% search time on a FastAPI + FAISS/ChromaDB deployment.",
    img: rag,
    tags: ["RAG", "FastAPI", "FAISS", "ChromaDB", "LangChain"],
  },
];

export const certificates: Certificate[] = [
  {
    title: "Scholarship for Merit 2024–2025",
    issuer: "Reliance Foundation Undergraduate Scholarship",
    year: "2025",
    file: relianceCertUrl,
    fileName: "Reliance_Foundation.png",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google · Coursera",
    year: "2026",
    file: googleAiCertUrl,
    fileName: "Google_AI_Essentials.pdf",
  },
  {
    title: "Full-Stack Developer Internship Completion",
    issuer: "Viyatus Technologies Pvt. Ltd.",
    year: "2026",
    file: viyatusCertUrl,
    fileName: "Viyatus_Internship_Certificate.pdf",
  },
  {
    title: "Virtual Internship — Conversational Data Analysis with LLMs",
    issuer: "AICTE · VOIS for Tech · Edunet Foundation",
    year: "2025",
    file: aicteCertUrl,
    fileName: "AICTE_VOIS_Conversational_Data_Analysis.pdf",
  },
];

const SI = (slug: string, hex: string) =>
  `https://cdn.simpleicons.org/${slug}/${hex.replace("#", "")}`;
const DEVICON = (path: string) => `https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/${path}`;

export const stack: TechStackItem[] = [
  { n: "Python", c: "#3776ab", logo: SI("python", "3776ab") },
  { n: "PyTorch", c: "#ee4c2c", logo: SI("pytorch", "ee4c2c") },
  { n: "LangChain", c: "#22c55e", logo: SI("langchain", "22c55e") },
  { n: "LangGraph", c: "#a3e635", logo: SI("langgraph", "a3e635") },
  { n: "Hugging Face", c: "#ffca28", logo: SI("huggingface", "ffca28") },
  { n: "FastAPI", c: "#009688", logo: SI("fastapi", "009688") },
  { n: "FAISS", c: "#0891b2" },
  { n: "ChromaDB", c: "#f97316" },
  { n: "RAGAS", c: "#ec4899" },
  { n: "Docker", c: "#2496ed", logo: SI("docker", "2496ed") },
  { n: "AWS", c: "#ff9900", logo: DEVICON("amazonwebservices/amazonwebservices-original.svg") },
  { n: "GCP", c: "#4285f4", logo: SI("googlecloud", "4285f4") },
  { n: "Git", c: "#f05033", logo: SI("git", "f05033") },
  { n: "GitHub", c: "#ffffff", logo: SI("github", "ffffff") },
  { n: "Linux", c: "#a3e635", logo: SI("linux", "a3e635") },
];
