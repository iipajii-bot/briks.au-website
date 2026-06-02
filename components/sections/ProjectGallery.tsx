'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ImageOff, ArrowUpRight } from 'lucide-react'
import {
  PROJECTS,
  PLACEHOLDER_PROJECTS,
  TRADE_LABELS,
  type Project,
} from '@/lib/projects'

const ease = [0.16, 1, 0.3, 1] as const

const spanClass: Record<Project['span'], string> = {
  large: 'md:col-span-2 md:row-span-2',
  medium: 'md:col-span-2',
  small: 'md:col-span-1',
}

export default function ProjectGallery() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  // Use real projects when populated, fall back to placeholders for layout demo.
  const items = PROJECTS.length > 0 ? PROJECTS : PLACEHOLDER_PROJECTS
  const isPlaceholder = PROJECTS.length === 0

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-[#fafaf7]"
      aria-label="Recent project gallery"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <motion.p
              initial={reduced ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease }}
              className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
            >
              Recent work
            </motion.p>
            <motion.h2
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Adelaide jobs,{' '}
              <span className="text-[#8a6e3f]">photographed.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-[#3a3735] md:max-w-sm text-base leading-relaxed"
          >
            Real maintenance jobs, real Adelaide properties. Every photo is from
            a Briks-managed call-out. No stock images.
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[220px] gap-4 md:gap-5"
        >
          {items.slice(0, 6).map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.06 }}
              className={`relative group rounded-md border border-[#e2ddd3] bg-[#ffffff] overflow-hidden hover:border-[#8a6e3f]/40 transition-colors ${spanClass[project.span]}`}
            >
              {/* Image OR placeholder gradient */}
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.suburb}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#ebe4d4_0%,#ffffff_55%,#fafaf7_100%)]" />
              )}

              {/* Dark gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7]/95 via-[#fafaf7]/30 to-transparent" />

              {/* Corner marks */}
              <div className="absolute top-3 right-3 h-4 w-4 border-t border-r border-[#8a6e3f]/40 z-10" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#8a6e3f]/40 z-10" />

              {/* Placeholder-only icon center */}
              {!project.image && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <ImageOff size={28} className="text-[#8a6e3f]" aria-hidden />
                    <span className="text-[10px] tracking-[0.28em] uppercase text-[#5a5650]">
                      Photo coming
                    </span>
                  </div>
                </div>
              )}

              {/* Trade tag — top-left */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="inline-flex items-center rounded-full border border-[#8a6e3f]/40 bg-[#fafaf7]/85 backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-[#8a6e3f]"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {TRADE_LABELS[project.trade]}
                </span>
              </div>

              {/* Title + suburb at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 z-10">
                <p
                  className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em] mb-1"
                  style={{
                    fontFamily: 'var(--font-inter-tight)',
                    fontWeight: 700,
                  }}
                >
                  {project.title}
                </p>
                <p className="text-xs tracking-[0.18em] uppercase text-[#3a3735]">
                  {project.suburb}
                </p>
                {project.blurb && (
                  <p className="mt-2 text-xs text-[#5a5650] leading-snug max-w-[28ch]">
                    {project.blurb}
                  </p>
                )}
              </div>

              {/* Hover arrow */}
              <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8a6e3f] text-[#fafaf7]">
                  <ArrowUpRight size={14} aria-hidden />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isPlaceholder && (
          <p className="mt-8 text-center text-[10px] tracking-[0.28em] uppercase text-[#5a5650]">
            Photos coming soon — layout preview only
          </p>
        )}
      </div>
    </section>
  )
}
