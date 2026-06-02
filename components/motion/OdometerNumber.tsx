'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function OdometerNumber({
  value,
  duration = 1.8,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const mv = useMotionValue(reduced ? value : 0)
  const spring = useSpring(mv, {
    duration: duration * 1000,
    bounce: 0,
  })
  const display = useTransform(spring, (n) =>
    n.toLocaleString('en-AU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  )

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
