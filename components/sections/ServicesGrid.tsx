'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Wrench,
  Zap,
  ShieldCheck,
  KeyRound,
  Droplets,
  Plug,
  Hammer,
  CloudRain,
  PaintBucket,
  Grid3x3,
  ClipboardCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import SpotlightCard from '@/components/effects/SpotlightCard'
import { SERVICES } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const iconMap = {
  Wrench,
  Zap,
  ShieldCheck,
  KeyRound,
  Droplets,
  Plug,
  Hammer,
  CloudRain,
  PaintBucket,
  Grid3x3,
  ClipboardCheck,
} as const

type IconName = keyof typeof iconMap

// Bento sizing — 6 tiles, asymmetric, editorial
// Last two (plumbing, electrical) shifted to centre row-3 columns 2-3.
const bentoSpan = [
  'md:col-span-2 md:row-span-2',   // 0 — hero
  'md:col-span-2',                 // 1 — wide
  'md:col-span-1',                 // 2 — small
  'md:col-span-1',                 // 3 — small
  'md:col-span-1 md:col-start-2',  // 4 — plumbing, centred
  'md:col-span-1',                 // 5 — electrical, follows in col 3
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="relative py-24 md:py-36 bg-[#fafaf7]"
      id="services"
    >
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 mx-auto hairline w-[80%] max-w-5xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              The Work
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Every repair.{' '}
              <span className="text-[#8a6e3f]">One supplier.</span>
            </h2>
          </div>
          <p className="text-[#3a3735] md:max-w-sm text-base leading-relaxed">
            From a broken tap at 9am to a burst pipe at midnight — the work
            routes to Briks, Briks routes it to the right trade, the right
            trade shows up.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-5 md:auto-rows-[200px]"
        >
          {SERVICES.slice(0, 6).map((service, i) => {
            const Icon: LucideIcon = iconMap[service.icon as IconName]
            const isHero = i === 0
            return (
              <motion.div
                key={service.id}
                initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className={bentoSpan[i]}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="block h-full"
                >
                  <SpotlightCard
                    className={`h-full flex flex-col justify-between ${isHero ? 'p-9 md:p-10' : 'p-6 md:p-7'}`}
                    spotlightColor="rgba(200, 169, 110, 0.22)"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5]">
                        <Icon
                          size={isHero ? 22 : 18}
                          className="text-[#8a6e3f]"
                          aria-hidden
                        />
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[#5a5650] group-hover:text-[#8a6e3f] transition-colors"
                      />
                    </div>

                    <div>
                      <h3
                        className={`text-[#1a1a1a] tracking-[-0.01em] ${isHero ? 'text-2xl md:text-3xl font-display' : 'text-lg'}`}
                        style={
                          isHero
                            ? { fontWeight: 700 }
                            : { fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }
                        }
                      >
                        {service.title}
                      </h3>
                      <p className="text-[#8a6e3f] text-xs font-medium tracking-wide mt-1">
                        {service.tagline}
                      </p>
                      {isHero && (
                        <p className="mt-4 text-sm text-[#3a3735] leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-6 py-3 transition-colors duration-300 min-h-[44px]"
          >
            Get a quote
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
