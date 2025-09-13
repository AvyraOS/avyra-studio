import Image from 'next/image';

interface Feature {
  icon: string;
  text: string;
}

interface AgentCardProps {
  title: string;
  description: string;
  features: Feature[];
  ctaText: string;
  videoSrc: string;
}

const AgentCard = ({
  title,
  description,
  features,
  ctaText,
  videoSrc
}: AgentCardProps) => {

  // Function to get mobile-specific CTA text
  const getMobileCTAText = () => {
    return ctaText;
  };

  return (
    <div className="bg-[rgba(8,8,8,0.2)] rounded-[20px] relative overflow-hidden border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)]">
      {/* Light gradient overlay */}
      <div 
        className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 612px 260px at 95% 8%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)'
        }}
      />
      
      {/* Card Content - Responsive Layout */}
      <div className="relative z-20 flex flex-col min-[1200px]:flex-row">
        
        {/* Content Side - Left on desktop, top on mobile */}
        <div className="flex-1 p-6 sm:p-4 lg:p-8 xl:p-[56px] flex flex-col">
          
          {/* Top Content */}
          <div className="flex flex-col gap-4 sm:gap-6">
            
            {/* Card Header */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 
                className="text-[22px] sm:text-[28px] lg:text-[32px] leading-[28px] sm:leading-[36px] lg:leading-[44.8px] tracking-[-0.66px] sm:tracking-[-0.84px] lg:tracking-[-0.96px] font-medium"
                style={{
                  background: 'radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {title}
              </h3>
              <p className="hidden sm:block text-[#d5dbe6] text-[14px] sm:text-[16px] leading-[20px] sm:leading-[25.6px] tracking-[-0.24px] sm:tracking-[-0.32px]">
                {description}
              </p>
            </div>

            {/* CTA Button - Hidden on mobile, shown on desktop */}
            <div className="w-fit hidden min-[1200px]:block">
              <button className="bg-[#1f1f1f] px-4 sm:px-4 py-3 sm:py-2.5 rounded-lg flex items-center gap-2.5 sm:gap-2.5 h-10 sm:h-10">
                <span className="text-white text-[14px] sm:text-[16px] font-semibold leading-[18px] sm:leading-[20px] tracking-[-0.14px] sm:tracking-[-0.16px]">
                  {ctaText}
                </span>
                <div className="w-3 sm:w-4 h-3 sm:h-4 relative">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289L13.7071 7.29289C14.0976 7.68342 14.0976 8.31658 13.7071 8.70711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L10.5858 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H10.5858L8.29289 4.70711C7.90237 4.31658 7.90237 3.68342 8.29289 3.29289Z" fill="white"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Features List - Responsive spacing from CTA button */}
          <div className="flex flex-col gap-[10px] sm:gap-[13px] max-w-[418px] mt-[24px] sm:mt-[32px] lg:mt-[42px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-5 sm:w-6 h-5 sm:h-6 relative flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={`Feature ${index + 1} icon`}
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-[#d5dbe6] text-[14px] sm:text-[16px] leading-[20px] sm:leading-[25.6px] tracking-[-0.24px] sm:tracking-[-0.32px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Side - Right on desktop, bottom on mobile */}
        <div className="flex-shrink-0 min-[1200px]:w-[580px] xl:w-[640px] 2xl:w-[700px] flex flex-col bg-black rounded-b-[20px] min-[1200px]:rounded-b-none min-[1200px]:rounded-r-[20px] min-[1200px]:rounded-bl-none">
          {/* Video Container with proper aspect ratio */}
          <div className="w-full h-full relative flex-1">
            {/* Aspect ratio container for responsive behavior - adjusted for ~481px video height */}
            <div className="w-full aspect-video min-[1200px]:aspect-[580/481] bg-black rounded-b-[20px] min-[1200px]:rounded-b-none min-[1200px]:rounded-r-[20px] min-[1200px]:rounded-bl-none flex items-center justify-center min-h-[240px] min-[1200px]:h-[481px] overflow-hidden">
              {/* Video Element */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Mobile CTA Button - Only visible on mobile, underneath video */}
          <div className="min-[1200px]:hidden">
            <button 
              className="bg-[#1f1f1f] flex items-center justify-center gap-2.5"
              style={{
                width: '100%',
                borderRadius: '0px',
                height: '58px'
              }}
            >
              <span className="text-white text-[16px] font-semibold leading-[20px] tracking-[-0.16px]">
                {getMobileCTAText()}
              </span>
              <div className="w-4 h-4 relative">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289L13.7071 7.29289C14.0976 7.68342 14.0976 8.31658 13.7071 8.70711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L10.5858 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H10.5858L8.29289 4.70711C7.90237 4.31658 7.90237 3.68342 8.29289 3.29289Z" fill="white"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
