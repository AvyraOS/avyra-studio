"use client";

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

// Form Field Types
type FormData = {
  // Text input fields
  name: string;
  email: string;
  company_name: string;
  website: string; // optional
  project_description: string;
  
  // Multiple Choice Questions
  launch_timeline: string;
  services: string[]; // Multi-select checkboxes
  budget: string;
  referral_source: string;
};

export default function IntakeForm() {
  const searchParams = useSearchParams();
  
  // Get pre-populated data from URL parameters
  const getInitialValues = () => {
    const servicesParam = searchParams.get('services');
    return {
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      company_name: searchParams.get('company_name') || '',
      website: searchParams.get('website') || '',
      project_description: searchParams.get('project_description') || '',
      launch_timeline: searchParams.get('launch_timeline') || '',
      services: servicesParam ? servicesParam.split(',') : [],
      budget: searchParams.get('budget') || '',
      referral_source: searchParams.get('referral_source') || ''
    };
  };
  
  const [step, setStep] = useState(1); // Always start at welcome
  const [maxSteps] = useState(11); // welcome + 5 text inputs + 4 multiple choice + 1 submit
  const [justNavigated, setJustNavigated] = useState(false); // Track if we just navigated
  const [showForwardButton, setShowForwardButton] = useState(false); // Control forward button visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [showSuccess, setShowSuccess] = useState(false); // Track success state
  const [validationError, setValidationError] = useState<string>(''); // Manual validation error
  const welcomeRef = useRef<HTMLDivElement>(null);
  const submitHeadingRef = useRef<HTMLHeadingElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const successCheckmarkRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const successParagraphRef = useRef<HTMLParagraphElement>(null);
  const successButtonRef = useRef<HTMLAnchorElement>(null);
  const previousValuesRef = useRef<{[key: string]: string}>({}); // Track previous values
  
  // Initialize form before any useEffects that depend on it
  const {
    register,
    handleSubmit,
    watch
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: getInitialValues()
  });

  // Watch all form values for auto-advance and navigation
  const formValues = watch();
  
  // Focus welcome screen on initial load (only if we're actually on welcome screen)
  // Animate success page when it appears
  useEffect(() => {
    if (showSuccess && successCheckmarkRef.current && successHeadingRef.current && successParagraphRef.current && successButtonRef.current) {
      const checkmark = successCheckmarkRef.current;
      const heading = successHeadingRef.current;
      const paragraph = successParagraphRef.current;
      const button = successButtonRef.current;
      
      // Set everything to invisible initially
      gsap.set([checkmark, heading, paragraph, button], { opacity: 0 });
      
      // Animation sequence
      const tl = gsap.timeline({ delay: 0.2 });
      
      // 1. Checkmark: scale up with bounce
      tl.fromTo(checkmark,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      // 2. Heading: fade in word by word
      const headingText = heading.textContent || '';
      const headingWords = headingText.split(' ').filter(word => word.trim());
      heading.innerHTML = headingWords.map(word => `<span class="word" style="display: inline-block;">${word}</span>`).join(' ');
      
      const headingWordElements = heading.querySelectorAll('.word');
      gsap.set(heading, { opacity: 1 });
      
      tl.fromTo(headingWordElements,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08,
          ease: 'power2.out'
        },
        '-=0.3' // Overlap with checkmark
      );
      
      // 3. Paragraph: fade in smoothly
      tl.fromTo(paragraph,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'sine.out' },
        '-=0.2'
      );
      
      // 4. Button: slide up and fade in
      tl.fromTo(button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'sine.out' },
        '-=0.4'
      );
    }
  }, [showSuccess]);

  useEffect(() => {
    if (step === 1 && welcomeRef.current) {
      welcomeRef.current.focus();
    }
    
    // Animate submit page heading when we reach it
    if (step === 11) {
      let attempts = 0;
      const maxAttempts = 20;
      
      const tryAnimate = () => {
        attempts++;
        const heading = submitHeadingRef.current;
        const button = submitButtonRef.current;
        
        if (!heading || !button) {
          console.log(`Attempt ${attempts}: Refs not available yet`);
          if (attempts < maxAttempts) {
            setTimeout(tryAnimate, 50); // Retry every 50ms
          }
          return;
        }
        
        console.log('Starting GSAP animation');
        
        // Kill any existing animations
        gsap.killTweensOf([heading, button]);
        
        const text = heading.textContent || '';
        const words = text.split(' ').filter(word => word.trim());
        
        console.log(`Found ${words.length} words`);
        
        // Temporarily change h1 to white text for clean animation
        heading.style.background = 'none';
        heading.style.webkitBackgroundClip = 'unset';
        heading.style.backgroundClip = 'unset';
        heading.style.webkitTextFillColor = '#D5DBE6';
        heading.style.color = '#D5DBE6';
        
        // Make heading container visible first
        gsap.set(heading, { opacity: 1 });
        
        // Wrap each word in a span
        heading.innerHTML = words.map(word => `<span class="word" style="display: inline-block;">${word}</span>`).join(' ');
        
        // Animate words in with diagonal wave (top-left to bottom-right)
        const wordElements = heading.querySelectorAll('.word');
        
        // Set initial state for button (ensure it's completely hidden)
        gsap.set(button, { opacity: 0, y: 20, visibility: 'visible', willChange: 'transform, opacity' });
        
        // Calculate diagonal distance for each word from top-left
        const wordPositions = Array.from(wordElements).map((word, index) => {
          const rect = word.getBoundingClientRect();
          const containerRect = heading.getBoundingClientRect();
          const relativeX = rect.left - containerRect.left;
          const relativeY = rect.top - containerRect.top;
          // Diagonal distance from top-left (x + y gives diagonal sweep)
          return { element: word, distance: relativeX + relativeY, index };
        });
        
        // Sort by diagonal distance
        wordPositions.sort((a, b) => a.distance - b.distance);
        
        // Animate each word based on its diagonal position with smooth overlap
        wordPositions.forEach((item, sortedIndex) => {
          gsap.fromTo(item.element,
            {
              opacity: 0,
              y: 8,
              scale: 0.96
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2, // Even longer duration for ultra-smooth fade
              ease: 'sine.out', // Smoother, more gradual easing
              delay: 0.1 + (sortedIndex * 0.035) // Slightly slower stagger for more graceful wave
            }
          );
        });
        
        console.log('Words animation complete');
        
        // Calculate when last word finishes: initial delay + (number of words * stagger) + animation duration
        const lastWordFinishes = 0.1 + (wordPositions.length * 0.035) + 1.2;
        
        // Animate button smoothly right after last word starts (overlap slightly for flow)
        gsap.fromTo(button,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.9,
            ease: 'sine.out', // Match the word easing for consistency
            delay: lastWordFinishes - 0.4, // Start 0.4s before last word finishes
            onComplete: () => {
              gsap.set(button, { clearProps: 'willChange' }); // Clean up for performance
              console.log('Button animation complete');
            }
          }
        );
      };
      
      // Start trying after AnimatePresence exit animation completes
      const timer = setTimeout(tryAnimate, 400);
      return () => clearTimeout(timer);
    }
    
    // Mark as just navigated whenever step changes
    setJustNavigated(true);
    setShowForwardButton(false); // Hide forward button during navigation
    const timer = setTimeout(() => setJustNavigated(false), 100);
    return () => clearTimeout(timer);
  }, [step]);

  // Control forward button visibility with delay to avoid race condition with auto-advance
  useEffect(() => {
    const fieldName = getCurrentFieldName();
    const hasAnswer = fieldName ? formValues[fieldName] : false;
    
    if (hasAnswer && !justNavigated) {
      // Delay showing forward button until after auto-advance would complete (300ms + animation time)
      const timer = setTimeout(() => {
        setShowForwardButton(true);
      }, 500); // 500ms delay (auto-advance is 300ms)
      
      return () => clearTimeout(timer);
    } else {
      setShowForwardButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, formValues, justNavigated]);
  
  // Handle Enter key press to navigate to next step
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // For welcome screen, just go to next step (no validation needed)
      if (step === 1) {
        nextStep();
        return;
      }
      
      // For submit page, trigger form submission
      if (step === maxSteps) {
        handleSubmit(onSubmit)();
        return;
      }
      
      // For question screens, validate before proceeding
      if (step < maxSteps) {
        validateAndProceed();
      }
    }
  };

  // Validate current step and proceed if valid
  const validateAndProceed = () => {
    const fieldName = getCurrentFieldName();
    
    // Clear previous errors
    setValidationError('');
    
    if (!fieldName) {
      nextStep();
      return;
    }
    
    // Website field is optional
    if (fieldName === 'website') {
      nextStep();
      return;
    }
    
    // Services field (checkboxes) - at least one must be selected
    if (fieldName === 'services') {
      const servicesValue = watch('services');
      if (!servicesValue || !Array.isArray(servicesValue) || servicesValue.length === 0) {
        setValidationError('Please select at least one service');
        return;
      }
      nextStep();
      return;
    }
    
    // Check if current field has a value
    const currentValue = watch(fieldName);
    const valueString = typeof currentValue === 'string' ? currentValue : '';
    
    if (!valueString || !valueString.trim()) {
        setValidationError('This field is required');
        return;
    }
    
    // Validate email format
    if (fieldName === 'email') {
      if (!valueString.includes('@') || !valueString.includes('.')) {
        setValidationError('Please enter a valid email address');
        return;
      }
    }
    
    // If validation passes, proceed to next step
    nextStep();
  };

  const nextStep = () => {
    if (step < maxSteps) {
      setValidationError(''); // Clear error on step change
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setValidationError(''); // Clear error on step change
    setStep(step - 1);
  };

  // Helper function to get the field name for current step
  const getCurrentFieldName = (): keyof FormData | null => {
    if (step === 1) return null; // Welcome screen
    if (step === 2) return 'name';
    if (step === 3) return 'email';
    if (step === 4) return 'company_name';
    if (step === 5) return 'website';
    if (step === 6) return 'project_description';
    if (step === 7) return 'launch_timeline';
    if (step === 8) return 'services';
    if (step === 9) return 'budget';
    if (step === 10) return 'referral_source';
    return null;
  };

  // Helper to determine question type
  const getCurrentQuestionType = () => {
    if (step === 1) return 'welcome';
    if (step >= 2 && step <= 6) return 'text';
    if (step === 8) return 'checkbox'; // Services - multi-select
    if (step === 7 || step === 9 || step === 10) return 'multiple'; // Single select
    if (step === 11) return 'submit'; // Submit confirmation page
    return 'unknown';
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Submit to API
      const response = await fetch('/api/submit-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company_name: data.company_name,
          website: data.website || '',
          project_description: data.project_description,
          launch_timeline: data.launch_timeline,
          services: Array.isArray(data.services) ? data.services.join(',') : '',
          budget: data.budget,
          referral_source: data.referral_source
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Show success page
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You could add error handling UI here
    }
  };

  // Auto-advance for multiple choice questions - only on NEW selections
  useEffect(() => {
    // Don't auto-advance if we just navigated to this step
    if (justNavigated) return;
    
    // Only auto-advance for single-select multiple choice questions (not checkboxes)
    const questionType = getCurrentQuestionType();
    if (questionType !== 'multiple') return;
    
    const fieldName = getCurrentFieldName();
    if (!fieldName) return;
    
    const currentValue = formValues[fieldName] as string;
    const previousValue = previousValuesRef.current[fieldName];
    
    // Only auto-advance if the value CHANGED (new selection)
    if (currentValue && currentValue !== previousValue) {
      previousValuesRef.current[fieldName] = currentValue as string;
      
      const timer = setTimeout(() => {
        if (step < maxSteps) {
          setStep(step + 1);
        }
      }, 300); // 300ms delay for smooth UX
      
      return () => clearTimeout(timer);
    }
    
    // Update previous value if it exists
    if (currentValue) {
      previousValuesRef.current[fieldName] = currentValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, formValues, maxSteps, justNavigated]); // getCurrentFieldName and getCurrentQuestionType depend on step, which is already tracked

  // Get question text based on step
  const getQuestionText = () => {
    const questions = [
      '', // Step 1: Welcome
      'What\'s your name?',
      'Enter your email',
      'Company/Project Name',
      'Website or Social Media Link (optional)',
      'What\'s the big idea, and what are your goals?',
      'When do you want to launch?',
      'Which of our services are you interested in?',
      'What\'s your ballpark budget?',
      'Where did you hear about us?'
    ];
    return questions[step - 1] || '';
  };
  
  // Get question subtitle/description
  const getQuestionSubtitle = () => {
    if (step === 9) return 'This helps us create a proposal that fits your vision and resources.';
    if (step === 10) return 'Who sent you our way? We\'d love to know.';
    return '';
  };
  
  // Get question title/header (for text input questions)
  const getQuestionTitle = () => {
    if (step === 2) return 'Let\'s start with an introduction';
    if (step === 3) return 'Where can we reach you with next steps?';
    if (step === 4) return 'What should we call this masterpiece in the making?';
    if (step === 5) return 'Where can we see your brand in action?';
    if (step === 6) return 'Tell us about your project.';
    return '';
  };

  // Get options based on step
  const getQuestionOptions = () => {
    if (step === 7) {
      return [
        { id: 'urgent', label: 'Urgent (ASAP)' },
        { id: '1-2-months', label: '1 - 2 months' },
        { id: '3-6-months', label: '3 - 6 months' },
        { id: 'flexible', label: 'Flexible, let\'s discuss' }
      ];
    }
    if (step === 8) {
      return [
        { id: 'brand-identity', label: 'Brand Identity' },
        { id: 'brand-strategy', label: 'Brand Strategy' },
        { id: 'web-design', label: 'Web Design' },
        { id: 'ui-ux-design', label: 'UI/UX Design' },
        { id: 'marketing-assets', label: 'Marketing Assets' },
        { id: 'event-design', label: 'Event Design' },
        { id: 'development', label: 'Development Services' },
        { id: 'other', label: 'Other' }
      ];
    }
    if (step === 9) {
      return [
        { id: '2k-5k', label: '$2k - $5k' },
        { id: '5k-10k', label: '$5k - $10k' },
        { id: '10k-20k', label: '$10k - $20k' },
        { id: '20k-50k', label: '$20k - $50k' },
        { id: '50k-100k+', label: '$50k - $100k+' }
      ];
    }
    if (step === 10) {
      return [
        { id: 'referral', label: 'Referral' },
        { id: 'social-media', label: 'Social Media' },
        { id: 'google-search', label: 'Google Search' },
        { id: 'event-conference', label: 'Event or Conference' },
        { id: 'other', label: 'Other' }
      ];
    }
    return [];
  };

  // Animation variants for framer-motion - enhanced for smoother transitions
  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: 50,
      scale: 0.95
    },
    in: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
    out: { 
      opacity: 0, 
      x: -50,
      scale: 0.95
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.4
  };

  return (
    <div className="text-white h-screen w-screen overflow-hidden overflow-y-hidden relative flex flex-col items-center justify-center bg-[#080808]">
      
      {/* Progress Bar - hidden on success page */}
      {!showSuccess && (
      <div className="fixed top-0 left-0 w-full h-[5px] bg-[#00D7D7]/20 z-[2000]">
        <div 
          className="h-full transition-all duration-300 ease-out relative progress-bar-turquoise" 
          style={{
            width: `${Math.max(((step - 1) / (maxSteps - 1)) * 100, 0)}%`,
            background: 'linear-gradient(90deg, #00D7D7 0%, #89FFFF 25%, #00E5E5 50%, #00D7D7 75%, #6DFFFF 100%)',
            boxShadow: '0 0 15px rgba(0, 215, 215, 0.8), 0 0 25px rgba(137, 255, 255, 0.4)'
          }}
        >
          {/* Glowing tip */}
          <div 
            className="absolute top-0 right-0 w-[3px] h-full glow-tip"
            style={{
              background: 'linear-gradient(180deg, #89FFFF 0%, #00E5E5 50%, #00D7D7 100%)',
              boxShadow: '0 0 12px rgba(137, 255, 255, 0.9), 0 0 20px rgba(0, 215, 215, 0.7)',
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      </div>
      )}
      
      {/* Exit Button - Moved to top right - hidden on success page */}
      {!showSuccess && (
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
      )}
      
      {/* Navigation Buttons - Only for question screens (step > 1) - hidden on success page */}
      {!showSuccess && step > 1 && (
        <div className="absolute top-[4%] left-[4%] z-[2000] flex gap-2">
          {/* Back Button */}
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
          
          {/* Forward Button - only show if not on last step AND current question has an answer (with delay) */}
          {step < maxSteps && showForwardButton && (
            <button 
              type="button" 
              onClick={validateAndProceed}
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
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
      
      {/* Form Container - centered on screen */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-[1000] p-5">
        {/* Logo - only show on welcome screen */}
        {!showSuccess && getCurrentQuestionType() === 'welcome' && (
          <Image 
            src="/images/avyra-brandmark.svg" 
            alt="Avyra" 
            width={120} 
            height={40} 
            className="mb-5 avyra-logo-intake"
          />
        )}
        
        {/* Success Page - shown after form submission */}
        {showSuccess && (
          <motion.div
            className="flex flex-col items-center text-center justify-center w-full outline-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
          >
            {/* Turquoise Checkmark Icon */}
            <div ref={successCheckmarkRef} className="mb-8" style={{ opacity: 0 }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="#00D7D7" strokeWidth="4"/>
                <path d="M30 50L43 63L70 36" stroke="#00D7D7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1 
              ref={successHeadingRef}
              className="text-[42px] md:text-[56px] lg:text-[64px] font-medium leading-tight tracking-[-2px] mb-6 text-white"
              style={{ opacity: 0 }}
            >
              Application submitted!
            </h1>
            
            <p 
              ref={successParagraphRef}
              className="text-[#B2B2B2] text-base md:text-xl font-normal mb-10 w-[90%] sm:w-[85%] md:w-[80%] max-w-2xl mx-auto leading-relaxed"
              style={{ opacity: 0 }}
            >
              Thank you for your application. Our team will review it and get back to you within 1-2 business days to schedule your Dream Discovery Call.
            </p>
            
            <Link 
              ref={successButtonRef}
              href="/portfolio"
              className="py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg flex items-center justify-center font-medium group"
              style={{ opacity: 0 }}
            >
              Let&apos;s Start Dreaming
              <Image 
                src="/icons/black-arrow.svg" 
                alt="Arrow" 
                width={13}
                height={13}
                className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        )}
        
        {!showSuccess && (
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
                className="text-[42px] md:text-[64px] lg:text-[80px] font-medium leading-[110%] tracking-[-2px] mb-6"
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
               Welcome to Avyra
              </h1>
                    <p className="text-[#B2B2B2] text-base md:text-xl font-normal mb-8 md:mb-10 w-[90%] sm:w-[85%] md:w-[90%] max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              At Avyra, we&apos;re more than builders. We&apos;re your strategic partner in bringing world-changing ideas to life. Apply now to explore how we can co-create an experience that transforms your brand.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-3 welcome-buttons items-center justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 welcome-btn flex items-center justify-center font-medium group"
                  >
                   Let&apos;s go!
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
                
                <div className="flex items-center gap-2 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm md:text-base">Takes 2 mins</span>
                </div>
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
          
          {/* All Question Types - Single AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {getCurrentQuestionType() === 'multiple' && (
              <motion.div
                key={`question-${step}`}
                className="flex flex-col items-start text-left w-full"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
              <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">
                {getQuestionText()}
              </h2>
              <div className="flex items-baseline gap-2 mb-6">
                {getQuestionSubtitle() && (
                  <p className="text-[14px] md:text-lg text-[#aaa] font-normal">{getQuestionSubtitle()}</p>
                )}
                <p className="text-[14px] md:text-lg text-[#888] subheader">(Select one)</p>
              </div>
              
              <div className="flex flex-col w-full gap-3">
                {getQuestionOptions().map((option) => {
                  const fieldName = getCurrentFieldName();
                  const currentValue = fieldName ? watch(fieldName) : '';
                  
                  return (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                        {...register(fieldName as keyof FormData, { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                      <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${currentValue === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                  );
                })}
              </div>
              </motion.div>
            )}
            
            {getCurrentQuestionType() === 'checkbox' && (
              <motion.div
                key={`question-${step}`}
                className="flex flex-col items-start text-left w-full"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
              <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">
                {getQuestionText()}
              </h2>
               <p className="text-[14px] md:text-lg text-[#888] mb-6 subheader">(Check all that apply)</p>
              
              <div className="flex flex-col w-full gap-3">
                {getQuestionOptions().map((option) => {
                  const fieldName = getCurrentFieldName();
                  const currentValue = fieldName ? watch(fieldName) as string[] : [];
                  const isChecked = Array.isArray(currentValue) && currentValue.includes(option.id);
                  
                  return (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={option.id}
                        {...register('services')}
                      className="hidden hidden-checkbox"
                    />
                      <div className={`flex items-center justify-between border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 ${isChecked ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="text-white text-base md:text-lg">{option.label}</span>
                      {isChecked && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkmark-icon">
                          <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </label>
                  );
                })}
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
              
              {/* Error message with fixed height so it doesn't shift content */}
              <div className="h-[32px] mt-[10px]">
                {validationError && (
                  <p className="text-[#ff4c4c] text-base error-message animate-fade-in">
                    {validationError}
                  </p>
                )}
              </div>
              </motion.div>
            )}
            
            {getCurrentQuestionType() === 'text' && (
            <motion.div
              key={`question-${step}`}
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Title/Header if exists */}
              {getQuestionTitle() && (
                <h1 className="text-[1.75rem] leading-[36px] md:text-[38px] lg:text-[42px] md:leading-normal mb-2 font-normal question">
                  {getQuestionTitle()}
                </h1>
              )}
              
              <h2 className="text-[15px] md:text-[18px] leading-normal mb-[42px] font-normal question text-[#aaa]">
                {getQuestionText()}
              </h2>
              
              <div className="bg-transparent border-b border-white/30 pb-2 w-full mb-6">
                <input
                  {...register(getCurrentFieldName() as keyof FormData)}
                  type={getCurrentFieldName() === 'email' ? 'email' : 'text'}
                  className="w-full bg-transparent text-white text-[18px] md:text-[20px] font-normal focus:outline-none placeholder:text-gray-600"
                  autoFocus
                  onChange={(e) => {
                    const fieldName = getCurrentFieldName();
                    if (fieldName) {
                      register(fieldName).onChange(e);
                      if (validationError) {
                        setValidationError('');
                      }
                    }
                  }}
                />
              </div>
              
              <div className="flex gap-3 items-center">
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
              
              {/* Error message with fixed height so it doesn't shift content */}
              <div className="h-[32px] mt-[10px]">
                {validationError && (
                  <p className="text-[#ff4c4c] text-base error-message animate-fade-in">
                    {validationError}
                  </p>
                )}
              </div>
            </motion.div>
            )}
            {getCurrentQuestionType() === 'submit' && (
              <motion.div
                key="submit-page"
                className="flex flex-col items-center text-center justify-center w-full outline-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0 }}
              >
                <h1 
                  ref={submitHeadingRef}
                  className="text-[28px] md:text-[36px] lg:text-[42px] font-medium leading-[130%] tracking-[-1px] mb-8 max-w-5xl px-4"
                  style={{
                    background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    textAlign: "center",
                    fontFamily: "Inter",
                    opacity: 0
                  }}
                >
                  Thank you for sharing your goals with us. We love partnering with forward-thinking clients to create groundbreaking projects. Book your Dream Discovery Call and let&apos;s bring your vision to life!
                </h1>
                
                <button
                  ref={submitButtonRef}
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                  className="py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg flex items-center justify-center font-medium group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Book'}
                  {!isSubmitting && (
                    <Image 
                      src="/icons/black-arrow.svg" 
                      alt="Arrow" 
                      width={13}
                      height={13}
                      className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                    />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* All old question sections removed - using dynamic rendering above */}
          
          {/* Final step removed - form auto-submits after last question */}
        </form>
        )}
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
        
        /* Checkmark icon animation */
        .checkmark-icon {
          animation: checkmarkFadeIn 0.2s ease-in;
        }
        
        @keyframes checkmarkFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Error message fade in animation */
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        .progress-bar-turquoise {
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar-turquoise::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(137, 255, 255, 0.8) 50%, transparent 100%);
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