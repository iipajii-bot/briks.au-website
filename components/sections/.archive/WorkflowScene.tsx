'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import {
  MessageSquare,
  Cog,
  Wrench,
  Receipt,
  type LucideIcon,
} from 'lucide-react'

type Step = {
  id: string
  Icon: LucideIcon
  label: string
  sub: string
}

const STEPS: Step[] = [
  { id: 'call',    Icon: MessageSquare, label: 'You call',        sub: 'One number. 15 seconds.' },
  { id: 'route',   Icon: Cog,           label: 'Briks routes',    sub: 'Right tradie matched' },
  { id: 'do',      Icon: Wrench,        label: 'Job done',        sub: 'Documented in Tapi' },
  { id: 'invoice', Icon: Receipt,       label: 'One invoice',     sub: 'Landed with landlord' },
]

export default function WorkflowScene() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const headlineOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1])

  // Progress line fill 0 → 100% across scroll
  const lineScale = useTransform(scrollYProgress, [0.05, 0.9], [0, 1])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[250vh]"
      aria-label="Four-step workflow scroll scene"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            style={{ opacity: reduced ? 1 : eyebrowOpacity }}
            className="text-center text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-16"
          >
            From Call to Invoice
          </motion.p>

          {/* Horizontal step rail */}
          <div className="relative">
            {/* Background track */}
            <div
              className="absolute left-[8%] right-[8%] top-10 h-px bg-[#e2ddd3]"
              aria-hidden
            />
            {/* Progress fill */}
            <motion.div
              style={{
                scaleX: reduced ? 1 : lineScale,
                originX: 0,
              }}
              className="absolute left-[8%] right-[8%] top-10 h-px bg-[#c9571f]"
              aria-hidden
            />

            <div className="grid grid-cols-4 gap-2 md:gap-6 relative">
              {STEPS.map((step, i) => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  index={i}
                  progress={scrollYProgress}
                  reduced={!!reduced}
                />
              ))}
            </div>
          </div>

          {/* Closing headline */}
          <motion.div
            style={{ opacity: reduced ? 1 : headlineOpacity }}
            className="mt-20 text-center"
          >
            <h2
              className="font-display text-3xl sm:text-4xl md:text-6xl text-[#1a1a1a] leading-[1.05]"
              style={{ fontWeight: 500 }}
            >
              From one call to one invoice.{' '}
              <span className="text-[#8a6e3f]">Nothing in between.</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WorkflowStep({
  step,
  index,
  progress,
  reduced,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  // Each step activates at its own scroll window
  // Step 0: 0.05 – 0.25, Step 1: 0.25 – 0.45, Step 2: 0.45 – 0.65, Step 3: 0.65 – 0.85
  const start = 0.05 + index * 0.2
  const end = start + 0.2

  const activeProgress = useTransform(progress, [start, end], [0, 1])
  const opacity = useTransform(progress, [start - 0.05, start], [0.35, 1])
  const y = useTransform(progress, [start - 0.05, start], [20, 0])
  const dotScale = useTransform(activeProgress, [0, 1], [1, 1.2])
  const iconColor = useTransform(activeProgress, [0, 1], ['#5a5650', '#c9571f'])

  const Icon = step.Icon

  return (
    <motion.div
      style={{
        opacity: reduced ? 1 : opacity,
        y: reduced ? 0 : y,
      }}
      className="flex flex-col items-center text-center"
    >
      {/* Dot on rail */}
      <motion.div
        style={{ scale: reduced ? 1 : dotScale }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#ffffff]"
      >
        <motion.span style={{ color: reduced ? '#c9571f' : iconColor }}>
          <Icon size={26} aria-hidden />
        </motion.span>
      </motion.div>

      <p
        className="mt-5 text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#8a6e3f]"
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        Step 0{index + 1}
      </p>
      <p
        className="mt-2 font-display text-lg md:text-2xl text-[#1a1a1a]"
        style={{ fontWeight: 500 }}
      >
        {step.label}
      </p>
      <p className="mt-1 text-xs md:text-sm text-[#3a3735] leading-relaxed max-w-[140px]">
        {step.sub}
      </p>
    </motion.div>
  )
}
