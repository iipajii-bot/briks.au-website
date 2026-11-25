'use client'

/**
 * "Check this first" guided checklist for common, safe, do-it-yourself checks.
 * Deliberately conservative: no opening switchboards, no gas work, no ladders on roofs.
 * Emergency numbers verified 24 Nov 2026:
 *  - Gas leaks: Australian Gas Networks 1800 427 532 (24 hours)
 *  - Power outages/faults: SA Power Networks 13 13 66 (24/7)
 */
import { useId, useState } from 'react'

import { FIXES, type Fix } from './quickFixesData'

function Icon({ name }: { name: Fix['icon'] }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
      {name === 'bulb' && (<g {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" /></g>)}
      {name === 'power' && (<g {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></g>)}
      {name === 'water' && (<g {...p}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" /></g>)}
      {name === 'drain' && (<g {...p}><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></g>)}
      {name === 'alarm' && (<g {...p}><circle cx="12" cy="13" r="7" /><path d="M12 10v3l2 1.5M5 4 3 6M19 4l2 2" /></g>)}
      {name === 'leak' && (<g {...p}><path d="M4 6h10a3 3 0 0 1 3 3v1" /><path d="M17 14s2 2.2 2 3.5a2 2 0 0 1-4 0c0-1.3 2-3.5 2-3.5Z" /><path d="M4 4v4" /></g>)}
    </svg>
  )
}

export default function QuickFixes({ contactHref, contactLabel }: { contactHref: string; contactLabel: string }) {
  const uid = useId()
  const [sel, setSel] = useState(FIXES[0].id)
  const cur = FIXES.find((f) => f.id === sel) ?? FIXES[0]

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div role="tablist" aria-label="Common problems" className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:col-span-5 md:grid-cols-1">
        {FIXES.map((f) => {
          const on = f.id === sel
          return (
            <button
              key={f.id}
              id={`${uid}-tab-${f.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              onClick={() => setSel(f.id)}
              className={`font-heading flex min-h-[52px] items-center gap-3 rounded-md border px-4 py-3 text-left text-[15px] font-semibold transition-all duration-200 ${
                on
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#fafaf7] shadow-[0_10px_24px_-14px_rgba(26,26,26,0.6)]'
                  : 'border-[#e2ddd3] bg-white text-[#1a1a1a] hover:-translate-y-0.5 hover:border-[#c0bcb4] hover:shadow-[0_10px_24px_-18px_rgba(26,26,26,0.45)]'
              }`}
            >
              <span className={on ? 'text-[#b89868]' : 'text-[#8a6e3f]'}>
                <Icon name={f.icon} />
              </span>
              {f.label}
            </button>
          )
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${cur.id}`}
        className="rounded-lg border border-[#e2ddd3] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(26,26,26,0.45)] sm:p-8 md:col-span-7"
      >
        <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8a6e3f]">Check this first</p>
        <p className="font-display mt-2 text-[26px] font-bold leading-tight text-[#1a1a1a]">{cur.label}</p>
        <ol className="m-0 mt-5 list-none p-0">
          {cur.checks.map((c, i) => (
            <li key={c} className="flex gap-4 border-t border-[#e2ddd3] py-4 text-[15.5px] leading-relaxed text-[#3a3735]">
              <span className="font-ticker mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f3efe5] text-[13px] text-[#6a5530]">
                {i + 1}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ol>
        <div className="mt-2 rounded-md bg-[#f3efe5] p-4 text-[15px] leading-relaxed text-[#1a1a1a]">
          <span className="font-semibold">Still not fixed?</span> {cur.stop}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={contactHref}
            className="font-heading inline-flex min-h-[48px] items-center justify-center rounded-sm bg-[#1a1a1a] px-5 text-[15px] font-semibold text-[#fafaf7] transition-colors hover:bg-[#6a5530]"
          >
            {contactLabel}
          </a>
          <span className="text-[13px] text-[#5a5650]">If anyone is in danger, call 000.</span>
        </div>
      </div>
    </div>
  )
}
