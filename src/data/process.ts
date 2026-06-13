export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We dive deep into your business goals, audience and competitive landscape to define a clear vision.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Strategy, sitemap and technical architecture are mapped out so every decision has a purpose.",
  },
  {
    number: "03",
    title: "Design",
    description: "High-fidelity, premium UI/UX designs are crafted with motion and interaction in mind from day one.",
  },
  {
    number: "04",
    title: "Develop",
    description: "Pixel-perfect, performance-optimized builds using modern frameworks and clean, scalable code.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Rigorous QA, deployment and monitoring — followed by ongoing support and optimization.",
  },
];
