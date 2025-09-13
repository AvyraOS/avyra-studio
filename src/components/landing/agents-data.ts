export interface AgentData {
  category: string;
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

export const agentsData: AgentData[] = [
  {
    category: "PRAETOR - SALES LEAD",
    title: "Get More Leads, Faster",
    description: "AI-powered outbound lead generation",
    features: [
      { icon: "/icons/agent1-1.svg", text: "Identifies and targets ideal customers" },
      { icon: "/icons/agent1-2.svg", text: "Sends personalized emails at scale" },
      { icon: "/icons/agent1-3.svg", text: "Scores and prioritizes hottest leads in real-time" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/praetor",
    videoSrc: "/videos/qualifier.mp4"
  },
  {
    category: "SPHINX - DEAL CLOSER",
    title: "Close Deals on Autopilot",
    description: "AI follow-up, proposal, and meeting assistant",
    features: [
      { icon: "/icons/agent2-1.svg", text: "Follows up with leads until they convert" },
      { icon: "/icons/agent2-2.svg", text: "Auto-schedules meetings and sends reminders" },
      { icon: "/icons/agent2-3.svg", text: "Creates personalized proposals instantly" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/sphinx",
    videoSrc: "/videos/meet.mp4"
  },
  {
    category: "MATRIX - CONTENT MANAGER",
    title: "Scale Content That Converts",
    description: "AI writing, research & publishing engine",
    features: [
      { icon: "/icons/agent3-1.svg", text: "Researches and outlines articles fast" },
      { icon: "/icons/agent3-2.svg", text: "Creates SEO-optimized blog & social posts" },
      { icon: "/icons/agent3-3.svg", text: "Publishes across platforms on schedule" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/matrix",
    videoSrc: "/videos/socials.mp4"
  },
  {
    category: "ARGO - FINANCE MANAGER",
    title: "Automate Your Finances",
    description: "AI for invoicing, accounting & cashflow",
    features: [
      { icon: "/icons/agent4-1.svg", text: "Auto-generates invoices and receipts" },
      { icon: "/icons/agent4-2.svg", text: "Categorizes and syncs expenses" },
      { icon: "/icons/agent4-3.svg", text: "Delivers real-time financial insights" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/argo",
    videoSrc: "/videos/daily.mp4"
  },
  {
    category: "CHRONOS - EXECUTIVE ASSISTANT",
    title: "Reclaim Your Time Back",
    description: "AI calendar, email & admin assistant",
    features: [
      { icon: "/icons/agent5-1.svg", text: "Schedules meetings automatically" },
      { icon: "/icons/agent5-2.svg", text: "Manages and replies to emails" },
      { icon: "/icons/agent5-3.svg", text: "Preps you with daily briefings" }
    ],
    ctaText: "Get Started",
    ctaLink: "/agents/chronos",
    videoSrc: "/videos/email.mp4"
  }
];
