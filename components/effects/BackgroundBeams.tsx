'use client'

/**
 * Pure-CSS beams: thin gold vertical light shafts, slowly traveling.
 * Paired with deep radial vignette. No WebGL.
 */
export default function BackgroundBeams() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#f3efe5_0%,#fafaf7_70%)]" />

      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-[1px] origin-top will-change-transform"
          style={{
            left: `${10 + i * 20}%`,
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(138,110,63,0.55) 35%, rgba(138,110,63,0.2) 70%, transparent 100%)',
            transform: `translateY(-100%) rotate(${-4 + i}deg)`,
            animation: `beamFall ${6 + i * 1.7}s ease-in-out ${i * 0.8}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#fafaf7_90%)]" />

      <style jsx>{`
        @keyframes beamFall {
          0% {
            transform: translateY(-100%) rotate(-4deg);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100%) rotate(-4deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
