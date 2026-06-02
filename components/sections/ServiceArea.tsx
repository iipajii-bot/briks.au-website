'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'
import { SUBURB_GROUPS } from '@/lib/suburbs'

const ease = [0.16, 1, 0.3, 1] as const

export default function ServiceArea() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-[#fafaf7]"
      aria-label="Service area coverage"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 md:mb-14">
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            <MapPin size={12} aria-hidden />
            Service area
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Servicing every{' '}
            <span className="text-[#8a6e3f]">Adelaide suburb.</span>
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-5 text-base text-[#3a3735] leading-relaxed max-w-xl"
          >
            Local operators, real-time dispatch across the metro and Adelaide
            Hills. Don&rsquo;t see your suburb? Call anyway — coverage is
            actively expanding.
          </motion.p>
        </div>

        <div className="space-y-7">
          {SUBURB_GROUPS.map((group, gi) => (
            <motion.div
              key={group.region}
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.25 + gi * 0.06 }}
            >
              <p
                className="text-[#5a5650] text-[10px] tracking-[0.28em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
              >
                {group.region}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.suburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="inline-flex items-center rounded-full border border-[#e2ddd3] bg-[#ffffff] px-3 py-1.5 text-xs text-[#3a3735] hover:border-[#8a6e3f]/50 hover:text-[#1a1a1a] transition-colors cursor-default"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
