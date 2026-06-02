'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Square,
  Home,
  Droplets,
  Flame,
  Wind,
  HardHat,
  type LucideIcon,
} from 'lucide-react'
import { NETWORK_TRADIES } from '@/lib/network'

const TRADE_ICON: Record<string, LucideIcon> = {
  Plumber: Droplets,
  Electrician: Zap,
  Carpenter: Hammer,
  Painter: Paintbrush,
  Tiler: Square,
  Roofer: Home,
  'Gutter specialist': Home,
  'Gas fitter': Flame,
  'HVAC technician': Wind,
  Handyman: HardHat,
}

/**
 * Anonymized tradie network grid.
 * Each card is a real bench position — trade + years + area + license + insurance.
 * No names, no photos. By design (see lib/network.ts header).
 */
export default function NetworkGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {NETWORK_TRADIES.map((t, i) => {
        const Icon = TRADE_ICON[t.trade] ?? Wrench
        return (
          <motion.div
            key={`${t.trade}-${i}`}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: reduced ? 0 : i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-white border border-[#e2ddd3] rounded-md p-5 md:p-6 hover:border-[#8a6e3f]/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-[#fafaf7] group-hover:bg-[#f3efe5] transition-colors">
                <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
              </div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] bg-[#f3efe5] px-2 py-0.5 rounded-sm">
                {t.yearsExperience}+ yrs
              </span>
            </div>

            <p
              className="text-[#1a1a1a] text-lg tracking-[-0.01em] mb-1"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              {t.trade}
            </p>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#5a5650] mb-4">
              {t.area}
            </p>

            {t.speciality && (
              <p className="text-sm text-[#3a3735] leading-relaxed mb-4">
                {t.speciality}
              </p>
            )}

            <div className="pt-3 border-t border-[#e2ddd3] space-y-1.5">
              <p className="text-[11px] text-[#5a5650]">
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#8a6e3f] mr-1.5">
                  Licence
                </span>
                {t.licenseType}
              </p>
              <p className="text-[11px] text-[#5a5650]">
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#8a6e3f] mr-1.5">
                  Cover
                </span>
                {t.insurance}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
