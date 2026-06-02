'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { QA } from '@/lib/faqs'

export default function FAQAccordion({
  items,
  startOpen = 0,
}: {
  items: QA[]
  startOpen?: number | null
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(startOpen)
  const reduced = useReducedMotion()

  return (
    <div className="rounded-md border border-[#e2ddd3] bg-[#ffffff] divide-y divide-[#e2ddd3]">
      {items.map((faq, i) => {
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
                  isOpen
                    ? 'text-[#1a1a1a]'
                    : 'text-[#1a1a1a]/85 group-hover:text-[#1a1a1a]'
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
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors ${
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
                  <div className="px-6 md:px-8 pb-6 md:pb-7 max-w-3xl">
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
  )
}
