import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  blurb: string;
  img: string;
  tags: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  file?: string;
  fileName?: string;
}

export interface TechStackItem {
  n: string;
  c: string;
  logo?: string;
}

export interface Role {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
  side?: "left" | "right";
  icon?: LucideIcon;
  accent?: string;
}
