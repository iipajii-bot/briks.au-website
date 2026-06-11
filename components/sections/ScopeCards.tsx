'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Hammer, Paintbrush, AlertTriangle, ArrowRight, Phone } from 'lucide-react'
import { sitePhone, sitePhoneHref } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * ScopeCards — "What we take on" asymmetric three-door section.
 * Featured card: repairs + maintenance (most jobs start here).
 * Stacked right: repaints/refreshes + 24/7 emergency.
 * Honest scope only — no invented project history.
 */
export default function ScopeCards() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="scope-cards-heading"
      className="relative bg-[#ffffff] border-t border-[#e2ddd3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
            What we take on
          </p>
          <h2
            id="scope-cards-heading"
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Start with the job
            <br />
            <span className="text-[#5a5650]">in front of you.</span>
          </h2>
        </motion.div>

        {/* Asymmetric grid — featured left, two stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Featured — repairs + maintenance */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="h-full flex flex-col justify-between rounded-md border border-[#8a6e3f] bg-[#fafaf7] p-7 md:p-9">
              <div>
                <span className="inline-block text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] border border-[#8a6e3f]/50 px-3 py-1 rounded-full mb-6">
                  Most jobs start here
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <Hammer size={26} className="text-[#8a6e3f]" aria-hidden />
                  <h3
                    className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    Repairs + maintenance
                  </h3>
                </div>
                <p className="text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-lg">
                  Leaks, sticking doors, gutters, wall patching, small carpentry,
                  painting touch-ups. One visit, written price before work starts —
                  and no call-out fee on jobs over an hour.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#8a6e3f] hover:bg-[#75592f] text-white text-sm px-7 py-3.5 rounded-full transition-colors min-h-[44px]"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                >
                  Get a free quote
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stacked right */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-4 md:gap-5">
            {/* Repaints + refreshes */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
            >
              <Link
                href="/services/painting"
                className="group h-full flex flex-col justify-between rounded-md border border-[#e2ddd3] hover:border-[#8a6e3f]/60 bg-[#ffffff] p-6 md:p-7 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Paintbrush size={20} className="text-[#8a6e3f]" aria-hidden />
                    <h3
                      className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                    >
                      Repaints + refreshes
                    </h3>
                  </div>
                  <p className="text-[#5a5650] text-sm leading-relaxed">
                    Interior repaints, fixture swaps, end-of-lease turnarounds.
                    Itemised quote first, staged if needed.
                  </p>
                </div>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#8a6e3f] group-hover:text-[#1a1a1a] transition-colors"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                >
                  Plan the refresh
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </motion.div>

            {/* 24/7 emergency — dark */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
            >
              <div className="h-full flex flex-col justify-between rounded-md bg-[#1a1a1a] p-6 md:p-7">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <AlertTriangle size={20} className="text-[#d8c49a]" aria-hidden />
                    <h3
                      className="text-white text-lg md:text-xl tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                    >
                      24/7 emergency
                    </h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Burst pipe, no power, no hot water, storm damage. After-hours
                    premium quoted before dispatch.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {sitePhone() && (
                    <a
                      href={sitePhoneHref()}
                      className="inline-flex items-center gap-1.5 text-sm text-[#d8c49a] hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                      aria-label={`Call Briks now on ${sitePhone()}`}
                    >
                      <Phone size={14} aria-hidden />
                      {sitePhone()}
                    </a>
                  )}
                  <Link
                    href="/emergency"
                    className="text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    What counts as an emergency
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
