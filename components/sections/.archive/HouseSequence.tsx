'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 240
const FRAME_PATH = '/house-sequence/frame_'
const FRAME_EXT = '.jpg'

// Map scroll progress → frame index
// Using progress windows so labels can slot in between morph segments
const frameSrc = (i: number) =>
  `${FRAME_PATH}${String(i).padStart(3, '0')}${FRAME_EXT}`

// Trade labels mapped to scroll-progress windows.
// Each label has an activation range and a screen-space anchor.
type TradeLabel = {
  key: string
  trade: string
  sub: string
  // activation window [start, end] of scroll progress (0-1)
  activeAt: [number, number]
  // screen anchor — % of parent
  left: string
  top: string
}

const LABELS: TradeLabel[] = [
  { key: 'roofer',      trade: 'Roofer',               sub: 'Metal roof · gutter · flashing',  activeAt: [0.05, 0.18], left: '4%',  top: '30%' },
  { key: 'glazier',     trade: 'Glazier',              sub: 'Windows · frames · seals',        activeAt: [0.16, 0.28], left: '70%', top: '34%' },
  { key: 'carpenter',   trade: 'Carpenter',            sub: 'Door · hinges · timber trim',     activeAt: [0.26, 0.38], left: '4%',  top: '44%' },
  { key: 'plasterer',   trade: 'Plasterer',            sub: 'Render · patch · finish',         activeAt: [0.36, 0.48], left: '70%', top: '48%' },
  { key: 'bricklayer',  trade: 'Bricklayer',           sub: 'Brick feature walls',             activeAt: [0.44, 0.55], left: '4%',  top: '56%' },
  { key: 'electrician', trade: 'Electrician',          sub: 'Wiring · lights · RCD',           activeAt: [0.52, 0.64], left: '70%', top: '60%' },
  { key: 'plumber',     trade: 'Plumber',              sub: 'Pipes · taps · hot water',        activeAt: [0.60, 0.72], left: '4%',  top: '66%' },
  { key: 'hvac',        trade: 'HVAC tech',            sub: 'Split · ducted · thermostat',     activeAt: [0.68, 0.80], left: '70%', top: '70%' },
  { key: 'concreter',   trade: 'Concreter',            sub: 'Slab · footings · pathwork',      activeAt: [0.76, 0.88], left: '4%',  top: '76%' },
  { key: 'landscaper',  trade: 'Landscaper',           sub: 'Planters · native grasses',       activeAt: [0.85, 0.95], left: '70%', top: '80%' },
]

export default function HouseSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Preload all frames (staggered batches to avoid blocking)
  useEffect(() => {
    const imgs: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)
    imagesRef.current = imgs
    let loaded = 0

    // Batch load — 12 frames at a time
    const BATCH = 12
    let batchStart = 0

    function loadBatch() {
      const end = Math.min(batchStart + BATCH, FRAME_COUNT)
      for (let i = batchStart; i < end; i++) {
        const img = new Image()
        img.src = frameSrc(i + 1)
        img.onload = () => {
          imagesRef.current[i] = img
          loaded += 1
          setLoadedCount(loaded)
          // Paint first frame as soon as it loads
          if (i === 0) paintFrame(0)
        }
        img.onerror = () => {
          loaded += 1
          setLoadedCount(loaded)
        }
      }
      batchStart = end
      if (batchStart < FRAME_COUNT) {
        // Use requestIdleCallback if available, else setTimeout
        if ('requestIdleCallback' in window) {
          (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadBatch)
        } else {
          setTimeout(loadBatch, 50)
        }
      }
    }

    loadBatch()
  }, [])

  // Paint frame at given index on canvas
  function paintFrame(idx: number) {
    const canvas = canvasRef.current
    const img = imagesRef.current[idx]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Match canvas intrinsic size to first loaded image
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
    }
    ctx.drawImage(img, 0, 0)
  }

  // Subscribe to scroll progress → paint nearest frame
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (reduced) {
        paintFrame(FRAME_COUNT - 1)
        return
      }
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(v * (FRAME_COUNT - 1)))
      )
      // If that frame not loaded yet, find nearest loaded
      let target = idx
      if (!imagesRef.current[target]?.complete) {
        // Walk backward to nearest loaded
        for (let i = idx; i >= 0; i--) {
          if (imagesRef.current[i]?.complete) {
            target = i
            break
          }
        }
      }
      paintFrame(target)
    })
    return () => unsubscribe()
  }, [scrollYProgress, reduced])

  const progressPct = (loadedCount / FRAME_COUNT) * 100

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[520vh]"
      aria-label="House exploded-to-assembled scroll sequence"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Canvas renders the frame sequence */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />

          {/* Dark overlay for label legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#fafaf7]/40 via-transparent to-[#fafaf7]/40 pointer-events-none"
            aria-hidden
          />

          {/* Top eyebrow + headline */}
          <div className="absolute top-20 md:top-28 left-0 right-0 text-center z-10 px-6 pointer-events-none">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-3">
              Scroll the house
            </p>
            <h2
              className="font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Every trade.{' '}
              <span className="text-[#8a6e3f]">One supplier.</span>
            </h2>
          </div>

          {/* Trade labels */}
          {LABELS.map((label) => (
            <TradeLabelChip
              key={label.key}
              label={label}
              progress={scrollYProgress}
              reduced={!!reduced}
            />
          ))}

          {/* Preload indicator */}
          {loadedCount < FRAME_COUNT && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-3 rounded-full border border-[#e2ddd3] bg-[#ffffff]/80 backdrop-blur px-4 py-2">
                <div className="h-1 w-32 rounded-full bg-[#e2ddd3] overflow-hidden">
                  <div
                    className="h-full bg-[#8a6e3f] transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#3a3735] font-mono">
                  {Math.round(progressPct)}%
                </span>
              </div>
            </div>
          )}

          {/* Closing eyebrow at bottom */}
          <div className="absolute bottom-12 md:bottom-16 left-0 right-0 text-center px-6 pointer-events-none">
            <p className="text-xs tracking-[0.28em] uppercase text-[#5a5650]">
              One call. Every trade. Done.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TradeLabelChip({
  label,
  progress,
  reduced,
}: {
  label: TradeLabel
  progress: MotionValue<number>
  reduced: boolean
}) {
  const [start, end] = label.activeAt
  // Clamp to [0, 1] for WAAPI safety
  const s0 = Math.max(0, start - 0.03)
  const s1 = start
  const s2 = end
  const s3 = Math.min(1, end + 0.08)
  const opacity = useTransform(progress, [s0, s1, s2, s3], [0, 1, 1, 0.25])
  const y = useTransform(progress, [s0, s1], [16, 0])

  return (
    <motion.div
      style={{
        opacity: reduced ? 1 : opacity,
        y: reduced ? 0 : y,
        left: label.left,
        top: label.top,
      }}
      className="absolute z-10 max-w-[220px]"
    >
      <div className="rounded-lg border border-[#8a6e3f]/60 bg-[#fafaf7]/90 backdrop-blur-sm px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
        <p
          className="text-[#8a6e3f] text-[10px] tracking-[0.28em] uppercase mb-1"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
        >
          {label.trade}
        </p>
        <p
          className="text-[#1a1a1a] text-sm leading-snug"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 500 }}
        >
          {label.sub}
        </p>
      </div>
    </motion.div>
  )
}
