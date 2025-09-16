import ServiceCard from './service-card';
import { servicesData } from './services-data';

const Services = () => {
  return (
    <section 
      className="relative w-full min-h-[1100px] bg-[#080808] overflow-hidden"
      id="services"
    >
      {/* Container to center content */}
      <div className="container mx-auto px-4 py-24">
        
        {/* Header Section - Centered */}
        <div className="text-center mb-8">
          
          {/* Section Tag */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7]"></div>
              <span 
                className="font-['Inter'] font-medium text-[14px] leading-[22px] tracking-[-0.14px]"
                style={{
                  background: 'linear-gradient(180deg, #89FFFF 0%, #00D7D7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                SERVICES
              </span>
            </div>
          </div>

          {/* Main Title with Unified Gradient */}
          <div className="mb-6">
            <h2 
              className="text-center text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[38px] sm:leading-[43px] md:leading-[48px] lg:leading-[52.8px]"
              style={{
                background: 'radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <span 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500'
                }}
              >
                Meet Your All-In-One{' '}
              </span>
              <br />
              <span className="font-instrument-serif italic font-normal">
                Design Team
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-[640px] mx-auto">
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px]">
              From branding to product, websites to content. Studio is your unfair advantage.
            </p>
          </div>
        </div>

        {/* Service Cards Section */}
        <div className="flex justify-center">
          <div className="flex flex-col gap-[42px] lg:gap-6 max-w-[1224px] w-full">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                ctaText={service.ctaText}
                imageSrc={service.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;