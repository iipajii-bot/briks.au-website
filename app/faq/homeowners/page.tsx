import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_HOMEOWNERS } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ for Homeowners — Briks Building Services Adelaide',
  description: 'Briks FAQ for Adelaide homeowners. Call-out fees, quote turnaround, payment, renovations, attendance.',
  alternates: { canonical: '/faq/homeowners' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_HOMEOWNERS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    { '@type': 'ListItem', position: 3, name: 'Homeowners', item: `${SITE.url}/faq/homeowners` },
  ],
}

export default function FAQHomeowners() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <FAQSubPage
        eyebrow="FAQ · Homeowners"
        title={<>For <span className="text-[#8a6e3f]">homeowners.</span></>}
        subtitle={<>Call-out fees, scheduling, payment, renovations. The five things Adelaide homeowners ask first.</>}
        faqs={FAQ_HOMEOWNERS}
      />
    </>
  )
}
