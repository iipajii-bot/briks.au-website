'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /**
   * % offset range applied from bottom to top of viewport transit.
   * e.g. 6 = -6% → +6%
   */
  intensity?: number
}

export default function ParallaxTile({
  children,
  className,
  intensity = 6,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${intensity}%`, `${intensity}%`]
  )

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y: reduced ? 0 : y }}
        className="will-change-transform h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
