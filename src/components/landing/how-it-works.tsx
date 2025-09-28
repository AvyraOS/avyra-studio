"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkStep {
  id: number;
  title: string;
  icon: string;
  isClickable: boolean;
}

interface StepContent {
  id: number;
  title: string;
  description: string;
}

const workSteps: WorkStep[] = [
  {
    id: 1,
    title: "Subscribe to a Perfect Plan",
    icon: "/icons/works-1-icon.svg",
    isClickable: true
  },
  {
    id: 2,
    title: "Request Unlimited Designs",
    icon: "/icons/works-2-icon.svg",
    isClickable: true
  },
  {
    id: 3,
    title: "Receive Deliverables Fast",
    icon: "/icons/works-3-icon.svg",
    isClickable: true
  }
];

const stepContent: StepContent[] = [
  {
    id: 1,
    title: "Subscribe",
    description: "Get started with the plan that fits you best. No contracts. Cancel anytime."
  },
  {
    id: 2,
    title: "Request",
    description: "Submit unlimited design requests. From apps to decks, websites to brands."
  },
  {
    id: 3,
    title: "Receive",
    description: "Get polished designs delivered back in as little as 48 hours."
  }
];

export default function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  // Step to image mapping
  const stepImages = {
    1: "/images/subscribe-screen-image.svg",
    2: "/images/request-screen-image.svg",
    3: "/images/receive-screen-image.svg"
  };

  // Get current step content
  const getCurrentStepContent = () => {
    return stepContent.find(content => content.id === selectedStep) || stepContent[0];
  };

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28">
      {/* Section Header - Responsive */}
      <div className="flex flex-col items-center justify-center mb-8 px-4">
        <div className="flex flex-col gap-3.5 items-center justify-start w-full max-w-[459px]">
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
                HOW IT WORKS
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="bg-clip-text font-inter font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px] whitespace-nowrap"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 459 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(45.441 0 0 4.558 229.5 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Done-for-you <span className="font-instrument-serif italic">Design</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-inter font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          Your creative engine in three effortless steps.
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto px-4">
        <div className="relative w-full flex justify-center">

          {/* Large Screen - Single Card with Border Glow */}
          <div className="w-full max-w-[1200px] relative">
            <div className="relative inline-block">

              {/* Bottom Glow Effect - CSS Gradient */}
              <div
                className="absolute bottom-0 left-1/2 w-[55%] h-[400px] opacity-75 z-0 rounded-lg blur-[56px]"
                style={{
                  transform: 'translateX(-50%) translateY(33.33%) scaleY(0.6)',
                  background: 'radial-gradient(ellipse 70% 100% at 50% 10%, #ffffff 0%, #ffffff 20%, transparent 100%)'
                }}
              />

              {/* Border Glow Background */}
              <Image
                src="/images/how-it-works-border.png"
                alt=""
                width={1208}
                height={502}
                className="absolute top-0 left-0 w-full h-[500px] z-5"
                priority
              />

              {/* Main Card - Same positioning as integrations main image */}
              <div className="relative w-full h-auto bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-12 z-10">
                <div className="flex gap-8 items-center min-h-[400px]">

                  {/* Left Side - Dynamic Content (55% width) */}
                  <div className="flex items-center justify-center h-full" style={{ width: '55%' }}>
                    <div className="w-full h-[400px] flex items-center justify-center bg-transparent rounded-lg overflow-hidden">
                      <Image
                        src={stepImages[selectedStep as keyof typeof stepImages] || stepImages[1]}
                        alt={`Step ${selectedStep} screen`}
                        width={638}
                        height={426}
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Right Side - Selection Buttons (45% width) */}
                  <div className="space-y-8 flex-1 pl-10 pr-10" style={{ width: '45%' }}>
                    <div>
                      <h3 className="font-inter font-medium text-[#ffffff] text-[20px] leading-[24px] tracking-[-0.2px] mb-4">
                        {getCurrentStepContent().title}
                      </h3>
                      <p className="font-inter font-normal text-[16px] leading-[25.6px] tracking-[-0.32px] text-[rgba(213,219,230,0.6)]">
                        {getCurrentStepContent().description}
                      </p>
                    </div>

                    {/* Step Buttons */}
                    <div className="space-y-3">
                      {workSteps.map((step) => {
                        const isSelected = selectedStep === step.id;

                        return (
                          <button
                            key={step.id}
                            onClick={() => setSelectedStep(step.id)}
                            className={`w-full flex gap-2.5 h-9 items-center justify-start overflow-hidden px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${isSelected
                                ? 'bg-[#1f1f1f]'
                                : 'bg-transparent hover:bg-[#1f1f1f]/50'
                              }`}
                          >
                            {/* Icon */}
                            <div className="relative shrink-0 w-6 h-6">
                              <Image
                                src={step.icon}
                                alt={step.title}
                                width={24}
                                height={24}
                                className="w-full h-full"
                              />
                            </div>
                            {/* Text */}
                            <div className="flex flex-col font-inter font-medium justify-center text-[#ffffff] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                              {step.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                      <div className="relative inline-block group w-full">
                        {/* Button Background Container with Glow */}
                        <div 
                          className="relative z-10 p-[2px] rounded-lg h-[42px] overflow-hidden w-full"
                          style={{
                            background: "radial-gradient(50% 20.7% at 50% 100%, #ffffff 0%, rgba(255, 225, 198, 0.00) 100%)"
                          }}
                        >
                          {/* Button (Top Layer) */}
                          <Link 
                            href="/calendar"
                            className="relative z-50 inline-flex items-center justify-center bg-[#f8f9fa] text-[#000000] px-4 rounded-lg text-[14px] font-medium font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[38px] w-full"
                          >
                            <span>Let&apos;s Get Started</span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4">
        <div className="max-w-md mx-auto bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] p-6 space-y-6">
          {/* 1. Information */}
          <div className="text-center space-y-4">
            <h3 className="font-inter font-medium text-[#ffffff] text-xl leading-6 tracking-[-0.2px]">
              {getCurrentStepContent().title}
            </h3>
            <p className="font-inter font-normal text-sm leading-[22.4px] tracking-[-0.28px] text-[rgba(213,219,230,0.6)]">
              {getCurrentStepContent().description}
            </p>
          </div>

          {/* 2. Selection Buttons */}
          <div className="space-y-3">
            {workSteps.map((step) => {
              const isSelected = selectedStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full flex gap-2.5 h-9 items-center justify-start overflow-hidden px-4 py-2.5 rounded-lg transition-all duration-200 ${isSelected
                        ? 'bg-[#1f1f1f]'
                        : 'bg-transparent hover:bg-[#1f1f1f]/50'
                    }`}
                >
                  {/* Icon */}
                  <div className="relative shrink-0 w-6 h-6">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={24}
                      height={24}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col font-inter font-medium justify-center text-[#ffffff] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. Dynamic Assets Area */}
          <div className="w-full h-[280px] flex items-center justify-center">
            <Image
              src={stepImages[selectedStep as keyof typeof stepImages] || stepImages[1]}
              alt={`Step ${selectedStep} screen`}
              width={638}
              height={426}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>

          {/* 4. Let's Get Started Button */}
          <div>
            <div className="relative inline-block group w-full">
              {/* Button Background Container with Glow */}
              <div 
                className="relative z-10 p-[2px] rounded-lg h-[50px] overflow-hidden w-full"
                style={{
                  background: "radial-gradient(50% 20.7% at 50% 100%, #ffffff 0%, rgba(255, 225, 198, 0.00) 100%)"
                }}
              >
                {/* Button (Top Layer) */}
                <Link 
                  href="/calendar"
                  className="relative z-50 inline-flex items-center justify-center bg-[#f8f9fa] text-[#000000] px-4 rounded-lg text-base font-medium font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px] w-full"
                >
                  <span>Let&apos;s Get Started</span>
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
          </div>


        </div>
      </div>
    </section>
  );
}