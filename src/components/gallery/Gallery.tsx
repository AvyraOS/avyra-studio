"use client"

import { useRef } from 'react'
import Image from 'next/image'
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
  const section10Ref = useRef<HTMLElement>(null)
  const section11Ref = useRef<HTMLElement>(null)
  const section12Ref = useRef<HTMLElement>(null)
  const section13Ref = useRef<HTMLElement>(null)
  const section14Ref = useRef<HTMLElement>(null)
  const section15Ref = useRef<HTMLElement>(null)
  const section16Ref = useRef<HTMLElement>(null)
  const section17Ref = useRef<HTMLElement>(null)
  const section18Ref = useRef<HTMLElement>(null)
  const section19Ref = useRef<HTMLElement>(null)
  const section20Ref = useRef<HTMLElement>(null)
  const section21Ref = useRef<HTMLElement>(null)
  const section22Ref = useRef<HTMLElement>(null)
  const section23Ref = useRef<HTMLElement>(null)
  const section24Ref = useRef<HTMLElement>(null)
  const section25Ref = useRef<HTMLElement>(null)
  const section26Ref = useRef<HTMLElement>(null)
  const section27Ref = useRef<HTMLElement>(null)
  const thankYouRef = useRef<HTMLElement>(null)

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
    <div 
      id="container" 
      ref={containerRef} 
      className="relative w-full"
    >
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
        isPriority={true}
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
        isPriority={true}
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
          'Merchandise',
          'User Testing',
          'Design Thinking',
          'Responsiveness',
          'Print Design',
        ]}
        imageSrc="/images/artic digital.png"
        imageAlt="Arctic Digital Website on Monitor"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Testimonial Section - Inspired by Exploration */}
      <ProjectSection
        ref={section10Ref}
        variant="testimonial"
        title={<>Inspired by<br />Exploration</>}
        subtitle="ON-CHAIN AI IDE"
        descriptionParagraphs={[
          'We drew from arctic landscapes and early exploration instruments to craft a visual system rooted in precision and discovery. The brand evokes transparency, speed, and calm in chaos.',
          'We created a fast, elegant interface that speaks to crypto-native institutions. Clear messaging, crisp visuals, and clean UX drive credibility from first scroll to final CTA.',
        ]}
        imageSrc="/images/artic digital branding.jpg"
        imageAlt="Arctic Digital Brand Guide"
        imageSide="right"
        centerImage={true}
        testimonial={{
          quote: "They helped us translate a concept into a brand and website that finally felt embodied our vision, and it directly contributed to giving us confidence and credibility to close our first funding round.",
          name: "Alex Kent",
          role: "Founder | Arctic Digital",
          avatarSrc: "/images/Alex Kent.jpg"
        }}
      />

      {/* Brand Guide Section - Arctic Digital Full */}
      <ProjectSection
        ref={section11Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/artic full.jpg",
          imageAlt: "Arctic Digital Full Website"
        }}
      />

      {/* Overview Section - Deep AI */}
      <ProjectSection
        ref={section12Ref}
        variant="overview"
        title="Deep AI"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Deep AI sought to make advanced AI technology accessible to a broad audience, requiring a brand identity that demystified AI and a platform design that was both powerful and easy to use.',
          'Dreamflow developed a comprehensive brand identity, complete UX/UI design for the platform, and a marketing strategy that communicated the sophistication of AI while ensuring usability for all experience levels.',
        ]}
        pills={[
          'UX/UI',
          'Front-end Development',
          'Web Design',
          'Prototyping',
          'Product Design',
          'Illustrations',
          'Animations',
          'Merchandise',
          'Brand Identity',
        ]}
        imageSrc="/images/deep ai.jpg"
        imageAlt="Deep AI Brand and Platform Design"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Software Showcase Section - Creatives First */}
      <ProjectSection
        ref={section13Ref}
        variant="software-showcase"
        title="Creatives First"
        subtitle="AI TOOLS SUITE"
        descriptionParagraphs={[
          'We led the full brand, product, and web transformation - designing a visual identity, website, and UX that made AI feel bold, intuitive, and powerful.',
          'After launch, Deep AI generated $10M+ in revenue and ranked #1 on Google for key search terms, driven by a high-performance site and strategic SEO-focused design.',
        ]}
        pills={['deepai.org']}
        imageSrc="/images/deep ai software.png"
        imageAlt="Deep AI Software - AI Image Generator Interface"
      />

      {/* Testimonial Section - Simplicity meets Sophistication */}
      <ProjectSection
        ref={section14Ref}
        variant="testimonial"
        title={<>Simplicity meets<br />Sophistication</>}
        subtitle="AI TOOLS SUITE"
        descriptionParagraphs={[
          'The tools were designed to be seamless and enjoyable. Users do not need any technical or artistic skills to use these features. Input a text and receive an image lowering the barrier to entry for AI.',
        ]}
        imageSrc="/images/deep ai mobile.jpg"
        imageAlt="Deep AI Mobile App Interface"
        imageSide="right"
        centerImage={true}
        testimonial={{
          quote: "Dreamflow nailed it. Their design work was spot on, and they really took the time to understand our goals. What impressed me the most was how reliable and straightforward they were throughout the process. If you're looking for a team that's both creative and dependable, Dreamflow is the way to go.",
          name: "Mariia Pliusnova",
          role: "Co Founder | Deep AI",
          avatarSrc: "/images/Mariia.jpg"
        }}
      />

      {/* Overview Section - Jutsu */}
      <ProjectSection
        ref={section15Ref}
        variant="overview"
        title="Jutsu"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Jutsu required a platform that could communicate the power and potential of their AI and blockchain while making these complex technologies accessible to a wide range of users. Dreamflow was brought in to design a brand identity, user interface, and experience that would clearly convey the capabilities of Jutsu\'s AI technology while remaining approachable and user-friendly.',
        ]}
        pills={[
          'UX/UI',
          'Web Design',
          'Front-end Development',
          'dApp Design',
          'User Testing',
          'Design Thinking',
          'Prototyping',
          'Animations',
          'Illustrations',
        ]}
        imageSrc="/images/jutsu.jpg"
        imageAlt="Jutsu Brand Identity and Platform Design"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Brand Guide Section - Jutsu Brand */}
      <ProjectSection
        ref={section17Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/jutsu brand.jpg",
          imageAlt: "Jutsu Brand Guide"
        }}
      />

      {/* Overview Section - Pickem */}
      <ProjectSection
        ref={section18Ref}
        variant="overview"
        title="Pickem"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Pickem is a revolutionary sports betting platform that aims to change the game for good by putting the fan first. With a fair, fun, and unforgettable experience for fans to play free.',
          'We designed a premium brand identity and mobile-first experience that combines the excitement of sports betting with AI-powered innovation. The platform delivers a seamless, trustworthy experience that puts fans at the center of every interaction.',
        ]}
        pills={[
          'UX/UI',
          'Mobile App',
          'Front-end Development',
          'Prototyping',
          'Merchandise',
          'Print Design',
          'Events',
        ]}
        imageSrc="/images/pickem.jpg"
        imageAlt="Pickem Sports Betting Platform"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Testimonial Section - Energizing Engagement */}
      <ProjectSection
        ref={section19Ref}
        variant="testimonial"
        title={<>Energizing<br />Engagement</>}
        subtitle="WEB 3 GAMING"
        descriptionParagraphs={[
          'Dreamflow\'s approach focused towards incorporating gamification elements to enhance user engagement and create an enjoyable experience.',
          'The color palette consisted of bold and energetic hues, such as vibrant blues, fiery oranges, and electric greens, which were strategically chosen to evoke excitement and enthusiasm. Overall the visual appeal creates a dynamic atmosphere for users.',
        ]}
        imageSrc="/images/energizing engagement.png"
        imageAlt="Energizing Engagement - Mobile Gaming Experience"
        imageSide="right"
        centerImage={true}
      />

      {/* Testimonial Section - Play Like a Pro */}
      <ProjectSection
        ref={section20Ref}
        variant="testimonial"
        title={<>Play Like a Pro</>}
        subtitle="WEB 3 GAMING"
        descriptionParagraphs={[
          'Dreamflow thoughtfully designed to make sure every interaction feels smooth and intuitive. Our focus on clarity and speed puts you in control from start to finish. Users can experience the game like a pro.',
        ]}
        imageSrc="/images/play like a pro.png"
        imageAlt="Play Like a Pro - Mobile Gaming Experience"
        imageSide="right"
        centerImage={true}
      />

      {/* Brand Guide Section - Pickem Branding */}
      <ProjectSection
        ref={section21Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/pickem branding.png",
          imageAlt: "Pickem Branding"
        }}
      />

      {/* Brand Guide Section - Degen */}
      <ProjectSection
        ref={section22Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/degen.png",
          imageAlt: "Degen"
        }}
      />

      {/* Brand Guide Section - Step into the Arena */}
      <ProjectSection
        ref={section23Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/step into the arena.png",
          imageAlt: "Step into the Arena"
        }}
      />

      {/* Overview Section - Pool */}
      <ProjectSection
        ref={section24Ref}
        variant="overview"
        title="Pool"
        subtitle="FEATURED PROJECT"
        descriptionParagraphs={[
          'Pool is a Web3-powered platform that makes funding projects and organizing events fun and accessible. Pool turns events into a gamified experience where every contribution strengthens community and builds on shared success.',
          'The idea was to blend playful visuals with intuitive functionality to create a vibrant and inclusive platform. Every interaction in Pool is designed to be natural, enjoyable, and impactful.',
        ]}
        pills={[
          'UX/UI',
          'Web Design',
          'Web Development',
          'dApp Design',
          'Brand Identity',
          'Events',
          'Front-end Development',
          'Smart Contract Development',
          'Print Design',
          'Merchandise',
        ]}
        imageSrc="/images/pool.png"
        imageAlt="Pool - Web3 Funding Platform"
        imageSide="right"
        scopeLabel="SCOPE"
        centerImage={true}
      />

      {/* Brand Guide Section - Pool Branding */}
      <ProjectSection
        ref={section25Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/pool branding.jpg",
          imageAlt: "Pool Branding"
        }}
      />

      {/* Testimonial Section - Dive In */}
      <ProjectSection
        ref={section26Ref}
        variant="testimonial"
        title={<>Dive In</>}
        subtitle="WEB 3 EVENTS WALLET"
        descriptionParagraphs={[
          'From the users moment of start, everything flows naturally. With your own web3 wallet integrated, you can easily dive into projects, connect with others, and create memorable experiences.',
        ]}
        imageSrc="/images/dive in.jpg"
        imageAlt="Dive In - Web3 Events Wallet"
        imageSide="right"
        centerImage={true}
        testimonial={{
          quote: "Dreamflow's team turned our ideas into visual masterpieces that resonate perfectly with our audience. Their approach is beyond anything we've experienced before.",
          name: "Valerie Song",
          role: "Co Founder | Pool",
          avatarSrc: "/images/valarie song.jpg"
        }}
      />

      {/* Brand Guide Section - Pool Social */}
      <ProjectSection
        ref={section27Ref}
        variant="brand-guide"
        brandGuide={{
          imageSrc: "/images/pool social.jpg",
          imageAlt: "Pool Social"
        }}
      />

      {/* Thank You Section */}
      <section ref={thankYouRef} className="panel relative w-full min-h-screen overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center">
        {/* Center Content */}
        <div className="relative flex flex-col items-center justify-center z-10">
          {/* Logo */}
          <div className="relative w-[71px] h-[68px] mb-10">
            <Image
              src="/images/avyra-brandmark.svg"
              alt="Avyra Logo"
              fill
              loading="lazy"
              sizes="71px"
              className="object-contain"
            />
          </div>

          {/* Subtitle */}
          <p className="font-inter font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[21px] tracking-[2px] text-white/50 uppercase mb-2 sm:mb-3 md:mb-4">
            from avyra studio with love
          </p>

          {/* Title */}
          <h2
            style={{
              background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              fontFamily: "Inter"
            }}
            className="font-medium text-[48px] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[144px] leading-[1.2] tracking-[-0.03em] text-center mb-8 sm:mb-12 md:mb-16"
          >
            Thank you!
          </h2>

          {/* Schedule a call button */}
          <a
            href="/calendar"
            className="group"
          >
            <div className="inline-flex h-[69px] relative rounded-[100px] shadow-[inset_0px_0px_8px_0px_rgba(248,248,248,0.25),0px_32px_24px_-16px_rgba(0,0,0,0.40)] border-[1.5px] border-[#484848] overflow-hidden justify-center items-center p-1 transition-all duration-300">
              <div className="inline-flex h-[65px] bg-gradient-to-b from-[rgba(18,18,18,0.30)] to-[rgba(18,18,18,0.30)] bg-[rgba(248,248,248,0.01)] rounded-[100px] border-[1.5px] border-[#242424] backdrop-blur-[6px] overflow-hidden items-center justify-center px-[38px] transition-all duration-300 group-hover:shadow-[inset_0px_0px_20px_0px_rgba(255,255,255,0.1),inset_0px_0px_12px_0px_rgba(255,255,255,0.15),inset_0px_0px_6px_0px_rgba(255,255,255,0.2)] group-hover:border-white/20">
                <div className="text-[#f8f8f8]/95 text-[21.83px] font-normal font-inter leading-[23px] transition-colors duration-300 group-hover:text-white whitespace-nowrap">Schedule a call</div>
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[58px] left-0 right-0 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between z-10">
          <span className="text-[#868686] text-[12px] font-inter font-medium">
            avyra.studio
          </span>
          <span className="text-[#868686] text-[12px] font-inter font-medium">
            2025
          </span>
        </div>
      </section>
    </div>
  )
}


