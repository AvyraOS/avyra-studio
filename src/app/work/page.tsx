'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/landing/navbar'
import Image from 'next/image'
import { TextScrollHighlight } from '@/components/TextScrollHighlight'
// Gallery removed
import Gallery from '@/components/gallery/Gallery'

export default function Work() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient scoped to hero only */}

      {/* Platform Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero-only gradient */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute -top-[200px] left-1/2 transform -translate-x-1/2 w-[380px] h-[380px] opacity-40 rounded-br-md blur-[132.70px]"
            style={{
              background: 'radial-gradient(circle, #89FFFF 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)'
            }}
          />
        </div>
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
            All-in-one <br /> <span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', background: 'linear-gradient(180deg, #89FFFF 0%, #00D7D7 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>premium</span> product <br /> services for founders
          </h1>
        </div>

        <p
          className="w-full max-w-[20rem] sm:max-w-[400px] md:max-w-[506px] mx-auto text-[#D5DBE6] text-center text-[1rem] sm:text-sm md:text-base font-normal font-inter leading-[1.425rem] sm:leading-[22px] md:leading-[25.6px] tracking-[-0.015rem] sm:tracking-[-0.28px] md:tracking-[-0.32px] mb-[1rem] sm:mb-6 md:mb-8 sm:px-4"
        >
          Get premium branding, websites, and product UI/UX ~ delivered in as little as 48 hours, without the headaches of hiring.
        </p>

        {/* Bottom Alignment Row - scoped to hero only */}
        <div className="absolute bottom-6 left-0 right-0 z-[39] pointer-events-none">
          <div className="w-full max-w-[1350px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
            <span className="pointer-events-auto text-[#868686] text-[12px] font-inter font-medium">Avyra.studio</span>
            <span className="pointer-events-auto text-[#868686] text-[12px] font-inter font-medium">2025</span>
          </div>
        </div>
      </motion.div>

      {/* About Section - same dimensions as hero */}
      <motion.section
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/avyra-brandmark.svg"
            alt="Avyra Logo"
            width={48}
            height={48}
            className="opacity-90"
          />
          <TextScrollHighlight
            className="text-[18px] sm:text-[22px] md:text-[28px] leading-[1.4] max-w-[880px]"
            fromColor="rgba(255,255,255,0.18)"
            toColor="#D5DBE6"
            text="At Avyra, we blend artistry with innovation to create digital experiences that resonate with users."
          />
        </div>
      </motion.section>

      {/* Gallery (Featured Project) */}
      <section className="relative z-10 w-screen">
        <Gallery />
      </section>


      {/* Custom Styles */}
      <style jsx global>{`
        html, body { overflow-x: hidden; }
        *:focus { outline: none !important; }
      `}</style>
    </div>
  )
}


