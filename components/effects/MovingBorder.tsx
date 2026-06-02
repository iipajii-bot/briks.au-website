'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'ghost'
}

/**
 * Button-shaped CTA with a gold highlight tracing its perimeter.
 * Uses CSS conic-gradient with @property animation — no JS loop.
 */
export default function MovingBorder({
  href,
  children,
  className,
  variant = 'primary',
}: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        'group relative inline-flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:-translate-y-0.5',
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-90 transition-opacity group-hover:opacity-100"
        style={{
          background:
            variant === 'primary'
              ? 'conic-gradient(from var(--border-angle), transparent 0deg, #8a6e3f 35deg, #e26a32 80deg, transparent 140deg, transparent 360deg)'
              : 'conic-gradient(from var(--border-angle), transparent 0deg, #8a6e3f 40deg, #b89868 80deg, transparent 140deg, transparent 360deg)',
          animation: 'borderRotate 4s linear infinite',
        }}
      />
      <span
        className={clsx(
          'relative z-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors min-h-[44px]',
          variant === 'primary'
            ? 'bg-[#c9571f] text-[#1a1a1a] group-hover:bg-[#e26a32]'
            : 'bg-[#ffffff] text-[#1a1a1a] border border-[#c0bcb4] group-hover:bg-[#f3efe5]'
        )}
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {children}
      </span>

      <style jsx>{`
        @property --border-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes borderRotate {
          to {
            --border-angle: 360deg;
          }
        }
      `}</style>
    </Link>
  )
}
