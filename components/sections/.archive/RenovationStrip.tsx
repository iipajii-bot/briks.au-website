'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RENOVATION_TYPES } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

function formatCurrency(n: number) {
  return `$${n.toLocaleString('en-AU')}`
}

export default function RenovationStrip() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[#fafaf7] overflow-hidden"
      aria-label="Renovation services"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            Renovations & construction
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Bigger jobs.{' '}
            <span className="text-[#8a6e3f]">Project-managed.</span>
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-6 text-lg text-[#3a3735] leading-relaxed max-w-2xl"
          >
            Kitchens, bathrooms, extensions, fit-outs, structural. Five to
            ten trades on the same site, run on a schedule, finished on
            spec. We don&rsquo;t do new home builds — everything else is in
            scope.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {RENOVATION_TYPES.map((r, i) => (
            <motion.div
              key={r.id}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.07 }}
              className="group relative rounded-md border border-[#e2ddd3] bg-[#ffffff] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-7 md:p-8 overflow-hidden"
            >
              <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />

              <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-3">
                From {formatCurrency(r.from)}
              </p>
              <h3
                className="font-display text-2xl text-[#1a1a1a] mb-3 tracking-[-0.01em]"
                style={{ fontWeight: 700 }}
              >
                {r.label}
              </h3>
              <p className="text-sm text-[#3a3735] leading-relaxed">
                {r.blurb}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/renovations"
            className="inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#b89868] transition-colors group"
          >
            <span style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              See full renovation scope
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
