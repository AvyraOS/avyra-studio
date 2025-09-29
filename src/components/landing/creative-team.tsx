"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const CreativeTeam = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Set initial state for animation elements
    gsap.set([".ops-pill", ".ops-title", ".ops-subtitle", ".ops-cards"], { 
      opacity: 0,
      y: 40,
      rotationX: 15,
      scale: 0.98
    });

    // Create smooth scroll-based animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 15%",
        scrub: 2.5,
        anticipatePin: 1,
      }
    });

    // Animate elements in sequence
    tl.to(".ops-pill", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    })
    
    .to(".ops-title", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2.5,
      ease: "power1.out"
    }, "-=1.5")
    
    .to(".ops-subtitle", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    }, "-=1.8")
    
    .to(".ops-cards", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2.5,
      ease: "power1.out"
    }, "-=1.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[900px] bg-[#080808] overflow-hidden"
      id="creative-team"
    >
      {/* Background Grid Image - positioned in bottom-left */}
      <div className="absolute left-0 bottom-0 w-[632px] h-[632px]">
        <Image
          src="/images/bottom-left-grid.png"
          alt=""
          fill
          className="object-cover object-bottom-left"
          priority={false}
        />
      </div>

      {/* Container to center content */}
      <div className="container mx-auto px-4 py-24">
        
        {/* Header Section - Centered */}
        <div className="text-center mb-8">
          
          {/* Section Tag */}
          <div className="ops-pill mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7]"></div>
              <span 
                className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px]"
                style={{
                  background: 'linear-gradient(180deg, #89FFFF 0%, #00D7D7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                TRANSFORMATION
              </span>
            </div>
          </div>

          {/* Main Title with Unified Gradient */}
          <div className="ops-title mb-6">
            <h2 
              className="text-center text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[38px] sm:leading-[43px] md:leading-[48px] lg:leading-[52.8px]"
              style={{
                background: 'radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
                <span className="font-inter font-medium">
                  Your New Winning
                </span>
              <br className="sm:hidden" />
              <span className="sm:ml-2">
                <span className="font-instrument-serif italic font-normal">
                  Creative Team
                </span>
              </span>
            </h2>
          </div>

      
        </div>

        {/* Cards Section */}
        <div className="ops-cards w-full max-w-[1200px] mx-auto">
          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Card 1: All-In-One Creative Team */}
            <div className="relative rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] aspect-square pt-[2px]">
              {/* Background Image - Inset to show border */}
              <div className="relative w-full h-full rounded-t-[18px] overflow-hidden border border-[rgba(216,231,242,0.02)] rounded-[18px]">
                <Image
                  src="/images/transform1.svg"
                  alt="All-In-One Creative Team"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              
              {/* Card Text Overlay - Top portion */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-inter drop-shadow-lg">
                  All-In-One Creative Team
                </h3>
                <p className="text-[rgba(213,219,230,0.9)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-inter drop-shadow-md">
                  Everything in one place.
                </p>
              </div>
            </div>

            {/* Card 2: Award-Winning Designers */}
            <div className="relative rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] aspect-square pt-[2px]">
              {/* Background Image - Inset to show border */}
              <div className="relative w-full h-full rounded-t-[18px] overflow-hidden border border-[rgba(216,231,242,0.02)] rounded-[18px]">
                <Image
                  src="/images/transform2.svg"
                  alt="Award-Winning Designers"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              
              {/* Card Text Overlay - Top portion */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-inter drop-shadow-lg">
                  Award-Winning Designers
                </h3>
                <p className="text-[rgba(213,219,230,0.9)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-inter drop-shadow-md">
                  Access top-tier talent globally.
                </p>
              </div>
            </div>
            
            {/* Card 3: Predictable Pricing */}
            <div className="relative rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] aspect-square pt-[2px]">
              {/* Background Image - Inset to show border */}
              <div className="relative w-full h-full rounded-t-[18px] overflow-hidden border border-[rgba(216,231,242,0.02)] rounded-[18px]">
                <Image
                  src="/images/transform3.svg"
                  alt="Predictable Pricing"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              
              {/* Card Text Overlay - Top portion */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-inter drop-shadow-lg">
                  Predictable Pricing
                </h3>
                <p className="text-[rgba(213,219,230,0.9)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-inter drop-shadow-md">
                  Flat monthly rate. No surprises.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Row - 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Card 4: DreamGate System */}
            <div className="relative rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] pt-[2px]" style={{ aspectRatio: '555/418' }}>
              {/* Background Image - Inset to show border */}
              <div className="relative w-full h-full rounded-t-[18px] overflow-hidden border border-[rgba(216,231,242,0.02)] rounded-[18px]">
                <Image
                  src="/images/transform4.svg"
                  alt="DreamGate System"
                  width={555}
                  height={418}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              
              {/* Card Text Overlay - Top portion */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-inter drop-shadow-lg">
                  DreamGate System
                </h3>
                <p className="text-[rgba(213,219,230,0.9)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-inter drop-shadow-md">
                  A seamless portal to manage projects
                </p>
              </div>
            </div>
            
            {/* Card 5: Web3 & AI Native */}
            <div className="relative rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] pt-[2px]" style={{ aspectRatio: '555/418' }}>
              {/* Background Image - Inset to show border */}
              <div className="relative w-full h-full rounded-t-[18px] overflow-hidden border border-[rgba(216,231,242,0.02)] rounded-[18px]">
                <Image
                  src="/images/transform5.svg"
                  alt="Web3 & AI Native"
                  width={555}
                  height={418}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              
              {/* Card Text Overlay - Top portion */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-inter drop-shadow-lg">
                  Web3 & AI Native
                </h3>
                <p className="text-[rgba(213,219,230,0.9)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-inter drop-shadow-md">
                  We use the latest Web3 & AI tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeTeam;
