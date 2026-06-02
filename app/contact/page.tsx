import type { Metadata } from 'next'
import { Mail, MapPin, Clock, CheckCircle, Phone } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import SpotlightCard from '@/components/effects/SpotlightCard'
import ContactForm from '@/components/forms/ContactForm'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Contact Briks — Get a Quote',
  description:
    'Get a quote from Briks Building Services Adelaide. Phone, online form, or email. Two sentences is enough — broken thing, address, urgency.',
  alternates: { canonical: '/contact' },
}

const reassurances = [
  'Per-job service · no contracts',
  'Real human reads every message',
  'Two sentences is enough to start',
  'Honest no if we’re not the fit',
]

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
  ],
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE.url}/contact`,
  mainEntity: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-AU',
}

export default function ContactPage() {
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
          __html: JSON.stringify(contactPageSchema).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Tell us what&rsquo;s broken.{' '}
            <span className="text-[#8a6e3f]">Get a quote.</span>
          </>
        }
        subtitle={
          <>
            Phone, online form, or email. Two sentences is enough — broken
            thing, address, urgency. Quote back fast. Real human reads every
            message.
          </>
        }
      />

      <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageBanner
            src={IMAGES.contact}
            alt="Adelaide team meeting room"
            aspect="banner"
          />
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 space-y-5">
                <SpotlightCard>
                  <p
                    className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-6"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    Direct contact
                  </p>

                  <ul className="space-y-6">
                    {sitePhone() && (
                      <li>
                        <a
                          href={sitePhoneHref()}
                          className="group flex items-start gap-4 text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5] shrink-0 group-hover:border-[#8a6e3f]/40 transition-colors">
                            <Phone size={16} className="text-[#8a6e3f]" />
                          </div>
                          <div>
                            <p className="text-xs tracking-[0.22em] uppercase text-[#5a5650] mb-1">
                              Phone
                            </p>
                            <p className="text-sm">{sitePhone()}</p>
                          </div>
                        </a>
                      </li>
                    )}
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="group flex items-start gap-4 text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5] shrink-0 group-hover:border-[#8a6e3f]/40 transition-colors">
                          <Mail size={16} className="text-[#8a6e3f]" />
                        </div>
                        <div>
                          <p className="text-xs tracking-[0.22em] uppercase text-[#5a5650] mb-1">
                            Email
                          </p>
                          <p className="text-sm">{SITE.email}</p>
                        </div>
                      </a>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5] shrink-0">
                        <MapPin size={16} className="text-[#8a6e3f]" />
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.22em] uppercase text-[#5a5650] mb-1">
                          Location
                        </p>
                        <p className="text-sm text-[#1a1a1a]">
                          Adelaide, SA
                          <br />
                          South Australia
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2ddd3] bg-[#f3efe5] shrink-0">
                        <Clock size={16} className="text-[#8a6e3f]" />
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.22em] uppercase text-[#5a5650] mb-1">
                          Hours
                        </p>
                        <p className="text-sm text-[#1a1a1a]">
                          Mon – Fri · 8am – 6pm ACST
                        </p>
                        <p className="text-sm text-[#8a6e3f]">
                          Emergencies · around the clock
                        </p>
                      </div>
                    </li>
                  </ul>
                </SpotlightCard>

                <SpotlightCard>
                  <p
                    className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-5"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    What to expect
                  </p>
                  <ul className="space-y-3">
                    {reassurances.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[#3a3735]"
                      >
                        <CheckCircle
                          size={14}
                          className="text-[#8a6e3f] shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-7 md:p-10">
                <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4">
                  Send a message
                </p>
                <h2
                  className="font-display text-3xl md:text-4xl text-[#1a1a1a] tracking-[-0.01em] mb-8"
                  style={{ fontWeight: 700 }}
                >
                  Tell us what you&rsquo;re dealing with.
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
