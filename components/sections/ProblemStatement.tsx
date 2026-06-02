'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { X, Check } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const problems = [
  'Tradies who never call back',
  'Three quotes, three weeks, no start date',
  'Juggling separate plumber, sparky, painter',
  'After-hours emergency, no answer',
  'Bad finish, no-one to chase',
]

const solutions = [
  'One call — Briks coordinates every trade',
  'Quotes back fast, tradies dispatched fast',
  'Single team for renos, repairs, handyman',
  '24/7 emergency dispatch, real humans',
  'Briks carries the finish — we fix what fails',
]

export default function ProblemStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 md:py-32 bg-[#fafaf7] overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase text-center mb-6"
        >
          The Gap
        </motion.p>
        <motion.h2
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] text-center mb-16 max-w-3xl mx-auto"
          style={{ fontWeight: 700 }}
        >
          Finding a tradie shouldn&rsquo;t be{' '}
          <span className="text-[#8a6e3f]">this hard.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* The old way */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-8"
          >
            <p className="text-[#c9571f] text-xs font-medium tracking-[0.22em] uppercase mb-6">
              Without Briks
            </p>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-[#3a3735] text-sm leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#c9571f]/10 border border-[#c9571f]/30">
                    <X size={10} className="text-[#c9571f]" />
                  </div>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The Briks way */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="rounded-md border border-[#8a6e3f]/40 bg-[#ffffff] p-8 shadow-[0_0_60px_rgba(138,110,63,0.08)]"
          >
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.22em] uppercase mb-6">
              With Briks
            </p>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-[#1a1a1a] text-sm leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#8a6e3f]/15 border border-[#8a6e3f]/40">
                    <Check size={10} className="text-[#8a6e3f]" />
                  </div>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
