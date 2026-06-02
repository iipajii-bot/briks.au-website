'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'

type PartKey =
  | 'roof'
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'windows'
  | 'gyprock'
  | 'locks'

type Part = {
  key: PartKey
  label: string
  trade: string
  hint: string
  // activation window within scroll progress
  activeAt: [number, number]
  // label placement (absolute % in stage)
  labelLeft: string
  labelTop: string
  // connector end anchor on house (SVG coord in 400x400 stage)
  anchor: [number, number]
}

const PARTS: Part[] = [
  { key: 'roof',       label: 'Roofer',      trade: 'Roof + gutter', hint: 'Tile · gutter · flashing',   activeAt: [0.04, 0.16], labelLeft: '4%',  labelTop: '12%', anchor: [200, 90] },
  { key: 'electrical', label: 'Electrician', trade: 'Power + lights', hint: 'RCD · switchboard · LEDs',  activeAt: [0.15, 0.28], labelLeft: '68%', labelTop: '20%', anchor: [245, 175] },
  { key: 'gyprock',    label: 'Gyprocker',   trade: 'Walls',          hint: 'Patch · sand · paint',       activeAt: [0.26, 0.40], labelLeft: '4%',  labelTop: '34%', anchor: [170, 200] },
  { key: 'plumbing',   label: 'Plumber',     trade: 'Taps + hot water', hint: 'Leak · drain · hot-water', activeAt: [0.38, 0.52], labelLeft: '68%', labelTop: '42%', anchor: [155, 250] },
  { key: 'hvac',       label: 'HVAC tech',   trade: 'Aircon + heating', hint: 'Split · ducted · thermostat', activeAt: [0.50, 0.64], labelLeft: '4%',  labelTop: '58%', anchor: [280, 220] },
  { key: 'windows',    label: 'Glazier',     trade: 'Windows',        hint: 'Frame · pane · seal',         activeAt: [0.62, 0.76], labelLeft: '68%', labelTop: '62%', anchor: [170, 235] },
  { key: 'locks',      label: 'Carpenter',   trade: 'Doors + locks',  hint: 'Hang · re-key · hinges',      activeAt: [0.74, 0.88], labelLeft: '36%', labelTop: '80%', anchor: [240, 280] },
]

export default function HouseBreakdown() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
  const headlineOpacity = useTransform(scrollYProgress, [0.88, 0.98], [0, 1])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[420vh]"
      aria-label="House breakdown by trade scroll scene"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            style={{ opacity: reduced ? 1 : eyebrowOpacity }}
            className="text-center text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            One house · every trade
          </motion.p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-[#1a1a1a] text-center mb-10 max-w-3xl mx-auto"
            style={{ fontWeight: 700 }}
          >
            Scroll the house.{' '}
            <span className="text-[#8a6e3f]">Meet every trade.</span>
          </h2>

          {/* Stage */}
          <div className="relative mx-auto w-full max-w-[560px] aspect-square">
            <HouseSVG progress={scrollYProgress} reduced={!!reduced} />

            {/* Labels with connectors */}
            {PARTS.map((p) => (
              <HousePartLabel
                key={p.key}
                part={p}
                progress={scrollYProgress}
                reduced={!!reduced}
              />
            ))}
          </div>

          {/* Closing headline */}
          <motion.p
            style={{ opacity: reduced ? 1 : headlineOpacity }}
            className="absolute inset-x-0 bottom-10 md:bottom-16 text-center text-[#3a3735] text-sm md:text-base"
          >
            Six trades. One supplier. One invoice. Zero PM chasing.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function HouseSVG({
  progress,
  reduced,
}: {
  progress: MotionValue<number>
  reduced: boolean
}) {
  // Each house part's opacity ramps with its own scroll window
  const roofOp = useTransform(progress, [0.02, 0.16], [0.35, 1])
  const wallOp = useTransform(progress, [0, 0.12], [0.5, 1])
  const elecOp = useTransform(progress, [0.13, 0.28], [0.2, 1])
  // Gyprock — wall highlight pulse
  const gyprockPulse = useTransform(progress, [0.24, 0.4, 0.5], [0, 1, 0.3])
  const plumbOp = useTransform(progress, [0.36, 0.52], [0.2, 1])
  const hvacOp = useTransform(progress, [0.48, 0.64], [0.2, 1])
  const winOp = useTransform(progress, [0.6, 0.76], [0.2, 1])
  const lockOp = useTransform(progress, [0.72, 0.88], [0.2, 1])

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      fill="none"
      aria-hidden
    >
      {/* Ground line */}
      <line x1="40" y1="340" x2="360" y2="340" stroke="#e2ddd3" strokeWidth="1" />

      {/* Wall body */}
      <motion.g style={{ opacity: reduced ? 1 : wallOp }}>
        <rect x="120" y="160" width="160" height="180" fill="#f3efe5" stroke="#c0bcb4" strokeWidth="1.5" />
      </motion.g>

      {/* Gyprock wall highlight — pulses on scroll during gyprock window */}
      <motion.g style={{ opacity: reduced ? 0 : gyprockPulse }}>
        <rect x="120" y="160" width="160" height="180" fill="none" stroke="#8a6e3f" strokeWidth="1.5" />
        <line x1="130" y1="180" x2="145" y2="180" stroke="#8a6e3f" strokeWidth="0.8" opacity="0.7" />
        <line x1="130" y1="330" x2="160" y2="330" stroke="#8a6e3f" strokeWidth="0.8" opacity="0.7" />
      </motion.g>

      {/* Roof */}
      <motion.g style={{ opacity: reduced ? 1 : roofOp }}>
        <polygon points="100,160 200,80 300,160" fill="#ebe4d4" stroke="#8a6e3f" strokeWidth="1.5" />
        <line x1="110" y1="150" x2="290" y2="150" stroke="#c0bcb4" strokeWidth="0.8" />
      </motion.g>

      {/* Electrical — power line + lightbulb */}
      <motion.g style={{ opacity: reduced ? 1 : elecOp }}>
        {/* Ceiling light */}
        <line x1="230" y1="160" x2="230" y2="185" stroke="#8a6e3f" strokeWidth="1" />
        <circle cx="230" cy="190" r="5" fill="#8a6e3f" stroke="#8a6e3f" strokeWidth="0.5" />
        <circle cx="230" cy="190" r="10" fill="none" stroke="#8a6e3f" strokeWidth="0.5" opacity="0.5" />
        {/* Power icon on external wall */}
        <circle cx="265" cy="260" r="5" fill="none" stroke="#8a6e3f" strokeWidth="1" />
        <path d="M265 257 L263 261 L266 261 L264 265" stroke="#8a6e3f" strokeWidth="1" fill="none" />
      </motion.g>

      {/* Plumbing — tap + pipe */}
      <motion.g style={{ opacity: reduced ? 1 : plumbOp }}>
        {/* Exterior tap */}
        <line x1="140" y1="260" x2="140" y2="280" stroke="#8a6e3f" strokeWidth="1.5" />
        <rect x="135" y="255" width="10" height="5" fill="#8a6e3f" opacity="0.7" />
        <circle cx="140" cy="253" r="2.5" fill="#8a6e3f" />
        {/* Water drop */}
        <path d="M140 290 Q137 294 140 298 Q143 294 140 290 Z" fill="#8a6e3f" opacity="0.6" />
        {/* Internal pipe run */}
        <path d="M140 260 L140 230 L160 230 L160 200" stroke="#8a6e3f" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </motion.g>

      {/* HVAC — split system */}
      <motion.g style={{ opacity: reduced ? 1 : hvacOp }}>
        <rect x="255" y="210" width="30" height="14" rx="2" fill="none" stroke="#8a6e3f" strokeWidth="1.2" />
        <line x1="260" y1="215" x2="280" y2="215" stroke="#8a6e3f" strokeWidth="0.6" />
        <line x1="260" y1="219" x2="280" y2="219" stroke="#8a6e3f" strokeWidth="0.6" />
        {/* Airflow waves */}
        <path d="M285 217 Q292 217 295 213" stroke="#8a6e3f" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M285 220 Q294 220 298 224" stroke="#8a6e3f" strokeWidth="0.8" fill="none" opacity="0.4" />
      </motion.g>

      {/* Windows */}
      <motion.g style={{ opacity: reduced ? 1 : winOp }}>
        {/* Left window */}
        <rect x="145" y="200" width="40" height="40" fill="none" stroke="#8a6e3f" strokeWidth="1.2" />
        <line x1="165" y1="200" x2="165" y2="240" stroke="#8a6e3f" strokeWidth="0.8" />
        <line x1="145" y1="220" x2="185" y2="220" stroke="#8a6e3f" strokeWidth="0.8" />
      </motion.g>

      {/* Door + lock */}
      <motion.g style={{ opacity: reduced ? 1 : lockOp }}>
        <rect x="220" y="270" width="35" height="70" fill="none" stroke="#8a6e3f" strokeWidth="1.2" />
        <circle cx="250" cy="305" r="1.8" fill="#8a6e3f" />
        <line x1="248" y1="305" x2="252" y2="305" stroke="#8a6e3f" strokeWidth="0.6" />
      </motion.g>

      {/* Ground shadow */}
      <ellipse cx="200" cy="342" rx="110" ry="3" fill="#8a6e3f" opacity="0.08" />
    </svg>
  )
}

function HousePartLabel({
  part,
  progress,
  reduced,
}: {
  part: Part
  progress: MotionValue<number>
  reduced: boolean
}) {
  const [start, end] = part.activeAt
  // Clamp keyframe offsets to [0, 1] to satisfy WAAPI.
  const s0 = Math.max(0, start - 0.04)
  const s1 = start
  const s2 = end
  const s3 = Math.min(1, end + 0.18)
  const opacity = useTransform(progress, [s0, s1, s2, s3], [0, 1, 1, 0.55])

  return (
    <motion.div
      style={{
        opacity: reduced ? 1 : opacity,
        left: part.labelLeft,
        top: part.labelTop,
      }}
      className="absolute"
    >
      <div className="rounded-lg border border-[#8a6e3f]/50 bg-[#ffffff]/95 backdrop-blur-sm px-3 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.6)] max-w-[180px]">
        <p
          className="text-[#8a6e3f] text-[10px] tracking-[0.22em] uppercase mb-0.5"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
        >
          {part.trade}
        </p>
        <p
          className="text-[#1a1a1a] text-sm leading-tight"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
        >
          {part.label}
        </p>
        <p className="text-[10px] text-[#5a5650] mt-0.5">{part.hint}</p>
      </div>
    </motion.div>
  )
}
