'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Phone, ChevronDown, ArrowUpRight } from 'lucide-react'
import {
  NAV_LINKS,
  MEGA_MENUS,
  type MegaKey,
  sitePhone,
  sitePhoneHref,
} from '@/lib/constants'
import MobileMenu from './MobileMenu'

const ease = [0.16, 1, 0.3, 1] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMega, setOpenMega] = useState<MegaKey | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
        <div
          className={`relative transition-all duration-300 rounded-md ${
            scrolled
              ? 'bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]'
              : 'bg-[#1a1a1a]/85 backdrop-blur-md border border-white/10'
          }`}
          onMouseLeave={() => setOpenMega(null)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
            <div className="flex items-center justify-between h-14 md:h-[60px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center shadow-sm overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Briks Building Services logo"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <span
                  className="text-white font-extrabold text-sm md:text-base tracking-[0.15em] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  BRIKS BUILDING SERVICES
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const hasMega = !!link.mega
                  return (
                    <div
                      key={link.href}
                      onMouseEnter={() =>
                        hasMega ? setOpenMega(link.mega as MegaKey) : setOpenMega(null)
                      }
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-md transition-colors duration-150 tracking-wide cursor-pointer"
                      >
                        {link.label}
                        {hasMega && (
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-200 ${
                              openMega === link.mega ? 'rotate-180' : ''
                            }`}
                            aria-hidden
                          />
                        )}
                      </Link>
                    </div>
                  )
                })}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                {sitePhone() && (
                  <a
                    href={sitePhoneHref()}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-[#8a6e3f] text-sm font-medium px-3 py-2 rounded-md transition-colors duration-150 cursor-pointer"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    <Phone size={14} aria-hidden />
                    {sitePhone()}
                  </a>
                )}
                <Link
                  href="/contact"
                  className="bg-white hover:bg-[#fafaf7] text-[#8a6e3f] font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-150 cursor-pointer min-h-[44px] flex items-center"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  Get a quote
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#8a6e3f] hover:bg-white/5 rounded-md transition-all duration-150 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Mega-menu panels — rendered for whichever key is open */}
          <AnimatePresence>
            {openMega && (
              <motion.div
                key={openMega}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease }}
                className="absolute left-0 right-0 top-full"
              >
                {/* Invisible hover bridge — keeps cursor inside zone while traversing the visual gap */}
                <div className="h-2" aria-hidden />
                <div className="mx-auto max-w-6xl rounded-md border border-white/10 bg-[#1a1a1a]/98 backdrop-blur-xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] overflow-hidden">
                  <div
                    className="grid divide-x divide-white/8"
                    style={{
                      gridTemplateColumns: `repeat(${MEGA_MENUS[openMega].length}, minmax(0, 1fr))`,
                    }}
                  >
                    {MEGA_MENUS[openMega].map((col) => (
                      <MegaCol key={col.label} col={col} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function MegaCol({
  col,
}: {
  col: {
    label: string
    intro: string
    items: ReadonlyArray<{ label: string; href: string; blurb?: string }>
    seeAll: { label: string; href: string }
  }
}) {
  return (
    <div className="p-7">
      <p className="text-[#8a6e3f] text-[10px] tracking-[0.22em] uppercase mb-2 font-medium">
        {col.label}
      </p>
      <p className="text-white/75 text-xs mb-5 leading-relaxed">{col.intro}</p>
      <ul className={col.items.some((i) => i.blurb) ? 'space-y-3' : 'space-y-1.5'}>
        {col.items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group block py-1 transition-colors"
            >
              <div
                className="flex items-center justify-between text-white/85 group-hover:text-white text-sm"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: it.blurb ? 600 : 500 }}
              >
                {it.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 text-[#8a6e3f] transition-opacity"
                  aria-hidden
                />
              </div>
              {it.blurb && (
                <p className="text-white/70 text-xs mt-0.5 leading-snug">{it.blurb}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={col.seeAll.href}
        className="mt-5 inline-flex items-center gap-1.5 text-[#8a6e3f] hover:text-[#b89868] text-xs tracking-[0.18em] uppercase transition-colors"
        style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
      >
        {col.seeAll.label}
        <ArrowUpRight size={12} aria-hidden />
      </Link>
    </div>
  )
}
