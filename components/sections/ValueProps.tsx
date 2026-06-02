'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Phone, ShieldCheck, FileText, Clock } from 'lucide-react'
import SpotlightCard from '@/components/effects/SpotlightCard'
import { VALUE_PROPS } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const iconMap = {
  Phone,
  ShieldCheck,
  FileText,
  Clock,
} as const

type IconName = keyof typeof iconMap

export default function ValueProps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 md:py-36 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            Why Briks
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Everything managed.{' '}
            <span className="text-[#8a6e3f]">Nothing missed.</span>
          </h2>
          <p className="mt-6 text-lg text-[#3a3735] leading-relaxed">
            We remove the complexity around the work — one contact, one team,
            one invoice. Same flow whether you&rsquo;re a homeowner, landlord,
            agency, or business.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {VALUE_PROPS.map((prop, i) => {
            const Icon = iconMap[prop.icon as IconName]
            return (
              <motion.div
                key={prop.title}
                initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              >
                <SpotlightCard className="h-full">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5]">
                    <Icon size={18} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <h3
                    className="mb-3 text-lg tracking-[-0.01em] text-[#1a1a1a]"
                    style={{
                      fontFamily: 'var(--font-inter-tight)',
                      fontWeight: 700,
                    }}
                  >
                    {prop.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a3735]">
                    {prop.body}
                  </p>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
