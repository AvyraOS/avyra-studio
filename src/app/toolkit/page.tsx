'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Toolkit() {
  const toolkitItems = [
    {
      icon: "/icons/aiworkflow-icon.svg",
      title: "5 Proven AI Workflows",
      description: "Done-for-you AI workflows you can implement today."
    },
    {
      icon: "/icons/orgchart-icon.svg", 
      title: "AI Org Chart Template",
      description: "Design your first AI-powered workforce (plug-and-play)."
    },
    {
      icon: "/icons/weeklyframework-icon.svg",
      title: "Weekly Founder Frameworks", 
      description: "Freedom frameworks delivered to your inbox every week."
    },
    {
      icon: "/icons/community-icon.svg",
      title: "Founder's Circle Community",
      description: "Access our free private network of AI-first entrepreneurs."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/images/toolkit-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />
      
      {/* Exit Button */}
      <Link href="/" className="absolute top-[4%] right-[4%] bg-transparent border border-[#242424] rounded-full p-1.5 md:p-3 text-white text-xs md:text-lg cursor-pointer z-[2000] hover:bg-white/5 transition-colors">
        <span className="flex items-center justify-center">
          <svg 
            width="14" 
            height="14" 
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </Link>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center min-h-screen py-16 px-4 md:px-8">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-6 md:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Limited Time Badge */}
          <div className="inline-flex items-center space-x-1.5 md:space-x-2 bg-[#1a1b20] rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-b from-[#f2c6a6] to-[#bb835a] rounded-full" />
            <span className="text-[#f2c6a6] text-xs md:text-sm font-medium">LIMITED TIME OFFER</span>
          </div>
          
          {/* Main Title */}
          <h1 
            className="text-[32px] md:text-[44px] lg:text-[56px] font-medium mb-6 leading-tight"
            style={{
              background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #111419 95.52%, #04070D 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              fontFamily: "Inter"
            }}
          >
            <span className="block md:inline">Founder</span>
            <span className="block md:inline"> </span>
            <span className="block md:inline">Freedom Toolkit</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-[#d5dbe6] text-[14px] md:text-[16px] font-normal tracking-[-0.32px] leading-[1.6] max-w-2xl mx-auto">
            Start building your AI-powered business today with the exact tools 1,000+ founders use to reclaim time and scale faster.
          </p>
        </motion.div>

        {/* Dotted Lines - Desktop Only */}
        <motion.div 
          className="hidden lg:block absolute w-full max-w-7xl mx-auto opacity-30" 
          style={{ top: '430px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Main vertical line from bottom of badge */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-[3px] h-[50px]" 
            style={{
              background: `repeating-linear-gradient(to bottom, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`
            }}
          ></div>
          
          {/* Responsive horizontal line that stops at the outer vertical lines */}
          <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 md:px-8">
            <div className="relative w-full max-w-7xl mx-auto">
              <div 
                className="h-[3px] absolute"
                style={{
                  left: 'calc(12.5% - 1.5px)',
                  width: 'calc(87.5% - 12.5% + 3px)',
                  background: `repeating-linear-gradient(to right, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`
                }}
              ></div>
            </div>
          </div>
          
          {/* Vertical lines positioned relative to the responsive card grid */}
          <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 md:px-8">
            <div className="relative w-full max-w-7xl mx-auto">
              {/* Line to card 1 center */}
              <div 
                className="absolute w-[3px] h-16" 
                style={{
                  left: 'calc(12.5% - 1.5px)',
                  background: `repeating-linear-gradient(to bottom, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px'
                }}
              ></div>
              {/* Line to card 2 center */}
              <div 
                className="absolute w-[3px] h-16" 
                style={{
                  left: 'calc(37.5% - 1.5px)',
                  background: `repeating-linear-gradient(to bottom, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`
                }}
              ></div>
              {/* Line to card 3 center */}
              <div 
                className="absolute w-[3px] h-16" 
                style={{
                  left: 'calc(62.5% - 1.5px)',
                  background: `repeating-linear-gradient(to bottom, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`
                }}
              ></div>
              {/* Line to card 4 center */}
              <div 
                className="absolute w-[3px] h-16" 
                style={{
                  left: 'calc(87.5% - 1.5px)',
                  background: `repeating-linear-gradient(to bottom, rgba(84, 82, 82, 0.7) 0, rgba(84, 82, 82, 0.7) 3px, transparent 3px, transparent 7.8px)`,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px'
                }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* "What's inside" Badge */}
        <motion.div 
          className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] px-6 py-3.5 mb-6 lg:mb-[100px] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Inner Glow Effect */}
          <div 
            className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 612px 260px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
            }}
          />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-[21px] h-[21px] relative">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <circle cx="10.5" cy="10.5" r="10" stroke="white" strokeWidth="1" opacity="0.6"/>
                <circle cx="10.5" cy="10.5" r="3" fill="white" opacity="0.8"/>
              </svg>
            </div>
            <span className="text-[#d5dbe6] text-[16px] font-normal tracking-[-0.32px] font-['Inter']">
              What&apos;s inside your FREE toolkit
            </span>
          </div>
        </motion.div>

        {/* Toolkit Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-16 max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {toolkitItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-4 md:p-6 md:min-h-[241px] flex flex-col relative overflow-hidden hover:border-[rgba(216,231,242,0.15)] transition-all duration-300"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              {/* Inner Glow Effect */}
              <div 
                className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(ellipse 612px 260px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
                }}
              />
              {/* Content Container with Icon - Positioned at bottom padding */}
              <div className="relative z-10 flex flex-row md:flex-col h-full gap-4 md:gap-0">
                {/* Spacer to push content to bottom */}
                <div className="hidden md:block flex-1"></div>
                
                {/* Content wrapper */}
                <div className="flex flex-row md:flex-col gap-4 md:gap-0">
                  {/* Icon */}
                  <div className="flex-shrink-0 md:mb-5">
                    <div className="w-9 h-9">
                      <Image 
                        src={item.icon}
                        alt={item.title}
                        width={36}
                        height={36}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-white text-[14px] md:text-[16px] font-medium font-['Inter'] tracking-[-0.32px] leading-[1.4] md:leading-[28px]">
                      {item.title}
                    </h3>
                    <p className="text-[#838385] text-[13px] md:text-[16px] font-normal font-['Inter'] leading-[1.4] md:leading-[1.6]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="flex flex-col items-center gap-[30px] max-w-[550px] mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {/* Main CTA Button */}
          <div className="relative group w-full md:w-auto">
            {/* Button Glow Background - grows on hover */}
            <Image
              src="/images/button-glow.png"
              alt=""
              width={314}
              height={120}
              className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[314px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
            />
            
            <div 
              className="p-[2px] rounded-lg w-full md:w-[524px] mx-auto h-[50px] flex items-center justify-center overflow-hidden relative z-10"
              style={{
                background: 'radial-gradient(50% 20.7% at 50% 100%, #FFE1C6 0%, rgba(255, 225, 198, 0.00) 100%)'
              }}
            >
              <Link 
                href="/auth/signup"
                className="w-full h-full bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] rounded-[8px] flex items-center justify-center gap-1.5 px-8 py-3 relative z-10"
              >
                <span className="text-[#3a3a3a] text-[16px] font-semibold font-['Inter'] tracking-[-0.16px] leading-[20px]">
                  Access Founders Freedom Kit
                </span>
                <div className="w-[22px] h-[22px]">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4.58333 11H17.4167M17.4167 11L11.9167 5.5M17.4167 11L11.9167 16.5" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Secondary Link */}
          <Link 
            href="/auth/signup"
            className="text-[#d5dbe6] text-[16px] font-normal font-['Inter'] tracking-[-0.32px] leading-[25.6px] text-center hover:text-[#f2c6a6] transition-colors duration-300"
          >
            Join Founder Circle Community
          </Link>
        </motion.div>

      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Make sure body and html don't scroll horizontally */
        html, body {
          overflow-x: hidden;
        }
        
        /* Remove focus outline */
        *:focus {
          outline: none !important;
        }
        
        /* Responsive adjustments */
        @media screen and (max-width: 768px) {
          .grid-cols-4 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
        
        @media screen and (min-width: 769px) and (max-width: 1024px) {
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  )
} 