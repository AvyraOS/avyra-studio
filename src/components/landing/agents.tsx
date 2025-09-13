import AgentCard from './agent-card';
import { agentsData } from './agents-data';
import EarlyAccessWaitlist from './early-access-waitlist';

const Agents = () => {

  return (
    <section 
      className="relative w-full min-h-[1100px] bg-[#080808] overflow-hidden"
      id="agents"
    >
      {/* Container to center content */}
      <div className="container mx-auto px-4 py-24">
        
        {/* Header Section - Centered */}
        <div className="text-center mb-8">
          
          {/* Section Pill */}
          <div className="mb-6 flex justify-center">
            <div className="bg-[#1b1c20] h-[31px] w-[125px] rounded-[24px] relative overflow-hidden">
              {/* Gradient dot */}
              <div className="absolute left-[8.6px] top-[6.6px] w-[18.4px] h-[18.4px]">
                <div className="absolute left-1/2 top-[31.25%] bottom-[31.25%] w-[6.9px] rounded-[6.9px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] transform -translate-x-1/2">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]" />
                </div>
              </div>
              {/* Text */}
              <div className="absolute left-[27.6px] top-[4.6px] bg-gradient-to-b from-[#f2c6a6] to-[#bc845b] bg-clip-text text-transparent font-medium text-[14px] leading-[22px] tracking-[-0.14px]">
                THE AVIARY
              </div>
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
                Meet Your Complete{' '}
              </span>
              <br />
              <span 
                style={{
                  fontFamily: '"Instrument Serif"',
                  fontStyle: 'italic',
                  fontWeight: '400'
                }}
              >
                AI Workforce
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-[640px] mx-auto">
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px]">
              Your AI-powered dream team. Each agent is built to buy back your time and scale what matters most.
            </p>
          </div>
        </div>

        {/* Agent Cards Section */}
        <div className="flex justify-center">
          <div className="flex flex-col gap-[42px] lg:gap-6 max-w-[1224px] w-full">
          {agentsData.map((agent, index) => (
            <AgentCard
              key={index}
              category={agent.category}
              title={agent.title}
              description={agent.description}
              features={agent.features}
              ctaText={agent.ctaText}
              videoSrc={agent.videoSrc}
            />
          ))}
          </div>
        </div>
      </div>

      {/* Early Access Waitlist Section */}
      <EarlyAccessWaitlist />
    </section>
  );
};

export default Agents;