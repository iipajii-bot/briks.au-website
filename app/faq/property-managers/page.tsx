import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_PROPERTY_MANAGERS } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'FAQ for Property Managers | Briks Adelaide' },
  description:
    'Answers for Adelaide property managers and agencies: how the Briks maintenance desk works, approval limits, owner invoices and getting started.',
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
        subtitle={<>Software, cost to owners, approval limits and getting started. For Adelaide property managers and agency principals.</>}
        faqs={FAQ_PROPERTY_MANAGERS}
        primaryLabel="Book an agency intro"
      />
    </>
  )
}
