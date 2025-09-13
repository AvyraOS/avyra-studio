'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function TransformationPlan() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/transformation-bg.png"
          alt="Transformation background"
          fill
          className="object-cover"
          priority={true}
          quality={100}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
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

      {/* Header Content */}
      <motion.div 
        className="absolute flex flex-col gap-4 md:gap-6 items-center justify-start left-1/2 top-[110px] md:top-[180px] w-full max-w-[320px] md:max-w-[800px] -translate-x-1/2 px-0 md:px-0 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-6 items-center justify-start relative">
          <motion.div 
            className="flex flex-col gap-3.5 items-center justify-start relative w-full max-w-[548px] md:max-w-[750px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h1 
              className="text-[32px] md:text-[44px] lg:text-[56px] font-medium leading-tight text-center"
              style={{
                background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #111419 95.52%, #04070D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Inter"
              }}
            >
              <span className="md:hidden">Your AI<br />Transformation Plan</span>
              <span className="hidden md:inline">Your AI Transformation Plan</span>
            </h1>
          </motion.div>
        </div>
        <motion.div 
          className="flex flex-col font-['Inter'] font-normal justify-center text-[#d5dbe6] text-[14px] md:text-[16px] text-center tracking-[-0.32px] w-full max-w-[422px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="leading-[22px] md:leading-[25.6px]">A custom roadmap to build your infinite workforce and achieve 3.7x ROI in 6 months or less.</p>
        </motion.div>
      </motion.div>

      {/* Plan Items Container with Integrated Bullet Points - Based on Figma */}
      <motion.div 
        className="absolute top-[268px] md:top-[348px] left-0 right-0 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="flex items-start mx-auto w-fit px-4 md:px-0">
          {/* Bullet Points - SVG for desktop only */}
          <div className="hidden md:block relative h-[412px] w-3 mr-6 mt-[15px] z-0">
            <Image
              src="/icons/bullet-points.svg"
              alt="Bullet points"
              width={12}
              height={412}
              className="w-3 h-[412px] object-contain"
              priority={false}
            />
          </div>

           {/* Plan Items - Exact Figma Implementation */}
           <div className="flex flex-col gap-8 md:gap-[38px] z-10 relative">
          
          {/* YOUR PLAN INCLUDES pill */}
          <div className="bg-[#1b1c20] box-border flex gap-[3px] h-[36px] md:h-[42px] items-center justify-start overflow-hidden px-4 md:px-6 py-2 md:py-3.5 rounded-[24.15px] shrink-0 w-fit">
            <div className="bg-clip-text bg-gradient-to-b font-['Inter'] font-medium from-[#f2c6a6] leading-[0] text-[14px] md:text-[16px] text-nowrap to-[#bc845b] tracking-[-0.14px]" style={{ WebkitTextFillColor: "transparent" }}>
              <p className="leading-[22px] whitespace-pre">YOUR PLAN INCLUDES:</p>
            </div>
          </div>

          {/* AI PERSONALIZED AI STRATEGY AND ROADMAP */}
          <div className="bg-gradient-to-b box-border flex from-[#ffffff1f] gap-2 md:gap-3 h-[36px] md:h-[42px] items-center justify-start px-3 pr-4 md:pr-5 py-2 relative rounded-[48px] shrink-0 to-[#ffffff12] via-50% via-[#ffffff0a] w-fit">
            <div className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[48px]" />
            <div className="relative shrink-0 w-4 h-4 md:w-5 md:h-5">
              <Image 
                src="/icons/strategy-icon.svg" 
                alt="Strategy icon"
                width={16}
                height={16}
                className="w-full h-full md:w-5 md:h-5"
              />
            </div>
            <div className="flex flex-col font-['Inter'] font-medium justify-center leading-[0] text-[#d5dbe6] text-[12px] md:text-[15px] text-nowrap tracking-[0.65px] uppercase">
              <p className="leading-[16.9px] whitespace-pre">PLUG-AND-PLAY AI STRATEGY AND ROADMAP</p>
            </div>
          </div>

          {/* AI WORKFORCE ORG CHART TEMPLATE */}
          <div className="bg-gradient-to-b box-border flex from-[#ffffff1f] gap-2 md:gap-3 h-[36px] md:h-[42px] items-center justify-start px-3 pr-4 md:pr-5 py-2 md:py-[7px] relative rounded-[48px] shrink-0 to-[#ffffff12] via-50% via-[#ffffff0a] w-fit">
            <div className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[48px]" />
            <div className="relative shrink-0 w-4 h-4 md:w-5 md:h-5">
              <Image 
                src="/icons/chart-icon.svg" 
                alt="Chart icon"
                width={16}
                height={16}
                className="w-full h-full md:w-5 md:h-5"
              />
            </div>
            <div className="flex flex-col font-['Inter'] font-medium justify-center leading-[0] text-[#d5dbe6] text-[12px] md:text-[15px] text-nowrap tracking-[0.65px] uppercase">
              <p className="leading-[16.9px] whitespace-pre">AI WORKFORCE ORG CHART TEMPLATE</p>
            </div>
          </div>

          {/* STEP-BY-STEP IMPLEMENTATION PLAN */}
          <div className="bg-gradient-to-b box-border flex from-[#ffffff1f] gap-2 md:gap-3 h-[36px] md:h-[42px] items-center justify-start px-3 pr-4 md:pr-5 py-2 md:py-[7px] relative rounded-[48px] shrink-0 to-[#ffffff12] via-50% via-[#ffffff0a] w-fit">
            <div className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[48px]" />
            <div className="relative shrink-0 w-4 h-4 md:w-5 md:h-5">
              <Image 
                src="/icons/implementation-icon.svg" 
                alt="Implementation icon"
                width={16}
                height={16}
                className="w-full h-full md:w-5 md:h-5"
              />
            </div>
            <div className="flex flex-col font-['Inter'] font-medium justify-center leading-[0] text-[#d5dbe6] text-[12px] md:text-[15px] text-nowrap tracking-[0.65px] uppercase">
              <p className="leading-[16.9px] whitespace-pre">STEP-BY-STEP IMPLEMENTATION PLAN</p>
            </div>
          </div>

          {/* ROI PROJECTIONS AND SUCCESS METRICS */}
          <div className="bg-gradient-to-b box-border flex from-[#ffffff1f] gap-2 md:gap-3 h-[36px] md:h-[42px] items-center justify-start px-3 pr-4 md:pr-5 py-2 md:py-[7px] relative rounded-[48px] shrink-0 to-[#ffffff12] via-50% via-[#ffffff0a] w-fit">
            <div className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[48px]" />
            <div className="relative shrink-0 w-4 h-4 md:w-5 md:h-5">
              <Image 
                src="/icons/roadmap-icon.svg" 
                alt="Roadmap icon"
                width={16}
                height={16}
                className="w-full h-full md:w-5 md:h-5"
              />
            </div>
            <div className="flex flex-col font-['Inter'] font-medium justify-center leading-[0] text-[#d5dbe6] text-[12px] md:text-[15px] text-nowrap tracking-[0.65px] uppercase">
              <p className="leading-[16.9px] whitespace-pre">ROI PROJECTIONS AND SUCCESS METRICS</p>
            </div>
          </div>

          {/* 30-DAY LAUNCH CHECKLIST */}
          <div className="bg-gradient-to-b box-border flex from-[#ffffff1f] gap-2 md:gap-3 h-[36px] md:h-[42px] items-center justify-start pl-3 pr-4 md:pr-5 py-2 md:py-2.5 relative rounded-[48px] shrink-0 to-[#ffffff12] via-50% via-[#ffffff0a] w-fit">
            <div className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[48px]" />
            <div className="relative shrink-0 w-4 h-4 md:w-5 md:h-5">
              <Image 
                src="/icons/checklist-icon.svg" 
                alt="Checklist icon"
                width={16}
                height={16}
                className="w-full h-full md:w-5 md:h-5"
              />
            </div>
            <div className="flex flex-col font-['Inter'] font-medium justify-center leading-[0] text-[12px] md:text-[15px] text-nowrap text-[#d5dbe6] tracking-[0.65px] uppercase">
              <p className="leading-[16.9px] whitespace-pre">30-DAY LAUNCH CHECKLIST</p>
            </div>
          </div>
        </div>
      </div>
      </motion.div>

      {/* CTA Section - Centered on page, 48px below the plan list */}
      <motion.div 
        className="absolute bottom-[6%] md:top-[838px] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-6 md:gap-[30px] z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Main CTA Button */}
        <div className="relative group w-auto">
          {/* Button Glow Background - grows on hover */}
          <Image
            src="/images/button-glow.png"
            alt=""
            width={314}
            height={120}
            className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[314px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          />
          
          <div 
            className="p-[2px] rounded-lg w-[calc(100vw-32px)] md:w-[550px] h-[50px] flex items-center justify-center overflow-hidden relative z-10"
            style={{
              background: 'radial-gradient(50% 20.7% at 50% 100%, #FFE1C6 0%, rgba(255, 225, 198, 0.00) 100%)'
            }}
          >
            <Link 
              href="/demo"
              className="w-full h-full bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] rounded-[8px] flex items-center justify-center gap-1.5 px-4 md:px-8 py-3 relative z-10"
            >
              <span className="text-[#3a3a3a] text-[16px] font-semibold font-['Inter'] tracking-[-0.16px] leading-[20px]">
                Get my Freedom Blueprint
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
          href="/demo"
          className="text-[#d5dbe6] text-[16px] font-normal font-['Inter'] tracking-[-0.32px] leading-[25.6px] text-center hover:text-[#f2c6a6] transition-colors duration-300"
        >
          Book a Call to Review
        </Link>
      </motion.div>

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
      `}</style>
    </div>
  )
} 