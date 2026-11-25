import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import EstimateForm from '@/components/estimate/EstimateForm'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Instant Repair Estimate, Adelaide | Briks' },
  description:
    'A rough price range for common Adelaide repairs in under a minute. Estimate only: the real price comes in a written quote before any work starts.',
  alternates: { canonical: '/estimate' },
  openGraph: {
    title: 'Instant estimate — Briks Building Services, Adelaide',
    description: 'A typical price range for your job in Adelaide, incl. GST. Estimate only, confirmed after inspection.',
    url: `${SITE.url}/estimate`,
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Instant estimate', item: `${SITE.url}/estimate` },
  ],
}

export default function EstimatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <PageHero
        eyebrow="Instant estimate"
        title={
          <>
            What&rsquo;s the job?{' '}
            <span className="text-[#8a6e3f]">See a typical price.</span>
          </>
        }
        subtitle={
          <>
            Describe the problem and add a few photos. You&rsquo;ll see a typical Adelaide price range, incl. GST. It is an estimate only.
            We confirm the final price after we inspect.
          </>
        }
      />
      <section className="relative pt-4 pb-20 md:pb-28 bg-[#ffffff]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>
    </>
  )
}
