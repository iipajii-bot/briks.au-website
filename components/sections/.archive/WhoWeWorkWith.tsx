'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  Building2,
  UserCheck,
  Users,
  FileText,
  Home,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import OrbitingCircles from '@/components/effects/OrbitingCircles'
import { ORBIT_AUDIENCE } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const iconMap = {
  Building2,
  UserCheck,
  Users,
  FileText,
  Home,
  Wrench,
} as const

type IconName = keyof typeof iconMap

function AudienceChip({
  label,
  icon,
}: {
  label: string
  icon: IconName
}) {
  const Icon: LucideIcon = iconMap[icon]
  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#e2ddd3] bg-[#ffffff]/90 px-3 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <Icon size={14} className="text-[#8a6e3f]" aria-hidden />
      <span
        className="text-xs text-[#1a1a1a]"
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function WhoWeWorkWith() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const ring1 = ORBIT_AUDIENCE.filter((a) => a.ring === 1)
  const ring2 = ORBIT_AUDIENCE.filter((a) => a.ring === 2)
  const ring3 = ORBIT_AUDIENCE.filter((a) => a.ring === 3)

  return (
    <section className="relative py-28 md:py-40 bg-[#fafaf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          ref={ref}
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="max-w-xl"
        >
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            Who Briks Serves
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Built for{' '}
            <span className="text-[#8a6e3f]">Adelaide</span>
            {' '}real estate agencies.
          </h2>
          <p className="mt-6 text-lg text-[#3a3735] leading-relaxed">
            Principals, heads of PM, senior PMs — Briks is the maintenance
            department you don&rsquo;t have to hire. Landlords and tradespeople
            benefit on the edges; the product is built for the agency in the
            middle.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-[#3a3735]">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-[1px] w-4 bg-[#8a6e3f]" />
              Agencies with 50+ residential rental doors.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-[1px] w-4 bg-[#8a6e3f]" />
              Using Tapi, PropertyMe, PropertyTree, Console Cloud, or Managed App.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-[1px] w-4 bg-[#8a6e3f]" />
              Principals watching PM retention and landlord churn.
            </li>
          </ul>
        </motion.div>

        {/* Orbit diagram */}
        <div className="relative aspect-square max-w-[520px] mx-auto w-full">
          {/* rings */}
          <div className="absolute inset-[8%] rounded-full border border-[#e2ddd3]" />
          <div className="absolute inset-[22%] rounded-full border border-[#e2ddd3]" />
          <div className="absolute inset-[36%] rounded-full border border-[#e2ddd3]/70" />

          {/* ring 3 — outermost */}
          <OrbitingCircles radius={210} duration={60}>
            {ring3.map((a) => (
              <AudienceChip
                key={a.label}
                label={a.label}
                icon={a.icon as IconName}
              />
            ))}
          </OrbitingCircles>

          {/* ring 2 — middle */}
          <OrbitingCircles radius={150} duration={46} reverse>
            {ring2.map((a) => (
              <AudienceChip
                key={a.label}
                label={a.label}
                icon={a.icon as IconName}
              />
            ))}
          </OrbitingCircles>

          {/* ring 1 — innermost */}
          <OrbitingCircles radius={90} duration={32}>
            {ring1.map((a) => (
              <AudienceChip
                key={a.label}
                label={a.label}
                icon={a.icon as IconName}
              />
            ))}
          </OrbitingCircles>

          {/* Centre — Briks */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-24 w-24 items-center justify-center rounded-md border border-[#8a6e3f]/50 bg-[#ffffff] shadow-[0_0_60px_rgba(138,110,63,0.25)]">
              <span
                className="font-display text-3xl text-[#8a6e3f]"
                style={{ fontWeight: 500 }}
              >
                B
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
