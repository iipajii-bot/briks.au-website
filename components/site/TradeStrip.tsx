import Image from 'next/image'
import { cls } from './ui'

/** Photo strip of the trades Briks coordinates. Scrolls sideways on phones, six columns on desktop. */
export const TRADES = [
  { src: '/stock/plumbing.jpg', label: 'Plumbing', alt: 'A brass pipe trap under a basin being tightened with a wrench' },
  { src: '/stock/electrical.jpg', label: 'Electrical', alt: 'A switchboard of circuit breakers with a multimeter' },
  { src: '/stock/roofing.jpg', label: 'Roofs and gutters', alt: 'Terracotta roof tiles and a gutter in late sun' },
  { src: '/stock/carpentry.jpg', label: 'Doors and carpentry', alt: 'A spirit level, hand plane and wood shavings on plans' },
  { src: '/stock/painting.jpg', label: 'Painting', alt: 'A freshly painted skirting board with a brush on a paint tin' },
  { src: '/stock/tiling.jpg', label: 'Tiling and floors', alt: 'Floor tiles with a tile spacer and a notched trowel' },
] as const

export default function TradeStrip({ title, note }: { title: string; note: string }) {
  return (
    <section aria-labelledby="trades-h" className="border-y border-[#e2ddd3] bg-white">
      <div className={`${cls.wrap} py-10 md:py-12`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="trades-h" className="font-display text-[clamp(22px,2.4vw,28px)] font-bold text-[#1a1a1a]">
            {title}
          </h2>
          <p className="text-[14px] text-[#5a5650]">{note}</p>
        </div>
        <ul className="m-0 mt-6 flex list-none snap-x gap-3 overflow-x-auto p-0 pb-2 md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
          {TRADES.map((t) => (
            <li
              key={t.label}
              className="group relative aspect-[4/5] w-[44vw] max-w-[220px] shrink-0 snap-start overflow-hidden rounded-md bg-[#f3efe5] md:w-auto md:max-w-none"
            >
              <Image src={t.src} alt={t.alt} fill sizes="(min-width: 768px) 190px, 44vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <span className="font-heading absolute inset-x-2 bottom-2 rounded-sm bg-white/95 px-2.5 py-1.5 text-[13px] font-semibold text-[#1a1a1a]">
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** A photo in a rounded frame that fills its grid cell. */
export function Photo({ src, alt, className = '', ratio = 'aspect-[4/3]', sizes = '(min-width: 1024px) 480px, 100vw' }: { src: string; alt: string; className?: string; ratio?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-[#f3efe5] ${ratio} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  )
}
