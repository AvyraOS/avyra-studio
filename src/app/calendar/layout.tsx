import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Avyra Freedom Call | AI Automation Strategy Session',
  description: 'Schedule a 30-minute strategy call to discover how Avyra can transform your business with AI agents that handle sales, support, and operations 24/7.',
  keywords: [
    'AI automation',
    'business automation',
    'AI agents',
    'strategy call',
    'consultation',
    'founder freedom',
    'sales automation',
    'support automation'
  ],
  openGraph: {
    title: 'Book Your Avyra Freedom Call',
    description: 'Unlock AI agents that handle sales, support, and ops 24/7, so you can focus on building your vision.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Avyra Freedom Call',
    description: 'Schedule a strategy call to explore AI automation for your business.',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
