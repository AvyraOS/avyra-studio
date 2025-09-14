'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Agents() {
  const [selectedCategory, setSelectedCategory] = useState('Sales')
  
  const agentCategories = [
    'Sales',
    'Marketing', 
    'Admin',
    'Support',
    'Operations'
  ]

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center py-16 px-4 relative" data-name="Agents">
      
      {/* Background Image */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-auto z-0 opacity-60">
        <Image
          src="/images/first-agent-bg.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover object-bottom"
          priority={false}
        />
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
        className="flex flex-col gap-6 items-center justify-start w-full max-w-[640px] mb-8 md:mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-6 items-center justify-start">
          {/* AI WORKFORCE Pill - Updated to match toolkit style */}
          <motion.div 
            className="flex gap-2.5 items-center justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-1.5 md:space-x-2 bg-[#1a1b20] rounded-full px-3 md:px-4 py-1.5 md:py-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] rounded-full" />
              <span className="text-[#89FFFF] text-xs md:text-sm font-medium">AI WORKFORCE</span>
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.div 
            className="flex flex-col gap-3.5 items-center justify-start w-full max-w-[548px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h1 
              className="text-[32px] md:text-[44px] lg:text-[56px] font-medium leading-tight text-center whitespace-nowrap"
              style={{
                background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #111419 95.52%, #04070D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Inter"
              }}
            >
              Choose my First Agent
            </h1>
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <motion.div 
          className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d5dbe6] text-[14px] md:text-[16px] text-center tracking-[-0.32px] w-full max-w-[478px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="leading-[22px] md:leading-[25.6px]">Start your infinite AI-powered dream team. Each agent is built to buy back your time and scale what matters most.</p>
        </motion.div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div 
        className="bg-[#080808] rounded-full border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] flex gap-0.5 items-center justify-center overflow-hidden p-[4px] w-full max-w-[calc(100vw-48px)] md:w-auto md:max-w-none relative mb-8 md:mb-12 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Inner Glow Effect */}
        <div 
          className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 612px 260px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
          }}
        />
        
        {agentCategories.map((category) => (
          <div 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category 
                ? 'bg-gradient-to-b from-[#ffffff52] to-[#ffffff29] via-50% via-[#ffffff1a]'
                : 'bg-[#ffffff00] hover:bg-[#ffffff0a] cursor-pointer'
            } flex items-center justify-center overflow-clip px-3 md:px-6 py-2 md:py-3 relative rounded-[64px] shrink-0 transition-all duration-300 z-10 h-[38px] md:h-[42px] min-w-0`}
          >
            <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] md:text-[16px] text-nowrap text-white tracking-[-0.32px]">
              <p className="leading-[20px] md:leading-[28px] whitespace-nowrap">{category}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Agent Display Card */}
      <motion.div 
        className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] h-[280px] md:h-[332px] w-full max-w-4xl relative overflow-hidden mb-8 md:mb-12 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Inner Glow Effect */}
        <div 
          className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 612px 260px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
          }}
        />
        
        {/* Placeholder content for agent display */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-[#d5dbe6] text-lg font-medium mb-4">
              {selectedCategory} Agent
            </div>
            <div className="text-[#838385] text-sm">
              Agent content will be displayed here
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="flex flex-col gap-[30px] items-center justify-start w-full max-w-[550px] relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
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
              background: 'radial-gradient(50% 20.7% at 50% 100%, #C6FFFF 0%, rgba(198, 255, 255, 0.00) 100%)'
            }}
          >
            <Link 
              href="/demo"
              className="w-full h-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] rounded-[8px] flex items-center justify-center gap-1.5 px-8 py-3 relative z-10"
            >
              <span className="text-[#000000] text-[16px] font-semibold font-inter tracking-[-0.16px] leading-[20px]">
                Choose this Agent
              </span>
              <div className="w-[22px] h-[22px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4.58333 11H17.4167M17.4167 11L11.9167 5.5M17.4167 11L11.9167 16.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/agents" className="text-[#d5dbe6] text-[16px] font-normal font-['Inter'] tracking-[-0.32px] leading-[25.6px] text-center hover:text-[#f2c6a6] transition-colors duration-300">
          View Plans & Pricing
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