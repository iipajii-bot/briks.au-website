'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  Droplets,
  Plug,
  Hammer,
  PaintBucket,
  Grid3x3,
  Home,
  CloudRain,
  Flame,
  KeyRound,
  Square,
  Wind,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { TRADES } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Plug,
  Hammer,
  PaintBucket,
  Grid3x3,
  Home,
  CloudRain,
  Flame,
  KeyRound,
  Square,
  Wind,
  Wrench,
}

export default function TradesGrid() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[#fafaf7] overflow-hidden"
      aria-label="Trades we cover"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            Trades we cover
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Twelve trades.{' '}
            <span className="text-[#8a6e3f]">One number.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {TRADES.map((t, i) => {
            const Icon = iconMap[t.icon] ?? Wrench
            return (
              <motion.div
                key={t.id}
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.04 }}
                className="group relative rounded-md border border-[#e2ddd3] bg-[#ffffff] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-5 flex flex-col items-start gap-3 min-h-[110px]"
              >
                <Icon size={20} className="text-[#8a6e3f]" aria-hidden />
                <span
                  className="text-sm text-[#1a1a1a] tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {t.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
