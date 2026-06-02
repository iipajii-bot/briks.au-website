'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { X, Phone, ChevronDown } from 'lucide-react'
import {
  NAV_LINKS,
  MEGA_MENUS,
  type MegaKey,
  sitePhone,
  sitePhoneHref,
} from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-[#1a1a1a] z-50 lg:hidden flex flex-col border-l border-white/10 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span
                className="text-white font-extrabold text-xl tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
              >
                BRIKS
              </span>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-1 flex-1">
              {NAV_LINKS.map((link, i) => {
                const isExpanded = expanded === link.href
                const megaKey = link.mega as MegaKey | null
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="border-b border-white/8"
                  >
                    {megaKey ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(isExpanded ? null : link.href)
                          }
                          className="w-full flex items-center justify-between py-3.5 px-2 min-h-[44px] text-white/85 hover:text-white text-base transition-colors"
                          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={`text-[#8a6e3f] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-3 space-y-3">
                                <MobileSubGroup
                                  title="Overview"
                                  items={[{ label: link.label, href: link.href }]}
                                  onClose={onClose}
                                />
                                {MEGA_MENUS[megaKey].map((col) => (
                                  <MobileSubGroup
                                    key={col.label}
                                    title={col.label}
                                    items={col.items.map((it) => ({
                                      label: it.label,
                                      href: it.href,
                                    }))}
                                    onClose={onClose}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-3.5 px-2 text-white/85 hover:text-white text-base transition-colors"
                        style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </nav>

            <div className="p-6 space-y-3 border-t border-white/10">
              {sitePhone() && (
                <a
                  href={sitePhoneHref()}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#f3efe5] hover:bg-[#ebe4d4] border border-[#c0bcb4] text-[#1a1a1a] font-semibold py-3 px-6 rounded-md transition-colors min-h-[44px]"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  <Phone size={16} className="text-[#8a6e3f]" aria-hidden />
                  {sitePhone()}
                </a>
              )}
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full text-center bg-[#8a6e3f] hover:bg-[#b89868] text-[#1a1a1a] font-semibold py-3 px-6 rounded-md transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
              >
                Get a quote
              </Link>
              <p className="text-white/70 text-xs text-center pt-1">
                Per-job service. No contracts. Pay per invoice.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MobileSubGroup({
  title,
  items,
  onClose,
}: {
  title: string
  items: ReadonlyArray<{ label: string; href: string }>
  onClose: () => void
}) {
  return (
    <div>
      <p className="text-[#8a6e3f] text-[10px] tracking-[0.22em] uppercase mb-1.5 font-medium px-2">
        {title}
      </p>
      <ul>
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              onClick={onClose}
              className="block px-2 py-2 text-sm text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 500 }}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
