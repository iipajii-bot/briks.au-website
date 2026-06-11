import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TestimonialsGrid from '@/components/sections/TestimonialsGrid'
import FooterCTA from '@/components/sections/FooterCTA'
import { TESTIMONIALS } from '@/lib/testimonials'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Reviews — What Adelaide Says About Briks Building Services',
  description:
    'Real reviews from Adelaide homeowners, landlords, property managers and business owners. Maintenance, repairs and renovations — read what customers say about working with Briks.',
  alternates: { canonical: '/reviews' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${SITE.url}/reviews` },
  ],
}

// Review + aggregateRating schema — first-party testimonials marked up against
// the LocalBusiness node defined on the homepage.
const avgRating =
  TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / Math.max(TESTIMONIALS.length, 1)

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE.url}/#localbusiness`,
  name: SITE.name,
  url: SITE.url,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: avgRating.toFixed(1),
    reviewCount: TESTIMONIALS.length,
    bestRating: 5,
    worstRating: 1,
  },
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.author },
    datePublished: t.publishedAt,
    reviewBody: t.body,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
  })),
}

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Customer reviews"
        title={
          <>
            What Adelaide says{' '}
            <span className="text-[#8a6e3f]">about working with Briks.</span>
          </>
        }
        subtitle={
          <>
            Homeowners, landlords, property managers and business owners — every
            review below is from a real Briks job, published with the customer's
            permission.
          </>
        }
      />

      <TestimonialsGrid eyebrow="All reviews" title={<>Every word, unedited.</>} />

      {/* Cross-link to how we work */}
      <section className="relative py-16 md:py-20 bg-[#ffffff] border-t border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
            See how a job runs
          </p>
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1] mb-8"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            From first call to final invoice.
          </h2>
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
          >
            How it works
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      <FooterCTA />
    </>
  )
}
