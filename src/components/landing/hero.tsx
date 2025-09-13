"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero content fade-in animation
    const heroTl = gsap.timeline();
    heroTl.to(".hero-main-content", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Client logos animation
    const initClientLogos = () => {
      const clientsContainer = logosRef.current?.querySelector('.clients-container');
      if (!clientsContainer) return;
      
      // Set initial state of container and images
      const prepareLogos = () => {
        // Ensure the container is wide enough
        gsap.set(clientsContainer, { width: '400%', height: '100%' });
        
        // Update logo positions
        const updateLogoPositions = () => {
          const logos = clientsContainer.querySelectorAll('img');
          logos.forEach(logo => {
            // Make sure all logos have consistent styling
            gsap.set(logo, {
              height: '100%',
              position: 'absolute',
              left: 0,
              marginRight: '42px',
              paddingRight: '42px'
            });
          });
          
          // Position the first logo starting from right edge
          gsap.set("#clientLogos1", { x: "0%" });
          
          // Position the second logo right after the first one (seamless)
          gsap.set("#clientLogos2", { x: "100%" });
        };
        
        // Initial setup
        updateLogoPositions();
      };
      
      prepareLogos();
      
      // Create the continuous animation with improved smoothness
      const logoTimeline = gsap.timeline({ 
        repeat: -1,
        ease: "none" 
      });
      
      logoTimeline
        .to("#clientLogos1", {
          x: "-100%", 
          duration: 40,
          ease: "linear",
          force3D: true
        })
        .to("#clientLogos2", {
          x: "0%", 
          duration: 40,
          ease: "linear",
          force3D: true
        }, "<") // Start at the same time
        .to("#clientLogos1", {
          x: "100%", 
          duration: 0
        })
        .to("#clientLogos2", {
          x: "-100%", 
          duration: 40,
          ease: "linear",
          force3D: true
        })
        .to("#clientLogos1", {
          x: "0%", 
          duration: 40,
          ease: "linear",
          force3D: true
        }, "<");
    };
    
    // Initialize logo animation with a small delay to ensure DOM is ready
    setTimeout(() => {
      initClientLogos();
    }, 100);

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative h-[130vh] md:h-[1558px] bg-[#080808] flex flex-col justify-center items-center overflow-hidden" id="home">
      {/* Bottom Level: Background Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Top Gradient - native CSS version, hanging off top */}
        <div className="TopGradientBg absolute -top-[241px] left-1/2 transform -translate-x-1/2 w-[381.01px] h-[382px] opacity-40 rounded-br-md blur-[132.70px]" 
             style={{
               background: "radial-gradient(circle, #ad6346 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)"
             }} />
        {/* Bottom Gradient - native CSS version, hanging off bottom */}
        <div className="BottomGradientBg absolute -bottom-[241px] left-1/2 transform -translate-x-1/2 w-[481.01px] h-[342px] opacity-40 rounded-tl-md blur-[132.70px]" 
             style={{
               background: "radial-gradient(circle, #ad6346 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)"
             }} />
             
                {/* Client Logos Animation - At background level */}
        <div className="absolute bottom-[80px] md:bottom-[110px] left-1/2 transform -translate-x-1/2 w-full -z-10">
          <div className="w-full flex justify-center relative">
            {/* Solid background blockers on left and right */}
            <div className="absolute left-0 top-0 w-[15%] h-[50px] sm:h-[65px] md:h-[80px] bg-[#080808] z-[20]"></div>
            <div className="absolute right-0 top-0 w-[15%] h-[50px] sm:h-[65px] md:h-[80px] bg-[#080808] z-[20]"></div>
            
            <div ref={logosRef} className="w-[85%] relative overflow-hidden opacity-80">
              <div className="clients overflow-hidden w-full h-[50px] sm:h-[65px] md:h-[80px] relative flex justify-center items-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-[20%] before:h-full before:z-[10] before:pointer-events-none before:bg-gradient-to-r before:from-[#080808] before:from-0% before:via-[#080808] before:via-70% before:to-transparent before:to-100% after:content-[''] after:absolute after:top-0 after:right-0 after:w-[20%] after:h-full after:z-[10] after:pointer-events-none after:bg-gradient-to-l after:from-[#080808] after:from-0% after:via-[#080808] after:via-70% after:to-transparent after:to-100%">
                <div className="clients-container relative w-full h-full overflow-hidden flex items-center">
                  <Image 
                    src="/icons/client_logos.svg" 
                    alt="Client logos" 
                    width={2000}
                    height={100}
                    id="clientLogos1"
                    className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none opacity-70" 
                    priority
                  />
                  <Image 
                    src="/icons/client_logos.svg" 
                    alt="Client logos" 
                    width={2000}
                    height={100}
                    id="clientLogos2"
                    className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none opacity-70" 
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <div className="absolute top-[120px] md:top-[17vh] left-1/2 transform -translate-x-1/2 z-10 text-center px-4 w-full">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <div className="TopPill w-[21rem] sm:w-[327px] md:w-[327px] h-[1.875rem] sm:h-[31.20px] md:h-[31.20px] relative bg-[#1a1b20] rounded-3xl overflow-hidden mx-auto">
            <div className="Container size-[1.0625rem] sm:size-[18.40px] md:size-[18.40px] left-[0.5rem] sm:left-[8.60px] md:left-[8.60px] top-[0.40625rem] sm:top-[6.60px] md:top-[6.60px] absolute overflow-hidden">
              <div className="GradientShadow size-[0.40625rem] sm:size-[6.90px] md:size-[6.90px] left-[0.328125rem] sm:left-[5.75px] md:left-[5.75px] top-[0.328125rem] sm:top-[5.75px] md:top-[5.75px] absolute bg-gradient-to-b from-[#f2c6a6] to-[#bb835a] rounded-[0.40625rem] sm:rounded-[6.90px] md:rounded-[6.90px] shadow-[inset_0px_1.15px_1.15px_0px_rgba(255,255,255,0.09),inset_0px_1.15px_18.4px_0px_rgba(255,255,255,0.12)]" />
            </div>
            <div className="Label left-[1.625rem] sm:left-[27.60px] md:left-[27.60px] right-[0.5rem] sm:right-[8px] md:right-[8px] top-[0.265625rem] sm:top-[4.60px] md:top-[4.60px] absolute justify-start text-[#f2c6a6] text-[0.875rem] sm:text-sm font-medium font-['Inter'] leading-snug whitespace-nowrap">Design for people</div>
          </div>
        </div>
      </div>

      {/* Main Content Layer - positioned with better spacing below pill */}
      <div className="absolute top-[170px] md:top-[calc(16vh+70px)] left-1/2 transform -translate-x-1/2 z-30 text-center px-4 w-full max-w-[1440px]">

        {/* Hero content */}
        <div className="text-center opacity-0 hero-main-content">
            {/* Hero Header with exact specs - fully responsive */}
            <div className="flex h-[6.25rem] sm:h-[130px] md:h-[160px] lg:h-[194px] flex-col justify-center self-stretch mb-[1rem] sm:mb-6 md:mb-8">
              <h1 
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  fontFamily: "Inter"
                }}
                className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-medium leading-[3rem] sm:leading-[4rem] md:leading-[5rem] lg:leading-[5.5rem] tracking-[-0.05rem] sm:tracking-[-0.07rem] md:tracking-[-0.09rem] lg:tracking-[-0.11rem] capitalize max-w-full h-full"
              >
                World Class<br />
                Design
              </h1>
            </div>
            
            {/* Subheader with exact specs - fully responsive */}
            <p 
              className="w-full max-w-[20rem] sm:max-w-[400px] md:max-w-[506px] mx-auto text-[#D5DBE6] text-center text-[1rem] sm:text-sm md:text-base font-normal font-['Inter'] leading-[1.425rem] sm:leading-[22px] md:leading-[25.6px] tracking-[-0.015rem] sm:tracking-[-0.28px] md:tracking-[-0.32px] mb-[1rem] sm:mb-6 md:mb-8 sm:px-4"
            >
              Deploy intelligent AI agents that run sales, support, and operations 24/7. Focus on vision while your business grows itself.
            </p>
            {/* Button Container with Animated Border Glow */}
            <div className="relative inline-block mb-8 group">
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
                  background: "radial-gradient(50% 20.7% at 50% 100%, #FFE1C6 0%, rgba(255, 225, 198, 0.00) 100%)"
                }}
              >
                {/* Moving glow spot - commented out for now */}
                {/* 
                <div 
                  className="absolute w-[60px] h-[60px] opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm"
                  style={{
                    background: "radial-gradient(circle, #FFE1C6 0%, #f2c6a6 30%, transparent 70%)",
                    animation: "moveGlow 8s linear infinite"
                  }}
                />
                */}
                
                {/* Button (Top Layer) - 46px height */}
                <Link 
                  href="/intake" 
                  className="relative z-50 inline-flex items-center justify-center bg-gradient-to-b from-[#f2c6a6] to-[#bb835a] text-[#3a3a3a] px-8 rounded-lg text-base font-medium font-['Inter'] transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px]"
                >
                  <span>Get My Design Plan</span>
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
              
            {/* Hero Image Frame - responsive spacing below CTA button */}
            <div className="w-full relative mt-6 md:mt-[64px]">
              <Image
                src="/images/hero-image.png"
                alt="Hero dashboard interface"
                width={1600}
                height={900}
                className="w-full h-[400px] md:h-auto object-cover md:object-contain rounded-lg"
                priority
              />
            </div>




            {/* Development Login/Signup Buttons - Commented out for now */}
            
            {/* <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4">
              <Link 
                href="/auth/login"
                className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium font-['Inter'] transition-all duration-300 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto max-w-[160px]"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup"
                className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium font-['Inter'] transition-all duration-300 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto max-w-[160px]"
              >
                Sign Up
              </Link>
            </div> */}
           
          </div>
      </div>

      {/* Social Proof Text - Fixed positioning to maintain consistent distance from bottom */}
      <div className="absolute bottom-[190px] md:bottom-[210px] left-1/2 transform -translate-x-1/2 z-30 text-center w-full max-w-[1440px]">
        <p className="text-[#D5DBE6] text-sm md:text-base font-normal font-['Inter'] opacity-60">
          Loved by 100+ companies
        </p>
      </div>
    </section>
  );
};

export default Hero; 