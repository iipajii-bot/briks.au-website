import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_BUSINESSES } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ for Businesses — Commercial Maintenance & Fit-Out Adelaide',
  description: 'Briks FAQ for Adelaide businesses, shopfronts, offices, strata. After-hours work, commercial fit-outs, compliance.',
  alternates: { canonical: '/faq/businesses' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_BUSINESSES.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    { '@type': 'ListItem', position: 3, name: 'Businesses', item: `${SITE.url}/faq/businesses` },
  ],
}

export default function FAQBusinesses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <FAQSubPage
        eyebrow="FAQ · Businesses"
        title={<>For <span className="text-[#8a6e3f]">businesses.</span></>}
        subtitle={<>After-hours work, fit-outs, strata billing, compliance schedules. For Adelaide shopfronts, cafés, offices, body corporates.</>}
        faqs={FAQ_BUSINESSES}
        primaryLabel="Talk to us"
      />
    </>
  )
}
