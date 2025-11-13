"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';
import Image from 'next/image';

const FounderQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Check if mobile device
    const isMobile = isMobileDevice();
    const scrollConfig = getScrollTriggerConfig(isMobile);

    // Set initial state - mobile-friendly (no upward movement on mobile)
    const initialState = isMobile ? {
      opacity: 0,
      scale: 0.98
    } : {
      opacity: 0,
      y: 40,
      rotationX: 15,
      scale: 0.95
    };

    gsap.set([".founder-pill", ".quote-part", ".founder-images"], initialState);

    // Create mobile-friendly animation (disable scrub on mobile for better scrolling)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: scrollConfig.start,
        end: isMobile ? undefined : "top 15%",
        scrub: isMobile ? false : 2.5, // Disable scrub on mobile to prevent scroll interference
        anticipatePin: isMobile ? 0 : 1,
        toggleActions: isMobile ? scrollConfig.toggleActions : undefined,
      }
    });

    // Create mobile-friendly animations
    const animationProps = isMobile ? {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    } : {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    };

    const quoteAnimationProps = isMobile ? {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    } : {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 3,
      stagger: {
        amount: 4,
        from: "start" as const,
        ease: "none"
      },
      ease: "power1.out"
    };

    // Apply animations
    tl.to(".founder-pill", animationProps)
      .to(".quote-part", quoteAnimationProps, isMobile ? "-=0.4" : "-=1.5")
      .to(".founder-images", animationProps, isMobile ? "-=0.2" : "-=2");

    // Additional smooth mouse wheel enhancement (desktop only)
    let updateScrollVelocity: (() => void) | null = null;
    
    if (!isMobile) {
      let scrollVelocity = 0;
      let lastScrollY = window.scrollY;

      updateScrollVelocity = () => {
        const currentScrollY = window.scrollY;
        scrollVelocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        // Adjust animation speed based on scroll velocity
        if (scrollVelocity > 5) {
          gsap.to(tl, {
            timeScale: 1.3,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(tl, {
            timeScale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      };

      // Smooth scroll velocity tracking (desktop only)
      gsap.ticker.add(updateScrollVelocity);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (updateScrollVelocity) {
        gsap.ticker.remove(updateScrollVelocity);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[632px] h-auto md:h-[632px] bg-[#080808] overflow-hidden pb-6 md:pb-0"
      id="founder-quote"
    >
      {/* Background Grid Image - spans full width on the right */}
      <div className="absolute right-0 top-0 w-[632px] h-[632px]">
        <Image
          src="/images/top-right-grid.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Container to center content with responsive spacing */}
      <div className="relative w-full max-w-[1200px] h-full mx-auto flex flex-col items-center justify-center pt-48 pb-12 md:py-0">

        {/* Section Tag */}
        <div className="founder-pill mb-8 md:mb-12 flex items-center justify-center w-full">
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
              FOUNDER FREEDOM
            </span>
          </div>
        </div>

        {/* Main Quote Text - centered and responsive */}
        <div className="quote-text w-full max-w-[732px] px-4 sm:px-6 md:px-8 lg:px-0 mb-8 md:mb-12">
          <p className="text-[#b8c7d9] text-[32px] md:text-[34px] lg:text-[36px] leading-[44.8px] md:leading-[47.6px] lg:leading-[50.4px] tracking-[-0.36px] md:tracking-[-0.38px] lg:tracking-[-0.4px] text-center font-normal">
            <span className="quote-part text-[#b8c7d9]/50">We studied how top 1% </span>
            <em className="quote-part font-instrument-serif italic">brands</em>
            <span className="quote-part text-[#b8c7d9]/50"> scale their creativity. Then we built their </span>
            <em className="quote-part font-instrument-serif italic">studio. </em>
            <span className="quote-part text-[#b8c7d9]/50">The best part? It creates, iterates, and performs like your best design hire only it never sleeps.</span>
          </p>
        </div>

        {/* Founder Images - centered with overlap */}
        <div className="founder-images flex items-center justify-center mb-6 md:mb-0">
          {/* Chase Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden z-10">
            <Image
              src="/images/chase.png"
              alt="Chase"
              width={64}
              height={64}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Jonathan Image - overlaps by 12px */}
          <div className="w-16 h-16 rounded-full overflow-hidden -ml-3 z-20">
            <Image
              src="/images/jonathan.png"
              alt="Jonathan"
              width={64}
              height={64}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Sou Image - overlaps by 12px */}
          {/* <div className="w-16 h-16 -ml-3 z-30 flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                boxShadow: '0 0 0 2px ##08090a', // 2px border outside the image
                display: 'flex',
                width: '64px',
                height: '64px',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/sou.png"
                alt="Sou"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FounderQuote;
