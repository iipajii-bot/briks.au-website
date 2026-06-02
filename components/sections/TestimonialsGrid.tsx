'use client'

import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials'

const ease = [0.16, 1, 0.3, 1] as const

type Props = {
  /** Optional filter — show only testimonials matching this audience tag. */
  filterAudience?: Testimonial['audience']
  /** Cap rendered testimonials (homepage uses 3, full page no limit). */
  limit?: number
  /** Section heading override. */
  eyebrow?: string
  title?: React.ReactNode
}

export default function TestimonialsGrid({
  filterAudience,
  limit,
  eyebrow = 'What customers say',
  title,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const filtered = filterAudience
    ? TESTIMONIALS.filter((t) => t.audience === filterAudience)
    : TESTIMONIALS
  const items = typeof limit === 'number' ? filtered.slice(0, limit) : filtered

  if (items.length === 0) return null

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[#fafaf7] overflow-hidden"
      aria-label="Customer testimonials"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 md:mb-20">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            {title ?? (
              <>
                Trust Adelaide{' '}
                <span className="text-[#8a6e3f]">already gave us.</span>
              </>
            )}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.map((t, i) => (
            <Card key={t.id} t={t} index={i} isInView={isInView} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({
  t,
  index,
  isInView,
  reduced,
}: {
  t: Testimonial
  index: number
  isInView: boolean
  reduced: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const showToggle = t.body.length > 280

  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: 0.15 + index * 0.08 }}
      className="relative rounded-md border border-[#e2ddd3] bg-[#ffffff] p-7 md:p-8 overflow-hidden"
    >
      {/* Corner marks */}
      <div className="absolute top-3 right-3 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />

      {/* 5-star row */}
      <div className="flex items-center gap-1 mb-5" aria-label={`Rated ${t.rating} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < t.rating ? 'text-[#8a6e3f]' : 'text-[#e2ddd3]'}
            fill={i < t.rating ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            aria-hidden
          />
        ))}
      </div>

      {/* Pull-quote (always visible) */}
      <p
        className="font-display text-xl md:text-2xl text-[#1a1a1a] leading-snug border-l-2 border-[#8a6e3f] pl-5 mb-5 tracking-[-0.01em]"
        style={{ fontWeight: 700 }}
      >
        “{t.pullQuote}”
      </p>

      {/* Body — collapse/expand */}
      <AnimatePresence initial={false} mode="wait">
        {expanded ? (
          <motion.div
            key="full"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-[#3a3735] leading-relaxed mb-3">
              {t.body}
            </p>
          </motion.div>
        ) : (
          <p className="text-sm md:text-base text-[#3a3735] leading-relaxed line-clamp-3 mb-3">
            {t.body}
          </p>
        )}
      </AnimatePresence>

      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] hover:text-[#b89868] transition-colors mb-5 cursor-pointer inline-flex items-center min-h-[44px] py-2"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
        >
          {expanded ? 'Show less' : 'Read full review'}
        </button>
      )}

      <div className="pt-5 border-t border-[#e2ddd3]">
        <p
          className="text-[#1a1a1a] text-sm tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
        >
          {t.author}
        </p>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mt-1">
          {t.role}
          {t.suburb ? ` · ${t.suburb}` : ''}
        </p>
      </div>
    </motion.article>
  )
}
