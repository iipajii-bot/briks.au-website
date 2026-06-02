import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ShieldCheck, Wallet, Star, X } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import MovingBorder from '@/components/effects/MovingBorder'
import SpotlightCard from '@/components/effects/SpotlightCard'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'The Briks Trade Network — Standards, Vetting, Payment',
  description:
    'How Briks builds the trade network. Licence + insurance verified before onboarding. Prompt payment terms. Three-strikes quality rule.',
  alternates: { canonical: '/about/network' },
}

const standards = [
  {
    icon: ShieldCheck,
    title: 'Licence + insurance verified',
    body: 'Every trade is checked against state licensing register and CGU/QBE liability before first dispatch. Re-verified annually.',
  },
  {
    icon: Wallet,
    title: 'Paid promptly',
    body: 'No ninety-day terms. Tradies in the network are paid soon after the job closes. We carry the float.',
  },
  {
    icon: Star,
    title: 'Quality rating per job',
    body: 'Internal rating updated after every job. Photos, on-time, customer feedback, no callbacks. Affects allocation weight on next quote.',
  },
  {
    icon: X,
    title: 'Three-strikes removal',
    body: 'No-shows without notice, bad finish without remediation, customer disputes — three strikes and the trade is removed. Clean slate available after a re-onboarding interview.',
  },
]

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.url}/about` },
    { '@type': 'ListItem', position: 3, name: 'Trade network', item: `${SITE.url}/about/network` },
  ],
}

export default function NetworkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Trade Network"
        title={
          <>
            How Briks{' '}
            <span className="text-[#8a6e3f]">builds the network.</span>
          </>
        }
        subtitle={
          <>
            Standards, vetting, payment terms, what gets a tradie removed.
            We&rsquo;d rather turn work away than dispatch someone we
            wouldn&rsquo;t send to our own family&rsquo;s home.
          </>
        }
      />

      <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageBanner
            src={IMAGES.aboutNetwork}
            alt="Tools laid out on a workbench"
            aspect="banner"
          />
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {standards.map((s) => {
              const Icon = s.icon
              return (
                <SpotlightCard key={s.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#f3efe5] mb-5">
                    <Icon size={20} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <h3
                    className="font-display text-xl text-[#1a1a1a] mb-3 tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed">{s.body}</p>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            Allocation
          </p>
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-6 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            How jobs get assigned.
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-6">
            One job, one tradie — the right one. A coordinator reads the
            brief, matches it to the specialist on the bench whose skill,
            experience, and current capacity fit the work, and books them in.
            No quote auctions, no race-to-the-bottom pricing, no rotating
            through whoever is closest.
          </p>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-6">
            Heritage waterproofing goes to the heritage waterproofer.
            Switchboard upgrades go to the A-grade spark who&rsquo;s done two
            hundred of them. A leaking tap goes to the plumber who can clear
            it in twenty minutes flat — not the apprentice with a free
            afternoon.
          </p>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed">
            Emergencies skip everything else and dispatch immediately from a
            pre-agreed emergency roster. Renovations and fit-outs get a
            site-visit and an itemised, hand-built quote — no calculator
            shortcuts.
          </p>
        </div>
      </section>

      <section className="relative py-24 md:py-28 bg-[#fafaf7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Are you a licensed tradesperson?
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            We&rsquo;re building the network now. If you hold a current
            licence, carry liability, and want a steady channel paid promptly —
            apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/trade-partners">
              Apply to join
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <ArrowLeft size={14} aria-hidden />
              About Briks
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
