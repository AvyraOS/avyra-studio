'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TextScrollHighlightProps = {
  text: string
  className?: string
  fromColor?: string
  toColor?: string
  staggerEach?: number
}

export function TextScrollHighlight({
  text,
  className,
  fromColor = 'rgba(255,255,255,0.18)',
  toColor = '#ffffff',
  staggerEach = 0.08,
}: TextScrollHighlightProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))

    const ctx = gsap.context(() => {
      gsap.set(words, { color: fromColor })

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }).to(words, {
        color: toColor,
        stagger: { each: staggerEach },
      })
    }, el)

    return () => ctx.revert()
  }, [fromColor, toColor, staggerEach])

  const parts = text.split(' ')

  return (
    <div ref={rootRef} className={className}>
      <span style={{ display: 'inline-block' }}>
        {parts.map((w, i) => (
          <span
            key={i}
            data-word
            style={{ display: 'inline-block', willChange: 'color' }}
          >
            {w}
            {i < parts.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </div>
  )
}


