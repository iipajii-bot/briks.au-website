'use client'

/**
 * Pure CSS + SVG animated silk background.
 * Two slowly counter-drifting radial gradients + grain overlay.
 * Honors prefers-reduced-motion via globals.css media query.
 * No WebGL / three / ogl dependency. RSC-safe when imported via next/dynamic.
 */
export default function Silk() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] motion-reduce:hidden"
    >
      {/* Base gradient — paper-warm fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f3efe5_0%,#fafaf7_60%)]" />

      {/* Drifting silk ribbon 1 — brass tint */}
      <div
        className="absolute -inset-[20%] opacity-50 mix-blend-multiply will-change-transform"
        style={{
          background:
            'conic-gradient(from 220deg at 50% 50%, transparent 0deg, rgba(138,110,63,0.10) 90deg, rgba(138,110,63,0.18) 140deg, rgba(138,110,63,0.04) 200deg, transparent 260deg)',
          filter: 'blur(80px)',
          animation: 'silkDrift 24s ease-in-out infinite alternate',
        }}
      />

      {/* Drifting silk ribbon 2 */}
      <div
        className="absolute -inset-[20%] opacity-40 mix-blend-multiply will-change-transform"
        style={{
          background:
            'conic-gradient(from 40deg at 50% 50%, transparent 0deg, rgba(184,152,104,0.10) 120deg, rgba(106,85,48,0.14) 180deg, transparent 280deg)',
          filter: 'blur(110px)',
          animation: 'silkDrift2 34s ease-in-out infinite alternate',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#fafaf7_85%)]" />

      {/* Film grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="silkNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#silkNoise)" />
      </svg>

      <style jsx>{`
        @keyframes silkDrift {
          0% {
            transform: translate3d(-6%, -4%, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate3d(6%, 4%, 0) rotate(12deg) scale(1.1);
          }
        }
        @keyframes silkDrift2 {
          0% {
            transform: translate3d(4%, 6%, 0) rotate(0deg) scale(1.05);
          }
          100% {
            transform: translate3d(-4%, -6%, 0) rotate(-10deg) scale(1.15);
          }
        }
      `}</style>
    </div>
  )
}
