'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useRef } from 'react'

export default function HoursTicker() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Raw motion value ticks 12.0 → 0.0 across scroll
  const hours = useTransform(scrollYProgress, [0.1, 0.85], [12, 0])
  const hoursDisplay = useTransform(hours, (v) => v.toFixed(1))

  // Color lerps from rust (bad) to gold (good)
  const numberColor = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    ['#c9571f', '#8a6e3f']
  )

  // Progress bar mirrors the same value
  const barWidth = useTransform(scrollYProgress, [0.1, 0.85], ['100%', '0%'])
  const barColor = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    ['#c9571f', '#8a6e3f']
  )

  // Before label — visible during scroll down, gone by time timer hits 0
  const beforeOpacity = useTransform(scrollYProgress, [0.1, 0.65, 0.8], [1, 1, 0])
  // After label — fades in after timer reaches 0
  const afterOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1])

  // Closing headline
  const headlineOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[240vh]"
      aria-label="Hours saved per week counter"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6e3f]/40 to-transparent w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-10">
            PM time spent on maintenance
          </p>

          {/* Giant counter */}
          <div className="relative">
            <motion.span
              style={{
                color: reduced ? '#8a6e3f' : numberColor,
              }}
              className="font-ticker block text-[20vw] md:text-[14rem] lg:text-[18rem] leading-[0.9]"
            >
              {reduced ? '0.0' : hoursDisplay}
            </motion.span>
            <span
              className="absolute right-0 top-0 text-xl md:text-3xl text-[#5a5650] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              hrs / wk
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-10 relative mx-auto max-w-2xl h-1 rounded bg-[#e2ddd3] overflow-hidden">
            <motion.div
              style={{
                width: reduced ? '0%' : barWidth,
                background: reduced ? '#8a6e3f' : barColor,
              }}
              className="h-full"
            />
          </div>

          {/* Before / after labels — cross-fade centered */}
          <div className="relative mt-8 max-w-2xl mx-auto text-center text-xs tracking-[0.22em] uppercase min-h-[20px]">
            <motion.span
              style={{ opacity: reduced ? 0 : beforeOpacity }}
              className="absolute inset-x-0 text-[#c9571f]"
            >
              Without Briks
            </motion.span>
            <motion.span
              style={{ opacity: reduced ? 1 : afterOpacity }}
              className="absolute inset-x-0 text-[#8a6e3f]"
            >
              With Briks · zero PM time wasted
            </motion.span>
          </div>

          {/* Closing headline */}
          <motion.h2
            style={{
              opacity: reduced ? 1 : headlineOpacity,
              fontWeight: 500,
            }}
            className="mt-16 font-display text-3xl md:text-5xl text-[#1a1a1a] leading-[1.05]"
          >
            That&rsquo;s a full day a week.{' '}
            <span className="text-[#8a6e3f]">Back to your PMs.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  )
}
