"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';

const ScaleSolutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Ref for animated counter values (used by GSAP, doesn't trigger re-renders)
  const animatedValues = useRef({
    sales: 0,
    costs: 0,
    revenue: 0
  });

  // State for display values (triggers re-renders for UI updates)
  const [displayValues, setDisplayValues] = useState({
    sales: 0,
    costs: 0,
    revenue: 0
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Check if mobile device
    const isMobile = isMobileDevice();
    const scrollConfig = getScrollTriggerConfig(isMobile);

    // Track if animation has already played
    let hasAnimated = false;

    // Function to animate the counting numbers
    const startCountingAnimation = () => {
      if (hasAnimated) return; // Prevent animation from playing multiple times
      hasAnimated = true;

      // Animate sales counter (3.4x)
      gsap.to(animatedValues.current, {
        sales: 3.4,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayValues(prev => ({ ...prev, sales: this.targets()[0].sales }));
        }
      });

      // Animate costs counter (70%)
      gsap.to(animatedValues.current, {
        costs: 70,
        duration: 2,
        delay: 0.2,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayValues(prev => ({ ...prev, costs: this.targets()[0].costs }));
        }
      });

      // Animate revenue counter ($80M+)
      gsap.to(animatedValues.current, {
        revenue: 80,
        duration: 2,
        delay: 0.4,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayValues(prev => ({ ...prev, revenue: this.targets()[0].revenue }));
        }
      });
    };

    // Animate stats when they come into view
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
    if (statsElements) {
      // Create mobile-friendly animation (no upward movement on mobile)
      const fromProps = isMobile ? {
        opacity: 0,
        scale: 0.98
      } : {
        opacity: 0,
        y: 30,
        scale: 0.8
      };

      const toProps = isMobile ? {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      } : {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      };

      gsap.fromTo(statsElements, fromProps, {
        ...toProps,
        scrollTrigger: {
          trigger: statsRef.current,
          start: scrollConfig.start,
          toggleActions: scrollConfig.toggleActions,
          onEnter: () => {
            // Start counting animation when stats come into view (only once)
            startCountingAnimation();
          }
        }
      });
    }

    // Animate header content
    const headerElements = sectionRef.current?.querySelectorAll('.header-content > *');
    if (headerElements) {
      // Mobile-friendly header animation (no upward movement on mobile)
      const headerFromProps = isMobile ? {
        opacity: 0
      } : {
        opacity: 0,
        y: 20
      };

      const headerToProps = isMobile ? {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      } : {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      };

      gsap.fromTo(headerElements, headerFromProps, {
        ...headerToProps,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: scrollConfig.start,
          toggleActions: scrollConfig.toggleActions
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] overflow-hidden py-16 md:py-20 lg:py-28"
      id="scale"
    >
      {/* Container */}
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="header-content text-center mb-12 md:mb-16 lg:mb-20">

          {/* Section Tag */}
          <div className="mb-6 flex justify-center">
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
                WHY AVYRA?
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <h2
              className="text-center text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[34px] sm:leading-[44px] md:leading-[48px] lg:leading-[52.8px]"
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
                Unfair Creative{' '}
              </span>
              <span className="font-instrument-serif italic font-normal">
                Advantage
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center text-[#d5dbe6] text-[14px] sm:text-[15px] md:text-base font-normal font-inter leading-[22px] sm:leading-relaxed tracking-[-0.32px] max-w-2xl mx-auto px-4">
            Everything you need to create without the overhead.
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[1200px]">
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
            >
              {/* Stat 1: More Sales */}
              <div className="stat-number text-center md:text-left">
                <div className="mb-4">
                  <h3
                    className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-inter leading-none mb-2"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    {displayValues.sales.toFixed(1)}x
                  </h3>
                  <h4
                    className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-inter leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    Faster Delivery
                  </h4>
                </div>
                <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-inter leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
                  Get design & development work completed in days, not weeks.
                </p>
              </div>

              {/* Stat 2: Lower Costs */}
              <div className="stat-number text-center md:text-left">
                <div className="mb-4">
                  <h3
                    className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-inter leading-none mb-2"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    {Math.round(displayValues.costs)}%
                  </h3>
                  <h4
                    className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-inter leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    Lower Costs
                  </h4>
                </div>
                <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-inter leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
                  Save compared to hiring full-time teams or paying bloated retainers.
                </p>
              </div>

              {/* Stat 3: Hours Saved */}
              <div className="stat-number text-center md:text-left">
                <div className="mb-4">
                  <h3
                    className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-inter leading-none mb-2"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    ${Math.round(displayValues.revenue)}M+
                  </h3>
                  <h4
                    className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-inter leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
                    style={{
                      background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    Funds Raised
                  </h4>
                </div>
                <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-inter leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
                  In venture funding for startups powered by Avyra’s designs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleSolutions;
