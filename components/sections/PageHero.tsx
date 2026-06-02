import { type ReactNode } from 'react'
import Silk from '@/components/effects/Silk'

type Props = {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: Props) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <section className="relative overflow-hidden bg-[#fafaf7] pt-36 pb-20 md:pt-44 md:pb-28">
      <Silk />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(26,26,26,0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.04,
        }}
      />

      <div
        className={`relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 ${alignClass} ${align === 'left' ? 'mx-auto' : ''}`}
      >
        <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
          {eyebrow}
        </p>

        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-[#1a1a1a] max-w-4xl"
          style={{ fontWeight: 700 }}
        >
          {title}
        </h1>

        {subtitle && (
          <div className="mt-6 text-lg text-[#3a3735] leading-relaxed max-w-2xl">
            {subtitle}
          </div>
        )}

        <div
          className={`hairline ${align === 'center' ? 'w-[40%] mx-auto' : 'w-24'} mt-10`}
          aria-hidden
        />
      </div>
    </section>
  )
}
