"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Navbar from '@/components/landing/navbar';

// TypeScript declarations for Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: Record<string, string>; utm?: Record<string, string>; }) => void;
      destroyBadgeWidget?: () => void;
    };
  }
}

const CalendarPage = () => {
  const [key, setKey] = useState(0);
  
  // Mount effect - initialize calendar widget
  useEffect(() => {
    // Force re-render by updating key when component mounts
    setKey(1);
  }, []);
  
  // Key change effect - initialize Calendly when ready
  useEffect(() => {
    if (key > 0) {
      // Wait for Calendly script to load and initialize
      const initializeCalendly = () => {
        const widget = document.querySelector('.calendly-inline-widget');
        if (window.Calendly && widget && !widget.querySelector('iframe')) {
          const dataUrl = widget.getAttribute('data-url');
          if (dataUrl) {
            widget.innerHTML = '';
            window.Calendly.initInlineWidget({
              url: dataUrl,
              parentElement: widget as HTMLElement,
              prefill: {},
              utm: {}
            });
          }
        }
      };
      
      // Try to initialize immediately
      initializeCalendly();
      
      // Also try after a short delay in case script is still loading
      const timer = setTimeout(initializeCalendly, 500);
      
      return () => clearTimeout(timer);
    }
  }, [key]);
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <Navbar />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="TopGradientBg absolute -top-[241px] left-1/2 transform -translate-x-1/2 w-[381.01px] h-[382px] opacity-40 rounded-br-md blur-[132.70px]" 
             style={{
               background: "radial-gradient(circle, #89FFFF 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)"
             }} />
      </div>

      {/* Hero Top Gradient */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Image
          src="/images/hero-top-gradient.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 pt-[100px] md:pt-[17vh] pb-16">
        <div className="container mx-auto px-4">
          
            {/* Top Pill */}
          <div className="text-center mb-6">
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
                DESIGN PARTNER FOR FOUNDERS
              </span>
            </div>
          </div>

          {/* Hero content */}
          <div className="text-center hero-main-content" style={{ opacity: 1 }}>
            {/* Hero Header */}
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
                className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-medium leading-[3rem] sm:leading-[4rem] md:leading-[5rem] lg:leading-[5.5rem] tracking-[-0.05rem] sm:tracking-[-0.07rem] md:tracking-[-0.09rem] lg:tracking-[-0.11rem] capitalize max-w-full"
              >
                Book Your Dream<br />
                Discovery Call
              </h1>
            </div>
            
            {/* Subheader */}
            <div className="max-w-[506px] mx-auto mb-8">
              <p 
                className="text-[#D5DBE6] text-center text-[1rem] sm:text-sm md:text-base font-normal font-['Inter'] leading-[1.425rem] sm:leading-[22px] md:leading-[25.6px] tracking-[-0.015rem] sm:tracking-[-0.28px] md:tracking-[-0.32px]"
              >
                Let Avyra handle all your design challenges so you can focus on what you do best ~ building your dream.
              </p>
            </div>

            {/* Calendly Embed */}
            <div className="w-full max-w-[1000px] mx-auto">
              <div 
                key={key}
                className="calendly-inline-widget"
                data-url="https://calendly.com/hello-avyra/dream-discovery-call?background_color=101010&text_color=ffffff&primary_color=89ffff"
                style={{ minWidth: '320px', height: '700px', width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional info section */}
      <section className="bg-[#080808] pb-8 md:pb-16">
        <div className="mx-auto px-4">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#D5DBE6] text-sm opacity-70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Web conferencing details provided upon confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Script */}
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive"
      />
    </div>
  );
};

export default CalendarPage;