'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import MovingBorder from '@/components/effects/MovingBorder'
import {
  ArrowRight,
  Phone,
  ClipboardCheck,
  Wrench,
  FileCheck,
  Clock,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const ICON_MAP: Record<string, LucideIcon> = {
  Phone,
  ClipboardCheck,
  Wrench,
  FileCheck,
}

/**
 * HowItWorks — vertical timeline w/ brass rail.
 * Each step shows: number + icon, title, body, SLA chip (Clock icon),
 * stall fallback ("what if it goes wrong" — AlertTriangle).
 *
 * Vertical layout reads better than 3-across grid for 4 steps with SLA detail.
 * Mobile: same vertical, tighter spacing.
 */
export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 md:py-36 bg-[#fafaf7]" id="how-it-works">
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            The flow
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Four steps.{' '}
            <span className="text-[#8a6e3f]">One coordinator owns it.</span>
          </h2>
          <p className="mt-6 text-[#3a3735] text-base md:text-lg leading-relaxed max-w-xl">
            What actually happens between &ldquo;hello&rdquo; and the final
            invoice. Including what we do when something stalls — because it
            sometimes does.
          </p>
        </div>

        {/* Timeline */}
        <ol ref={ref} className="relative">
          {/* Vertical rail */}
          <span
            aria-hidden
            className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#8a6e3f]/40 to-transparent"
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon as string] ?? Phone
            const isLast = i === HOW_IT_WORKS_STEPS.length - 1

            return (
              <motion.li
                key={step.number}
                initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.12 }}
                className={`relative pl-14 md:pl-20 ${isLast ? '' : 'pb-12 md:pb-14'}`}
              >
                {/* Dot + icon */}
                <div className="absolute left-0 top-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-md border border-[#8a6e3f]/40 bg-white">
                  <Icon
                    size={16}
                    className="text-[#8a6e3f] md:hidden"
                    aria-hidden
                  />
                  <Icon
                    size={20}
                    className="text-[#8a6e3f] hidden md:block"
                    aria-hidden
                  />
                </div>

                {/* Step number above title */}
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-2">
                  Step {step.number}
                </p>

                <h3
                  className="text-[#1a1a1a] text-2xl md:text-3xl mb-3 tracking-[-0.01em] leading-[1.15]"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {step.title}
                </h3>

                <p className="text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-2xl mb-5">
                  {step.body}
                </p>

                {/* SLA chip */}
                <div className="inline-flex items-center gap-2 bg-[#f3efe5] border border-[#8a6e3f]/20 rounded-md px-3 py-1.5 mb-3">
                  <Clock size={12} className="text-[#8a6e3f] shrink-0" aria-hidden />
                  <span className="text-[11px] tracking-[0.12em] uppercase text-[#5a5650]">
                    {step.sla}
                  </span>
                </div>

                {/* Stall fallback */}
                <div className="mt-3 flex items-start gap-2 max-w-2xl">
                  <AlertTriangle
                    size={13}
                    className="text-[#8a6e3f]/60 shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <p className="text-[13px] text-[#5a5650] leading-relaxed italic">
                    <span className="not-italic font-semibold text-[#3a3735]">
                      If it stalls:{' '}
                    </span>
                    {step.stall}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* CTA */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="text-center mt-16 md:mt-20"
        >
          <MovingBorder href="/contact">
            Get a quote
            <ArrowRight size={18} aria-hidden />
          </MovingBorder>
        </motion.div>
      </div>
    </section>
  )
}
