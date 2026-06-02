'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import MovingBorder from '@/components/effects/MovingBorder'
import BackgroundBeams from '@/components/effects/BackgroundBeams'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

export default function FooterCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const anim = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease, delay },
  })

  return (
    <section className="relative py-28 md:py-40 bg-[#fafaf7] overflow-hidden">
      <BackgroundBeams />

      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        ref={ref}
      >
        <motion.div
          initial={prefersReduced ? {} : { scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease }}
          className="hairline w-24 mx-auto mb-10 origin-center"
          aria-hidden="true"
        />

        <motion.h2
          {...anim(0.15)}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-6"
          style={{ fontWeight: 700 }}
        >
          Stop chasing tradies.{' '}
          <span className="text-[#8a6e3f]">Start being a principal.</span>
        </motion.h2>

        <motion.p
          {...anim(0.3)}
          className="text-[#3a3735] text-lg leading-relaxed mb-12 max-w-xl mx-auto"
        >
          15-minute call. Your door count, your Tapi setup, an honest read on
          whether Briks fits your workflow. Per-job, no contract.
        </motion.p>

        <motion.div
          {...anim(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MovingBorder href="/contact">
            Book the call
            <ArrowRight size={18} aria-hidden />
          </MovingBorder>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
          >
            Questions first
          </Link>
        </motion.div>

        <motion.p
          {...anim(0.6)}
          className="mt-10 text-xs tracking-[0.2em] uppercase text-[#5a5650]"
        >
          Adelaide · 24 / 7 coverage · Built for Tapi
        </motion.p>
      </div>
    </section>
  )
}
