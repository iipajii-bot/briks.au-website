import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="text-[#8a6e3f] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold leading-tight mb-4 tracking-[-0.03em]',
          light ? 'text-white' : 'text-[#111111]'
        )}
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base md:text-lg leading-relaxed max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            light ? 'text-white/55' : 'text-[#666666]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
