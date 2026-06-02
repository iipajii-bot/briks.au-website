'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Plus, ArrowUpRight } from 'lucide-react'

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: 'What kind of jobs does Briks do?',
    a: 'Maintenance, repairs, handyman jobs, and renovations — kitchens, bathrooms, extensions, decks, fit-outs. Plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, locksmith, glazier, HVAC. The only thing we do not do is new home builds. If a trade visits a property, Briks coordinates it.',
  },
  {
    q: "How fast can you come out?",
    a: 'We move quickly on every job. Routine work is quoted promptly and a tradie on-site soon after. Genuine emergencies — burst pipes, no power, broken access — dispatch right away, around the clock. Non-urgent renovations are scheduled around your timing.',
  },
  {
    q: "What's the call-out fee?",
    a: 'No call-out fee on jobs over an hour. Smaller jobs are quoted up front before any work starts. Renovations and larger projects are quoted in detail with itemised pricing — no hidden costs, no padded line items.',
  },
  {
    q: 'Do you do work for property managers and agencies?',
    a: 'Yes — Briks operates as a Tapi-native managed supplier for Adelaide real estate agencies, with a single invoice per job sent direct to the landlord. Agencies have a dedicated workflow on the property managers page. Homeowners and landlords go through the standard route.',
  },
  {
    q: 'What if a tradesperson does bad work?',
    a: 'One name carries the liability — Briks. If remediation is required, we coordinate and cover it; you do not chase an individual tradesperson for a fix. Every job is documented with photos and an audit trail.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section
      className="relative py-24 md:py-32 bg-[#fafaf7]"
      aria-label="Frequently asked questions"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            Frequently asked
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Questions{' '}
            <span className="text-[#8a6e3f]">customers ask first.</span>
          </h2>
        </div>

        <div className="rounded-md border border-[#e2ddd3] bg-[#ffffff] divide-y divide-[#e2ddd3]">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left hover:bg-[#f3efe5]/40 transition-colors group min-h-[64px]"
                >
                  <span
                    className={`text-base md:text-lg tracking-[-0.01em] transition-colors ${
                      isOpen ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/85 group-hover:text-[#1a1a1a]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-inter-tight)',
                      fontWeight: 700,
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? 'border-[#8a6e3f] bg-[#8a6e3f]/10 text-[#8a6e3f]'
                        : 'border-[#c0bcb4] text-[#5a5650]'
                    }`}
                  >
                    <Plus size={16} aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-7 max-w-2xl">
                        <p className="text-sm md:text-base text-[#3a3735] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#b89868] transition-colors group"
          >
            <span style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              See all 15 questions
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
