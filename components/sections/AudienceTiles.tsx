'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Home,
  Hammer,
  Building2,
  Briefcase,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { AUDIENCES } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const iconMap: Record<string, LucideIcon> = {
  Home,
  Hammer,
  Building2,
  Briefcase,
}

export default function AudienceTiles() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-[#fafaf7] overflow-hidden"
      aria-label="Who we work with"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            Who we work with
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            One team.{' '}
            <span className="text-[#8a6e3f]">Four ways in.</span>
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-6 text-lg text-[#3a3735] leading-relaxed max-w-2xl"
          >
            The same trades, the same standards, different fits. Pick the
            entry point that matches you — Briks runs the job either way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AUDIENCES.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Home
            return (
              <motion.div
                key={a.id}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.08 }}
              >
                <Link
                  href={a.href}
                  className="group block h-full rounded-md border border-[#e2ddd3] bg-[#ffffff] p-7 md:p-8 hover:border-[#8a6e3f]/50 transition-colors duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
                  <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#8a6e3f]/40 bg-[#f3efe5] mb-6">
                    <Icon size={20} className="text-[#8a6e3f]" aria-hidden />
                  </div>

                  <h3
                    className="font-display text-2xl text-[#1a1a1a] mb-3 tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {a.label}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed mb-6">
                    {a.blurb}
                  </p>

                  <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#8a6e3f]">
                    <span style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
                      Learn more
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
