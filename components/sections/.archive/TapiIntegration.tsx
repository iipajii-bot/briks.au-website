'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function TapiIntegration() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Two logo blocks slide in from sides
  const leftX = useTransform(scrollYProgress, [0, 0.3], ['-30%', '0%'])
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rightX = useTransform(scrollYProgress, [0, 0.3], ['30%', '0%'])
  const rightOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Line draws between them
  const lineScale = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  // Arrow pulses down the line
  const arrowProgress = useTransform(scrollYProgress, [0.35, 0.7], [0, 1])
  // Badge appears at end
  const badgeOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1])
  const badgeScale = useTransform(scrollYProgress, [0.65, 0.9], [0.7, 1])

  // Dynamic arrow left position via transform
  const arrowLeft = useTransform(arrowProgress, [0, 1], ['calc(25% + 90px)', 'calc(75% - 90px - 36px)'])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[240vh]"
      aria-label="Tapi integration scroll scene"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6e3f]/40 to-transparent w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto px-6">
          <p className="text-center text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-20">
            Tapi-native workflow
          </p>

          {/* Integration diagram */}
          <div className="relative flex items-center justify-center gap-6 md:gap-16">
            {/* Tapi logo block */}
            <motion.div
              style={{
                x: reduced ? 0 : leftX,
                opacity: reduced ? 1 : leftOpacity,
              }}
              className="flex flex-col items-center gap-4 shrink-0"
            >
              <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-md border border-[#e2ddd3] bg-[#ffffff]">
                <span
                  className="font-display text-3xl md:text-4xl text-[#1a1a1a]"
                  style={{ fontWeight: 700 }}
                >
                  Tapi
                </span>
              </div>
              <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#5a5650]">
                Work orders in
              </p>
            </motion.div>

            {/* Connecting line (horizontal) */}
            <div className="relative flex-1 max-w-[200px] md:max-w-[280px] hidden sm:flex items-center justify-center h-24">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#e2ddd3]" />
              <motion.div
                style={{
                  scaleX: reduced ? 1 : lineScale,
                  originX: 0,
                }}
                className="absolute inset-x-0 top-1/2 h-px bg-[#8a6e3f]"
              />
              <motion.div
                style={{
                  x: reduced ? '50%' : arrowProgress,
                  left: reduced ? '50%' : arrowLeft,
                  opacity: reduced ? 1 : arrowProgress,
                }}
                className="absolute top-1/2 -translate-y-1/2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8a6e3f] shadow-[0_0_20px_rgba(138,110,63,0.4)]">
                  <ArrowRight size={16} className="text-[#fafaf7]" />
                </div>
              </motion.div>
            </div>

            {/* Mobile arrow */}
            <ArrowRight
              size={20}
              className="sm:hidden text-[#8a6e3f] shrink-0"
              aria-hidden
            />

            {/* Briks logo block */}
            <motion.div
              style={{
                x: reduced ? 0 : rightX,
                opacity: reduced ? 1 : rightOpacity,
              }}
              className="flex flex-col items-center gap-4 shrink-0"
            >
              <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-md border border-[#8a6e3f]/50 bg-[#ffffff] shadow-[0_0_40px_rgba(138,110,63,0.2)]">
                <span
                  className="font-display text-3xl md:text-4xl text-[#8a6e3f]"
                  style={{ fontWeight: 700 }}
                >
                  Briks
                </span>
              </div>
              <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#5a5650]">
                Your supplier
              </p>
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            style={{
              opacity: reduced ? 1 : badgeOpacity,
              scale: reduced ? 1 : badgeScale,
            }}
            className="mt-16 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[#8a6e3f]/50 bg-[#ffffff] px-5 py-3 shadow-[0_0_30px_rgba(138,110,63,0.2)]">
              <ShieldCheck size={16} className="text-[#8a6e3f]" />
              <span
                className="text-sm text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
              >
                Preferred supplier
              </span>
              <span className="text-xs text-[#5a5650] tracking-[0.2em] uppercase">
                10-min setup
              </span>
            </div>
          </motion.div>

          {/* Closing line */}
          <p className="mt-14 max-w-xl mx-auto text-center text-[#3a3735] text-base md:text-lg leading-relaxed">
            Your property managers change nothing. Work orders flow from Tapi
            straight to Briks — no new app, no new login, no new workflow.
          </p>
        </div>
      </div>
    </section>
  )
}
