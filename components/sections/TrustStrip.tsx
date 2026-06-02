import { ShieldCheck, Wrench, MapPin, Clock } from 'lucide-react'
import { SITE } from '@/lib/constants'

/**
 * Compact compliance + reach pill row. Sits between Hero and AudienceTiles
 * to ground the brand before audience routing.
 *
 * No license # (we coordinate licensed tradies, not in-house licensed).
 * No insurance dollar figure — kept private.
 */
export default function TrustStrip() {
  const items = [
    {
      Icon: Wrench,
      label: 'Licensed tradies',
      sub: 'Vetted network',
    },
    {
      Icon: ShieldCheck,
      label: 'Insured + compliant',
      sub: `ABN ${SITE.abn}`,
    },
    {
      Icon: Clock,
      label: '24 / 7 emergency',
      sub: 'Real humans, no IVR',
    },
    {
      Icon: MapPin,
      label: 'Adelaide metro',
      sub: '38+ suburbs',
    },
  ]

  return (
    <section
      aria-label="Trust signals"
      className="relative bg-[#fafaf7] border-y border-[#e2ddd3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map(({ Icon, label, sub }) => (
            <li
              key={label}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#e2ddd3] bg-white">
                <Icon size={14} className="text-[#8a6e3f]" aria-hidden />
              </div>
              <div className="min-w-0">
                <p
                  className="text-[#1a1a1a] text-xs md:text-sm tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {label}
                </p>
                <p className="text-[10px] tracking-[0.16em] uppercase text-[#5a5650] truncate">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
