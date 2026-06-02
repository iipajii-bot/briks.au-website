'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import { FileText, Phone, AlertCircle, Mail, Receipt, Wrench } from 'lucide-react'

// Three-stage scene:
//   0 → 0.33   : 6 chaos tiles scatter from centre outward (before Briks)
//   0.33 → 0.66: tiles fade, regroup, reorient to clean row positions
//   0.66 → 1.0 : 6 aligned cards locked in row, gold hairline connecting, headline

type Paper = {
  id: string
  Icon: typeof FileText
  chaosLabel: string
  chaosSub: string
  rowLabel: string
  rowSub: string
  // chaos end positions (scatter phase)
  scatterX: string
  scatterY: string
  scatterR: number
  // row end positions (% across viewport, distributed)
  rowX: string
}

const PAPERS: Paper[] = [
  {
    id: 'a', Icon: Phone,
    chaosLabel: 'PM voicemail', chaosSub: '"Please call back"',
    rowLabel: 'Call in', rowSub: 'One number',
    scatterX: '-40vw', scatterY: '-35vh', scatterR: -30, rowX: '-32vw',
  },
  {
    id: 'b', Icon: AlertCircle,
    chaosLabel: 'Landlord', chaosSub: '"Still not fixed"',
    rowLabel: 'Classified', rowSub: 'Trade matched',
    scatterX:  '42vw', scatterY: '-30vh', scatterR:  22, rowX: '-19vw',
  },
  {
    id: 'c', Icon: Wrench,
    chaosLabel: 'Chasing', chaosSub: 'Three tradies',
    rowLabel: 'Dispatched', rowSub: 'Tradie on site',
    scatterX: '-38vw', scatterY:  '30vh', scatterR:  26, rowX:  '-6vw',
  },
  {
    id: 'd', Icon: Mail,
    chaosLabel: 'Chase email #3', chaosSub: 'Sent Tue, no reply',
    rowLabel: 'Completed', rowSub: 'Photos uploaded',
    scatterX:  '40vw', scatterY:  '32vh', scatterR: -18, rowX:   '7vw',
  },
  {
    id: 'e', Icon: Receipt,
    chaosLabel: 'Invoice #1', chaosSub: 'Plumber · $420',
    rowLabel: 'Documented', rowSub: 'Audit trail in Tapi',
    scatterX: '-18vw', scatterY: '-42vh', scatterR: -30, rowX:  '20vw',
  },
  {
    id: 'f', Icon: FileText,
    chaosLabel: 'Invoice #2', chaosSub: 'Electrician · $285',
    rowLabel: 'Invoiced', rowSub: 'One to landlord',
    scatterX:  '22vw', scatterY:  '42vh', scatterR:  28, rowX:  '33vw',
  },
]

export default function DeconstructedJob() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Stage labels
  const beforeLabelOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.38], [0, 1, 1, 0])
  const afterLabelOpacity = useTransform(scrollYProgress, [0.62, 0.72], [0, 1])

  // Rail (appears when cards settle)
  const railScale = useTransform(scrollYProgress, [0.55, 0.8], [0, 1])
  const railOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1])

  // Final headline
  const headlineOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1])
  const headlineY = useTransform(scrollYProgress, [0.8, 0.95], [20, 0])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] h-[320vh]"
      aria-label="Chaos to order scroll scene"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9571f]/40 to-transparent w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Stage labels */}
          <motion.p
            style={{ opacity: reduced ? 0 : beforeLabelOpacity }}
            className="absolute top-24 left-0 right-0 text-center text-[#c9571f] text-xs font-medium tracking-[0.28em] uppercase"
          >
            Before Briks · chaos
          </motion.p>
          <motion.p
            style={{ opacity: reduced ? 1 : afterLabelOpacity }}
            className="absolute top-24 left-0 right-0 text-center text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase"
          >
            With Briks · one line
          </motion.p>

          {/* Rail line connecting row cards */}
          <motion.div
            style={{
              scaleX: reduced ? 1 : railScale,
              opacity: reduced ? 1 : railOpacity,
              originX: 0,
            }}
            className="absolute left-[12%] right-[12%] top-1/2 h-px bg-gradient-to-r from-[#c9571f] via-[#8a6e3f] to-[#b89868]"
            aria-hidden
          />

          {/* Papers */}
          {PAPERS.map((p) => (
            <PaperCard key={p.id} paper={p} progress={scrollYProgress} reduced={!!reduced} />
          ))}

          {/* Final headline */}
          <motion.div
            style={{
              opacity: reduced ? 1 : headlineOpacity,
              y: reduced ? 0 : headlineY,
            }}
            className="absolute inset-x-0 bottom-20 md:bottom-28 text-center px-6 pointer-events-none"
          >
            <p className="text-[#8a6e3f] text-xs tracking-[0.28em] uppercase mb-4">
              Chaos, assembled
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-7xl text-[#1a1a1a] leading-[1.02]"
              style={{ fontWeight: 700 }}
            >
              Every mess,{' '}
              <span className="text-[#8a6e3f]">one clean line.</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PaperCard({
  paper,
  progress,
  reduced,
}: {
  paper: Paper
  progress: MotionValue<number>
  reduced: boolean
}) {
  // Three-stage motion
  // Phase 1 (0 → 0.33): fly outward to scatter position
  // Phase 2 (0.33 → 0.6): fly back to row position
  // Phase 3 (0.6 → end): locked in row

  const x = useTransform(
    progress,
    [0, 0.3, 0.55, 1],
    ['0vw', paper.scatterX, paper.rowX, paper.rowX]
  )
  const y = useTransform(
    progress,
    [0, 0.3, 0.55, 1],
    ['0vh', paper.scatterY, '0vh', '0vh']
  )
  const rotate = useTransform(
    progress,
    [0, 0.3, 0.55, 1],
    [-4, paper.scatterR, 0, 0]
  )
  // Dim during chaos → brighten when assembled
  const opacity = useTransform(
    progress,
    [0, 0.1, 0.3, 0.55, 1],
    [0.7, 0.95, 0.7, 1, 1]
  )
  // Chaos state color vs assembled state color handled by chaos/row variant

  // Borders + bg crossfade via opacity on two layers inside card
  const chaosOpacity = useTransform(progress, [0.4, 0.6], [1, 0])
  const rowOpacity = useTransform(progress, [0.4, 0.6], [0, 1])

  const Icon = paper.Icon

  return (
    <motion.div
      style={
        reduced
          ? {
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${paper.rowX}, 0)`,
            }
          : { x, y, rotate, opacity, left: '50%', top: '50%' }
      }
      className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      {/* Card shell */}
      <div className="relative w-44 md:w-48">
        {/* Chaos variant — rust border, messy */}
        <motion.div
          style={{ opacity: reduced ? 0 : chaosOpacity }}
          className="absolute inset-0 rounded-md border border-[#c9571f]/30 bg-[#ffffff]/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        />
        {/* Row variant — gold border, clean */}
        <motion.div
          style={{ opacity: reduced ? 1 : rowOpacity }}
          className="absolute inset-0 rounded-md border border-[#8a6e3f]/60 bg-[#ffffff] shadow-[0_0_30px_rgba(138,110,63,0.25)]"
        />

        <div className="relative p-3 md:p-4">
          <div className="flex items-start gap-2.5">
            {/* Chaos icon (rust) */}
            <motion.span
              style={{ opacity: reduced ? 0 : chaosOpacity }}
              className="shrink-0 mt-0.5"
            >
              <Icon size={16} className="text-[#c9571f]" aria-hidden />
            </motion.span>
            {/* Row icon (gold) */}
            <motion.span
              style={{ opacity: reduced ? 1 : rowOpacity }}
              className="absolute top-3 md:top-4 left-3 md:left-4 shrink-0"
            >
              <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
            </motion.span>

            <div className="flex-1 min-w-0 pl-6">
              {/* Chaos labels */}
              <motion.div style={{ opacity: reduced ? 0 : chaosOpacity }}>
                <p
                  className="text-[#1a1a1a] text-xs truncate"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {paper.chaosLabel}
                </p>
                <p className="text-[10px] text-[#5a5650] truncate">{paper.chaosSub}</p>
              </motion.div>
              {/* Row labels (overlay) */}
              <motion.div
                style={{ opacity: reduced ? 1 : rowOpacity }}
                className="absolute top-3 md:top-4 left-10 md:left-11 right-3 md:right-4"
              >
                <p
                  className="text-[#1a1a1a] text-xs truncate"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {paper.rowLabel}
                </p>
                <p className="text-[10px] text-[#8a6e3f] truncate">{paper.rowSub}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
