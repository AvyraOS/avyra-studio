"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxVideoWidth, setMaxVideoWidth] = useState('100vw');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Set initial width based on screen size
    if (window.innerWidth >= 768) {
      setMaxVideoWidth('90vw');
    } else {
      setMaxVideoWidth('100vw');
    }
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (desktopVideoRef.current) {
      desktopVideoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check if mobile for targeted logging
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      console.log('🔍 MOBILE: Hero component initializing');
    }

    // Hero content fade-in animation
    const heroTl = gsap.timeline();
    heroTl.to(".hero-main-content", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        if (isMobile) console.log('✅ GSAP: Hero fade animation complete');
      }
    });

    // Video width animation on scroll (desktop only)
    const handleScroll = () => {
      if (window.innerWidth >= 768) { // Only on desktop
        const scrollY = window.scrollY;
        const baseHeroHeight = window.innerHeight * 1.3; // 130vh
        const scrollProgress = Math.min(scrollY / (baseHeroHeight * 0.5), 1); // Grow over first 50% of hero section
        
        // Interpolate from 90vw to 100vw for edge-to-edge feel
        const newWidth = 90 + (scrollProgress * 10);
        setMaxVideoWidth(`${newWidth}vw`);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Add scroll performance monitoring on mobile
    if (isMobile) {
      let scrollBlocked = false;
      let lastScrollY = 0;
      
      const detectScrollIssues = () => {
        const currentScrollY = window.scrollY;
        
        // Detect if scroll position hasn't changed (potential blocking)
        if (Math.abs(currentScrollY - lastScrollY) < 1 && currentScrollY > 0) {
          if (!scrollBlocked) {
            console.log('🚫 SCROLL: Potential blocking detected at scrollY=' + currentScrollY);
            scrollBlocked = true;
          }
        } else {
          if (scrollBlocked) {
            console.log('✅ SCROLL: Movement resumed at scrollY=' + currentScrollY);
            scrollBlocked = false;
          }
        }
        
        lastScrollY = currentScrollY;
      };
      
      const scrollMonitor = setInterval(detectScrollIssues, 100);
      
      // Clean up animations and monitoring on unmount
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        clearInterval(scrollMonitor);
        window.removeEventListener('scroll', handleScroll);
        if (isMobile) console.log('🧹 CLEANUP: Hero animations and monitoring stopped');
      };
    }

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen bg-[#080808] pt-20 md:py-32" 
      id="home"
    >
      {/* Bottom Level: Background Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Top Gradient - native CSS version, hanging off top */}
        <div className="TopGradientBg absolute -top-[241px] left-1/2 transform -translate-x-1/2 w-[381.01px] h-[382px] opacity-40 rounded-br-md blur-[132.70px]"
          style={{
            background: "radial-gradient(circle, #89FFFF 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)"
          }} />
      </div>

      {/* Hero Top Gradient - Above content including pill, below CTAs/Nav */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Image
          src="/images/hero-top-gradient.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Top Pill - Separate layer behind gradient */}
      <div className="absolute top-[88px] md:top-[17vh] left-1/2 transform -translate-x-1/2 z-10 text-center px-4 w-full">
        <div className="mb-10 md:mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 md:py-2 rounded-[24px] bg-[#1b1c20] h-[1.875rem] md:h-auto">
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
              DESIGN PARTNER FOR FOUNDERS
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layer - positioned with better spacing below pill */}
      <div className="relative z-30 text-center px-4 w-full max-w-[1440px] mx-auto pt-[66px] md:pt-[120px]">

        {/* Hero content */}
        <div className="text-center opacity-0 hero-main-content">
          {/* Hero Header with proper responsive design */}
          <div className="flex flex-col justify-center self-stretch mb-[1rem] sm:mb-6 md:mb-8">
            <h1
              style={{
                background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Inter"
              }}
              className="text-center text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-medium leading-[2.25rem] sm:leading-[3rem] md:leading-[4rem] lg:leading-[5rem] xl:leading-[5.5rem] tracking-[-0.04rem] sm:tracking-[-0.055rem] md:tracking-[-0.07rem] lg:tracking-[-0.09rem] xl:tracking-[-0.11rem] capitalize max-w-full"
            >
              World Class Designs.<br />
              Delivered in 48 Hours.
            </h1>
          </div>

          {/* Subheader with exact specs - fully responsive */}
          <p
            className="w-full max-w-[20rem] sm:max-w-[400px] md:max-w-[506px] mx-auto text-[#D5DBE6] text-center text-[1rem] sm:text-sm md:text-base font-normal font-inter leading-[1.425rem] sm:leading-[22px] md:leading-[25.6px] tracking-[-0.015rem] sm:tracking-[-0.28px] md:tracking-[-0.32px] mb-[1rem] sm:mb-6 md:mb-8 sm:px-4"
          >
            Get world-class designs, delivered in as little as 48 hours. Forget the hiring headaches.
          </p>
          {/* Button Container with Animated Border Glow */}
          <div className="relative inline-block mb-6 md:mb-8 group">
            {/* Button Glow (Bottom Layer) - larger to show glow effect */}
            <Image
              src="/images/button-glow.png"
              alt=""
              width={400}
              height={120}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[400px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
            />

            {/* Button Background Container with Moving Glow - 50px height */}
            <div
              className="relative z-10 p-[2px] rounded-lg h-[50px] overflow-hidden"
              style={{
                background: "radial-gradient(50% 20.7% at 50% 100%, #C6FFFF 0%, rgba(198, 255, 255, 0.00) 100%)"
              }}
            >
              <Link
                href="/intake"
                className="relative z-50 inline-flex items-center justify-center bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] text-[#000000] px-8 rounded-lg text-base font-medium font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px]"
              >
                <span>Start Building Your Company</span>
                <svg
                  className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          
          </div>

          {/* View Pricing Link */}
          <div className="mt-0">
            <a 
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  // Find the pill element (the first div with the gradient dot inside)
                  const pillElement = pricingSection.querySelector('.bg-\\[\\#1b1c20\\]');
                  const targetElement = pillElement || pricingSection;
                  
                  const rect = targetElement.getBoundingClientRect();
                  const offsetTop = rect.top + window.pageYOffset;
                  const viewportHeight = window.innerHeight;
                  const scrollTo = offsetTop - (viewportHeight * 0.01); // 5% from top
                  
                  window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                  });
                }
              }}
              className="text-[#d5dbe6] text-sm md:text-base font-normal font-inter leading-relaxed hover:text-[#89FFFF] transition-colors duration-200 cursor-pointer opacity-60 md:opacity-100"
            >
              View Plans & Pricing
            </a>
          </div>

          <style jsx>{`
              @keyframes moveGlow {
                0% {
                  top: -30px;
                  left: 50%;
                  transform: translateX(-50%);
                }
                12.5% {
                  top: -15px;
                  left: calc(100% - 20px);
                  transform: translateX(-50%);
                }
                25% {
                  top: 50%;
                  left: calc(100% + 20px);
                  transform: translateY(-50%);
                }
                37.5% {
                  top: calc(100% - 5px);
                  left: calc(100% - 20px);
                  transform: translateX(-50%);
                }
                50% {
                  top: calc(100% + 20px);
                  left: 50%;
                  transform: translateX(-50%);
                }
                62.5% {
                  top: calc(100% - 5px);
                  left: 20px;
                  transform: translateX(-50%);
                }
                75% {
                  top: 50%;
                  left: -30px;
                  transform: translateY(-50%);
                }
                87.5% {
                  top: -15px;
                  left: 20px;
                  transform: translateX(-50%);
                }
                100% {
                  top: -30px;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            `}</style>

          {/* Hero Video with Custom Cursor */}
          <div 
            ref={videoContainerRef}
            className="mt-8 md:mt-[64px]"
          >
            {/* Mobile video (square) */}
            <div 
              className="md:hidden block w-screen relative left-1/2 -translate-x-1/2"
              onClick={openModal}
            >
              <div className="relative w-full pb-[100vw]"> {/* Creates a square aspect ratio touching edges */}
                <video 
                  ref={mobileVideoRef}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/avyra-studio.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Simple play button for mobile */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#333333] bg-opacity-70 rounded-full w-14 h-14 flex items-center justify-center z-10 shadow-md"
                  onClick={openModal}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="white" 
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop video */}
            <div 
              className="hidden md:block md:transition-all md:duration-300 relative rounded-lg overflow-hidden"
              style={{ 
                width: maxVideoWidth,
                cursor: isHovering ? 'none' : 'auto',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <video 
                ref={desktopVideoRef}
                className="w-full h-auto block"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                onClick={toggleSound}
              >
                <source src="/videos/avyra-studio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Cursor-following Sound Button (desktop only) */}
              {isHovering && (
                <div 
                  className="absolute pointer-events-none bg-white text-black py-2 px-4 rounded-full flex items-center z-10 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
                  style={{ 
                    left: `${cursorPosition.x}px`, 
                    top: `${cursorPosition.y}px`,
                    transition: 'transform 0.05s ease'
                  }}
                >
                  {isMuted ? (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="mr-2"
                      >
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                      </svg>
                      Play Sound
                    </>
                  ) : (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="mr-2"
                      >
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                      Mute
                    </>
                  )}
                </div>
              )}

              {/* Invisible click overlay to ensure button works - desktop only */}
              {isHovering && (
                <div 
                  className="absolute inset-0 z-20"
                  onClick={toggleSound}
                  style={{ cursor: 'none' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Maximized Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white p-2 z-10 hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Video player with controls - expanded to fit viewport while maintaining aspect ratio */}
            <div className="w-full h-full max-h-[90vh] flex items-center">
              <video
                ref={modalVideoRef}
                className="w-full h-auto max-h-full mx-auto"
                controls
                autoPlay
                playsInline
              >
                <source src="/videos/avyra-studio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 