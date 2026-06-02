'use client'

import { useEffect, useState } from 'react'
import { whatsappHref } from '@/lib/constants'

/**
 * Floating WhatsApp button — bottom-right, persistent across the site.
 * Opens wa.me w/ pre-filled message. Brand-consistent (brass, not WA green).
 *
 * Mounted in app/layout.tsx so it appears on every route.
 */
export default function WhatsAppFAB() {
  const [mounted, setMounted] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  // Avoid SSR flash + hydration mismatch on a viewport-positioned element
  useEffect(() => setMounted(true), [])

  // After 1.2s, show the "Text us" caption next to the icon
  useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setShowLabel(true), 1200)
    return () => clearTimeout(t)
  }, [mounted])

  if (!mounted) return null

  return (
    <a
      href={whatsappHref(
        "Hi Briks — I'd like a quote on a job in Adelaide. Quick details:"
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Briks on WhatsApp"
      className="group hidden md:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-md border border-[#e2ddd3] bg-white shadow-[0_4px_24px_rgba(26,26,26,0.08)] hover:border-[#8a6e3f]/60 hover:shadow-[0_6px_32px_rgba(26,26,26,0.12)] transition-all"
      style={{ fontFamily: 'var(--font-inter-tight)' }}
    >
      <span className="flex h-12 w-12 items-center justify-center bg-[#fafaf7] rounded-l-md border-r border-[#e2ddd3]">
        <WhatsAppIcon />
      </span>
      <span
        className={`pr-4 text-sm text-[#1a1a1a] transition-all overflow-hidden whitespace-nowrap ${
          showLabel ? 'max-w-[180px] opacity-100' : 'max-w-0 opacity-0'
        }`}
        style={{ fontWeight: 600 }}
      >
        Text us on WhatsApp
      </span>
    </a>
  )
}

function WhatsAppIcon() {
  // Lucide-style stroke icon. Brass colour to match TrustStrip.
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8a6e3f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
