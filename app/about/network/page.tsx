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
  title: { absolute: 'How Briks Works With Trades | Briks' },
  description:
    'How Briks works with independent trades licensed in South Australia: quotes, approval limits, before and after photos and one invoice per job.',
  alternates: { canonical: '/about/network' },
}

const standards = [
  {
    icon: ShieldCheck,
    title: 'Independent trades licensed in South Australia',
    body: 'Independent trades are licensed in South Australia for their own work.',
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
          <>Independent trades, licensed in South Australia for their own work. We organise repairs, maintenance and renovation work. Homeowners and businesses get a written quote before work starts.</>
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
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-6">One phone number for all, and one invoice from Briks for each finished job. Briks organises the repair or maintenance work with independent trades. Trades are licensed in South Australia for their own work.</p>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-6">Heritage waterproofing: a trade licensed in South Australia for that work. Switchboard upgrades: an electrician licensed in South Australia for electrical work. A leaking tap: a plumber licensed in South Australia for plumbing work finds the source and quotes the fix.</p>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed">If anyone is in danger, call 000. Briks can organise the repair afterwards during business hours. Renovations and fit-outs for homeowners and businesses get a written quote before work starts.</p>
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
