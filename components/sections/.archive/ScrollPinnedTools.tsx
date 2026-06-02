'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import {
  Wrench,
  Zap,
  Droplets,
  Flame,
  Hammer,
  KeyRound,
  type LucideIcon,
} from 'lucide-react'

type Trade = {
  name: string
  icon: LucideIcon
  tools: string[]
  byline: string
}

const trades: Trade[] = [
  {
    name: 'Plumbing',
    icon: Droplets,
    tools: ['Pipe wrench', 'Plumber snake', 'Torque cutter', 'Pressure tester', 'Hot-water kit'],
    byline: 'Licensed. Insured. Compliance paperwork with every job.',
  },
  {
    name: 'Electrical',
    icon: Zap,
    tools: ['Multimeter', 'Voltage tester', 'Wire stripper', 'RCD tester', 'Cable finder'],
    byline: 'Certificate of Compliance issued. Nothing cowboyed.',
  },
  {
    name: 'General maintenance',
    icon: Hammer,
    tools: ['Hammer drill', 'Tape measure', 'Stud finder', 'Caulking gun', 'Pry bar'],
    byline: 'Everything a PM would otherwise chase three tradies for.',
  },
  {
    name: 'Gas + HVAC',
    icon: Flame,
    tools: ['Gas torch', 'Leak detector', 'Thermometer probe', 'Refrigerant gauge', 'Flue brush'],
    byline: 'Gas-ticketed trades only. No exceptions on safety.',
  },
  {
    name: 'End-of-lease',
    icon: KeyRound,
    tools: ['Re-key kit', 'Patch + paint', 'Carpet steamer', 'Smoke alarm tester', 'Flea treatment'],
    byline: 'Turned over fast. Bond-ready documentation.',
  },
  {
    name: 'Emergency call-outs',
    icon: Wrench,
    tools: ['24 / 7 dispatch', 'After-hours roster', 'Pre-agreed rates', 'ETA via Tapi', 'Property isolation'],
    byline: 'Burst pipe at midnight? On site before 1am.',
  },
]

export default function ScrollPinnedTools() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const indicatorY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative bg-[#fafaf7] py-20 md:py-32">
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky left column */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 relative">
              <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
                By Trade
              </p>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
                style={{ fontWeight: 700 }}
              >
                The right tool.{' '}
                <span className="text-[#8a6e3f]">The right hands.</span>
              </h2>
              <p className="mt-6 text-lg text-[#3a3735] leading-relaxed max-w-md">
                Every trade in our Adelaide network is licensed, insured, and
                rated on price, speed, and quality. Scroll — meet the
                toolbelts Briks dispatches on your behalf.
              </p>

              {/* Vertical progress indicator */}
              <div
                className="hidden lg:block absolute left-0 -right-2 top-full mt-10 h-1 rounded bg-[#e2ddd3] overflow-hidden"
                aria-hidden
              >
                <motion.div
                  style={{ width: reduced ? '100%' : indicatorY }}
                  className="h-full bg-[#8a6e3f]"
                />
              </div>
            </div>
          </aside>

          {/* Trade cards revealing on scroll */}
          <div className="lg:col-span-7 space-y-6">
            {trades.map((t, i) => {
              const Icon = t.icon
              return (
                <TradeCard
                  key={t.name}
                  index={i}
                  name={t.name}
                  Icon={Icon}
                  tools={t.tools}
                  byline={t.byline}
                  total={trades.length}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TradeCard({
  index,
  name,
  Icon,
  tools,
  byline,
  total,
}: {
  index: number
  name: string
  Icon: LucideIcon
  tools: string[]
  byline: string
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 35%'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  const y = useTransform(scrollYProgress, [0, 1], [30, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1])

  return (
    <motion.div
      ref={ref}
      style={
        reduced
          ? undefined
          : { opacity, y, scale }
      }
      className="relative rounded-md border border-[#e2ddd3] bg-[#ffffff] p-7 md:p-9 overflow-hidden"
    >
      <div className="absolute top-5 right-5 text-[#5a5650] text-xs tracking-[0.22em] uppercase">
        0{index + 1} / 0{total}
      </div>

      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#8a6e3f]/40 bg-[#f3efe5] shrink-0 shadow-[0_0_40px_rgba(138,110,63,0.1)]">
          <Icon size={22} className="text-[#8a6e3f]" aria-hidden />
        </div>
        <div className="flex-1">
          <h3
            className="font-display text-2xl md:text-3xl text-[#1a1a1a] mb-2 tracking-[-0.01em]"
            style={{ fontWeight: 500 }}
          >
            {name}
          </h3>
          <p className="text-sm text-[#3a3735] leading-relaxed max-w-md">
            {byline}
          </p>
        </div>
      </div>

      <div className="mt-7 pt-6 border-t border-[#e2ddd3]">
        <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4">
          In the toolbelt
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center rounded-full border border-[#e2ddd3] bg-[#fafaf7] px-3 py-1.5 text-xs text-[#3a3735]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Corner marks */}
      <div className="absolute top-3 left-3 h-4 w-4 border-t border-l border-[#8a6e3f]/40" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#8a6e3f]/40" />
    </motion.div>
  )
}
