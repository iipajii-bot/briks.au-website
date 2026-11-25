'use client'

/**
 * Hero object: one example repair moving through the Briks desk, stage by stage.
 * Auto-advances every 2.6s, pauses on hover/focus and has a pause button (motion > 5s).
 * Reduced motion: shows the finished state with every stage listed, no cycling.
 * Clearly labelled Example; suburb only, no names, no prices.
 */
import Image from 'next/image'
import { useEffect, useState } from 'react'

const STAGES = [
  { key: 'reported', time: '7:42 am', title: 'Tenant reports it', detail: '“Water dripping under the bathroom basin.” Texted to the Briks number with a photo.' },
  { key: 'triaged', time: '7:51 am', title: 'Triaged: urgent', detail: 'Water under a cabinet can damage the floor. Tenant asked to turn off the basin tap; job booked as urgent.' },
  { key: 'booked', time: '8:20 am', title: 'Licensed plumber booked', detail: 'Access arranged with the tenant for 1:30 pm. Tenant and property manager updated.' },
  { key: 'done', time: '2:45 pm', title: 'Fixed and checked', detail: 'Fitting under the basin replaced. Before and after photos reviewed before the job is closed.' },
  { key: 'report', time: 'Friday', title: 'On your Friday report', detail: 'With photos and one invoice for the owner. Nothing for the property manager to chase.' },
] as const

export default function JobTimeline() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => {
      setReduced(mq.matches)
      if (mq.matches) setI(STAGES.length - 1)
    }
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  useEffect(() => {
    if (reduced || paused || hover) return
    const t = window.setTimeout(() => setI((n) => (n + 1) % STAGES.length), i === STAGES.length - 1 ? 4200 : 2600)
    return () => window.clearTimeout(t)
  }, [i, paused, hover, reduced])

  const done = i >= 3

  return (
    <figure
      aria-label="Example of one repair moving through the Briks Maintenance Line"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="relative m-0 w-full overflow-hidden rounded-lg border border-[#c0bcb4] bg-white shadow-[0_32px_70px_-40px_rgba(26,26,26,0.55)]"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#e2ddd3] px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            {!reduced && !paused ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8a6e3f] opacity-40" /> : null}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8a6e3f]" />
          </span>
          <p className="font-heading text-[13px] font-semibold text-[#1a1a1a]">Leaking basin, Paralowie</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-heading rounded-sm border border-[#c0bcb4] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a5650]">
            Example
          </span>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play the example' : 'Pause the example'}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2ddd3] text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
            >
              {paused ? (
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7-4.5-7-4.5Z" fill="currentColor" /></svg>
              ) : (
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>
              )}
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        {/* stages */}
        <ol className="m-0 list-none p-0 px-5 py-4 sm:px-6">
          {STAGES.map((s, n) => {
            const state = n < i ? 'past' : n === i ? 'now' : 'next'
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => {
                    setI(n)
                    setPaused(true)
                  }}
                  aria-current={state === 'now' ? 'step' : undefined}
                  className="group grid w-full grid-cols-[20px_minmax(0,1fr)] gap-3 py-2 text-left"
                >
                  <span className="relative flex justify-center pt-1">
                    <span
                      className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                        state === 'now' ? 'scale-125 border-[#8a6e3f] bg-[#8a6e3f]' : state === 'past' ? 'border-[#1a1a1a] bg-[#1a1a1a]' : 'border-[#c0bcb4] bg-white'
                      }`}
                    />
                    {n < STAGES.length - 1 ? (
                      <span className={`absolute top-5 h-[calc(100%-4px)] w-px ${n < i ? 'bg-[#1a1a1a]' : 'bg-[#e2ddd3]'}`} />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={`font-heading text-[14.5px] font-semibold transition-colors ${state === 'next' ? 'text-[#8a857c]' : 'text-[#1a1a1a]'}`}>
                        {s.title}
                      </span>
                      <span className="font-heading shrink-0 text-[12px] tabular-nums text-[#5a5650]">{s.time}</span>
                    </span>
                    <span
                      className={`grid transition-all duration-300 ${state === 'now' ? 'mt-1 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <span className="overflow-hidden text-[13.5px] leading-relaxed text-[#3a3735]">{s.detail}</span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {/* photo: the proof each job comes with */}
        <div className="relative min-h-[220px] border-t border-[#e2ddd3] bg-[#f3efe5] sm:border-l sm:border-t-0">
          <Image
            src="/stock/maintenance.jpg"
            alt="A plumber's hands tightening a brass fitting under a basin"
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw"
            className={`object-cover transition-all duration-700 ${done ? 'opacity-100 saturate-100' : 'opacity-60 saturate-0'}`}
            priority
          />
          <span
            className={`font-heading absolute left-3 top-3 rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
              done ? 'bg-[#e7efe9] text-[#2f5a40]' : 'bg-white/90 text-[#5a5650]'
            }`}
          >
            {done ? 'After photo' : 'Waiting on the trade'}
          </span>
        </div>
      </div>
    </figure>
  )
}
