"use client"

import Image from 'next/image'
import clsx from 'clsx'
import { ReactNode, forwardRef } from 'react'

type TestimonialProps = {
  quote: string
  name: string
  role: string
  avatarSrc?: string
}

type FeaturedProjectSectionProps = {
  title: string | ReactNode
  subtitle?: string
  descriptionParagraphs: string[]
  pills: string[]
  imageSrc: string
  imageAlt: string
  imageSide?: 'right' | 'left'
  scopeLabel?: string
  className?: string
  id?: string
  centerImage?: boolean
  testimonial?: TestimonialProps
  hideScope?: boolean
}

type PillProps = { label: string }

function ScopePill({ label }: PillProps) {
  return (
    <span className="text-white/60 border border-[#4d4f57] rounded-[24px] px-4 py-2 text-[12px] sm:px-5 sm:py-2.5 sm:text-[13px] md:px-[20px] md:py-[12px] md:text-[14px] leading-[12px]">
      {label}
    </span>
  )
}

const FeaturedProjectSection = forwardRef<HTMLElement, FeaturedProjectSectionProps>(({
  title,
  subtitle = 'FEATURED PROJECT',
  descriptionParagraphs,
  pills,
  imageSrc,
  imageAlt,
  imageSide = 'right',
  scopeLabel = 'SCOPE',
  className,
  id,
  centerImage = false,
  testimonial,
  hideScope = false,
}, ref) => {
  const isRight = imageSide === 'right'

  return (
    <section ref={ref} id={id} className={clsx("relative w-full min-h-0 sm:min-h-[600px] md:min-h-screen overflow-hidden bg-[#0d0d0d]", className)}>
      {/* Side background gradient */}
      <div className={clsx(
        "pointer-events-none absolute top-0 hidden h-full w-1/2 bg-gradient-to-l md:block",
        isRight ? "right-0 from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" : "left-0 from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent rotate-180"
      )} />

      {/* Image container */}
      <div className={clsx(
        "absolute inset-y-0 hidden h-full w-[50%] overflow-hidden md:block",
        isRight ? "right-0" : "left-0"
      )}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={clsx(
            "object-cover scale-[1.06] -translate-y-[1%]",
            centerImage ? "object-center" : (isRight ? "object-right" : "object-left")
          )}
        />

        {/* Image-side gradients */}
        <div className="pointer-events-none absolute inset-0">
          {isRight ? (
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
          ) : (
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
          )}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0d0d0d]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0d0d]/70 to-transparent" />
        </div>
      </div>

      <div className={clsx(
        "relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-20 md:gap-12 md:px-8 md:py-24 lg:gap-14 lg:px-10 lg:py-32 xl:py-40",
        isRight ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
      )}>
        {/* Text column */}
        <div className={clsx("z-[1] md:max-w-[600px] lg:max-w-none", isRight ? "order-1" : "order-2 lg:pl-8")}> 
          <p className="font-inter font-medium text-[10px] tracking-[2px] text-white/50 uppercase sm:text-[10.5px] md:text-[11px]">
            {subtitle}
          </p>

          <h2
            className="mt-4 sm:mt-5 md:mt-6 font-inter font-medium leading-[0.95] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(28px, 6.5vw, 64px)',
              background: 'radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            {title}
          </h2>

          <div className="mt-4 sm:mt-5 md:mt-6 w-full max-w-full sm:max-w-[52ch] md:max-w-[56ch] lg:max-w-[58ch] text-[#d5dbe6] text-[14px] sm:text-[15px] md:text-[15.5px] lg:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[25px] lg:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.30px] md:tracking-[-0.31px] lg:tracking-[-0.32px] font-inter font-normal">
            {descriptionParagraphs.map((text, idx) => (
              <p key={idx} className={idx > 0 ? "mt-4" : undefined}>{text}</p>
            ))}
          </div>

          {!hideScope && (
            <>
              <p className="mt-12 sm:mt-14 md:mt-20 lg:mt-[100px] font-inter font-medium text-[10px] tracking-[2px] text-white/50 uppercase sm:text-[10.5px] md:text-[11px]">
                {scopeLabel}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 sm:gap-[6px] md:gap-[7px]">
                {pills.map((p) => (
                  <ScopePill key={p} label={p} />
                ))}
              </div>
            </>
          )}

          {/* Testimonial Section */}
          {testimonial && (
            <div className="mt-12 sm:mt-14 md:mt-20 lg:mt-[100px]">
              {/* Rating Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                      fill="#FFD700"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#d5dbe6] text-[14px] sm:text-[15px] md:text-[15.5px] lg:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[25px] lg:leading-[25.6px] tracking-[-0.28px] sm:tracking-[-0.30px] md:tracking-[-0.31px] lg:tracking-[-0.32px] font-inter font-normal italic mb-6 max-w-[381px]">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                {testimonial.avatarSrc && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatarSrc}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-inter font-bold text-[14px] leading-[22px]">
                    {testimonial.name}
                  </span>
                  <span className="text-white/80 font-inter font-normal text-[14px] leading-[22px]">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile image (hidden on md+) */}
        <div className={clsx("relative md:hidden mt-8 sm:mt-10", isRight ? "order-2" : "order-1")}> 
          <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-lg">
            <Image src={imageSrc} alt={imageAlt} fill className={clsx("object-cover", isRight ? "object-center" : "object-center")} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
})

FeaturedProjectSection.displayName = 'FeaturedProjectSection'

export default FeaturedProjectSection


