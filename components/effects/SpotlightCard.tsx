'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(200, 169, 110, 0.18)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-[#e2ddd3] bg-[#ffffff] p-7 transition-colors duration-500 hover:border-[#c0bcb4]',
        className
      )}
      style={
        {
          '--mx': '50%',
          '--my': '50%',
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mx) var(--my), ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
