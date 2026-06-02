'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'
import SplitText from '@/components/motion/SplitText'
import WordRotator from '@/components/motion/WordRotator'
import MovingBorder from '@/components/effects/MovingBorder'
import Link from 'next/link'
import { whatsappHref } from '@/lib/constants'

const ROTATING_SERVICES = [
  'Maintenance.',
  'Renovations.',
  'Inspections.',
  'Emergencies.',
  'Repairs.',
]

const Silk = dynamic(() => import('@/components/effects/Silk'), {
  ssr: false,
  loading: () => null,
})

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf7]">
      <Silk />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(26,26,26,0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.04,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-36 pb-24">
        {/* Eyebrow */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-10"
          style={{ fontFamily: 'var(--font-inter-tight)' }}
        >
          Adelaide · Experienced tradies · Every trade
        </motion.p>

        {/* H1 — display, split reveal + rotating services line */}
        <h1
          data-speakable
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 tracking-[-0.02em] text-[#1a1a1a]"
          style={{ fontWeight: 700 }}
        >
          <SplitText
            as="span"
            text="One Call."
            delay={0.1}
            className="block"
          />
          <span className="block text-[#8a6e3f]">
            <WordRotator
              words={ROTATING_SERVICES}
              intervalMs={1500}
              startDelayMs={350}
            />
          </span>
          <SplitText
            as="span"
            text="Zero Hassle."
            delay={0.6}
            className="block"
          />
        </h1>

        {/* Subheading */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.2 }}
          className="text-[#3a3735] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Adelaide builders, plumbers, electricians, painters and handymen —
          one local team. Maintenance, repairs, renovations, fit-outs.
          Homeowners, landlords, agencies, businesses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <MovingBorder href="/contact">
            Book a 15-min call
            <ArrowRight size={18} aria-hidden="true" />
          </MovingBorder>
          <a
            href={whatsappHref(
              "Hi Briks — I'd like a quote on a job in Adelaide. Quick details:"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Text us on WhatsApp
          </a>
        </motion.div>

        {/* Tertiary text link — soft entry for users not ready to commit */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 1.5 }}
          className="-mt-8 mb-12 text-center"
        >
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-[#5a5650] hover:text-[#8a6e3f] transition-colors min-h-[44px] py-2"
            style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
          >
            How it works
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Thin gold accent line */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 1.55 }}
          className="hairline w-[40%] mx-auto mb-10"
          aria-hidden="true"
          style={{ originX: 0.5 }}
        />

        {/* Honest pillars (replaces fake stats) */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.7 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-[0.18em] uppercase text-[#5a5650]"
        >
          <span>Adelaide-only</span>
          <span aria-hidden="true" className="text-[#c0bcb4]">·</span>
          <span>Documented jobs</span>
          <span aria-hidden="true" className="text-[#c0bcb4]">·</span>
          <span>No subscription</span>
          <span aria-hidden="true" className="text-[#c0bcb4]">·</span>
          <span>One invoice</span>
        </motion.div>
      </div>

      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8a6e3f]/40"
          aria-hidden="true"
        >
          <ChevronDown size={24} />
        </motion.div>
      )}
    </section>
  )
}
