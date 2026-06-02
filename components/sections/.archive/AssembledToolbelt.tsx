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
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Flame,
  KeyRound,
  Drill,
  Ruler,
  type LucideIcon,
} from 'lucide-react'

type Tool = {
  Icon: LucideIcon
  label: string
  startX: string
  startY: string
  endX: string
  endY: string
  startR: number
}

const TOOLS: Tool[] = [
  { Icon: Wrench,   label: 'Plumbing',     startX: '-48vw', startY: '-38vh', endX: '-30%', endY: '-18%', startR: -48 },
  { Icon: Zap,      label: 'Electrical',   startX:  '46vw', startY: '-36vh', endX: '-10%', endY: '-18%', startR:  42 },
  { Icon: Droplets, label: 'Hot water',    startX: '-44vw', startY:  '32vh', endX:  '10%', endY: '-18%', startR:  35 },
  { Icon: Hammer,   label: 'General',      startX:  '44vw', startY:  '34vh', endX:  '30%', endY: '-18%', startR: -28 },
  { Icon: Flame,    label: 'Gas',          startX: '-50vw', startY:    '0',  endX: '-30%', endY:  '18%', startR: -22 },
  { Icon: KeyRound, label: 'End-of-lease', startX:  '50vw', startY:    '0',  endX: '-10%', endY:  '18%', startR:  38 },
  { Icon: Drill,    label: 'Drilling',     startX: '-22vw', startY: '-46vh', endX:  '10%', endY:  '18%', startR:  24 },
  { Icon: Ruler,    label: 'Carpentry',    startX:  '22vw', startY:  '46vh', endX:  '30%', endY:  '18%', startR: -34 },
]

export default function AssembledToolbelt() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const headlineOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1])
  const headlineY = useTransform(scrollYProgress, [0.65, 0.9], [24, 0])
  const connectorOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[260vh]"
      aria-label="Assembled toolbelt scroll scene"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6e3f]/40 to-transparent w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Eyebrow pinned at top */}
          <motion.p
            style={{ opacity: reduced ? 1 : eyebrowOpacity }}
            className="absolute top-24 left-0 right-0 text-center text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase"
          >
            Scroll · the toolbelt assembles
          </motion.p>

          {/* Connector hairlines (appear at end) */}
          <motion.svg
            style={{ opacity: reduced ? 1 : connectorOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="30" y1="40" x2="70" y2="40" stroke="#8a6e3f" strokeWidth="0.15" opacity="0.5" />
            <line x1="30" y1="60" x2="70" y2="60" stroke="#8a6e3f" strokeWidth="0.15" opacity="0.5" />
            <line x1="40" y1="40" x2="40" y2="60" stroke="#8a6e3f" strokeWidth="0.15" opacity="0.5" />
            <line x1="60" y1="40" x2="60" y2="60" stroke="#8a6e3f" strokeWidth="0.15" opacity="0.5" />
          </motion.svg>

          {/* Tools */}
          {TOOLS.map((t, i) => (
            <ToolChip key={i} tool={t} progress={scrollYProgress} reduced={!!reduced} />
          ))}

          {/* Headline fades in at end */}
          <motion.div
            style={{
              opacity: reduced ? 1 : headlineOpacity,
              y: reduced ? 0 : headlineY,
            }}
            className="absolute inset-x-0 bottom-24 text-center px-6 pointer-events-none"
          >
            <p className="text-[#8a6e3f] text-xs tracking-[0.28em] uppercase mb-4">
              Assembled
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-7xl text-[#1a1a1a] leading-[1.02]"
              style={{ fontWeight: 500 }}
            >
              Every trade.{' '}
              <span className="text-[#8a6e3f]">One toolbelt.</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ToolChip({
  tool,
  progress,
  reduced,
}: {
  tool: Tool
  progress: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(progress, [0, 0.7], [tool.startX, tool.endX])
  const y = useTransform(progress, [0, 0.7], [tool.startY, tool.endY])
  const rotate = useTransform(progress, [0, 0.7], [tool.startR, 0])
  const opacity = useTransform(progress, [0, 0.25, 0.7], [0.2, 0.55, 1])
  const scale = useTransform(progress, [0, 0.7], [0.82, 1])
  const Icon = tool.Icon

  return (
    <motion.div
      style={
        reduced
          ? {
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${tool.endX}, ${tool.endY})`,
            }
          : { x, y, rotate, opacity, scale, left: '50%', top: '50%' }
      }
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 will-change-transform"
    >
      <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-md border border-[#8a6e3f]/50 bg-[#ffffff] shadow-[0_0_40px_rgba(138,110,63,0.15)]">
        <Icon size={26} className="text-[#8a6e3f]" aria-hidden />
      </div>
      <span
        className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#5a5650]"
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {tool.label}
      </span>
    </motion.div>
  )
}
