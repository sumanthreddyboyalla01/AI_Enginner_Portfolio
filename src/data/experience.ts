import type { Role } from "@/types/portfolio";
import { Award } from "lucide-react";

export const roles: Role[] = [
  {
    role: "Full-Stack Developer — Internship",
    company: "Viyatus Technologies Private Limited",
    period: "April 2026 — June 2026",
    location: "Hyderabad (Hybrid)",
    bullets: [
      "Reduced page-load latency on the production dashboard by re-architecting Angular components and optimising rendering logic for a Java Spring Boot–backed application.",
      "Shipped 3 production features in 2 months by building and validating REST API endpoints in Spring Boot with MongoDB integration through a Bitbucket CI/CD pipeline, collaborating with stakeholders to translate requirements into specs.",
      "Improved team alignment on infrastructure decisions by documenting architecture choices using Architecture Decision Records (ADRs), driving consistency across monitoring and operations.",
      "Maintained 95%+ uptime on hybrid deployment by implementing proactive monitoring and rapid incident response, improving system reliability and availability.",
    ],
    stack: ["Angular", "Java", "Spring Boot", "MongoDB", "Bitbucket CI/CD"],
    side: "left",
  },
  {
    role: "Reliance Foundation Undergraduate Scholar",
    company: "Reliance Foundation — Scholarship for Merit",
    period: "2024 — 2028",
    location: "India",
    bullets: [
      "Selected as a Reliance Foundation Undergraduate Scholar (RF Scholar ID: RFSCH240900466868), joining a national cohort of merit-based scholars across India.",
      "Awarded ₹2.00 lakhs total scholarship, disbursed annually across the 4-year B.Tech in Artificial Intelligence at Amrita Vishwa Vidyapeetham, subject to continued academic performance.",
      "Participate in Reliance Foundation knowledge-building and mentorship activities throughout the program.",
    ],
    stack: ["Merit-based", "4-year Award", "AI Specialisation"],
    side: "right",
    icon: Award,
  },
  {
    role: "Virtual Intern — Conversational Data Analysis with LLMs",
    company: "AICTE · VOIS for Tech University Engagement Program · Edunet Foundation",
    period: "Sept 2025 — Oct 2025",
    location: "Remote",
    bullets: [
      "Improved accessibility of data analysis workflows by developing conversational AI solutions using Large Language Models (LLMs) for natural language–based data interaction.",
      "Enhanced response quality and analytical accuracy by designing optimised prompts and implementing LLM-driven data interpretation pipelines.",
      "Reduced manual analysis effort by automating information extraction and insight generation through applied AI and conversational analytics techniques.",
    ],
    stack: ["Python", "LLMs", "Prompt Engineering", "Pandas"],
    side: "left",
  },
];
