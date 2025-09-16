"use client";

import React from 'react';
import Image from 'next/image';

const Pricing = () => {
  const plans = [
    {
      id: 'essentials',
      name: 'ESSENTIALS',
      price: '$4,997',
      period: '/month',
      buttonText: 'Start My Project',
      buttonStyle: 'secondary',
      features: [
        '1 active task at a time',
        'Unlimited design requests',
        'Unlimited revisions',
        '3-day turnaround',
        'Pause or cancel anytime'
      ],
      popular: false
    },
    {
      id: 'elite',
      name: 'ELITE',
      price: '$9,997',
      period: '/month',
      buttonText: 'Start My Project',
      buttonStyle: 'primary',
      badge: '3 spots left',
      features: [
        '2 active tasks at a time',
        'Everything in Essentials',
        'Front-end development',
        '4-day turnaround',
        'Monthly strategy sessions'
      ],
      popular: true
    },
    {
      id: 'fullstack',
      name: 'FULL-STACK',
      price: '$24,997',
      period: '/month',
      buttonText: 'Start My Project',
      buttonStyle: 'secondary',
      features: [
        '2 active tasks at a time',
        'Everything in Elite',
        'Full-stack development',
        'Priority turnaround',
        'Dedicated project manager'
      ],
      popular: false
    }
  ];

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28" id="pricing">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-12 px-4">
        <div className="flex flex-col gap-6 items-center justify-start w-full max-w-[444px]">
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
                PLANS FOR EVERYONE
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="bg-clip-text font-inter font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px]"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 444 108\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(43.956 0 0 9.288 222 54)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Choose the <span className="font-instrument-serif italic">Creative</span> Plan That Fits You
          </h2>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-inter font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          No hidden fees. No contracts. Pause or cancel anytime.
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[32px] backdrop-blur-[20px] backdrop-filter overflow-hidden shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-[rgba(255,255,255,0.12)] via-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.32)] hover:border-[rgba(255,255,255,0.4)]'
                  : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(216,231,242,0.07)] hover:border-[rgba(216,231,242,0.15)]'
              } p-10 h-full flex flex-col`}
            >
              {/* Plan Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`px-4 py-2 rounded-[16px] ${
                    plan.popular 
                      ? 'bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.06)]'
                      : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]'
                  }`}>
                    <span className="font-inter font-medium text-[13px] text-[#cecece] tracking-[0.65px] uppercase">
                      {plan.name}
                    </span>
                  </div>
                  {plan.badge && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7]"></div>
                      <span className="text-[12px] text-white font-inter">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] font-inter text-white tracking-[-1px] leading-[39.6px]">
                    {plan.price}
                  </span>
                  <span className="text-[14px] font-inter text-[#d5dbe6] opacity-80 tracking-[-0.14px]">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-8">
                <button
                  className={`w-full h-[44px] rounded-[12px] font-inter font-medium text-[14px] tracking-[-0.28px] transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#89ffff] to-[#00d7d7] text-[#3a3a3a] hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0)] text-white border border-[rgba(255,255,255,0.1)] hover:from-[rgba(255,255,255,0.12)] hover:to-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  {plan.buttonText}
                  {plan.popular && (
                    <span className="ml-2">→</span>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent mb-8"></div>

              {/* Features */}
              <div className="flex-1">
                <h4 className="font-inter font-medium text-[18px] text-white tracking-[-0.36px] leading-[28px] mb-4">
                  What you will get
                </h4>
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0">
                        <Image 
                          src="/icons/checkmark.svg" 
                          alt="Checkmark" 
                          width={16} 
                          height={16}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="font-inter font-normal text-[14px] text-[#d0d0d0] tracking-[-0.32px] leading-[25.6px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
