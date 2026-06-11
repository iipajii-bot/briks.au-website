import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import AudienceTiles from '@/components/sections/AudienceTiles'
import FounderStory from '@/components/sections/FounderStory'
import FooterCTA from '@/components/sections/FooterCTA'
import Promises from '@/components/sections/Promises'
import HomeFAQ from '@/components/sections/HomeFAQ'
import QuickQuote from '@/components/sections/QuickQuote'
import TrustStrip from '@/components/sections/TrustStrip'
import TestimonialsGrid from '@/components/sections/TestimonialsGrid'
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid'
import PricingPhilosophy from '@/components/sections/PricingPhilosophy'
import RoomsBand from '@/components/sections/RoomsBand'
import ScopeCards from '@/components/sections/ScopeCards'
import { SITE } from '@/lib/constants'
import { ALL_SUBURBS } from '@/lib/suburbs'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/logo.png`,
        width: 512,
        height: 512,
      },
      founder: {
        '@type': 'Person',
        '@id': `${SITE.url}/#founder`,
        name: SITE.founderName,
      },
      description:
        'Adelaide building services — maintenance, repairs, renovations and fit-outs. One local team across plumbing, electrical, carpentry, painting, tiling, roofing and more. Homeowners, landlords, real estate agencies, businesses.',
      email: SITE.email,
      sameAs: [
        SITE.social.linkedin,
        SITE.social.facebook,
        SITE.social.instagram,
        SITE.social.youtube,
      ],
      areaServed: [
        { '@type': 'City', name: 'Adelaide' },
        { '@type': 'AdministrativeArea', name: 'South Australia' },
      ],
      knowsAbout: [
        'Residential building maintenance',
        'Home renovations',
        'Kitchen renovations',
        'Bathroom renovations',
        'Home extensions',
        'Commercial fit-outs',
        'Emergency property repairs',
        'Handyman services',
        'Licensed plumbing',
        'Licensed electrical',
        'Carpentry',
        'Painting',
        'Tiling and waterproofing',
        'Roofing and gutters',
      ],
    },
    {
      '@type': 'GeneralContractor',
      '@id': `${SITE.url}/#localbusiness`,
      name: SITE.name,
      image: `${SITE.url}/og.png`,
      url: SITE.url,
      email: SITE.email,
      ...(SITE.phone ? { telephone: `+61${(SITE.phone as string).replace(/^0/, '')}` } : {}),
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.addressLocality,
        addressRegion: SITE.addressRegion,
        postalCode: SITE.postalCode,
        addressCountry: SITE.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Adelaide' },
        { '@type': 'AdministrativeArea', name: 'South Australia' },
        ...ALL_SUBURBS.map((suburb) => ({
          '@type': 'Place',
          name: `${suburb}, Adelaide, SA`,
        })),
      ],
    },
    {
      '@type': 'Service',
      '@id': `${SITE.url}/#service-building`,
      serviceType: 'Building services and maintenance',
      name: 'Adelaide Building Services — Maintenance, Repairs, Renovations',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'City', name: 'Adelaide' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en-AU',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <TrustStrip />
      <AudienceTiles />
      <Promises />
      <ServicesGrid />
      <ScopeCards />
      <CaseStudiesGrid />
      <QuickQuote />
      <TestimonialsGrid limit={3} />
      <RoomsBand />
      <PricingPhilosophy />
      <FounderStory />
      <HomeFAQ />
      <FooterCTA />
    </>
  )
}
