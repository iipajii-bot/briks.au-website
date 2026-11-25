/**
 * The product, shown as itself: an example Friday report.
 * Clearly labelled "Example". Suburbs only, no addresses, names or prices.
 */
const ROWS = [
  { job: 'Hot water not working', suburb: 'Paralowie', trade: 'Plumber', status: 'Done', when: 'Tue', tone: 'done' },
  { job: 'Gutter overflowing at the back', suburb: 'Modbury', trade: 'Roof plumber', status: 'Done', when: 'Wed', tone: 'done' },
  { job: 'Bedroom door sticking', suburb: 'Elizabeth Park', trade: 'Carpenter', status: 'Done', when: 'Thu', tone: 'done' },
  { job: 'Rangehood not extracting', suburb: 'Golden Grove', trade: 'Electrician', status: 'Booked', when: 'Mon 9am', tone: 'booked' },
  { job: 'Shower screen leaking', suburb: 'Salisbury', trade: 'Glazier', status: 'Quote to you', when: 'Over limit', tone: 'you' },
] as const

const TONE: Record<(typeof ROWS)[number]['tone'], string> = {
  done: 'bg-[#e7efe9] text-[#2f5a40]',
  booked: 'bg-[#f3efe5] text-[#6a5530]',
  you: 'bg-[#1a1a1a] text-[#fafaf7]',
}

export default function FridayReport() {
  return (
    <figure
      aria-label="Example of the weekly Friday report an agency receives"
      className="relative m-0 w-full rounded-lg border border-[#c0bcb4] bg-white shadow-[0_24px_60px_-36px_rgba(26,26,26,0.45)]"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#e2ddd3] px-5 py-4 sm:px-6">
        <div>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6e3f]">
            Friday report
          </p>
          <p className="font-heading mt-1 text-[15px] font-semibold text-[#1a1a1a]">Week ending Friday 20 November</p>
        </div>
        <span className="font-heading shrink-0 rounded-sm border border-[#c0bcb4] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a5650]">
          Example
        </span>
      </div>

      <dl className="grid grid-cols-3 border-b border-[#e2ddd3] text-center">
        {[
          ['5', 'requests'],
          ['3', 'done'],
          ['1', 'needs you'],
        ].map(([n, l]) => (
          <div key={l} className="px-3 py-3 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-[#e2ddd3]">
            <dt className="sr-only">{l}</dt>
            <dd className="m-0">
              <span className="font-ticker block text-[26px] leading-none text-[#1a1a1a]">{n}</span>
              <span className="font-heading mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#5a5650]">{l}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="m-0 list-none divide-y divide-[#e2ddd3] p-0">
        {ROWS.map((r) => (
          <li key={r.job} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3 sm:px-6">
            <span className="min-w-0 truncate text-[14px] font-medium text-[#1a1a1a]">{r.job}</span>
            <span className={`font-heading row-span-2 self-center rounded-sm px-2 py-1 text-[11px] font-semibold ${TONE[r.tone]}`}>
              {r.status}
            </span>
            <span className="min-w-0 truncate text-[12.5px] text-[#5a5650]">
              {r.suburb} · {r.trade} · {r.when}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="border-t border-[#e2ddd3] bg-[#fafaf7] px-5 py-3 text-[12.5px] leading-relaxed text-[#5a5650] sm:px-6">
        Every finished job comes with before and after photos and an invoice for the work, through your agency.
      </figcaption>
    </figure>
  )
}
