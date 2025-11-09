"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
}

const testimonials: Testimonial[] = [

  {
    id: 1,
    name: "Zac Barron",
    role: "Founder",
    company: "Dexari",
    testimonial: "Avyra transformed our brand identity in 48 hours. What would have taken weeks with freelancers.",
    avatar: "/images/user-avatar-4.png"
  },
  {
    id: 2,
    name: "July Gratton",
    role: "Founder",
    company: "Netty Worth",
    testimonial: "As a design skeptic, I'm now convinced. Premium quality that rivals top agencies at startup speed.",
    avatar: "/images/user-avatar-2.png"
  },
  {
    id: 3,
    name: "Zahid Islam",
    role: "CEO & Founder",
    company: "Jutsu",
    testimonial: "A total design game-changer. Our website conversion doubled after Avyra's redesign.",
    avatar: "/images/user-avatar-3.png"
  },
  {
    id: 4,
    name: "Elliot Bream",
    role: "Founder",
    company: "Try Livepeer",
    testimonial: "From logo to landing page in one week. Avyra delivered world-class design without the agency drama.",
    avatar: "/images/user-avatar-1.png"
  }

];

export default function TrustedBy() {
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client logos animation
    const initClientLogos = () => {
      const clientsContainer = logosRef.current?.querySelector('.clients-container');
      if (!clientsContainer) {
        return;
      }

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

    return () => {
      // Cleanup on unmount
    };
  }, []);

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-8 px-4">
        <div className="flex flex-col gap-6 items-center justify-start w-full max-w-[467px]">
          {/* Section Tag */}
          <div className="flex justify-center">
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
                REVIEWS
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="bg-clip-text font-inter font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px] whitespace-nowrap"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Trusted by <span className="font-instrument-serif italic">Visionaries</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-inter font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          Hear from real users who achieved success with from our designs
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto px-4">
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[1200px] relative">
            <div className="flex gap-6 items-start">

              {/* Left Side - Founder Image Card (33% width) */}
              <div style={{ width: '33%' }}>
                <div className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-8 h-[420px] relative overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute h-[306px] opacity-10 right-0 top-0 w-full pointer-events-none"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 437 306\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(21.85 0 0 15.3 409.47 24.786)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                    }} />

                  {/* Founder Image */}
                  <div className="relative w-full h-[292px] rounded-[34px] overflow-hidden">
                    <Image
                      src="/images/val.png"
                      alt="Founder"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Founder Quote */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                      &quot;Avyra gives founders the design edge they deserve without the agency overhead.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Testimonial Cards (67% width) */}
              <div style={{ width: '67%' }}>
                <div className="grid grid-cols-2 gap-6 h-[420px]">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 flex flex-col relative overflow-hidden">
                      {/* Background Glow */}
                      <div className="absolute h-full opacity-10 right-0 top-0 w-full pointer-events-none"
                        style={{
                          backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 380 199\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(19 0 0 9.95 356.06 16.119)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                        }} />

                      {/* User Info */}
                      <div className="relative z-10 flex items-center gap-3 mb-4">
                        <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-[rgba(207,231,255,0.2)]">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                            {testimonial.name}
                          </div>
                          <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div className="relative z-10 flex-1">
                        <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                          &quot;{testimonial.testimonial}&quot;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-4">

          {/* Founder Card */}
          <div className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 relative overflow-hidden">
            {/* Founder Image */}
            <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-4">
              <Image
                src="/images/val.png"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>

            {/* Founder Quote */}
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
              &quot;We built Avyra to give founders the design edge they deserve without the agency overhead.&quot;
            </p>
          </div>

          {/* Mobile Testimonials - Show only 2 */}
          <div className="space-y-4">
            {testimonials.slice(0, 2).map((testimonial) => (
              <div key={testimonial.id} className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute h-full opacity-10 right-0 top-0 w-full pointer-events-none"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 380 199\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(19 0 0 9.95 356.06 16.119)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                  }} />

                {/* User Info */}
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-[rgba(207,231,255,0.2)]">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="relative z-10">
                  <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                    &quot;{testimonial.testimonial}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Logos Animation */}
      <div className="w-full flex justify-center relative mt-16">
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
    </section>
  );
}
