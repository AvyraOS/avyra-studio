"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  // Clean up body overflow when component unmounts or menu closes
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Handle scroll behavior for sticky navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll position for background opacity
      setScrollY(currentScrollY);
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down (but not if mobile menu is open)
      else if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Glass Background Container */}
        <div 
          className="w-full max-w-[1350px] h-[70px] md:h-[98px] mx-auto transition-all duration-300 ease-in-out"
          style={{
            borderRadius: '0 0 24px 24px',
            background: (scrollY > 50 && isVisible) ? `rgba(0, 0, 0, ${Math.min(0.5, (scrollY - 50) / 150)})` : 'transparent',
            backdropFilter: (scrollY > 50 && isVisible) ? `blur(${Math.min(44.7, ((scrollY - 50) / 150) * 44.7)}px)` : 'none',
            WebkitBackdropFilter: (scrollY > 50 && isVisible) ? `blur(${Math.min(44.7, ((scrollY - 50) / 150) * 44.7)}px)` : 'none'
          }}
        >
          <div className="h-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* Mobile Logo - Brandmark */}
              <Image 
                src="/images/avyra-brandmark.svg" 
                alt="Avyra Logo" 
                width={32}
                height={32}
                className="h-8 w-8 lg:hidden"
              />
              {/* Desktop Logo - Full Logo */}
              <Image 
                src="/images/avyra-nav-logo.svg" 
                alt="Avyra Logo" 
                width={120}
                height={32}
                className="h-8 w-auto hidden lg:block"
              />
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link 
                href="#solutions" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Solutions
              </Link>
              {/* <Link 
                href="#results" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Results
              </Link> */}
           
              <Link 
                href="#pricing" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Pricing
              </Link>
              <Link 
                href="#blog" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Blog
              </Link>
              <Link 
                href="#community" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Community
              </Link>
            </div>

            {/* Get Started Button - Only show on large screens */}
            <Link href="/intake" className="hidden lg:block group">
              <div className="inline-flex h-10 relative rounded-[100px] shadow-[inset_0px_0px_8px_0px_rgba(248,248,248,0.25),0px_32px_24px_-16px_rgba(0,0,0,0.40)] border-[1.5px] border-[#484848] overflow-hidden justify-center items-center p-1 transition-all duration-300">
                <div className="inline-flex h-8 bg-gradient-to-b from-[rgba(18,18,18,0.30)] to-[rgba(18,18,18,0.30)] bg-[rgba(248,248,248,0.01)] rounded-[100px] border-[1.5px] border-[#242424] backdrop-blur-[6px] overflow-hidden items-center justify-center px-6 transition-all duration-300 group-hover:shadow-[inset_0px_0px_20px_0px_rgba(255,255,255,0.1),inset_0px_0px_12px_0px_rgba(255,255,255,0.15),inset_0px_0px_6px_0px_rgba(255,255,255,0.2)] group-hover:border-white/20">
                  <div className="text-[#f8f8f8]/95 text-sm font-normal font-inter leading-tight transition-colors duration-300 group-hover:text-white whitespace-nowrap">Get Started</div>
                </div>
              </div>
            </Link>

            {/* Mobile Menu Hamburger Button - Show on medium and smaller screens */}
            <button 
              className="lg:hidden w-6 h-6 flex flex-col justify-center space-y-1 z-50 relative"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Slide Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#0F0F0F] z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={closeMobileMenu}>
              <Image 
                src="/images/avyra-nav-logo.svg" 
                alt="Avyra Logo" 
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
            <Link 
              href="#solutions" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#f2c6a6] transition-colors"
              onClick={closeMobileMenu}
            >
              Solutions
            </Link>
            {/* <Link 
              href="#results" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#f2c6a6] transition-colors"
              onClick={closeMobileMenu}
            >
              Results
            </Link> */}
            <Link 
              href="#pricing" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#f2c6a6] transition-colors"
              onClick={closeMobileMenu}
            >
              Pricing
            </Link>
            <Link 
              href="#blog" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#f2c6a6] transition-colors"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link 
              href="#community" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#f2c6a6] transition-colors"
              onClick={closeMobileMenu}
            >
              Community
            </Link>
          </div>

          {/* CTA Button at Bottom */}
          <div className="p-6 border-t border-white/10">
            <Link 
              href="/intake" 
              onClick={closeMobileMenu}
              className="block w-full group"
            >
              <div className="relative w-full h-12 rounded-lg overflow-hidden">
                {/* Button Background with Glow */}
                <div 
                  className="absolute inset-0 p-[2px] rounded-lg"
                  style={{
                    background: "radial-gradient(50% 20.7% at 50% 100%, #C6FFFF 0%, rgba(198, 255, 255, 0.00) 100%)"
                  }}
                >
                  {/* Button Content */}
                  <div className="w-full h-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] text-[#000000] rounded-lg flex items-center justify-center text-base font-medium font-inter transition-all duration-300 hover:opacity-90">
                    <span>Get Started</span>
                    <svg 
                      className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar; 