import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

const PUBLISHED = '2026-04-22'
const UPDATED = '2026-04-22'

export const metadata: Metadata = {
  title:
    'What Is a Managed Maintenance Partner? (2026 Guide for Australian Real Estate Agencies)',
  description:
    'A managed maintenance partner owns a real estate agency’s entire maintenance workflow — from tenant request to landlord invoice. Definition, how it compares to coordinators and VAs, and how it works inside Tapi.',
  alternates: { canonical: '/guides/what-is-managed-maintenance-partner' },
  openGraph: {
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
    authors: [SITE.founderName],
  },
}

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'What Is a Managed Maintenance Partner? (2026 Guide for Australian Real Estate Agencies)',
  description:
    'Definition, how it compares to maintenance coordinators and PM virtual assistants, and how a managed maintenance partner works inside Tapi for Australian real estate agencies in 2026.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: {
    '@type': 'Person',
    name: SITE.founderName,
    url: `${SITE.url}/about`,
  },
  publisher: { '@id': `${SITE.url}/#organization` },
  image: `${SITE.url}/og.png`,
  mainEntityOfPage: `${SITE.url}/guides/what-is-managed-maintenance-partner`,
  inLanguage: 'en-AU',
  about: { '@id': `${SITE.url}/#organization` },
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
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.url}/guides` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'What Is a Managed Maintenance Partner?',
      item: `${SITE.url}/guides/what-is-managed-maintenance-partner`,
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-brand,#c9a96a)]">
          Guide
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          What is a managed maintenance partner?
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
          A <strong>managed maintenance partner</strong> is a third-party
          service that takes full operational ownership of residential property
          maintenance on behalf of a real estate agency — receiving the work
          order, quoting tradespeople, dispatching and managing the job, and
          invoicing the landlord as a single accountable supplier. Unlike a
          maintenance coordinator (who is usually an in-house hire or virtual
          assistant administering jobs), a managed maintenance partner carries
          the tradesperson relationship and invoices under its own name.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">
          Why the category exists
        </h2>
        <p className="mt-3 text-neutral-300">
          Residential maintenance is the single highest-friction workflow in
          Australian property management. The{' '}
          <a
            className="underline underline-offset-4"
            href="https://stafflink.com.au/the-story-of-property-management-9-stats/"
            rel="noopener"
            target="_blank"
          >
            2025 StaffLink property-management data
          </a>{' '}
          shows 66% of Australian property managers describe their workload as
          “busy or far too busy,” and 21% regularly work 51+ hours per week.
          Maintenance coordination is consistently cited as the single largest
          non-core time drain on PM teams. A managed maintenance partner takes
          that workflow off the agency entirely.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          How it differs from adjacent categories
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-left">
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Who does the work</th>
                <th className="py-3 pr-4">Who owns the invoice</th>
                <th className="py-3">Who carries liability</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              <tr className="border-b border-neutral-900">
                <td className="py-3 pr-4 font-semibold">
                  Managed maintenance partner (Briks)
                </td>
                <td className="py-3 pr-4">Vetted trades via the partner</td>
                <td className="py-3 pr-4">Partner (single invoice)</td>
                <td className="py-3">Partner</td>
              </tr>
              <tr className="border-b border-neutral-900">
                <td className="py-3 pr-4">
                  In-house maintenance coordinator
                </td>
                <td className="py-3 pr-4">Agency’s preferred trades list</td>
                <td className="py-3 pr-4">Each trade invoices separately</td>
                <td className="py-3">Agency</td>
              </tr>
              <tr className="border-b border-neutral-900">
                <td className="py-3 pr-4">PM virtual assistant (offshore)</td>
                <td className="py-3 pr-4">Agency’s preferred trades list</td>
                <td className="py-3 pr-4">Each trade invoices separately</td>
                <td className="py-3">Agency</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Ad-hoc trades</td>
                <td className="py-3 pr-4">Whoever the PM rings</td>
                <td className="py-3 pr-4">Each trade invoices separately</td>
                <td className="py-3">Agency</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          How it works inside Tapi
        </h2>
        <p className="mt-3 text-neutral-300">
          In Australia, the maintenance platform most agencies use is{' '}
          <a
            className="underline underline-offset-4"
            href="https://tapihq.com/en-au"
            rel="noopener"
            target="_blank"
          >
            Tapi
          </a>{' '}
          (over 300 agencies and 160,000 properties across AU/NZ). A managed
          maintenance partner registers as a preferred supplier inside Tapi. The
          agency’s property manager approves the tenant work order exactly as
          before — the job then routes to the partner instead of to a list of
          individual trades. The partner quotes, dispatches, and invoices
          through the same Tapi workflow, with documentation attached to the
          property file.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          What it typically costs
        </h2>
        <p className="mt-3 text-neutral-300">
          Managed maintenance partners usually use a markup-on-invoice model —
          no upfront fee to the agency. Briks applies a sliding markup ($35 flat
          + 15% under $200, 25% to $500, 20% to $1,500, 15% above), billed to
          the landlord. Agencies pay nothing directly; landlords typically pay
          the same or less than their current ad-hoc arrangement because the
          partner aggregates volume across multiple agencies. Full pricing is{' '}
          <a
            className="underline underline-offset-4"
            href="/pricing.md"
          >
            published openly
          </a>
          .
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Who it’s right for
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>
            Residential rental agencies with 50+ doors, where PM hours lost to
            maintenance coordination are measurable.
          </li>
          <li>
            Agencies already using Tapi — or using PropertyMe, PropertyTree,
            Console Cloud, or Managed App (all integrate with Tapi).
          </li>
          <li>
            Agencies where principals are watching PM retention or landlord
            churn and can trace either back to maintenance friction.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Who it’s not right for
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>Individual homeowners or owner-occupiers.</li>
          <li>Commercial or industrial property managers.</li>
          <li>
            Agencies under 50 doors where volume doesn’t justify a supplier
            relationship.
          </li>
          <li>
            Agencies whose principals see maintenance as a core competency to
            keep in-house.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          The trade-off, honestly
        </h2>
        <p className="mt-3 text-neutral-300">
          A managed maintenance partner introduces a third party into the
          agency-tradesperson relationship. Agencies that value the direct
          relationship with specific tradespeople they’ve trusted for years
          will feel the change. Briks specifically addresses this by dispatching
          to agency-nominated trades first — but the introduction of a single
          accountable supplier is a structural change, not just a tool.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">
          Related reading
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
          <li>
            <Link
              href="/compare/briks-vs-in-house-maintenance-coordinator"
              className="underline underline-offset-4"
            >
              Briks vs hiring an in-house maintenance coordinator
            </Link>
          </li>
          <li>
            <Link
              href="/guides/property-maintenance-outsourcing-australia"
              className="underline underline-offset-4"
            >
              Property maintenance outsourcing in Australia — 2026 guide
            </Link>
          </li>
          <li>
            <Link
              href="/guides/tapi-preferred-supplier-setup"
              className="underline underline-offset-4"
            >
              Setting up as a Tapi preferred supplier
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="underline underline-offset-4"
            >
              Briks FAQ — 15 questions agency principals ask
            </Link>
          </li>
        </ul>

        <footer className="mt-16 rounded-md border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-2xl font-semibold">
            Want to see what a managed partner looks like for a specific
            Adelaide agency?
          </h2>
          <p className="mt-2 text-neutral-300">
            A 15-minute call, your actual door count, your Tapi configuration.
            We’ll show whether this model pays back for you or not — honestly.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand,#c9a96a)] px-6 py-3 font-semibold text-black"
          >
            Book the call <ArrowRight className="h-4 w-4" />
          </Link>
        </footer>
      </article>
    </>
  )
}
