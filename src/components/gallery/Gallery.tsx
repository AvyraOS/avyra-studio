"use client"

import { useRef } from 'react'
import ProjectSection from './ProjectSection'

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const section5Ref = useRef<HTMLElement>(null)
  const section6Ref = useRef<HTMLElement>(null)
  const section7Ref = useRef<HTMLElement>(null)
  const section8Ref = useRef<HTMLElement>(null)
  const section9Ref = useRef<HTMLElement>(null)

  const pills = [
    'Brand Identity',
    'Web Design',
    'Web Development',
    'UI/UX',
    'User Testing',
    'Prototyping',
    'Illustrations',
    'Motion Design',
  ]

  return (
    <div id="container" ref={containerRef} className="relative w-full">
      {/* Overview Section - Dexari */}
      <ProjectSection
        ref={section1Ref}
        variant="overview"
        title="Dexari"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Dexari is a mobile-first, self-custodial trading app that gives pro traders full control and performance onchain. Built on Hyperliquid, it offers deep liquidity, leverage, and pro-grade tools in a seamless experience.',
          'We reimagined Dexari from the ground up - brand identity, UX/UI, web design, illustrations, and motion - positioning it as a modern trading empire.',
          'Dexari raised $2.3M led by Prelude and Lemniscap, and reached $10M in trading volume in 3 months, with growing adoption among pro and retail traders.',
        ]}
        pills={pills}
        imageSrc="/images/dexari.png"
        imageAlt="Dexari MacBook Mockup"
        imageSide="right"
        scopeLabel="SCOPE"
      />

      {/* Testimonial Section - Forged for Performance */}
      <ProjectSection
        ref={section2Ref}
        variant="testimonial"
        title={<>Forged for<br />Performance</>}
        subtitle="CRYPTO TRADING EXPERIENCE"
        descriptionParagraphs={[
          'Inspired by the Roman Empire and the symbolism of the lion, we built a brand that feels bold, timeless, and focused. The design system reflects strength, speed, and control - everything a serious trader demands.',
          'We designed a clean, mobile-optimized experience that mirrors the product\'s performance. From sharp visuals to subtle motion, every detail is built to convert and build trust in seconds.',
        ]}
        imageSrc="/images/forged for performance.jpg"
        imageAlt="Forged for Performance Mockup"
        imageSide="right"
        centerImage={true}
        testimonial={{
          quote: "Avyra completely elevated the Dexari brand. From identity to motion, they helped us craft a premium product experience that impressed both users and investors.",
          name: "Zac Barron",
          role: "Co-Founder | Dexari",
          avatarSrc: "/images/dexari-founder.png"
        }}
      />

      {/* Brand Guide Section - Dexari Brand Guide */}
      <ProjectSection
        ref={section3Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/Dexari brand guide.jpg",
          imageAlt: "Dexari Brand Guide"
        }}
      />

      {/* Overview Section - Mint Gold Dust */}
      <ProjectSection
        ref={section4Ref}
        variant="overview"
        title="Mint Gold Dust"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Mint Gold Dust is a platform redefining digital art by connecting artists and collectors through an NFT marketplace.',
          'We created a brand identity that captured the exclusivity and artistic essence of its marketplace while appealing to a diverse audience of collectors and creators.',
        ]}
        pills={pills}
        imageSrc="/images/mint gold dust.jpg"
        imageAlt="Mint Gold Dust Mockup"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Brand Guide Section - Mint Gold Dust Cover */}
      <ProjectSection
        ref={section5Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/mint gold dust cover.jpg",
          imageAlt: "Mint Gold Dust Cover"
        }}
      />

      {/* Testimonial Section - Every NFT Has a Story */}
      <ProjectSection
        ref={section6Ref}
        variant="testimonial"
        title="Every NFT Has a Story"
        subtitle="NFT MARKETPLACE"
        descriptionParagraphs={[
          'Our mobile design focuses on quick access to galleries, easy browsing, and a streamlined minting process, allowing users to engage with the platform anywhere, anytime.',
        ]}
        imageSrc="/images/every nft has a story.jpg"
        imageAlt="NFT Marketplace with Testimonial and Laptop Display"
        imageSide="right"
        centerImage={true}
        testimonial={{
          quote: "Working with Avyra was a great experience. They really understood what we needed and brought our vision to life in a way that exceeded our expectations. The team was easy to work with, super responsive, and delivered exactly what we were looking for. I'd highly recommend them to anyone needing top-tier design work",
          name: "Kelly LeValley Hunt",
          role: "Founder | Mint Gold Dust",
          avatarSrc: "/images/kelly LeValley Hunt.jpg"
        }}
      />

      {/* Brand Guide Section - Mint Gold Dust Mobile */}
      <ProjectSection
        ref={section7Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/mint gold dust mobile.jpg",
          imageAlt: "Mint Gold Dust Mobile"
        }}
      />

      {/* Brand Guide Section - Mint Branding */}
      <ProjectSection
        ref={section8Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/mint branding.jpg",
          imageAlt: "Mint Branding"
        }}
      />

      {/* Overview Section - Arctic Digital */}
      <ProjectSection
        ref={section9Ref}
        variant="overview"
        title="Arctic Digital"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Arctic Digital is a crypto-native firm unlocking deep market insights and tools for institutional-grade trading. Built for speed and clarity in the most volatile conditions.',
          'We led their rebrand and created a sleek, modern site that elevates credibility and clarity. From positioning to execution, every element reinforces trust.',
          'Following launch, Arctic secured $500K in funding and expanded their internal team to accelerate product development.',
        ]}
        pills={[
          'UX/UI',
          'Web Design',
          'Product Design',
          'dApp Design',
          'User Testing',
          'Design Thinking',
          'Responsiveness',
          'Print Design',
          'Merchandise',
        ]}
        imageSrc="/images/artic digital.png"
        imageAlt="Arctic Digital Website on Monitor"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />
    </div>
  )
}


