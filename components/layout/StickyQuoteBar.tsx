'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/constants'

/**
 * Mobile-only sticky quote bar.
 * Shows after the user scrolls past 480px (past the hero on most pages).
 * Hidden on desktop (WhatsAppFAB serves the always-on slot there).
 *
 * Two slots:
 *   - Primary: "Get a quote" → /contact (form)
 *   - Secondary: WhatsApp icon-only
 */
export default function StickyQuoteBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 480)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-3 bottom-3 z-40 transition-all duration-300 ${
        show
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-stretch gap-2 bg-[#1a1a1a] rounded-md shadow-[0_8px_32px_rgba(26,26,26,0.25)] overflow-hidden">
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 text-white text-sm"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
        >
          Get a quote
          <ArrowRight size={14} aria-hidden />
        </Link>
        <a
          href={whatsappHref(
            "Hi Briks — I'd like a quote on a job in Adelaide. Quick details:"
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Briks on WhatsApp"
          className="flex items-center justify-center w-12 bg-[#8a6e3f] text-white"
        >
          <MessageCircle size={18} aria-hidden />
        </a>
      </div>
    </div>
  )
}
