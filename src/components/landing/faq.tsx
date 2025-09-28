"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null); // All items closed by default

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How fast will I receive my designs?",
      answer: "Most requests are completed in 48 hours. Larger projects may take a bit longer, but you'll always know your timeline upfront."
    },
    {
      id: 2,
      question: "How does onboarding work?",
      answer: "After you subscribe, you'll receive a welcome email with your project board link. Simply add your first request and we'll get started within 24 hours."
    },
    {
      id: 3,
      question: "Is there a limit to how many requests I can make?",
      answer: "Not at all! You can add as many requests to your queue as you'd like. We'll work through them one by one based on your plan's active task limit."
    },
    {
      id: 4,
      question: "What if I don't like the design?",
      answer: "We offer unlimited revisions until you're 100% satisfied. We'll keep iterating until we get it exactly right for your vision."
    },
    {
      id: 5,
      question: "Can I pause or cancel anytime?",
      answer: "Absolutely! You can pause your subscription at any time and resume when you're ready. Cancel anytime with no contracts or hidden fees."
    }
  ];

  const toggleItem = (itemId: number) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28" id="faq">
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
                FAQs
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="bg-clip-text font-inter font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px]"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 444 108\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(43.956 0 0 9.288 222 54)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Your Questions Answered
          </h2>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-inter font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          Find quick answers to the most common support questions
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="container mx-auto px-4">
        <div className="max-w-[672px] mx-auto">
          <div className="flex flex-col gap-3">
            {faqData.map((item) => (
              <motion.div
                key={item.id}
                className={`rounded-[14px] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 ${
                  openItem === item.id 
                    ? 'bg-[#383838]' 
                    : 'bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(171,171,171,0.06)]'
                }`}
                initial={false}
                animate={{
                  backgroundColor: openItem === item.id ? '#383838' : 'transparent'
                }}
              >
                {/* Question Header - Clickable */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                >
                  <span className={`font-inter text-[16px] text-[#d5dbe6] tracking-[-0.32px] leading-[25.6px] pr-4 ${
                    openItem === item.id ? 'font-semibold' : 'font-normal'
                  }`}>
                    {item.question}
                  </span>
                  
                  {/* Toggle Icon */}
                  <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 flex items-center justify-center"
                    >
                      {openItem === item.id ? (
                        // Minus icon (rotated plus)
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H11" stroke="#d5dbe6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        // Plus icon
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1V11M1 6H11" stroke="#d5dbe6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </motion.div>
                  </div>
                </button>

                {/* Answer Content - Animated */}
                <AnimatePresence initial={false}>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="font-inter font-normal text-[16px] text-[#d5dbe6] tracking-[-0.32px] leading-[25.6px]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
