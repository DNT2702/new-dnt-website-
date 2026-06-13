export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Lumora Skincare",
    category: "E-Commerce Development",
    description: "A premium D2C skincare storefront with custom product configurator and a 68% lift in conversion rate.",
    tags: ["Shopify", "Headless", "Conversion"],
    gradient: "linear-gradient(135deg, #ff9a8b 0%, #7c5cff 60%, #4ce0ff 100%)",
  },
  {
    title: "Northpeak Capital",
    category: "Web Application",
    description: "A real-time investor dashboard with secure data pipelines, custom charting and role-based access.",
    tags: ["Dashboard", "Fintech", "Realtime"],
    gradient: "linear-gradient(135deg, #4ce0ff 0%, #7c5cff 50%, #1c1c2e 100%)",
  },
  {
    title: "Atlas Logistics",
    category: "Business Automation",
    description: "Automated dispatch and reporting system that cut manual ops work by 40 hours per week.",
    tags: ["Automation", "Internal Tools", "API"],
    gradient: "linear-gradient(135deg, #ffc56b 0%, #ff7c7c 50%, #7c5cff 100%)",
  },
  {
    title: "Verve Fitness",
    category: "AI Integration",
    description: "An AI coaching assistant embedded across web and mobile, driving 3x engagement on member plans.",
    tags: ["AI Agent", "Mobile-first", "Personalization"],
    gradient: "linear-gradient(135deg, #a78bfa 0%, #4ce0ff 50%, #050507 100%)",
  },
  {
    title: "Solace Studio",
    category: "Website Development",
    description: "An award-winning portfolio site for a design studio, featuring cinematic scroll storytelling.",
    tags: ["Awwwards", "Branding", "Animation"],
    gradient: "linear-gradient(135deg, #7c5cff 0%, #ffc56b 60%, #4ce0ff 100%)",
  },
];
