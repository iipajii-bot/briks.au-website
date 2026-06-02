'use client'

import { useEffect, useState } from 'react'
import type { BlogBlock } from '@/lib/blog-posts'

/**
 * Sticky desktop TOC for blog posts.
 * Anchors to H2 blocks. Highlights the section currently in viewport.
 * Hidden on mobile/tablet — too narrow to fit a side rail.
 */
export default function BlogTOC({ blocks }: { blocks: BlogBlock[] }) {
  // Pull H2 blocks; build slug if no id provided
  const headings = blocks
    .map((b, i) => {
      if (b.type !== 'h2') return null
      const id =
        b.id ??
        b.content
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      return { id, label: b.content, idx: i }
    })
    .filter((h): h is { id: string; label: string; idx: number } => h !== null)

  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveId(e.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Article contents"
      className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
        Contents
      </p>
      <ul className="space-y-1.5 border-l border-[#e2ddd3]">
        {headings.map((h) => {
          const isActive = activeId === h.id
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block pl-4 -ml-px py-1.5 text-[13px] leading-snug transition-colors border-l-2 ${
                  isActive
                    ? 'text-[#1a1a1a] border-[#8a6e3f]'
                    : 'text-[#5a5650] border-transparent hover:text-[#1a1a1a] hover:border-[#8a6e3f]/40'
                }`}
                style={{
                  fontFamily: 'var(--font-inter-tight)',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {h.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
