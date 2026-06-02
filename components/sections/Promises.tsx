'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Phone, FileText, Wrench, Banknote, type LucideIcon } from 'lucide-react'

type Promise = {
  Icon: LucideIcon
  headline: string
  label: string
  sub: string
}

const PROMISES: Promise[] = [
  {
    Icon: Phone,
    headline: 'Picked up.',
    label: 'Job assigned',
    sub: 'A tradie picked, briefed, and scheduled without delay.',
  },
  {
    Icon: FileText,
    headline: 'In writing.',
    label: 'Quote in inbox',
    sub: 'Itemised quote in your inbox quickly. No vague verbals, no surprise extras.',
  },
  {
    Icon: Wrench,
    headline: 'On-site.',
    label: 'On-site response',
    sub: 'Routine work attended quickly. Genuine emergencies dispatched right away.',
  },
  {
    Icon: Banknote,
    headline: 'Paid fast.',
    label: 'Tradies paid',
    sub: 'Every tradesperson on the Briks network paid promptly. Non-negotiable.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Promises() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-[#fafaf7]"
      aria-label="Concrete turnaround promises"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 md:mb-20">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            Promises we keep
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Concrete commitments.{' '}
            <span className="text-[#8a6e3f]">No vague.</span>
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-6 text-lg text-[#3a3735] leading-relaxed"
          >
            Every Briks job runs on the same standard. Four commitments we
            measure ourselves against — not aspirational copy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PROMISES.map((p, i) => {
            const Icon = p.Icon
            return (
              <motion.div
                key={p.label}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.08 }}
                className="relative rounded-md border border-[#e2ddd3] bg-[#ffffff] p-7 md:p-8 overflow-hidden group hover:border-[#8a6e3f]/40 transition-colors"
              >
                {/* Corner marks */}
                <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
                <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />

                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5]">
                    <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                </div>

                {/* Headline */}
                <div className="mb-4">
                  <span
                    className="font-display text-3xl md:text-4xl text-[#1a1a1a] leading-none"
                    style={{ fontWeight: 700, letterSpacing: '-0.025em' }}
                  >
                    {p.headline}
                  </span>
                </div>

                <p
                  className="text-base text-[#1a1a1a] mb-2 tracking-[-0.01em]"
                  style={{
                    fontFamily: 'var(--font-inter-tight)',
                    fontWeight: 700,
                  }}
                >
                  {p.label}
                </p>
                <p className="text-sm text-[#3a3735] leading-relaxed">
                  {p.sub}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
