'use client'

import ScrollReveal from '@/components/motion/ScrollReveal'
import ParallaxTile from '@/components/motion/ParallaxTile'
import { Wrench, Clock, FileText, Zap, ShieldCheck, Home } from 'lucide-react'

const tiles = [
  {
    icon: Wrench,
    label: 'Trade dispatched',
    sub: 'Matched by trade + availability',
    aspect: 'aspect-[4/5]',
    variant: 'up' as const,
  },
  {
    icon: Clock,
    label: '2hr response',
    sub: 'From call to on-site',
    aspect: 'aspect-square',
    variant: 'up' as const,
  },
  {
    icon: FileText,
    label: 'One invoice',
    sub: 'Sent to landlord',
    aspect: 'aspect-[4/5]',
    variant: 'up' as const,
  },
  {
    icon: Zap,
    label: 'Emergency · 24 / 7',
    sub: 'No on-call for PMs',
    aspect: 'aspect-square',
    variant: 'up' as const,
  },
  {
    icon: ShieldCheck,
    label: 'Licensed + insured',
    sub: 'Every tradie vetted',
    aspect: 'aspect-[4/5]',
    variant: 'up' as const,
  },
  {
    icon: Home,
    label: 'Adelaide-only',
    sub: 'Local operators',
    aspect: 'aspect-square',
    variant: 'up' as const,
  },
]

export default function ShowcaseStrip() {
  return (
    <section className="relative py-28 md:py-40 bg-[#fafaf7] overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 md:mb-20">
          <ScrollReveal variant="up" delay={0}>
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Inside the workflow
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.1}>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              One call.{' '}
              <span className="text-[#8a6e3f]">Everything after.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.2}>
            <p className="mt-6 text-lg text-[#3a3735] leading-relaxed">
              The PM picks up the phone. Briks does the rest. Here&rsquo;s what
              lands on the other side of one call.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {tiles.map((t, i) => {
            const Icon = t.icon
            return (
              <ScrollReveal
                key={t.label}
                variant={t.variant}
                delay={i * 0.08}
                className={`${t.aspect} relative overflow-hidden rounded-md border border-[#e2ddd3] bg-[#ffffff]`}
              >
                <ParallaxTile intensity={5} className="h-full w-full">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#ebe4d4_0%,#ffffff_55%,#fafaf7_100%)]" />
                </ParallaxTile>

                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8a6e3f]/40 bg-[#f3efe5]">
                    <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <div>
                    <p
                      className="font-display text-xl md:text-2xl text-[#1a1a1a] mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {t.label}
                    </p>
                    <p className="text-xs tracking-[0.18em] uppercase text-[#5a5650]">
                      {t.sub}
                    </p>
                  </div>
                </div>

                {/* Corner marks */}
                <div className="absolute top-3 right-3 h-4 w-4 border-t border-r border-[#8a6e3f]/50" />
                <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#8a6e3f]/50" />
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
