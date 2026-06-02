'use client'

import OdometerNumber from '@/components/motion/OdometerNumber'
import ScrollReveal from '@/components/motion/ScrollReveal'

type Stat = {
  value: number
  prefix?: string
  suffix: string
  label: string
  sub: string
}

const stats: Stat[] = [
  {
    value: 12,
    suffix: '',
    label: 'Trades under one roof',
    sub: 'Plumbing through to renovations',
  },
  {
    value: 4,
    suffix: 'hr',
    label: 'Quote turnaround',
    sub: 'Most jobs quoted same business day',
  },
  {
    value: 38,
    suffix: '+',
    label: 'Adelaide suburbs served',
    sub: 'Metro coverage from Gawler to Aldinga',
  },
  {
    value: 1,
    suffix: '',
    label: 'Invoice per job',
    sub: 'One name. One number. Done.',
  },
]

export default function StatCluster() {
  return (
    <section className="relative py-24 md:py-36 bg-[#fafaf7] overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 md:mb-20">
          <ScrollReveal>
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              By the Numbers
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              One team.{' '}
              <span className="text-[#8a6e3f]">Every trade.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={i * 0.08}
              className="relative rounded-md border border-[#e2ddd3] bg-[#ffffff] p-6 md:p-8 overflow-hidden"
            >
              <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />
              <p
                className="font-display text-5xl md:text-6xl lg:text-7xl text-[#8a6e3f] leading-none mb-4 tabular-nums"
                style={{ fontWeight: 700 }}
              >
                <OdometerNumber
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p
                className="text-sm text-[#1a1a1a] mb-1"
                style={{
                  fontFamily: 'var(--font-inter-tight)',
                  fontWeight: 700,
                }}
              >
                {s.label}
              </p>
              <p className="text-xs text-[#5a5650] leading-relaxed">
                {s.sub}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
