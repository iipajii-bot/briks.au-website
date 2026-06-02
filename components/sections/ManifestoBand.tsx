'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * ManifestoBand — single ink-dark anchor section. Breaks the light-on-light
 * rhythm of the homepage flow. Pull-quote sized typography, brass accent rule.
 *
 * Designed to be dropped between trust-building and conversion sections —
 * a moment of brand voice, not selling.
 */
export default function ManifestoBand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-label="Briks operating principle"
      className="relative bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle dot grid for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="text-[10px] tracking-[0.28em] uppercase text-[#8a6e3f] mb-8"
        >
          Operating principle
        </motion.p>

        <motion.h2
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-white text-3xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] max-w-4xl"
          style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
        >
          The right specialist on the day,
          <br />
          <span className="text-[#8a6e3f]">
            not whoever was free at the time.
          </span>
        </motion.h2>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl"
        >
          {[
            {
              k: 'No callout fee',
              v: 'On-site quotes are free. Always have been.',
            },
            {
              k: 'Written quote, fixed total',
              v: 'No verbal estimates. No "we\'ll work it out as we go."',
            },
            {
              k: 'One coordinator, one invoice',
              v: 'You pay one number. We pay the trades.',
            },
          ].map((item) => (
            <div key={item.k} className="border-t border-white/15 pt-5">
              <p
                className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] mb-2"
              >
                {item.k}
              </p>
              <p className="text-white/80 text-sm md:text-[15px] leading-[1.55]">
                {item.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
