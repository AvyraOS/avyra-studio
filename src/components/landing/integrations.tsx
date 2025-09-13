import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const Integrations = () => {
  const topIntegrationsRef = useRef<HTMLDivElement>(null);
  const bottomIntegrationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Top integrations animation (right to left) - triggered by scroll
    const initTopIntegrations = () => {
      const topContainer = topIntegrationsRef.current;
      if (!topContainer) return;
      
      // Set initial position - show 33% from left edge (67% hidden on right)
      gsap.set("#integrationTop1", { x: "-67%" });
      
      // Create ScrollTrigger animation - scroll content within the visible strip
      gsap.to("#integrationTop1", {
        x: "0%", // Move to show right edge aligned with screen edge
        ease: "none",
        force3D: true,
        willChange: "transform",
        scrollTrigger: {
          trigger: topContainer,
          start: "top 80%", // Start earlier in viewport
          end: "bottom 20%", // End later in viewport  
          scrub: 3, // Much slower, takes 3 seconds to "catch up"
        }
      });
    };

    // Bottom integrations animation (left to right) - triggered by scroll  
    const initBottomIntegrations = () => {
      const bottomContainer = bottomIntegrationsRef.current;
      if (!bottomContainer) return;
      
      // Set initial position - show 33% from right edge (67% hidden on left)
      gsap.set("#integrationBottom1", { x: "67%" });
      
      // Create ScrollTrigger animation - scroll content within the visible strip
      gsap.to("#integrationBottom1", {
        x: "0%", // Move to show left edge aligned with screen edge
        ease: "none",
        force3D: true,
        willChange: "transform",
        scrollTrigger: {
          trigger: bottomContainer,
          start: "top 80%", // Start earlier in viewport
          end: "bottom 20%", // End later in viewport
          scrub: 3, // Much slower, takes 3 seconds to "catch up"
        }
      });
    };
    
    // Initialize animations with a small delay
    setTimeout(() => {
      initTopIntegrations();
      initBottomIntegrations();
    }, 100);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, []);

  return (
    <section className="relative w-full bg-[#080808] overflow-hidden py-16 md:py-20 lg:py-28 lg:pt-20">
      {/* Top Right Grid Overlay */}
      <div className="absolute top-0 right-0 z-10 opacity-30">
        <Image
          src="/images/top-right-grid.png"
          alt=""
          width={400}
          height={300}
          className="w-auto h-auto"
          priority
        />
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 z-20">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          
          {/* Section Pill */}
          <div className="mb-6 flex justify-center">
            <div className="bg-[#1b1c20] h-[31px] w-[160px] rounded-[24px] relative overflow-hidden ">
              {/* Gradient dot */}
              <div className="absolute left-[8.6px] top-[6.6px] w-[18.4px] h-[18.4px]">
                <div className="absolute left-1/2 top-[31.25%] bottom-[31.25%] w-[6.9px] rounded-[6.9px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] transform -translate-x-1/2">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
                </div>
              </div>
              {/* Text */}
              <div className="absolute left-[27.6px] top-[4.6px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] bg-clip-text text-transparent font-medium text-[14px] leading-[22px] tracking-[-0.14px] ">
                COLLABORATION
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <h2 
              className="text-center text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[52.8px]"
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
                Seamless{' '}
              </span>
              <span 
                style={{
                  fontFamily: '"Instrument Serif"',
                  fontStyle: 'italic',
                  fontWeight: '400'
                }}
              >
                Integrations
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-[640px] mx-auto">
            <p className="text-[#d5dbe6] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.32px]">
              We work with your entire suite of tools to run your<br className="hidden sm:block" />
              business like a well-oiled machine.
            </p>
          </div>
        </div>

        {/* Integration Visualization */}
        <div className="relative w-full flex justify-center">
          
          {/* Large Screen - Single Image with Border Glow */}
          <div className="hidden lg:block w-full max-w-[1200px] relative">
            <div className="relative inline-block">
              {/* Bottom Glow Effect - CSS Gradient */}
              <div 
                className="absolute bottom-0 left-1/2 w-[55%] h-[400px] opacity-75 z-0 rounded-lg blur-[56px]"
                style={{ 
                  transform: 'translateX(-50%) translateY(33.33%) scaleY(0.6)',
                  background: 'radial-gradient(ellipse 70% 100% at 50% 20%, #FFE1C6 0%, rgba(255, 225, 198, 0.4) 50%, transparent 100%)'
                }}
              />
              
              {/* Border Glow Background */}
              <Image
                src="/images/integration-glow-lg-border.svg"
                alt=""
                width={1226}
                height={418}
                className="absolute top-0 left-0 w-full h-auto z-5"
                priority
              />
              
              {/* Main Integration Image */}
              <Image
                src="/images/integration-lg.svg"
                alt="Large screen integrations visualization showing connected tools and platforms"
                width={1200}
                height={600}
                className="relative w-full h-auto z-10"
                priority
              />
            </div>
          </div>

          {/* Medium Screen - Single Image with Border Glow */}
          <div className="hidden md:block lg:hidden w-full max-w-[800px] relative">
            <div className="relative inline-block">
              {/* Bottom Glow Effect - CSS Gradient */}
              <div 
                className="absolute bottom-0 left-1/2 w-[55%] h-[400px] opacity-75 z-0 rounded-lg blur-[56px]"
                style={{ 
                  transform: 'translateX(-50%) translateY(33.33%) scaleY(0.6)',
                  background: 'radial-gradient(ellipse 70% 100% at 50% 20%, #FFE1C6 0%, rgba(255, 225, 198, 0.4) 50%, transparent 100%)'
                }}
              />
              
              {/* Border Glow Background */}
              <Image
                src="/images/integration-glow-md-border.svg"
                alt=""
                width={800}
                height={500}
                className="absolute top-0 left-0 w-full h-auto z-0"
                priority
              />
              
              {/* Main Integration Image */}
              <Image
                src="/images/integration-md.svg"
                alt="Medium screen integrations visualization showing connected tools and platforms"
                width={800}
                height={500}
                className="relative w-full h-auto z-10"
              />
            </div>
          </div>

          {/* Small Screen - Animated Integration Flow */}
          <div className="block md:hidden space-y-5">
            {/* Top Section - Scrolling Right to Left - Fixed 100px Height Strip */}
            <div ref={topIntegrationsRef} className="w-screen relative left-1/2 transform -translate-x-1/2 h-[100px] overflow-hidden">
              <div className="integration-top-container absolute w-full h-full overflow-visible">
                <Image
                  src="/images/integration-sm-top.svg"
                  alt="Top section of mobile integrations visualization"
                  width={1200}
                  height={100}
                  id="integrationTop1"
                  className="absolute h-[100px] w-[300vw] left-0 object-cover object-left overflow-visible will-change-transform"
                  priority
                />
              </div>
            </div>
            
            {/* Middle Section - Static 200px Width */}
            <div className="w-full flex justify-center">
              <Image
                src="/images/integration-sm-middle.svg"
                alt="Middle section of mobile integrations visualization"
                width={200}
                height={200}
                className="w-[200px] h-auto"
              />
            </div>
            
            {/* Bottom Section - Scrolling Left to Right - Fixed 100px Height Strip */}
            <div ref={bottomIntegrationsRef} className="w-screen relative left-1/2 transform -translate-x-1/2 h-[100px] overflow-hidden">
              <div className="integration-bottom-container absolute w-full h-full overflow-visible">
                <Image
                  src="/images/integration-sm-bottom.svg"
                  alt="Bottom section of mobile integrations visualization"
                  width={1200}
                  height={100}
                  id="integrationBottom1"
                  className="absolute h-[100px] w-[300vw] left-0 object-cover object-right overflow-visible will-change-transform"
                  priority
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Integrations;
