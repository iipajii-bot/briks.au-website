'use client'

import { type ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode[]
  radius?: number
  duration?: number
  reverse?: boolean
  className?: string
}

export default function OrbitingCircles({
  children,
  radius = 160,
  duration = 30,
  reverse = false,
  className,
}: Props) {
  const count = children.length
  return (
    <div
      aria-hidden
      className={clsx(
        'pointer-events-none absolute inset-0',
        className
      )}
      style={{
        animation: `${reverse ? 'orbitR' : 'orbit'} ${duration}s linear infinite`,
      }}
    >
      {children.map((child, i) => {
        const angle = (360 / count) * i
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
            }}
          >
            <div
              style={{
                animation: `${reverse ? 'orbit' : 'orbitR'} ${duration}s linear infinite`,
              }}
            >
              {child}
            </div>
          </div>
        )
      })}
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitR {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
