"use client";

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Form Field Types
type FormData = {
  revenue: string;
  timeAudit: string;
  growthBlocker: string;
  growthBlockerOther?: string; // Follow-up for "something-else"
  currentStack: string[];
  currentStackOther?: string; // Follow-up for "other-tools"
};

export default function IntakeForm() {
  const searchParams = useSearchParams();
  
  // Get pre-populated data from URL parameters
  const getInitialValues = () => {
    const currentStackParam = searchParams.get('currentStack');
    return {
      revenue: searchParams.get('revenue') || '',
      timeAudit: searchParams.get('timeAudit') || '',
      growthBlocker: searchParams.get('growthBlocker') || '',
      growthBlockerOther: searchParams.get('growthBlockerOther') || '',
      currentStack: currentStackParam ? currentStackParam.split(',').filter(Boolean) : [],
      currentStackOther: searchParams.get('currentStackOther') || ''
    };
  };

  // Calculate what the final step should be based on form data
  const calculateFinalStep = (formData: FormData) => {
    if (!formData.timeAudit || !formData.growthBlocker) {
      return 1; // Start from welcome if incomplete
    }

    return 5; // Fixed 5 steps: welcome + timeAudit + growthBlocker + stack + revenue
  };

  const initialFormData = getInitialValues();
  const initialStep = calculateFinalStep(initialFormData);
  // For fresh users (no data), start with default maxSteps of 5, otherwise use calculated value
  const initialMaxSteps = initialStep === 1 ? 5 : calculateFinalStep(initialFormData);
  
  const [step, setStep] = useState(initialStep);
  const [maxSteps, setMaxSteps] = useState(initialMaxSteps);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Focus welcome screen on initial load (only if we're actually on welcome screen)
  useEffect(() => {
    if (step === 1 && welcomeRef.current) {
      welcomeRef.current.focus();
    }
  }, [step]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Handle Enter key press to navigate to next step
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // For welcome screen, just go to next step (no validation needed)
      if (step === 1) {
        nextStep();
        return;
      }
      
      // For question screens, validate before proceeding
      if (step < maxSteps) {
        validateAndProceed();
      } else if (step === maxSteps) {
        handleSubmit(onSubmit)();
      }
    }
  };
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: getInitialValues()
  });

  const currentStackOptions = [
    { id: 'slack-teams-discord', label: 'Slack / Teams / Discord (Comms)' },
    { id: 'gmail-outlook', label: 'Gmail / Outlook (Email)' },
    { id: 'google-drive-dropbox-onedrive', label: 'Google Drive / Dropbox / OneDrive (Files)' },
    { id: 'notion-airtable-clickup', label: 'Notion / Airtable / ClickUp (Docs & databases)' },
    { id: 'asana-monday-trello', label: 'Asana / Monday / Trello (Projects & tasks)' },
    { id: 'hubspot-salesforce-pipedrive', label: 'HubSpot / Salesforce / Pipedrive (CRM & sales)' },
    { id: 'intercom-zendesk-helpscout', label: 'Intercom / Zendesk / Help Scout (Support)' },
    { id: 'shopify-woocommerce', label: 'Shopify / WooCommerce (Storefront / orders)' },
    { id: 'stripe-payments', label: 'Stripe / Payments (Billing)' },
    { id: 'zapier-make', label: 'Zapier / Make (Automation)' },
    { id: 'other-tools', label: 'Other tool…(We integrate with 6,000+)' }
  ];

  // Determine qualification and max steps based on revenue and selections
  const revenue = watch('revenue');
  const growthBlocker = watch('growthBlocker');
  const selectedStack = watch('currentStack');
  
  useEffect(() => {
    // Fixed 5 steps since follow-ups are now inline
    setMaxSteps(5); // Welcome + timeAudit + growthBlocker + stack + revenue
  }, []);

  // Validate current step and proceed if valid
  const validateAndProceed = () => {
    const currentQuestionType = getCurrentQuestionType();
    
    // Validate based on current question
    if (currentQuestionType === 'timeAudit' && !watch('timeAudit')) {
      return; // Validation error will show via react-hook-form
    }
    if (currentQuestionType === 'growthBlocker') {
      if (!growthBlocker) {
        return; // Validation error will show via react-hook-form
      }
      // If "something-else" is selected, also validate the text field
      if (growthBlocker === 'something-else' && !watch('growthBlockerOther')) {
        return; // Validation error will show via react-hook-form
      }
    }
    if (currentQuestionType === 'revenue' && !revenue) {
      return; // Validation error will show via react-hook-form
    }
    if (currentQuestionType === 'currentStack') {
      if (!selectedStack || selectedStack.length === 0) {
        return; // Validation error will show via react-hook-form
      }
      // If "other-tools" is selected, also validate the text field
      if (selectedStack.includes('other-tools') && !watch('currentStackOther')) {
        return; // Validation error will show via react-hook-form
      }
    }
    
    // If validation passes, proceed to next step
    nextStep();
  };

  const nextStep = () => {
    // Check if this is the final step
    if (step === maxSteps) {
      handleSubmit(onSubmit)();
      return;
    }
    
    // Handle specific step transitions
    if (getCurrentQuestionType() === 'growthBlocker') {
      // After growth blocker question, check if we need follow-up
      if (growthBlocker === 'something-else') {
        // Go to growth blocker follow-up
        setStep(step + 1);
        return;
      }
    }
    
    // Revenue is always the last question, so submit after it
    if (getCurrentQuestionType() === 'revenue') {
      handleSubmit(onSubmit)();
      return;
    }
    
    // Default: move to next step
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Helper function to determine what question should be shown at current step
  const getCurrentQuestionType = () => {
    if (step === 1) return 'welcome';
    if (step === 2) return 'timeAudit';
    if (step === 3) return 'growthBlocker';
    if (step === 4) return 'currentStack';
    if (step === 5) return 'revenue';
    
    return 'unknown';
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Don't submit to Asana yet - just redirect to lead capture with form data
      const queryParams = new URLSearchParams({
        revenue: data.revenue,
        timeAudit: data.timeAudit,
        growthBlocker: data.growthBlocker,
        currentStack: data.currentStack.join(',')
      });
      
      // Add follow-up fields if they exist
      if (data.growthBlockerOther) {
        queryParams.set('growthBlockerOther', data.growthBlockerOther);
      }
      if (data.currentStackOther) {
        queryParams.set('currentStackOther', data.currentStackOther);
      }
      
      window.location.href = `/lead-capture?${queryParams.toString()}`;
    } catch {
      // Redirect will happen regardless, no need for error handling here
      console.log('Navigation completed');
    }
  };

  // Animation variants for framer-motion
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5
  };

  return (
    <div className="text-white h-screen w-screen overflow-hidden overflow-y-hidden relative flex flex-col items-center justify-center bg-[#080808]">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/20 z-[2000]">
        <div 
          className="h-full transition-all duration-300 ease-out relative progress-bar-gold" 
          style={{
            width: `${Math.max(((step - 1) / (maxSteps - 1)) * 100, 0)}%`,
            background: 'linear-gradient(90deg, #f2c6a6 0%, #FFE1C6 25%, #f2c6a6 50%, #bb835a 75%, #f2c6a6 100%)',
            boxShadow: '0 0 10px rgba(255, 225, 198, 0.5), 0 0 20px rgba(242, 198, 166, 0.3)'
          }}
        >
          {/* Glowing tip */}
          <div 
            className="absolute top-0 right-0 w-[3px] h-full glow-tip"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE1C6 50%, #f2c6a6 100%)',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 225, 198, 0.6)',
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      </div>
      
      {/* Exit Button - Moved to top right */}
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
      
      {/* Back Button - Only for question screens (step > 1) */}
      {step > 1 && (
        <div className="absolute top-[4%] left-[4%] z-[2000]">
          <button 
            type="button" 
            onClick={prevStep}
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
          </button>
        </div>
      )}
      
      {/* Form Container - centered on screen */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-[1000] p-5">
        {/* Logo - only show on welcome screen */}
        {getCurrentQuestionType() === 'welcome' && (
          <Image 
            src="/images/avyra-brandmark.svg" 
            alt="Avyra" 
            width={120} 
            height={40} 
            className="mb-5 avyra-logo-intake"
          />
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative z-[1000] flex flex-col items-center">
          {/* Welcome Step - centered */}
          {getCurrentQuestionType() === 'welcome' && (
            <motion.div
              className="flex flex-col items-center text-center justify-center w-full outline-none"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              id="welcome-section"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              ref={welcomeRef}
            >
              <h1 
                id="welcome-header" 
                className="text-[42px] md:text-[64px] lg:text-[80px] font-medium leading-[100%] tracking-[-2px] mb-6"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  textAlign: "center",
                  fontFamily: "Inter"
                }}
              >
               Discover your freedom in 4 simple questions
              </h1>
              <p className="text-[#B2B2B2] text-xl md:text-2xl font-medium mb-8 md:mb-10 w-[90%] sm:w-[70%] md:w-[90%] max-w-3xl mx-auto lg:mx-0">
              No email needed until results are ready
              </p>
              
              <div className="flex gap-3 welcome-buttons items-center justify-center">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 welcome-btn flex items-center justify-center font-medium group"
                >
                 Start my assessment
                  <Image 
                    src="/icons/black-arrow.svg" 
                    alt="Arrow" 
                    width={13}
                    height={13}
                    className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                  />
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {/* <div className="flex items-center justify-center text-sm mt-6 text-white time-message">
                <span className="mr-[5px] flex items-center clock-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                2 minutes. No sales call. Real results.
              </div> */}
            </motion.div>
          )}
          
          {/* Step 2: Revenue Qualifier - left aligned */}
          {getCurrentQuestionType() === 'revenue' && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
                <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">What&apos;s your current monthly revenue?</h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                {[
                  { id: 'under-30k', label: 'Building (Under $30K)' },
                  { id: '30k-100k', label: 'Growing ($30K–$100K)' },
                  { id: '100k-500k', label: 'Scaling ($100K–$500K)' },
                  { id: '500k-1m', label: 'Expanding ($500K–$1M)' },
                  { id: '1m-plus', label: 'Enterprise ($1M+)' }
                ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('revenue', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('revenue') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.revenue && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.revenue.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 3: Time Audit - left aligned */}
          {getCurrentQuestionType() === 'timeAudit' && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
               <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">What drains you the most right now?</h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                {[
                  { id: 'sales-lead-generation', label: 'Chasing sales & leads' },
                  { id: 'customer-support', label: 'Customer support & success' },
                  { id: 'content-marketing', label: 'Content & marketing grind' },
                  { id: 'operations-admin', label: 'Admin & operations overload' },
                  { id: 'managing-team', label: 'Managing teams & contractors' },
                  { id: 'all-above', label: 'Everything feels overwhelming' }
                ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('timeAudit', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('timeAudit') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.timeAudit && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.timeAudit.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 4: Growth Blocker - left aligned */}
          {getCurrentQuestionType() === 'growthBlocker' && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
               <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">What&apos;s blocking your next level?</h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                  {[
                    { id: 'not-enough-hours', label: 'Never enough hours in the day' },
                    { id: 'cant-scale', label: 'Can\'t scale past myself' },
                    { id: 'systems-break', label: 'Business breaks if I step away' },
                    { id: 'team-cant-handle', label: 'Team drowning in workload' },
                    { id: 'manual-tasks', label: 'Manual tasks kill productivity' },
                    { id: 'im-the-bottleneck', label: 'I\'m the bottleneck (everything depends on me)', mobileLabel: 'Everything depends on me' },
                    { id: 'something-else', label: 'Something else (specify below)' }
                  ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('growthBlocker', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('growthBlocker') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">
                        <span className="md:hidden">{option.mobileLabel || option.label}</span>
                        <span className="hidden md:inline">{option.label}</span>
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              
              {/* Inline text field for "something-else" option */}
              <motion.div
                initial={false}
                animate={watch('growthBlocker') === 'something-else' ? 
                  { opacity: 1, height: 'auto', marginTop: 16 } : 
                  { opacity: 0, height: 0, marginTop: 0 }
                }
                transition={{ 
                  duration: watch('growthBlocker') === 'something-else' ? 0.3 : 0.5,
                  ease: "easeInOut",
                  opacity: { duration: watch('growthBlocker') === 'something-else' ? 0.2 : 0.3 }
                }}
                className="w-full overflow-hidden"
              >
                <div className="bg-[rgba(255,255,255,0.05)] px-4 py-3 rounded-[12px]">
                  <textarea
                    {...register('growthBlockerOther', { 
                      required: watch('growthBlocker') === 'something-else' ? 'Please describe your challenge' : false,
                      maxLength: { value: 200, message: 'Please keep it under 200 characters' }
                    })}
                    placeholder="e.g., hiring, compliance, cash flow, coordination..."
                    className="w-full bg-transparent text-white text-[14px] font-medium tracking-[-0.16px] focus:outline-none placeholder:text-gray-400 resize-none"
                     rows={2}
                     maxLength={200}
                  />
                  <div className="text-right text-sm text-white/60 mt-2">
                    {watch('growthBlockerOther')?.length || 0}/200 characters
                  </div>
                </div>
              </motion.div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.growthBlocker && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.growthBlocker.message}</p>
              )}
            </motion.div>
          )}
          
          
          
          {/* Step 5: Current Stack */}
          {getCurrentQuestionType() === 'currentStack' && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
               <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">What tools does your business rely on?</h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Check all that apply)</p>
              
              {/* Mobile: Custom Multi-select Dropdown */}
              <div className="md:hidden w-full relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-transparent border border-[#242424] rounded-[32px] py-3 px-4 text-white text-base text-left flex items-center justify-between focus:outline-none focus:border-white/20"
                >
                  <span className="flex-1 text-sm">
                    {(() => {
                      const selectedTools = watch('currentStack') || [];
                      
                      if (selectedTools.length === 0) return 'Select tools...';
                      
                      // Get selected tool names
                      const selectedNames = selectedTools
                        .map(id => {
                          const tool = currentStackOptions.find(t => t.id === id);
                          return tool ? (tool.label.includes('(') ? tool.label.split('(')[0].trim() : tool.label) : '';
                        })
                        .filter(Boolean);
                      
                      // Show truncated list
                      if (selectedNames.length <= 2) {
                        return selectedNames.join(', ');
                      } else {
                        return `${selectedNames.slice(0, 2).join(', ')} +${selectedNames.length - 2} more`;
                      }
                    })()}
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#242424] rounded-[16px] py-2 z-50 max-h-[300px] overflow-y-auto">
                    {currentStackOptions.map((tool) => {
                      const isSelected = watch('currentStack')?.includes(tool.id);
                      return (
                        <div key={tool.id} className="flex items-center px-4 py-3 hover:bg-white/5 cursor-pointer min-h-[44px]" onClick={() => {
                          const currentValues = watch('currentStack') || [];
                          const newValues = currentValues.includes(tool.id) 
                            ? currentValues.filter(id => id !== tool.id)
                            : [...currentValues, tool.id];
                          setValue('currentStack', newValues);
                        }}>
                          <input
                            type="checkbox"
                            value={tool.id}
                            {...register('currentStack', { required: 'Please select at least one option' })}
                            className="hidden"
                          />
                          <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-white border-white' : 'border-gray-500 bg-transparent'}`}>
                            {isSelected && (
                              <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-white text-sm leading-5 flex-1">
                            {tool.label.includes('(') ? tool.label.split('(')[0].trim() : tool.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Desktop: Checkboxes */}
              <div className="hidden md:flex flex-col w-full gap-3">
                {currentStackOptions.map((tool) => (
                  <label key={tool.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={tool.id}
                      {...register('currentStack', { required: 'Please select at least one option' })}
                      className="hidden hidden-checkbox"
                    />
                    <div className={`flex items-center justify-between border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-checkbox ${watch('currentStack')?.includes(tool.id) ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-base md:text-lg custom-checkbox-label">
                        {tool.label.includes('(') ? (
                          <>
                            <span className="text-white">{tool.label.split('(')[0].trim()}</span>
                            <span className="text-gray-400"> ({tool.label.split('(')[1]}</span>
                          </>
                        ) : (
                          <span className="text-white">{tool.label}</span>
                        )}
                      </span>
                      <span className={`checkmark transition-opacity duration-200 ${watch('currentStack')?.includes(tool.id) ? 'opacity-100' : 'opacity-0'}`}>
                        <Image 
                          src="/icons/check.svg" 
                          alt="Selected" 
                          width={28} 
                          height={28}
                          className="text-white check-icon" 
                        />
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              
              {/* Inline text field for "other-tools" option - Desktop only */}
              <motion.div
                initial={false}
                animate={watch('currentStack')?.includes('other-tools') ? 
                  { opacity: 1, height: 'auto', marginTop: 16 } : 
                  { opacity: 0, height: 0, marginTop: 0 }
                }
                transition={{ 
                  duration: watch('currentStack')?.includes('other-tools') ? 0.3 : 0.5,
                  ease: "easeInOut",
                  opacity: { duration: watch('currentStack')?.includes('other-tools') ? 0.2 : 0.3 }
                }}
                className="w-full overflow-hidden hidden md:block"
              >
                <div className="bg-[rgba(255,255,255,0.05)] px-4 py-3 rounded-[12px]">
                  <input
                    type="text"
                    {...register('currentStackOther', { 
                      required: watch('currentStack')?.includes('other-tools') ? 'Please list your other tools' : false,
                      maxLength: { value: 100, message: 'Please keep it under 100 characters' }
                    })}
                    placeholder="e.g., Quickbooks, Shopify, Calendly, Zoom..."
                    className="w-full bg-transparent text-white text-[14px] font-medium tracking-[-0.16px] focus:outline-none placeholder:text-gray-400"
                    maxLength={100}
                  />
                  <div className="text-right text-sm text-white/60 mt-2">
                    {watch('currentStackOther')?.length || 0}/100 characters
                  </div>
                </div>
              </motion.div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.currentStack && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.currentStack.message}</p>
              )}
            </motion.div>
          )}
          
          
          {/* Final step removed - form auto-submits after last question */}
        </form>
      </div>
      
      
      {/* Custom Styles for Elements Not Easily Done with Tailwind */}
      <style jsx global>{`
        /* Make sure body and html don't scroll */
        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        
        /* Remove focus outline */
        *:focus {
          outline: none !important;
        }
        
        /* Checkbox style adjustments */
        .checkmark {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
        
        .check-icon {
          filter: brightness(0) invert(1);
        }
        
        /* Fix for checkbox clicking in forms */
        label.cursor-pointer {
          display: block;
          width: 100%;
        }
        
        /* Custom radio button style */
        .custom-radio::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #242424;
          border-radius: 50%;
          margin-right: 12px;
          transition: border-color 0.3s ease;
        }
        
        .custom-radio.checked::before {
          background-color: rgba(251, 251, 251, 0.4);
        }
        
        /* Remove placeholder when valid */
        .input-field:valid::placeholder {
          color: transparent;
        }
        
        /* Ensure all form steps are centered */
        .form-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        /* Add responsive styles */
        @media screen and (max-width: 990px) {
          #welcome-header {
            font-size: 3rem;
            height: auto;
            margin-bottom: 24px;
            white-space: normal;
          }
        }
        
        @media screen and (max-width: 500px) {
          .avyra-logo-intake {
            width: 64px;
            height: auto;
          }
          
          #welcome-header {
            font-size: 54px;
            margin: 0px;
            margin-bottom: 20px;
            box-sizing: border-box;
            width: inherit;
            padding: 0px 12px;
          }
          
          .welcome-buttons {
            display: flex;
            margin-left: 0px;
            gap: 12px;
            align-items: center;
            flex-direction: column;
          }
          
          .enter-message {
            display: none;
          }
          
          .question {
            font-size: 1.75rem;
          }
          
          .subheader {
            font-size: 12px;
          }
        }
            
        /* Progress bar animations */
        .progress-bar-gold {
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar-gold::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        
        .glow-tip {
          animation: pulse-glow 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow {
          0% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          100% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }
            `}</style>
    </div>
  );
} 