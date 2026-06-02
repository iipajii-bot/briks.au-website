'use client'

import {
  Wrench,
  Hammer,
  Zap,
  Droplets,
  Flame,
  Ruler,
  Plug,
  Drill,
  ShieldCheck,
  Thermometer,
  Lightbulb,
  KeyRound,
  Paintbrush,
  Cog,
  type LucideIcon,
} from 'lucide-react'

const tools: { name: string; icon: LucideIcon }[] = [
  { name: 'Pipe wrench', icon: Wrench },
  { name: 'Multimeter', icon: Zap },
  { name: 'Hammer drill', icon: Drill },
  { name: 'Plumber snake', icon: Droplets },
  { name: 'Gas torch', icon: Flame },
  { name: 'Tape measure', icon: Ruler },
  { name: 'Power tester', icon: Plug },
  { name: 'Claw hammer', icon: Hammer },
  { name: 'Safety switch', icon: ShieldCheck },
  { name: 'HVAC probe', icon: Thermometer },
  { name: 'LED tester', icon: Lightbulb },
  { name: 'Re-key kit', icon: KeyRound },
  { name: 'Roller + brush', icon: Paintbrush },
  { name: 'Bearing puller', icon: Cog },
]

export default function ToolMarquee() {
  // Duplicate list so scroll loops seamlessly
  const doubled = [...tools, ...tools]

  return (
    <section className="relative py-20 md:py-28 bg-[#fafaf7] overflow-hidden border-y border-[#e2ddd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-4">
          The Toolbelt
        </p>
        <h2
          className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] max-w-3xl"
          style={{ fontWeight: 700 }}
        >
          Every tool.{' '}
          <span className="text-[#8a6e3f]">Every trade.</span>{' '}
          One supplier.
        </h2>
      </div>

      {/* Two-row marquee, counter-scrolling */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#fafaf7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#fafaf7] to-transparent" />

        <div className="marquee marquee-right flex gap-4 md:gap-6 py-3">
          {doubled.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={`r1-${i}`}
                className="shrink-0 flex items-center gap-3 rounded-full border border-[#e2ddd3] bg-[#ffffff] px-5 py-3 hover:border-[#8a6e3f]/50 transition-colors"
              >
                <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                <span
                  className="text-sm text-[#1a1a1a] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {t.name}
                </span>
              </div>
            )
          })}
        </div>

        <div className="marquee marquee-left flex gap-4 md:gap-6 py-3">
          {doubled.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={`r2-${i}`}
                className="shrink-0 flex items-center gap-3 rounded-full border border-[#e2ddd3] bg-[#ffffff] px-5 py-3 hover:border-[#8a6e3f]/50 transition-colors"
              >
                <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                <span
                  className="text-sm text-[#1a1a1a] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {t.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .marquee { will-change: transform; width: max-content; }
        .marquee-right { animation: marqueeR 60s linear infinite; }
        .marquee-left { animation: marqueeL 75s linear infinite; }
        @keyframes marqueeR {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeL {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-right, .marquee-left { animation: none; }
        }
      `}</style>
    </section>
  )
}
