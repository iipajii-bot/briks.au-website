import type { Metadata } from 'next'
import FAQSubPage from '@/components/sections/FAQSubPage'
import { FAQ_TRADES } from '@/lib/faqs'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ for Tradies — Joining the Briks Network Adelaide',
  description: 'Briks FAQ for Adelaide tradies considering joining. Payment terms, allocation rules, exclusivity, network standards.',
  alternates: { canonical: '/faq/trades' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_TRADES.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    { '@type': 'ListItem', position: 3, name: 'Tradies', item: `${SITE.url}/faq/trades` },
  ],
}

export default function FAQTrades() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <FAQSubPage
        eyebrow="FAQ · Tradies"
        title={<>For <span className="text-[#8a6e3f]">tradies.</span></>}
        subtitle={<>Joining the network, payment terms, allocation rules, exclusivity. We pay promptly — no ninety-day nonsense.</>}
        faqs={FAQ_TRADES}
        primaryHref="/trade-partners"
        primaryLabel="Apply to join"
      />
    </>
  )
}
