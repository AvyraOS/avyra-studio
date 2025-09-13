"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const OpsTeam = () => {
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
      scale: 0.95
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
      id="ops-team"
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
          
          {/* Section Pill */}
          <div className="ops-pill mb-6 flex justify-center">
            <div className="bg-[#1b1c20] h-[31px] w-[180px] rounded-[24px] relative overflow-hidden">
              {/* Gradient dot */}
              <div className="absolute left-[8.6px] top-[6.6px] w-[18.4px] h-[18.4px]">
                <div className="absolute left-1/2 top-[31.25%] bottom-[31.25%] w-[6.9px] rounded-[6.9px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] transform -translate-x-1/2">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
                </div>
              </div>
              {/* Text */}
              <div className="absolute left-[27.6px] top-[4.6px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] bg-clip-text text-transparent font-medium text-[14px] leading-[22px] tracking-[-0.14px]">
                TRANSFORMATION
              </div>
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
              <span 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500'
                }}
              >
                Your New Winning
              </span>
              <br className="sm:hidden" />
              <span className="sm:ml-2">
                <span 
                  style={{
                    fontFamily: '"Instrument Serif"',
                    fontStyle: 'italic',
                    fontWeight: '400'
                  }}
                >
                  Ops Team
                </span>
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="ops-subtitle max-w-[640px] mx-auto">
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px]">
              Stop duct-taping apps together. Avyra replaces disjointed workflows with a seamless, 
              intelligent system that runs your business in the background while you stay in flow.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="ops-cards w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
            
            {/* Before Card */}
            <div className="flex-1 bg-[#f1f1f1] rounded-[20px] relative overflow-hidden shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] flex flex-col max-w-[604px] lg:max-w-none min-h-[428px]">
              {/* Before Image - Top portion */}
              <div className="flex-1 relative w-full">
                <Image
                  src="/images/before-image.svg"
                  alt="Before - Fragmented tools and workflows"
                  fill
                  className="object-cover object-center"
                />
              </div>
              
              {/* Card Text - Bottom portion */}
              <div className="flex-shrink-0 px-8 py-4 pb-8">
                <h3 className="text-[#000000] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-['Inter']">
                  Before
                </h3>
                <p className="text-[rgba(0,0,0,0.6)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-['Inter']">
                  Fragmented tools. Manual work. Missed opportunities.
                </p>
              </div>
            </div>

            {/* After Card */}
            <div className="flex-1 bg-[#080808] rounded-[20px] relative overflow-hidden border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] flex flex-col max-w-[604px] lg:max-w-none min-h-[428px]">
              {/* Light gradient overlay */}
              <div 
                className="absolute right-0 top-0 w-[604px] h-full opacity-10 pointer-events-none z-10"
                style={{
                  background: 'radial-gradient(ellipse 302px 241px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
                }}
              />
              
              {/* After Image - Top portion */}
              <div className="flex-1 relative w-full z-20">
                <Image
                  src="/images/after-image.svg"
                  alt="After - Unified Avyra system"
                  fill
                  className="object-cover object-center"
                />
              </div>
              
              {/* Card Text - Bottom portion */}
              <div className="flex-shrink-0 px-8 py-4 pb-8 relative z-20">
                <h3 className="text-[#ffffff] text-[20px] leading-[24px] font-medium tracking-[-0.2px] mb-2 font-['Inter']">
                  After <span className="text-[#d3ab8a]">Avyra</span>
                </h3>
                <p className="text-[rgba(213,219,230,0.6)] text-[16px] leading-[25.6px] tracking-[-0.32px] font-['Inter']">
                  One system. One interface. One AI-powered team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpsTeam;
