'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LeadCaptureGate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  
  // Parse form data from URL parameters
  const formData = {
    revenue: searchParams.get('revenue') || '',
    timeAudit: searchParams.get('timeAudit') || '',
    growthBlocker: searchParams.get('growthBlocker') || '',
    growthBlockerOther: searchParams.get('growthBlockerOther') || '',
    urgency: searchParams.get('urgency') || '',
    currentStack: searchParams.get('currentStack')?.split(',').filter(Boolean) || [],
    currentStackOther: searchParams.get('currentStackOther') || ''
  };

  // Redirect to intake if no form data
  useEffect(() => {
    if (!formData.revenue || !formData.timeAudit || !formData.growthBlocker) {
      window.location.href = '/intake';
    }
  }, [formData.revenue, formData.timeAudit, formData.growthBlocker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setError('Please enter both your name and email');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // NOW submit to Asana with complete data including contact info
      const completeData = {
        ...formData,
        name: name.trim(),
        email: email.trim()
      };

      const response = await fetch('/api/submit-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData)
      });

      if (response.ok) {
        // Redirect to results with complete data
        const queryParams = new URLSearchParams({
          revenue: formData.revenue,
          timeAudit: formData.timeAudit,
          growthBlocker: formData.growthBlocker,
          growthBlockerOther: formData.growthBlockerOther || '',
          urgency: formData.urgency || '',
          currentStack: formData.currentStack.join(','),
          currentStackOther: formData.currentStackOther || '',
          name: name.trim(),
          email: email.trim()
        });
        
        window.location.href = `/results?${queryParams.toString()}`;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white min-h-screen w-screen overflow-x-hidden relative flex flex-col items-center justify-center bg-[#080808] py-8 md:py-0">
      
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <Image
          src="/images/freedom-score-bg.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      
      {/* Back Button */}
      <div className="absolute top-[4%] left-[4%] z-[2000]">
        <Link 
          href={`/intake?${new URLSearchParams({
            revenue: formData.revenue,
            timeAudit: formData.timeAudit,
            growthBlocker: formData.growthBlocker,
            growthBlockerOther: formData.growthBlockerOther || '',
            urgency: formData.urgency || '',
            currentStack: formData.currentStack.join(','),
            currentStackOther: formData.currentStackOther || ''
          }).toString()}`}
          className="bg-transparent border border-[#242424] rounded-full p-1.5 md:p-3 text-white cursor-pointer hover:bg-white/5 transition-colors flex justify-center items-center"
        >
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Link>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-left">
        
        {/* Logo */}
        <Image 
          src="/images/avyra-brandmark.svg" 
          alt="Avyra" 
          width={103} 
          height={98} 
          className="mb-6 md:mb-8 w-16 h-16 md:w-[103px] md:h-[98px]"
        />
        
        {/* Main heading */}
        <motion.h1 
          className="text-[32px] md:text-[56px] font-medium mb-4 md:mb-6 leading-tight capitalize"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontFamily: "Inter"
          }}
        >
         Your Freedom Score Is Ready!
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-[18px] md:text-[28px] text-[#d0d0d0] mb-8 md:mb-12 font-normal tracking-[-0.32px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "Inter" }}
        >
          Get your personalized results.
        </motion.p>
        
        {/* Benefits Grid */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop: 2 columns, Mobile: 1 column (stacked) */}
          <div className="flex flex-col md:flex-row md:justify-between w-full max-w-[802px] gap-6 md:gap-0">
            {/* Left Column (Mobile: All items stack) */}
            <div className="flex flex-col gap-4 md:gap-6 items-start">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                  className="md:w-6 md:h-6"
                />
                <span className="text-[#d0d0d0] text-[16px] md:text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Your Freedom Score
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                  className="md:w-6 md:h-6"
                />
                <span className="text-[#d0d0d0] text-[16px] md:text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Custom AI Agent Recommendations
                </span>
              </div>
              
              {/* Mobile: Show all 4 items in single column */}
              <div className="flex gap-2 items-center md:hidden">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                />
                <span className="text-[#d0d0d0] text-[16px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Exact time savings calculation
                </span>
              </div>
              <div className="flex gap-2 items-center md:hidden">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                />
                <span className="text-[#d0d0d0] text-[16px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  ROI projections for your business
                </span>
              </div>
            </div>
            
            {/* Right Column (Desktop only) */}
            <div className="hidden md:flex flex-col gap-6 items-start">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={24} 
                  height={24}
                />
                <span className="text-[#d0d0d0] text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Exact time savings calculation
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/checkmark.svg" 
                  alt="Checkmark" 
                  width={24} 
                  height={24}
                />
                <span className="text-[#d0d0d0] text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  ROI projections for your business
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="lead-capture-form space-y-3 md:space-y-4 w-full max-w-[804px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
          {/* Email Input */}
          <div className="bg-[rgba(255,255,255,0.05)] p-1 rounded-[12px]">
            <div className="bg-[rgba(146,146,146,0.06)] flex items-center justify-between pl-4 md:pl-6 pr-[9px] py-[9px] rounded-[10px]">
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white text-[12px] md:text-[14px] font-medium tracking-[-0.16px] focus:outline-none flex-1 placeholder:text-gray-400"
                autoComplete="email"
                autoFocus
                required
              />
              <div className="bg-[rgba(217,217,217,0.05)] p-[8px] md:p-[10px] rounded-[9px] w-[36px] h-[36px] md:w-[42px] md:h-[42px] flex items-center justify-center">
                <svg width="18" height="18" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Name Input */}
          <div className="bg-[rgba(255,255,255,0.05)] p-1 rounded-[12px]">
            <div className="bg-[rgba(146,146,146,0.06)] flex items-center justify-between pl-4 md:pl-6 pr-[9px] py-[9px] rounded-[10px]">
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-white text-[12px] md:text-[14px] font-medium tracking-[-0.16px] focus:outline-none flex-1 placeholder:text-gray-400"
                autoComplete="name"
                required
              />
              <div className="bg-[rgba(217,217,217,0.05)] p-[8px] md:p-[10px] rounded-[9px] w-[36px] h-[36px] md:w-[42px] md:h-[42px] flex items-center justify-center">
                <svg width="18" height="18" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          {/* CTA Button with Conditional Background Container */}
          <div 
            className="p-[2px] rounded-[8px] transition-all duration-300"
            style={{
              background: !isSubmitting && email.trim() && name.trim() 
                ? "radial-gradient(50% 20.7% at 50% 100%, #C6FFFF 0%, rgba(198, 255, 255, 0.00) 100%)" 
                : "transparent"
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !name.trim()}
              className={`w-full px-6 md:px-8 py-3 rounded-[8px] text-[14px] md:text-[16px] font-semibold tracking-[-0.16px] transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 group ${
                isSubmitting || !email.trim() || !name.trim() 
                  ? 'bg-gradient-to-b from-[#8a7259] to-[#6b5040] text-[#2a2a2a]' 
                  : 'bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] text-[#000000] hover:opacity-90 hover:scale-[1.01] cursor-pointer'
              }`}
              style={{ fontFamily: "Inter" }}
            >
              <span>{isSubmitting ? 'Generating Results...' : 'Get My Automation Plan'}</span>
              <svg width="18" height="18" className="md:w-[22px] md:h-[22px] transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          {error && (
            <p className="text-red-400 text-xs md:text-sm text-center mt-4">{error}</p>
          )}
          
        </motion.form>
        
        {/* Privacy note */}
        <motion.p 
          className="mt-4 md:mt-6 text-[10px] md:text-[12px] text-left tracking-[-0.32px] w-full max-w-[804px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ fontFamily: "Inter" }}
        >
          <span className="text-white">Avyra&rsquo;s respects your Privacy. </span>
          <span className="text-[#d5dbe6]"> Unsubscribe anytime.</span>
        </motion.p>
        
      </div>
      
      {/* Aggressive autofill override styles */}
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: white !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        
        input:-webkit-autofill::first-line {
          color: white !important;
          font-family: Inter, sans-serif !important;
        }
        
        /* Force no borders on all input states */
        input[type="email"],
        input[type="text"] {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        
        input[type="email"]:focus,
        input[type="text"]:focus,
        input[type="email"]:active,
        input[type="text"]:active {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        
        /* Simple placeholder override */
        input::placeholder {
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
} 