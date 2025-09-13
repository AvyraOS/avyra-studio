"use client";

import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
 
  {
    id: 1,
    name: "Zac Barron",
    role: "Founder",
    company: "Dexari", 
    testimonial: "My output doubled without hiring a team, thanks to Avyra's AI assistants",
    avatar: "/images/user-avatar-4.png"
  },
  {
    id: 2,
    name: "July Gratton", 
    role: "Founder",
    company: "Netty Worth",
    testimonial: "As a skeptic, I’m now convinced. Avyra came in and automated 80% of our workflow in 3 weeks.",
    avatar: "/images/user-avatar-2.png"
  },
  {
    id: 3,
    name: "Zahid Islam",
    role: "CEO & Founder", 
    company: "Jutsu",
    testimonial: "A total game-changer. Avyra gave me 40+ hours back every month.",
    avatar: "/images/user-avatar-3.png"
  }, 
  {
    id: 4,
    name: "Elliot Bream",
    role: "Founder",
    company: "Try Livepeer",
    testimonial: "Revenue jumped 28% in month one. Avyra freed us to focus on growth, not admin",
    avatar: "/images/user-avatar-1.png"
  }
 
];

export default function TrustedBy() {
  const handleVideoClick = () => {
    // Video functionality would be implemented here
  };

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-8 px-4">
        <div className="flex flex-col gap-6 items-center justify-start w-full max-w-[467px]">
          {/* Top Pill */}
          <div className="flex gap-2.5 items-center justify-start">
            <div className="bg-[#1b1c20] h-[31px] overflow-hidden rounded-[24.15px] px-[8.6px] flex items-center gap-2">
              <div className="bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] rounded-[6.9px] w-[6.9px] h-[6.9px] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
              <div className="bg-clip-text bg-gradient-to-b font-['Inter'] font-medium from-[#f2c6a6] text-[14px] to-[#bc845b] tracking-[-0.14px] text-transparent leading-[22px]">
                REVIEWS
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h2 className="bg-clip-text font-['Inter'] font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px] whitespace-nowrap"
               style={{
                 backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
               }}>
            Trusted by <span className="font-['Instrument_Serif'] italic">Visionaries</span>
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="flex flex-col font-['Inter'] font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          Hear from real users who achieved success with our automation
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto px-4">
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[1200px] relative">
            <div className="flex gap-6 items-start">
              
              {/* Left Side - Video Card (33% width) */}
              <div style={{ width: '33%' }}>
                <div className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-8 h-[420px] relative overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute h-[306px] opacity-10 right-0 top-0 w-full pointer-events-none"
                       style={{
                         backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 437 306\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(21.85 0 0 15.3 409.47 24.786)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                       }} />
                  
                  {/* Video Thumbnail */}
                  <div className="relative w-full h-[292px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[34px] overflow-hidden">
                    <Image
                      src="/images/video-thumbnail.jpg"
                      alt="Video testimonial thumbnail"
                      fill
                      className="object-cover"
                    />
                    
                    {/* Play Button */}
                    <button
                      onClick={handleVideoClick}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      <div className="w-[58px] h-[58px] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                          <path d="M8 5v14l11-7z" fill="currentColor"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                  
                  {/* Video Testimonial Text */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                    &quot;Avyra replaced what would have been 3 hires. Saving us 50% on operational costs!&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Testimonial Cards (67% width) */}
              <div style={{ width: '67%' }}>
                <div className="grid grid-cols-2 gap-6 h-[420px]">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 flex flex-col relative overflow-hidden">
                      {/* Background Glow */}
                      <div className="absolute h-full opacity-10 right-0 top-0 w-full pointer-events-none"
                           style={{
                             backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 380 199\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(19 0 0 9.95 356.06 16.119)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                           }} />
                      
                      {/* User Info */}
                      <div className="relative z-10 flex items-center gap-3 mb-4">
                        <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-[rgba(207,231,255,0.2)]">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                            {testimonial.name}
                          </div>
                          <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial Text */}
                      <div className="relative z-10 flex-1">
                        <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                          &quot;{testimonial.testimonial}&quot;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Video Card */}
          <div className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 relative overflow-hidden">
            {/* Video Thumbnail */}
            <div className="relative w-full h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-4">
              <Image
                src="/images/video-thumbnail.jpg"
                alt="Video testimonial thumbnail"
                fill
                className="object-cover"
              />
              
              {/* Play Button */}
              <button
                onClick={handleVideoClick}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            {/* Video Testimonial Text */}
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
              &quot;I was drowning in work. AVYRA cut my tools in half and saved me 12+ hours a week.&quot;
            </p>
          </div>
          
          {/* Mobile Testimonials - Show only 2 */}
          <div className="space-y-4">
            {testimonials.slice(0, 2).map((testimonial) => (
              <div key={testimonial.id} className="bg-[#080808] rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute h-full opacity-10 right-0 top-0 w-full pointer-events-none"
                     style={{
                       backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 380 199\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(19 0 0 9.95 356.06 16.119)\"><stop stop-color=\"rgba(184,199,217,0.5)\" offset=\"0\"/><stop stop-color=\"rgba(184,199,217,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
                     }} />
                
                {/* User Info */}
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-[rgba(207,231,255,0.2)]">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <div className="relative z-10">
                  <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                    &quot;{testimonial.testimonial}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
