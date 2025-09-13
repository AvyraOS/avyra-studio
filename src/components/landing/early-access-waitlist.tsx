"use client";

import { useState } from 'react';
import Image from 'next/image';

const EarlyAccessWaitlist = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual waitlist functionality
    console.log('Email submitted:', email);
  };

  return (
    <section className="bg-transparent py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden lg:block relative bg-[#080808] rounded-[32px] border border-[#171920] overflow-hidden h-[273px] max-w-[1000px] mx-auto">
          
          {/* Left Image Section */}
          <div className="absolute left-0 top-0 w-[132px] h-[273px] overflow-hidden">
            <div className="absolute left-0 top-[35px] w-[147px] h-[203px]">
              <Image
                src="/images/waitlist-left-image.PNG"
                alt=""
                width={147}
                height={203}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gradient overlay to blend with background */}
            <div className="absolute left-[108px] top-[50px] w-6 h-[162px] bg-gradient-to-l from-[#090909] to-transparent" />
          </div>

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-px w-[150px] h-48 bg-gradient-to-l from-transparent via-[rgba(8,8,8,0)] to-[#080808]" />

          {/* Tag */}
          <div className="absolute left-[120px] top-12 transform -translate-y-1/2">
            <p className="text-white/84 text-sm font-medium font-['Inter'] tracking-[2.5px] leading-[22px] uppercase">
              AVYRA OS
            </p>
          </div>

          {/* Headline */}
          <div className="absolute left-[120px] top-[125px] transform -translate-y-1/2 w-[465px]">
            <h2 className="text-white text-[32px] font-normal font-['Inter'] leading-[44.8px] tracking-[-0.96px]">
              Get early access to your<br />
              AI command center
            </h2>
          </div>

          {/* Social Proof Icons */}
          <div className="absolute left-[120px] top-[199px] flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <Image
                src="/icons/waitlist-people.svg"
                alt="People icon"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <p className="text-[#d5dbe6] text-base font-medium font-['Inter'] leading-[25.6px] tracking-[-0.32px] whitespace-nowrap">
              +1,500 on waitlist
            </p>
          </div>

          <div className="absolute left-[309px] top-[199px] flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <Image
                src="/icons/waitlist-timer.svg"
                alt="Timer icon"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <p className="text-[#d5dbe6] text-base font-medium font-['Inter'] leading-[25.6px] tracking-[-0.32px] whitespace-nowrap">
              80% Faster
            </p>
          </div>

          {/* Input and Button Container - Desktop */}
          <div className="absolute bottom-[37px] right-[30px] flex items-center gap-4 h-[46px]">
            
            {/* Email Input */}
            <div className="w-[280px] h-[46px]">
              <form onSubmit={handleEmailSubmit} className="relative w-full h-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full h-full bg-[#393939] rounded-[10px] px-[13px] text-white text-base font-normal font-['Inter'] leading-[25.6px] tracking-[-0.32px] placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#f2c6a6]/20"
                  required
                />
              </form>
            </div>

            {/* Join Waitlist Button */}
            <div className="relative inline-block group h-[46px]">
              <Image
                src="/images/button-glow.png"
                alt=""
                width={220}
                height={60}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[220px] h-[60px] object-contain opacity-30 transition-all duration-300 group-hover:opacity-60 group-hover:scale-110"
              />
              
              <div 
                className="relative z-10 p-[2px] rounded-lg overflow-hidden h-full"
                style={{
                  background: "radial-gradient(50% 20.7% at 50% 100%, #FFE1C6 0%, rgba(255, 225, 198, 0.00) 100%)"
                }}
              >
                <button 
                  type="submit"
                  onClick={handleEmailSubmit}
                  className="relative z-20 inline-flex items-center justify-center bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] text-[#3a3a3a] px-8 py-3 rounded-lg text-base font-semibold font-['Inter'] transition-all duration-300 hover:opacity-90 cursor-pointer h-full"
                >
                  <span className="tracking-[-0.16px] leading-[20px]">Join Waitlist</span>
                  <svg 
                    className="ml-1.5 w-[22px] h-[22px] transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Based on Figma Mobile Design - Fully Responsive */}
        <div className="lg:hidden relative bg-[#080808] rounded-2xl border border-[#171920] overflow-hidden min-h-[400px] sm:h-[454px] max-w-[361px] mx-auto">
          
          {/* Right Image Section - Mobile - On the edge */}
          <div className="absolute right-0 top-0 w-[120px] sm:w-[145px] h-full flex items-center justify-end">
            <div className="relative w-[120px] sm:w-[145px] h-full overflow-hidden">
              <Image
                src="/images/mobile-waitlist-right-image.png"
                alt=""
                width={235}
                height={324}
                className="absolute right-0 top-[40px] sm:top-[56px] w-[180px] sm:w-[235px] h-[250px] sm:h-[324px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute right-[20px] sm:right-[38px] top-[60px] sm:top-[80px] w-[30px] sm:w-[38px] h-[200px] sm:h-[259px] bg-gradient-to-r from-[#090909] to-transparent" />
            </div>
          </div>

          {/* Tag - Mobile - Responsive */}
          <div className="absolute left-4 sm:left-6 top-6 sm:top-8">
            <p className="text-white/84 text-xs sm:text-sm font-medium font-['Inter'] tracking-[2px] sm:tracking-[2.5px] leading-[20px] sm:leading-[22px] uppercase">
              AVYRA OS
            </p>
          </div>

          {/* Headline - Mobile - Can overlap image, just stay within component padding */}
          <div className="absolute left-4 sm:left-6 top-[80px] sm:top-[100px] right-4 sm:right-6">
            <h2 className="text-white text-[24px] sm:text-[28px] md:text-[32px] font-normal font-['Inter'] leading-[32px] sm:leading-[36px] md:leading-[44.8px] tracking-[-0.7px] sm:tracking-[-0.8px] md:tracking-[-0.96px]">
              Get early access to your AI command center
            </h2>
          </div>

          {/* Social Proof Icons - Mobile - Responsive spacing */}
          <div className="absolute left-4 sm:left-[23px] top-[200px] sm:top-[230px] md:top-[253px] flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                <Image
                  src="/icons/waitlist-people.svg"
                  alt="People icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <p className="text-[#d5dbe6] text-sm sm:text-base font-medium font-['Inter'] leading-[22px] sm:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.32px] whitespace-nowrap">
                +1,500 on waitlist
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                <Image
                  src="/icons/waitlist-timer.svg"
                  alt="Timer icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <p className="text-[#d5dbe6] text-sm sm:text-base font-medium font-['Inter'] leading-[22px] sm:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.32px] whitespace-nowrap">
                80% Faster
              </p>
            </div>
          </div>

          {/* Email Input - Mobile - Responsive width and positioning */}
          <div className="absolute bottom-[80px] sm:bottom-[90px] left-3 sm:left-4 right-3 sm:right-4 h-[46px]">
            <form onSubmit={handleEmailSubmit} className="relative w-full h-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full h-full bg-[#393939] rounded-[10px] px-[13px] text-white text-sm sm:text-base font-normal font-['Inter'] leading-[22px] sm:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.32px] placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#f2c6a6]/20"
                required
              />
            </form>
          </div>

          {/* Join Waitlist Button - Mobile - Responsive full width with proper spacing */}
          <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-4">
            <div className="relative inline-block group w-full">
              <Image
                src="/images/button-glow.png"
                alt=""
                width={337}
                height={60}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full max-w-[337px] h-[60px] object-contain opacity-30 transition-all duration-300 group-hover:opacity-60 group-hover:scale-110"
              />
              
              <div 
                className="relative z-10 p-[2px] rounded-lg overflow-hidden w-full"
                style={{
                  background: "radial-gradient(50% 20.7% at 50% 100%, #FFE1C6 0%, rgba(255, 225, 198, 0.00) 100%)"
                }}
              >
                <button 
                  type="submit"
                  onClick={handleEmailSubmit}
                  className="relative z-20 inline-flex items-center justify-center bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] text-[#3a3a3a] px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold font-['Inter'] transition-all duration-300 hover:opacity-90 cursor-pointer w-full"
                >
                  <span className="tracking-[-0.14px] sm:tracking-[-0.16px] leading-[18px] sm:leading-[20px]">Join Waitlist</span>
                  <svg 
                    className="ml-1.5 w-5 h-5 sm:w-[22px] sm:h-[22px] transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessWaitlist;
