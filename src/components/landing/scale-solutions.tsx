"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScaleSolutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // State for animated counter values
  const [animatedValues, setAnimatedValues] = useState({
    sales: 0,
    costs: 0,
    hours: 0
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Function to animate the counting numbers
    const startCountingAnimation = () => {
      // Animate sales counter (3.4x)
      gsap.to(animatedValues, {
        sales: 3.4,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setAnimatedValues(prev => ({ ...prev, sales: this.targets()[0].sales }));
        }
      });

      // Animate costs counter (70%)
      gsap.to(animatedValues, {
        costs: 70,
        duration: 2,
        delay: 0.2,
        ease: "power2.out",
        onUpdate: function() {
          setAnimatedValues(prev => ({ ...prev, costs: this.targets()[0].costs }));
        }
      });

      // Animate hours counter (100+)
      gsap.to(animatedValues, {
        hours: 100,
        duration: 2,
        delay: 0.4,
        ease: "power2.out",
        onUpdate: function() {
          setAnimatedValues(prev => ({ ...prev, hours: this.targets()[0].hours }));
        }
      });
    };

    // Animate stats when they come into view
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
    if (statsElements) {
      // Create the fade/scale animation
      gsap.fromTo(statsElements, 
        { 
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Start counting animation when stats come into view
              startCountingAnimation();
            },
            onLeaveBack: () => {
              // Reset counters when scrolling back up
              setAnimatedValues({ sales: 0, costs: 0, hours: 0 });
            }
          }
        }
      );
    }

    // Animate header content
    const headerElements = sectionRef.current?.querySelectorAll('.header-content > *');
    if (headerElements) {
      gsap.fromTo(headerElements,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
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
          
          {/* Section Pill */}
          <div className="mb-6 flex justify-center">
            <div className="bg-[#1b1c20] h-[31px] w-[136px] rounded-[24px] relative overflow-hidden">
              {/* Gradient dot */}
              <div className="absolute left-[8.6px] top-[6.6px] w-[18.4px] h-[18.4px]">
                <div className="absolute left-1/2 top-[31.25%] bottom-[31.25%] w-[6.9px] rounded-[6.9px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] transform -translate-x-1/2">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
                </div>
              </div>
              {/* Text */}
              <div className="absolute left-[27.6px] top-[4.6px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] bg-clip-text text-transparent font-medium text-[14px] leading-[22px] tracking-[-0.14px]">
                WHY AVYRA?
              </div>
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
                Scale Without{' '}
              </span>
              <span 
                style={{
                  fontFamily: '"Instrument Serif"',
                  fontStyle: 'italic',
                  fontWeight: '400'
                }}
              >
                Burnout
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center text-[#d5dbe6] text-[14px] sm:text-[15px] md:text-base font-normal font-['Inter'] leading-[22px] sm:leading-relaxed tracking-[-0.32px] max-w-2xl mx-auto px-4">
            Everything you need to automate and grow your business
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
                className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-['Inter'] leading-none mb-2"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                {animatedValues.sales.toFixed(1)}x
              </h3>
              <h4 
                className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-['Inter'] leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                More Sales
              </h4>
            </div>
            <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-['Inter'] leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
              Skyrocket sales with AI agents prospecting and closing 24/7.
            </p>
          </div>

          {/* Stat 2: Lower Costs */}
          <div className="stat-number text-center md:text-left">
            <div className="mb-4">
              <h3 
                className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-['Inter'] leading-none mb-2"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                {Math.round(animatedValues.costs)}%
              </h3>
              <h4 
                className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-['Inter'] leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
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
            <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-['Inter'] leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
              Streamlined automation replaces expensive overhead.
            </p>
          </div>

          {/* Stat 3: Hours Saved */}
          <div className="stat-number text-center md:text-left">
            <div className="mb-4">
              <h3 
                className="text-[56px] sm:text-[68px] md:text-[84px] font-bold font-['Inter'] leading-none mb-2"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                {Math.round(animatedValues.hours)}+
              </h3>
              <h4 
                className="text-[18px] sm:text-[19px] md:text-[20px] font-medium font-['Inter'] leading-[28px] sm:leading-[38px] md:leading-[48px] tracking-[-0.2px]"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                Hours Saved
              </h4>
            </div>
            <p className="text-[rgba(213,219,230,0.6)] text-[14px] sm:text-[15px] md:text-[16px] font-normal font-['Inter'] leading-[22px] sm:leading-[24px] md:leading-[25.6px] tracking-[-0.32px] max-w-[259px] mx-auto md:mx-0">
              Founders reclaim valuable hours every month by offloading tasks.
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
