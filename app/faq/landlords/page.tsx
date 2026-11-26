import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_LANDLORDS } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'FAQ for Self-Managing Landlords | Briks Adelaide' },
  description:
    'Answers for Adelaide landlords who manage their own rentals: tenant repairs, approval limits and end-of-lease repairs.',
  alternates: { canonical: '/faq/landlords' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_LANDLORDS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    { '@type': 'ListItem', position: 3, name: 'Landlords', item: `${SITE.url}/faq/landlords` },
  ],
}

export default function FAQLandlords() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <FAQSubPage
        eyebrow="FAQ · Landlords"
        title={<>For <span className="text-[#8a6e3f]">landlords.</span></>}
        subtitle={<>Self-managed Adelaide landlords. Repairs, maintenance and end-of-lease repairs.</>}
        faqs={FAQ_LANDLORDS}
      />
    </>
  )
}
