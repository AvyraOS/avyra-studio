'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TextRevealProps = {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 100, opacity: 0 })

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.8,
        stagger: { each: 0.05 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 50%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const words = text.split(' ')

  return (
    <div ref={rootRef} className={className}>
      <span style={{ display: 'inline-block', overflow: 'hidden' }}>
        {words.map((w, i) => (
          <span
            key={i}
            data-word
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </div>
  )
}


