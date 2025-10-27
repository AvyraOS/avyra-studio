/**
 * Mobile detection utilities for animations
 * Helps disable problematic animations on mobile devices while keeping fade effects
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check screen width (mobile breakpoint)
  const isMobileWidth = window.innerWidth < 1024; // lg breakpoint
  
  // Check user agent for mobile devices
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Return true if any mobile indicator is present
  return isMobileWidth || isMobileUserAgent || isTouchDevice;
};

/**
 * Get animation config based on device type
 * Returns different animation properties for mobile vs desktop
 */
export const getAnimationConfig = (isMobile: boolean = isMobileDevice()) => {
  return {
    // Fade animations (safe for mobile)
    fadeIn: {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    },
    fadeInStagger: {
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    },
    
    // Movement animations (disabled on mobile)
    slideUp: isMobile ? {
      // Mobile: only fade, no movement
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    } : {
      // Desktop: fade + upward movement
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    },
    
    slideUpStagger: isMobile ? {
      // Mobile: only fade, no movement
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    } : {
      // Desktop: fade + upward movement
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    },
    
    // Scale animations (reduced on mobile)
    scaleIn: isMobile ? {
      // Mobile: only fade, minimal scale
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
      ease: "power2.out"
    } : {
      // Desktop: fade + scale
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.out"
    }
  };
};

/**
 * ScrollTrigger settings optimized for mobile
 */
export const getScrollTriggerConfig = (isMobile: boolean = isMobileDevice()) => {
  return {
    // More conservative trigger points on mobile
    start: isMobile ? "top 90%" : "top 80%",
    end: isMobile ? "bottom 20%" : "bottom 10%",
    
    // Disable some advanced features on mobile for performance
    scrub: isMobile ? false : undefined,
    pin: isMobile ? false : undefined,
    
    // Always use "play none none none" to prevent scroll interference
    toggleActions: "play none none none"
  };
};
