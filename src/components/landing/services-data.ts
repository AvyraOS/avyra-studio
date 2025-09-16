export interface ServiceData {
  title: string;
  description: string;
  features: {
    icon: string;
    text: string;
  }[];
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
}

export const servicesData: ServiceData[] = [
  {
    title: "Brand Identity + Positioning",
    description: "Make your brand unforgettable",
    features: [
      { icon: "/icons/agent1-1.svg", text: "Visual identity systems" },
      { icon: "/icons/agent1-2.svg", text: "Messaging framewords" },
      { icon: "/icons/agent1-3.svg", text: "Guidelines to scale with consistency" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/praetor",
    imageSrc: "/images/design-team1.png"
  },
  {
    title: "Web & Product Design",
    description: "Design that scales with your product.",
    features: [
      { icon: "/icons/agent2-1.svg", text: "Conversion-driven flows" },
      { icon: "/icons/agent2-2.svg", text: "Clean, intuitive interfaces" },
      { icon: "/icons/agent2-3.svg", text: "Designed to grow with you" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/sphinx",
    imageSrc: "/images/design-team2.png"
  },
  {
    title: "Full Product Development",
    description: "High-performing apps that scale.",
    features: [
      { icon: "/icons/agent3-1.svg", text: "Responsive, user centric designs" },
      { icon: "/icons/agent3-2.svg", text: "Optimized for conversion" },
      { icon: "/icons/agent3-3.svg", text: "Fully customizable integrations" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/matrix",
    imageSrc: "/images/design-team3.png"
  },
  {
    title: "Pitch Decks & Presentations",
    description: "Persuade investors. Close deals.",
    features: [
      { icon: "/icons/agent4-1.svg", text: "Investor-ready designs" },
      { icon: "/icons/agent4-2.svg", text: "Story-driven slides" },
      { icon: "/icons/agent4-3.svg", text: "Proven to win funding" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/argo",
    imageSrc: "/images/design-team4.png"
  },
  {
    title: "Content & Video Production",
    description: "Content that commands attention.",
    features: [
      { icon: "/icons/agent5-1.svg", text: "Branded social graphics" },
      { icon: "/icons/agent5-2.svg", text: "Promo & explainer videos" },
      { icon: "/icons/agent5-3.svg", text: "Script + copywriting" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/chronos",
    imageSrc: "/images/design-team5.png"
  }
];
