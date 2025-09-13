"use client";

import { useState } from 'react';
import Image from 'next/image';

interface WorkStep {
  id: number;
  title: string;
  icon: string;
  isClickable: boolean;
}

const workSteps: WorkStep[] = [
  {
    id: 1,
    title: "Choose Your Agents",
    icon: "/icons/works-1-icon.svg",
    isClickable: true
  },
  {
    id: 2,
    title: "We Set Everything Up", 
    icon: "/icons/works-2-icon.svg",
    isClickable: true
  },
  {
    id: 3,
    title: "Scale On Autopilot",
    icon: "/icons/works-3-icon.svg",
    isClickable: true
  },
  {
    id: 4,
    title: "Start for Free",
    icon: "/icons/right-arrow.svg",
    isClickable: false
  }
];

export default function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  // Step to image mapping
  const stepImages = {
    1: "/images/agents-screen-image.svg",
    2: "/images/set-screen-image.svg", 
    3: "/images/scale-screen-image.svg"
  };

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28">
      {/* Section Header - Responsive */}
      <div className="flex flex-col items-center justify-center mb-8 px-4">
        <div className="flex flex-col gap-3.5 items-center justify-start w-full max-w-[459px]">
          {/* Top Pill */}
          <div className="flex gap-2.5 items-center justify-start w-[148px]">
            <div className="bg-[#1b1c20] h-[31px] overflow-hidden rounded-[24.15px] w-[148px] relative">
              <div className="absolute left-[8.6px] overflow-hidden w-[18.4px] h-[18.4px] top-[6.6px]">
                <div className="absolute bg-gradient-to-b bottom-[31.25%] from-[#f2c6a6] left-1/2 rounded-[6.9px] to-[#bc845b] top-[31.25%] translate-x-[-50%] w-[6.9px] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
              </div>
              <div className="absolute bg-clip-text bg-gradient-to-b font-['Inter'] font-medium from-[#f2c6a6] left-[27.6px] text-[14px] text-nowrap to-[#bc845b] top-[4.6px] tracking-[-0.14px] text-transparent leading-[22px]">
                HOW IT WORKS
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h2 className="bg-clip-text font-['Inter'] font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px] whitespace-nowrap"
               style={{
                 backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 459 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(45.441 0 0 4.558 229.5 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
               }}>
            Done-for-you <span className="font-['Instrument_Serif'] italic">AI Systems</span>
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="flex flex-col font-['Inter'] font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          We build and manage intelligent workflows that work while you sleep.
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
                  background: 'radial-gradient(ellipse 70% 100% at 50% 20%, #FFE1C6 0%, rgba(255, 225, 198, 0.4) 50%, transparent 100%)'
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
                      <h3 className="font-['Inter'] font-medium text-[#ffffff] text-[20px] leading-[24px] tracking-[-0.2px] mb-4">
                        Pick Your AI Co-Pilots
                      </h3>
                      <p className="font-['Inter'] font-normal text-[16px] leading-[25.6px] tracking-[-0.32px] text-[rgba(213,219,230,0.6)]">
                        Pick AI agents that handle what drains you most - lead gen, content, support, finances, and more.
                      </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="space-y-3">
                      {workSteps.map((step) => {
                        const isSelected = selectedStep === step.id && step.isClickable;
                        const isClickable = step.isClickable;
                        
                        return (
                          <div key={step.id} className={!isClickable ? 'pt-8' : ''}>
                            <button
                            onClick={() => isClickable && setSelectedStep(step.id)}
                            disabled={!isClickable}
                            className={`w-full flex gap-2.5 ${!isClickable ? 'h-[42px]' : 'h-9'} items-center ${!isClickable ? 'justify-center' : 'justify-start'} overflow-hidden px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                              !isClickable 
                                ? 'bg-gradient-to-b from-[#f2c6a6] to-[#bc845b]'
                                : isSelected
                                ? 'bg-[#1f1f1f]'
                                : 'bg-transparent hover:bg-[#1f1f1f]/50'
                            }`}
                          >
                            {/* Content - conditional layout for CTA vs regular buttons */}
                            {!isClickable ? (
                              // CTA Button Layout - Centered with text and arrow
                              <>
                                {/* Text */}
                                <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#000000] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                                  {step.title}
                                </div>
                                {/* Single Arrow */}
                                <div className="relative shrink-0 w-[22px] h-[22px]">
                                  <Image
                                    src="/icons/right-arrow.svg"
                                    alt=""
                                    width={22}
                                    height={22}
                                    className="w-full h-full"
                                  />
                                </div>
                              </>
                            ) : (
                              // Regular Button Layout - Left aligned with icon and text
                              <>
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
                                <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#ffffff] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                                  {step.title}
                                </div>
                              </>
                            )}
                          </button>
                          </div>
                        );
                      })}
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
            <h3 className="font-['Inter'] font-medium text-[#ffffff] text-xl leading-6 tracking-[-0.2px]">
              Pick Your AI Co-Pilots
            </h3>
            <p className="font-['Inter'] font-normal text-sm leading-[22.4px] tracking-[-0.28px] text-[rgba(213,219,230,0.6)]">
              Pick AI agents that handle what drains you most - lead gen, content, support, finances, and more.
            </p>
          </div>

          {/* 2. Selection Buttons */}
          <div className="space-y-3">
            {workSteps.slice(0, 3).map((step) => {
              const isSelected = selectedStep === step.id && step.isClickable;
              const isClickable = step.isClickable;
              
              return (
                <button
                  key={step.id}
                  onClick={() => isClickable && setSelectedStep(step.id)}
                  disabled={!isClickable}
                  className={`w-full flex gap-2.5 h-9 items-center justify-start overflow-hidden px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    !isClickable 
                      ? 'bg-gradient-to-b from-[#f2c6a6] to-[#bc845b]'
                      : isSelected
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
                  <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#ffffff] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                    {step.title}
                  </div>
                  
                  {/* Arrow for CTA button */}
                  {!isClickable && (
                    <div className="flex gap-1.5 items-center justify-center ml-auto">
                      <div className="relative shrink-0 w-[22px] h-[22px]">
                        <Image
                          src="/icons/right-arrow.svg"
                          alt=""
                          width={22}
                          height={22}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}
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

          {/* 4. Start for Free Button */}
          <div>
            <button className="w-full flex gap-2 items-center justify-center overflow-hidden px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-b from-[#f2c6a6] to-[#bc845b]">
              {/* Text */}
              <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#000000] text-[14px] text-nowrap tracking-[-0.14px] relative shrink-0 leading-[22px]">
                Start for Free
              </div>
              
              {/* Arrow */}
              <div className="relative shrink-0 w-[22px] h-[22px]">
                <Image
                  src="/icons/right-arrow.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="w-full h-full"
                />
              </div>
            </button>
          </div>


        </div>
      </div>
    </section>
  );
}