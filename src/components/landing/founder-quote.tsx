"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const FounderQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Set initial state - more dramatic starting position for smoother reveal
    gsap.set([".founder-pill", ".quote-part", ".founder-images"], { 
      opacity: 0,
      y: 40,
      rotationX: 15,
      scale: 0.95
    });

    // Create a smooth, liquid scroll-based animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 15%",
        scrub: 2.5, // Much smoother scrubbing - higher value = more lag/smoothness
        anticipatePin: 1,
      }
    });

    // Create individual animations for ultra-smooth reveals
    tl.to(".founder-pill", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    })
    
    // Staggered quote parts with much smoother, longer timing
    .to(".quote-part", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 3,
      stagger: {
        amount: 4, // Longer stagger for smoother individual reveals
        from: "start",
        ease: "none" // Linear stagger for consistent timing
      },
      ease: "power1.out"
    }, "-=1.5")
    
    // Founder images with subtle bounce
    .to(".founder-images", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    }, "-=2");

    // Additional smooth mouse wheel enhancement
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    
    const updateScrollVelocity = () => {
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

    // Smooth scroll velocity tracking
    const scrollHandler = gsap.ticker.add(updateScrollVelocity);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(scrollHandler);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[632px] h-[632px] md:h-[632px] bg-[#080808] overflow-hidden"
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
      <div className="relative w-full max-w-[1200px] h-full mx-auto flex flex-col items-center justify-center pt-48 pb-8 md:py-0">
        
        {/* Founder Pill */}
        <div className="founder-pill mb-8 md:mb-12 flex items-center justify-center w-full">
          <div className="bg-[#1b1c20] h-[31px] w-[180px] rounded-[24px] relative overflow-hidden">
            {/* Gradient dot */}
            <div className="absolute left-[8.6px] top-[6.6px] w-[18.4px] h-[18.4px]">
              <div className="absolute left-1/2 top-[31.25%] bottom-[31.25%] w-[6.9px] rounded-[6.9px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] transform -translate-x-1/2">
                <div className="absolute inset-0 pointer-events-none shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
              </div>
            </div>
            {/* Text */}
            <div className="absolute left-[27.6px] top-[4.6px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] bg-clip-text text-transparent font-medium text-[14px] leading-[22px] tracking-[-0.14px]">
              FOUNDER FREEDOM
            </div>
          </div>
        </div>

        {/* Main Quote Text - centered and responsive */}
        <div className="quote-text w-full max-w-[732px] px-4 sm:px-6 md:px-8 lg:px-0 mb-8 md:mb-12">
          <p className="text-[#b8c7d9] text-[32px] md:text-[34px] lg:text-[36px] leading-[44.8px] md:leading-[47.6px] lg:leading-[50.4px] tracking-[-0.36px] md:tracking-[-0.38px] lg:tracking-[-0.4px] text-center font-normal">
            <span className="quote-part text-[#b8c7d9]/50">We studied how top 1% </span>
            <em className="quote-part font-instrument-serif not-italic" style={{fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic'}}>founders</em>
            <span className="quote-part text-[#b8c7d9]/50"> escape operational chaos. Then we built their </span>
            <em className="quote-part font-instrument-serif not-italic" style={{fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic'}}>system. </em>
            <span className="quote-part text-[#b8c7d9]/50">Best part? It thinks, learns, and performs like your best hire only it never sleeps.</span>
          </p>
        </div>

        {/* Founder Images - centered with overlap */}
        <div className="founder-images flex items-center justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default FounderQuote;
