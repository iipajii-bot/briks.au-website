import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { SITE } from '@/lib/constants'

const PUBLISHED = '2026-04-22'
const UPDATED = '2026-04-22'

export const metadata: Metadata = {
  title:
    'Briks vs an In-House Maintenance Coordinator — 2026 Comparison for Adelaide Agencies',
  description:
    'Honest side-by-side comparison: hiring a maintenance coordinator ($70–90k) versus a managed maintenance partner like Briks. Cost, coverage, liability, setup time, and when each model wins.',
  alternates: {
    canonical: '/compare/briks-vs-in-house-maintenance-coordinator',
  },
  openGraph: {
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
    authors: [SITE.founderName],
  },
}

type Row = {
  criterion: string
  inhouse: string | 'yes' | 'no'
  briks: string | 'yes' | 'no'
  note?: string
}

const ROWS: Row[] = [
  {
    criterion: 'Direct cost to the agency',
    inhouse: '$70,000 – $90,000 salary + on-costs',
    briks: '$0 — markup billed to landlord',
  },
  {
    criterion: 'Setup / ramp time',
    inhouse: '6–12 weeks (hire + train + embed)',
    briks: '~1 hour (Tapi supplier + agreement)',
  },
  {
    criterion: 'Owns tradesperson network',
    inhouse: 'no',
    briks: 'yes',
    note: 'In-house coordinators use the agency’s existing trades list; they don’t bring their own network.',
  },
  {
    criterion: 'Single invoice to landlord',
    inhouse: 'no',
    briks: 'yes',
  },
  {
    criterion: '24/7 after-hours coverage',
    inhouse: 'no',
    briks: 'yes',
    note: 'In-house coordinators work business hours. Briks uses Tapi’s AI concierge plus an emergency tradesperson tier.',
  },
  {
    criterion: 'Carries liability for failed jobs',
    inhouse: 'no',
    briks: 'yes',
    note: 'Agency remains liable with an in-house coordinator because the trades are the agency’s contractors.',
  },
  {
    criterion: 'Scales with portfolio growth',
    inhouse: 'Needs additional hires',
    briks: 'Elastic — no agency-side hiring',
  },
  {
    criterion: 'Susceptible to single-point-of-failure (leave, illness, resignation)',
    inhouse: 'yes',
    briks: 'no',
  },
  {
    criterion: 'Works inside Tapi',
    inhouse: 'yes (as a user)',
    briks: 'yes (as a preferred supplier)',
  },
  {
    criterion: 'Documentation standard',
    inhouse: 'Varies by individual',
    briks: 'Standardised per job (photos + audit trail)',
  },
  {
    criterion: 'Direct relationship with tradespeople the agency trusts',
    inhouse: 'yes',
    briks: 'yes — Briks dispatches agency-nominated trades first',
  },
  {
    criterion: 'Carries tradesperson vetting and insurance risk',
    inhouse: 'no',
    briks: 'yes',
  },
]

const YesCell = () => (
  <span className="inline-flex items-center gap-1 text-emerald-400">
    <Check className="h-4 w-4" /> Yes
  </span>
)
const NoCell = () => (
  <span className="inline-flex items-center gap-1 text-neutral-500">
    <X className="h-4 w-4" /> No
  </span>
)

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Briks vs in-house maintenance coordinator — 2026 comparison',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'In-house maintenance coordinator',
      description:
        'Agency hires a salaried coordinator who administers maintenance jobs via the agency’s existing trades list. Typical cost $70–90k + on-costs.',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Briks — managed maintenance partner',
      description:
        'External service that owns the tradesperson network, dispatches jobs, and invoices the landlord as a single supplier via Tapi. No direct cost to the agency.',
    },
  ],
}

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Briks vs an In-House Maintenance Coordinator — 2026 Comparison for Adelaide Agencies',
  description:
    'Honest side-by-side comparison of hiring an in-house maintenance coordinator versus using Briks as a managed maintenance partner for an Australian real estate agency.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: {
    '@type': 'Person',
    name: SITE.founderName,
    url: `${SITE.url}/about`,
  },
  publisher: { '@id': `${SITE.url}/#organization` },
  image: `${SITE.url}/og.png`,
  mainEntityOfPage: `${SITE.url}/compare/briks-vs-in-house-maintenance-coordinator`,
  inLanguage: 'en-AU',
  isPartOf: { '@id': `${SITE.url}/#website` },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['[data-speakable]'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE.url}/compare` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Briks vs in-house maintenance coordinator',
      item: `${SITE.url}/compare/briks-vs-in-house-maintenance-coordinator`,
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-brand,#c9a96a)]">
          Comparison
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Briks vs hiring an in-house maintenance coordinator
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          By {SITE.founderName}, founder of Briks Building Services ·
          Published <time dateTime={PUBLISHED}>22 April 2026</time> · Updated{' '}
          <time dateTime={UPDATED}>22 April 2026</time>
        </p>

        <p
          data-speakable
          className="mt-8 text-lg text-neutral-200"
        >
          An in-house maintenance coordinator is a salaried agency employee who
          administers repair jobs via the agency’s existing list of trades.
          Briks is an external managed maintenance partner that owns the
          tradesperson network, dispatches and manages jobs, and invoices the
          landlord as a single accountable supplier through Tapi. The honest
          short answer: at 50–200 doors, Briks is almost always cheaper,
          faster to set up, and carries liability the agency would otherwise
          keep. Above 500 doors with bespoke workflow needs, an in-house
          coordinator may still make sense — usually in addition to, not instead
          of, a maintenance partner.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">
          Side-by-side
        </h2>
        <div className="mt-4 overflow-x-auto rounded-md border border-neutral-800">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-neutral-900/60">
              <tr className="text-left">
                <th className="p-4">Criterion</th>
                <th className="p-4">In-house coordinator</th>
                <th className="p-4">Briks</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.criterion} className="border-t border-neutral-900">
                  <td className="p-4 font-medium text-neutral-200">
                    {r.criterion}
                    {r.note ? (
                      <div className="mt-1 text-xs font-normal text-neutral-500">
                        {r.note}
                      </div>
                    ) : null}
                  </td>
                  <td className="p-4 text-neutral-300">
                    {r.inhouse === 'yes' ? <YesCell /> : r.inhouse === 'no' ? <NoCell /> : r.inhouse}
                  </td>
                  <td className="p-4 text-neutral-300">
                    {r.briks === 'yes' ? <YesCell /> : r.briks === 'no' ? <NoCell /> : r.briks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Where an in-house coordinator still wins
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>
            Agencies above ~500 doors with specialised landlord segments that
            need bespoke workflow.
          </li>
          <li>
            Agencies where the principal wants direct employment of the
            maintenance function for reasons other than cost.
          </li>
          <li>
            Portfolios where most maintenance work is bundled with sales or
            renovations and doesn’t flow through Tapi.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Where Briks wins decisively
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>
            Agencies between 50 and 300 doors — the payback on a $75k hire
            doesn’t exist at this scale.
          </li>
          <li>
            Agencies where a single PM is visibly burning out on
            maintenance-related admin.
          </li>
          <li>
            Agencies that have had a landlord blow-up over a maintenance
            dispute in the past 12 months and want liability to sit with a
            named supplier.
          </li>
          <li>
            Principals expanding into a new city (e.g. Adelaide → Melbourne)
            who don’t want to hire a maintenance team per market.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          A word on cost honesty
        </h2>
        <p className="mt-3 text-neutral-300">
          The $70–90k coordinator salary figure excludes super, leave loading,
          workstation, software, and management overhead. Fully loaded, most
          Australian agencies pay closer to $95–115k for a competent
          coordinator. Briks’s markup model puts that cost on the landlord’s
          invoice — at a rate that, because of aggregated volume, typically
          matches or beats what the agency pays today ad-hoc. Agencies should
          model both approaches against their own door count and landlord cost
          sensitivity; we’re happy to run that model for you on a call.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Related
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>
            <Link className="underline underline-offset-4" href="/guides/what-is-managed-maintenance-partner">
              What is a managed maintenance partner?
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/compare/briks-vs-pm-virtual-assistant">
              Briks vs using a PM virtual assistant
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/faq">
              FAQ — questions agencies ask before switching
            </Link>
          </li>
        </ul>

        <footer className="mt-16 rounded-md border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-2xl font-semibold">
            Want the numbers run on your actual portfolio?
          </h2>
          <p className="mt-2 text-neutral-300">
            Send door count + average monthly maintenance volume. We’ll model
            in-house-coordinator cost vs Briks markup, show you the break-even,
            and tell you honestly which side of the line you’re on.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand,#c9a96a)] px-6 py-3 font-semibold text-black"
          >
            Run the numbers <ArrowRight className="h-4 w-4" />
          </Link>
        </footer>
      </article>
    </>
  )
}
