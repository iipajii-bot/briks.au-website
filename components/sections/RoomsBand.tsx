'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/lib/images'

/**
 * RoomsBand — small visual band showing 2 finished rooms (kitchen + bathroom).
 * Lives between two textual sections on the homepage to break rhythm and
 * surface aspirational finished-state imagery.
 *
 * Click-through: each tile links to /renovations.
 */

const ROOMS = [
  {
    label: 'Kitchen renovations',
    sub: 'Strip-out, cabinetry, stone, plumbing, electrical — coordinated',
    image: IMAGES.kitchen,
    href: '/renovations',
    alt: 'Adelaide heritage kitchen post-renovation with brass tapware over butler sink',
  },
  {
    label: 'Bathroom renovations',
    sub: 'AS 3740 waterproofing, restored porcelain, brass fixtures',
    image: IMAGES.bathroom,
    href: '/renovations',
    alt: 'Adelaide heritage bathroom post-restoration with freestanding bath and brass shower',
  },
] as const

export default function RoomsBand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="rooms-band-heading"
      className="relative bg-[#ffffff] border-t border-[#e2ddd3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
              Inside recent work
            </p>
            <h2
              id="rooms-band-heading"
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Two rooms.{' '}
              <span className="text-[#5a5650]">Sequenced, signed off.</span>
            </h2>
          </div>
          <Link
            href="/renovations"
            className="group inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors min-h-[44px]"
            style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
          >
            All renovations
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.label}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={room.href}
                className="group block rounded-md border border-[#e2ddd3] overflow-hidden hover:border-[#8a6e3f]/60 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#fafaf7]">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="bg-[#fafaf7] p-5 md:p-6 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-1.5"
                      style={{
                        fontFamily: 'var(--font-bricolage)',
                        fontWeight: 600,
                      }}
                    >
                      {room.label}
                    </p>
                    <p className="text-sm text-[#3a3735] leading-relaxed">
                      {room.sub}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
