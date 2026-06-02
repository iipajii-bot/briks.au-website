'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Pricing philosophy — explicit no-pricing stance, framed as integrity.
 * Sits between ServicesGrid and QuickQuote on the homepage.
 *
 * Tone: dry, confident, slight underdog. No exclamation marks.
 * Every job sized differently — none too small, none too big.
 */

type Tier = {
  size: 'Small'
  caption: string
  body: string
} | {
  size: 'Medium'
  caption: string
  body: string
} | {
  size: 'Large'
  caption: string
  body: string
}

const TIERS: { size: string; caption: string; body: string }[] = [
  {
    size: 'Small',
    caption: 'Loose hinge. Dripping tap. A light that won\'t switch.',
    body:
      'Pick up the phone. We would rather quote it in two minutes than have you live with it for two years. There is no minimum job, and we don\'t hide a callout fee in fine print.',
  },
  {
    size: 'Medium',
    caption: 'Bathroom rebuild. End-of-lease turnaround. Roof patch before storm season.',
    body:
      'A coordinator scopes it on-site, sequences the trades back-to-back, and gives you one written quote. You get one number to call and one invoice at the end.',
  },
  {
    size: 'Large',
    caption: 'Strip-out. Fit-out. Multi-trade reno across eight weeks.',
    body:
      'Same crew. Same coordinator. Same written quote standard. Big jobs get a project plan and a daily 5pm photo update — not a quieter version of the small-job process.',
  },
]

export default function PricingPhilosophy({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="pricing-philosophy-heading"
      className={`relative bg-[#fafaf7] border-y border-[#e2ddd3] ${
        compact ? 'py-12 md:py-16' : 'py-16 md:py-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading */}
          <div className="lg:col-span-5">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              On pricing
            </p>
            <h2
              id="pricing-philosophy-heading"
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              No two jobs are the same.
              <br />
              <span className="text-[#5a5650]">So we don&rsquo;t pretend the price is.</span>
            </h2>

            <div className="mt-6 space-y-4 text-[#3a3735] text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                A blocked drain isn&rsquo;t a kitchen rebuild. Charging like
                they are insults both jobs — and the people paying for them.
              </p>
              <p>
                Every Briks quote is hand-built off a real look at your place
                by someone who&rsquo;s actually done the work. Not a pricing
                calculator. Not a call-centre script. A human, a notebook, a
                fixed number in your inbox before the day&rsquo;s out.
              </p>
              <p
                className="text-[#1a1a1a] pt-2"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
              >
                No job too small. No job too big. No surprises in the middle.
              </p>
            </div>

            {!compact && (
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#3a3735] text-white text-sm px-6 py-3 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                >
                  Get a quote
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors underline-offset-4 hover:underline"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 500 }}
                >
                  How quotes work
                </Link>
              </div>
            )}
          </div>

          {/* Right — three tiers */}
          <div className="lg:col-span-7">
            <ul className="space-y-5">
              {TIERS.map((tier, i) => (
                <motion.li
                  key={tier.size}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: reduced ? 0 : i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7 pl-7 md:pl-8"
                >
                  {/* Brass left rail */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#8a6e3f] rounded-r-sm"
                  />
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p
                      className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f]"
                    >
                      {tier.size} job
                    </p>
                    <p
                      className="text-[#5a5650] text-xs tracking-[0.16em] uppercase"
                    >
                      Quoted same way
                    </p>
                  </div>
                  <p
                    className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em] mb-2"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {tier.caption}
                  </p>
                  <p className="text-sm md:text-[15px] text-[#3a3735] leading-relaxed">
                    {tier.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
