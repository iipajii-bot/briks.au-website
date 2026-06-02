'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/case-studies'
import CaseStudyCard from './CaseStudyCard'

/**
 * Homepage case-studies section.
 * Renders nothing if no case studies seeded — keeps the page honest.
 */
export default function CaseStudiesGrid({
  limit = 3,
  enableSlider = true,
}: {
  limit?: number
  enableSlider?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduced = useReducedMotion()

  const items = CASE_STUDIES.slice(0, limit)
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="case-studies-heading"
      className="relative bg-[#ffffff] border-t border-[#e2ddd3]"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
              Recent work
            </p>
            <h2
              id="case-studies-heading"
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Real Adelaide jobs.
              <br />
              <span className="text-[#5a5650]">Sequenced, signed off, on time.</span>
            </h2>
          </div>

          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
          >
            All case studies
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CaseStudyCard study={study} enableSlider={enableSlider} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
