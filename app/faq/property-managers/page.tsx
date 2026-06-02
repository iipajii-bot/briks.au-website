import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_PROPERTY_MANAGERS } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ for Property Managers — Tapi Setup, Markup, Agency Fit',
  description: 'Briks FAQ for Adelaide real estate agencies. Tapi workflow, markup tiers, landlord communication, fit and setup.',
  alternates: { canonical: '/faq/property-managers' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_PROPERTY_MANAGERS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    { '@type': 'ListItem', position: 3, name: 'Property Managers', item: `${SITE.url}/faq/property-managers` },
  ],
}

export default function FAQPropertyManagers() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <FAQSubPage
        eyebrow="FAQ · Property Managers"
        title={<>For <span className="text-[#8a6e3f]">property managers.</span></>}
        subtitle={<>Tapi setup, markup tiers, agency fit, landlord communication. Built for Adelaide agency principals and heads of PM.</>}
        faqs={FAQ_PROPERTY_MANAGERS}
        primaryLabel="Book an agency intro"
      />
    </>
  )
}
