import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Dream Discovery Call | Avyra Design Studio',
  description: 'Ready to turn your vision into stunning reality? Let Avyra handle all your design challenges so you can focus on building your dream.',
  keywords: [
    'design studio',
    'branding',
    'website design',
    'UI/UX design',
    'design consultation',
    'founder design partner',
    'premium design',
    'design services'
  ],
  openGraph: {
    title: 'Book Your Dream Discovery Call | Avyra Design Studio',
    description: 'Ready to turn your vision into stunning reality? Let Avyra handle all your design challenges so you can focus on building your dream.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Dream Discovery Call | Avyra Design Studio',
    description: 'Ready to turn your vision into stunning reality? Let Avyra handle all your design challenges.',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
