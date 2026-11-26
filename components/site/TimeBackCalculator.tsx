'use client'

/**
 * Time-back calculator: the agency's own numbers become the anchor before price is discussed.
 * Defaults are labelled estimates. Optional render prop lets the property-manager page reuse the numbers.
 */
import { useId, useMemo, useState, type ReactNode } from 'react'
import { ESTIMATE, timeBack, fmt } from './personal'

export type TimeBackValues = { doors: number; req: number; mins: number; rate: number } & ReturnType<typeof timeBack>

export default function TimeBackCalculator({
  defaultDoors = 200,
  doorsLabel = 'Properties managed',
  children,
}: {
  defaultDoors?: number
  doorsLabel?: string
  children?: (v: TimeBackValues) => ReactNode
}) {
  const uid = useId()
  const [doors, setDoors] = useState(String(defaultDoors))
  const [req, setReq] = useState(String(ESTIMATE.requestsPerDoor))
  const [mins, setMins] = useState(String(ESTIMATE.minutesPerRequest))
  const [rate, setRate] = useState(String(ESTIMATE.hourlyCost))

  const v = useMemo(() => {
    const num = (s: string, max: number) => {
      const n = parseFloat(s.replace(/,/g, ''))
      return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : 0
    }
    const d = num(doors, 20000)
    const r = num(req, 50)
    const m = num(mins, 600)
    const h = num(rate, 1000)
    return { doors: d, req: r, mins: m, rate: h, ...timeBack(d, r, m, h) }
  }, [doors, req, mins, rate])

  const input =
    'mt-1.5 block w-full rounded-sm border border-[#4a4640] bg-[#262421] px-3.5 py-3 font-heading text-[18px] font-semibold text-[#fafaf7] tabular-nums focus:border-[#b89868] focus:outline-none'
  const fields: Array<[string, string, (s: string) => void, string]> = [
    [doorsLabel, doors, setDoors, 'numeric'],
    ['Repair requests per property, per year', req, setReq, 'decimal'],
    ['Property manager minutes per request today', mins, setMins, 'numeric'],
    ['Cost of a property manager hour ($)', rate, setRate, 'numeric'],
  ]

  return (
    <div className="grid gap-10 rounded-lg bg-[#1a1a1a] p-6 text-[#fafaf7] sm:p-8 md:grid-cols-2 md:gap-12">
      <div>
        {fields.map(([label, value, set, mode], i) => (
          <div key={label} className={i ? 'mt-5' : ''}>
            <label htmlFor={`${uid}-${i}`} className="font-heading text-[14px] font-medium text-[#cfc8b8]">
              {label}
            </label>
            <input
              id={`${uid}-${i}`}
              inputMode={mode as 'numeric' | 'decimal'}
              value={value}
              onChange={(e) => set(e.target.value)}
              className={input}
            />
          </div>
        ))}
        <p className="mt-5 text-[13px] leading-relaxed text-[#a8a195]">
          Starting figures are estimates ({ESTIMATE.requestsPerDoor} requests a property a year, {ESTIMATE.minutesPerRequest} minutes each, $
          {ESTIMATE.hourlyCost} an hour). Change them to your agency&rsquo;s own. This is your team&rsquo;s time.
        </p>
      </div>
      <div aria-live="polite" className="flex flex-col gap-5">
        {[
          ['Repair requests a week', fmt(v.requestsWeek, 1)],
          ['Property manager hours a week', `${fmt(v.hoursWeek, 1)} h`],
          ['Hours a year', `${fmt(v.hoursYear)} h`],
          ['What that staff time costs a year', `$${fmt(v.costYear)}`],
        ].map(([l, n]) => (
          <div key={l} className="border-t border-[#3a3733] pt-3">
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-[#b89868]">{l}</p>
            <p className="font-ticker mt-1 text-[clamp(28px,3.4vw,38px)] leading-none text-[#fafaf7]">{n}</p>
          </div>
        ))}
        {v.hoursWeek > 0 ? (
          <p className="text-[15px] leading-relaxed text-[#e7e1d3]">
            That is about {fmt(v.daysWeek, 1)} working days every week spent on repairs instead of owners and leasing.
          </p>
        ) : null}
        {children ? children(v) : null}
      </div>
    </div>
  )
}
