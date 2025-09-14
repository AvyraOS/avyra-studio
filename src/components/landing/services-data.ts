export interface ServiceData {
  title: string;
  description: string;
  features: {
    icon: string;
    text: string;
  }[];
  ctaText: string;
  ctaLink: string;
  videoSrc: string;
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
    videoSrc: "/videos/qualifier.mp4"
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
    videoSrc: "/videos/meet.mp4"
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
    videoSrc: "/videos/socials.mp4"
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
    videoSrc: "/videos/daily.mp4"
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
    videoSrc: "/videos/email.mp4"
  }
];
