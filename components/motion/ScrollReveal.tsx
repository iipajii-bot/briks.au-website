'use client'

import { motion, useInView, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'

type Variant = 'up' | 'left' | 'right' | 'fade' | 'scale'

const variants: Record<Variant, TargetAndTransition> = {
  up: { opacity: 0, y: 40 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.92 },
}

type Props = {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
  once?: boolean
}

export default function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.9,
  className,
  style,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  const reduced = useReducedMotion()

  const from = variants[variant]
  const to: TargetAndTransition = { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : from}
      animate={inView ? to : from}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
