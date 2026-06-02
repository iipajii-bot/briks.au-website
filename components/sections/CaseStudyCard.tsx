'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, MapPin, Clock } from 'lucide-react'
import type { CaseStudy } from '@/lib/case-studies'

/**
 * CaseStudyCard — single project tile.
 * Defaults to single hero photo (intellectual honesty: stock placeholders).
 * If beforeAfter present + `enableSlider`, shows a 50/50 split with hover wipe.
 *
 * Used on homepage CaseStudiesGrid + /case-studies index.
 */
export default function CaseStudyCard({
  study,
  enableSlider = false,
}: {
  study: CaseStudy
  enableSlider?: boolean
}) {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState(false)

  const showSplit = enableSlider && !!study.beforeAfter

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block rounded-md border border-[#e2ddd3] bg-[#fafaf7] overflow-hidden transition-colors hover:border-[#8a6e3f]/60"
    >
      {/* Image area */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#e2ddd3]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {showSplit && study.beforeAfter ? (
          <>
            <Image
              src={study.beforeAfter.after}
              alt={`${study.title} — after`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={false}
              animate={{ width: reduced ? '50%' : hover ? '0%' : '50%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-full w-[200vw] max-w-none">
                <Image
                  src={study.beforeAfter.before}
                  alt={`${study.title} — before`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-left"
                />
              </div>
            </motion.div>
            {/* Split marker */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/70 mix-blend-overlay" />
            <span className="absolute top-3 left-3 text-[10px] tracking-[0.18em] uppercase bg-[#1a1a1a]/80 text-white px-2 py-0.5 rounded-sm">
              Before
            </span>
            <span className="absolute top-3 right-3 text-[10px] tracking-[0.18em] uppercase bg-[#8a6e3f] text-white px-2 py-0.5 rounded-sm">
              After
            </span>
          </>
        ) : (
          <Image
            src={study.hero}
            alt={study.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}

        {/* Trade pill */}
        <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.18em] uppercase bg-white/95 text-[#1a1a1a] px-2 py-0.5 rounded-sm">
          {study.trade}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] leading-[1.2]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            {study.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <p className="text-sm text-[#3a3735] leading-relaxed line-clamp-2">{study.subtitle}</p>

        {/* Meta row */}
        <div className="mt-4 pt-4 border-t border-[#e2ddd3] flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] tracking-[0.16em] uppercase text-[#5a5650]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} className="text-[#8a6e3f]" />
            {study.suburb}
          </span>
          {study.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} className="text-[#8a6e3f]" />
              {study.duration}
            </span>
          )}
          {study.trades && study.trades.length > 0 && (
            <span className="text-[#5a5650] truncate">
              {study.trades.slice(0, 3).join(' · ')}
              {study.trades.length > 3 ? ` +${study.trades.length - 3}` : ''}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
