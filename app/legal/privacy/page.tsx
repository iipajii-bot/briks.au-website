import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy | Briks Building Services',
  description:
    'Privacy Policy for Briks Building Services Pty Ltd (ABN 90 697 367 721). How we collect, use, store, and protect your personal information under the Australian Privacy Act 1988.',
  alternates: { canonical: '/legal/privacy' },
}

const LAST_UPDATED = '13 May 2026'
const EFFECTIVE_DATE = '13 May 2026'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE.url}/legal/privacy` },
  ],
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />

      <PageHero
        eyebrow="Privacy Policy"
        title={<>How we handle{' '}<span className="text-[#8a6e3f]">your information.</span></>}
        subtitle={<>This Privacy Policy explains how Briks Building Services Pty Ltd (ABN {SITE.abn}) collects, uses, holds, and discloses personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles. By using our website or engaging our services you accept the terms set out below.</>}
      />

      <article className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-8 pb-6 border-b border-[#e2ddd3]">
            <p>Last updated: <span className="text-[#1a1a1a]">{LAST_UPDATED}</span></p>
            <p>Effective: <span className="text-[#1a1a1a]">{EFFECTIVE_DATE}</span></p>
          </div>

          <Body />
        </div>
      </article>

      <section className="relative py-12 md:py-16 bg-[#fafaf7] border-t border-[#e2ddd3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">Questions about your privacy?</p>
          <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
            Email{' '}
            <a href={`mailto:${SITE.email}`} className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">
              {SITE.email}
            </a>{' '}
            with subject line &ldquo;Privacy Request&rdquo;. We respond within 30 calendar days as required by the Privacy Act.
          </p>
          <p className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#5a5650]">
            <Link href="/legal/terms" className="hover:text-[#1a1a1a] underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2
      id={id}
      className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em] leading-[1.2] pt-8 mb-4 scroll-mt-24"
      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
    >
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#3a3735] text-base md:text-[17px] leading-[1.75] mb-4">{children}</p>
  )
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4 pl-1">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[#3a3735] text-base md:text-[17px] leading-[1.7]">
          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8a6e3f]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Body() {
  return (
    <div>
      <H2 id="who-we-are">1. Who we are</H2>
      <P>
        Briks Building Services Pty Ltd (ACN/ABN {SITE.abn}) (&ldquo;Briks&rdquo;, &ldquo;we&rdquo;,
        &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a building services coordinator based in Adelaide,
        South Australia. We operate the website at {SITE.url} and provide
        building services coordination across the Adelaide metropolitan area and Adelaide Hills.
      </P>
      <P>
        Briks is bound by the Australian Privacy Principles (APPs) set out in
        Schedule 1 of the Privacy Act 1988 (Cth). This Privacy Policy describes how we handle
        personal information consistently with those Principles.
      </P>

      <H2 id="what-we-collect">2. What personal information we collect</H2>
      <P>We collect personal information that is reasonably necessary for, or directly related to, providing our services. This may include:</P>
      <UL
        items={[
          'Identity + contact details: name, email address, phone number, residential or business address.',
          'Job + property details: address of the property where work is to be performed, scope description, photos or documents you supply to support a quote.',
          'Financial information limited to invoice payment: where applicable, business name + ABN of the payer. We do not collect or store credit card data — payments are processed by a third-party payment processor (see section 6).',
          'Correspondence: emails, WhatsApp messages, web form submissions, voicemails, and call notes between you and Briks coordinators.',
          'Technical information: when you visit our website we automatically collect limited technical data including IP address, browser type, device type, referring URL, pages visited, and timestamps. This data is collected through standard server logs and privacy-respecting analytics (see section 8).',
          'Cookies and similar technologies: see section 9 for our cookies disclosure.',
        ]}
      />
      <P>
        We do not knowingly collect sensitive information (as defined in the Privacy Act) such
        as health information, racial or ethnic origin, political opinions, or religious beliefs.
        If you supply such information unsolicited, we will delete it.
      </P>

      <H2 id="how-we-collect">3. How we collect personal information</H2>
      <P>
        We collect personal information directly from you whenever practicable — when you fill in
        a contact or quote form, send a WhatsApp message, send an email, call us, or engage us to
        perform services. We may also collect personal information from third parties where
        reasonable and necessary, including from real estate agencies or property managers who
        engage us on behalf of a landlord or tenant.
      </P>

      <H2 id="why-we-collect">4. Why we collect + use personal information</H2>
      <P>We collect, hold, and use personal information for the following purposes:</P>
      <UL
        items={[
          'To prepare and provide written quotes for the work you request.',
          'To dispatch + coordinate sub-contracted licensed tradespeople ("Service Providers") to perform the agreed work at the agreed property.',
          'To communicate with you about scheduled visits, job progress, photo updates, completion, invoicing, and warranty claims.',
          'To issue tax invoices and collect payment for completed work.',
          'To produce insurance-ready documentation (photos, written reports) where you require this for a claim.',
          'To comply with regulatory + statutory obligations, including the Tax Administration Act 1953, Goods and Services Tax Act 1999, the Plumbers, Gas Fitters and Electricians Act 1995 (SA), the Building Work Contractors Act 1995 (SA), and the Residential Tenancies Act 1995 (SA) where applicable.',
          'To improve our website, services, and internal operations through aggregated, de-identified analytics.',
          'To send you service-related communications, including job confirmations, quote follow-ups, and post-completion satisfaction checks.',
          'For internal record-keeping, fraud prevention, dispute resolution, and to defend or pursue legal rights.',
        ]}
      />

      <H2 id="disclosure">5. Disclosure of personal information</H2>
      <P>
        Briks operates as a coordinator. We dispatch licensed sub-contracted tradespeople to
        perform work at the property identified by you. To enable this we disclose limited
        personal information — typically your name, contact phone number, the property address,
        and a description of the scope of work — to the tradesperson(s) attending. We require
        each tradesperson to handle that information confidentially and only for the purpose of
        the engaged work.
      </P>
      <P>We may also disclose personal information to:</P>
      <UL
        items={[
          'Our third-party service providers, including web hosting (Vercel Inc., USA), email + messaging services, payment processors, analytics providers, and IT support contractors, each engaged under contractual confidentiality + data-handling obligations.',
          'Insurance assessors + insurers in connection with insurance claims you ask us to support.',
          'Government authorities and regulators where required by law, including the Australian Taxation Office, the SA Office of the Technical Regulator (for plumbing/gas/electrical Certificates of Compliance), the South Australian government Consumer and Business Services, and SA Police where lawfully required.',
          'Our professional advisers including lawyers, accountants, auditors, where reasonably required.',
          'Other parties as required or authorised by Australian law, including in response to a valid court order, subpoena, or statutory notice.',
        ]}
      />
      <P>
        We do not sell personal information to third parties. We do not disclose personal
        information to overseas recipients except as follows: our website hosting + analytics
        infrastructure is provided by Vercel Inc. (United States) and may involve transient
        data routing through United States data centres. By using our website you consent to
        this overseas routing.
      </P>

      <H2 id="payment-processing">6. Payment information</H2>
      <P>
        Briks does not collect or store credit card or bank account details. Where electronic
        payment is offered, payment is processed by a third-party payment processor (currently
        not enabled — invoices are settled via direct bank transfer using bank details supplied
        in your tax invoice). When payment processing is introduced, the relevant processor
        (e.g. Stripe, Square) will collect and process card data under its own privacy policy +
        PCI-DSS compliance regime, not under ours.
      </P>

      <H2 id="storage">7. How we store + protect personal information</H2>
      <P>
        We hold personal information in secure electronic systems hosted by reputable providers
        (currently Vercel for our website and PostgreSQL-hosted databases for our internal
        operations system). We use reasonable physical, electronic, and procedural safeguards to
        protect personal information from misuse, interference, loss, unauthorised access,
        modification, or disclosure. Safeguards include role-based access control, encryption in
        transit (TLS), encrypted storage at rest where supported by the underlying platform,
        regular software patching, and audit logging of access to sensitive records.
      </P>
      <P>
        We retain personal information only for as long as is reasonably necessary for the
        purposes for which we collected it, or as required by law. Tax invoice records are
        retained for a minimum of seven (7) years to comply with Australian Taxation Office
        record-keeping requirements. Other records are reviewed periodically and securely
        destroyed or de-identified when no longer needed.
      </P>
      <P>
        Despite our safeguards, no internet transmission or electronic storage system is
        completely secure. We cannot guarantee absolute security of personal information.
      </P>

      <H2 id="analytics">8. Website analytics</H2>
      <P>
        We use privacy-respecting analytics to measure aggregate website usage (e.g. pages
        visited, device class, referring source). The analytics provider receives only
        de-identified, aggregated data and does not set advertising cookies or share data with
        advertising networks. Analytics data is used solely to improve the website + our
        services.
      </P>

      <H2 id="cookies">9. Cookies + similar technologies</H2>
      <P>
        Our website uses a minimal set of cookies necessary for functionality (e.g. preserving
        form state, session management) and may use privacy-respecting first-party analytics
        cookies. We do not use third-party advertising cookies, marketing pixels, or
        cross-site tracking. You may disable cookies in your browser settings, but doing so may
        affect the functionality of contact forms.
      </P>

      <H2 id="ai-assistants">10. AI assistants + automated processing</H2>
      <P>
        Where you contact us via email or WhatsApp, your message may be processed by an
        AI-assisted email parsing system operated by Briks for the limited purpose of
        extracting job details (such as property address, scope description, urgency) into our
        internal job-management system. Final decisions affecting you (such as quoting,
        scheduling, dispatch) are reviewed by a human Briks coordinator before action is taken.
        We do not use AI systems to make solely-automated decisions that produce legal or
        similarly significant effects.
      </P>

      <H2 id="your-rights">11. Your rights — access, correction, complaint</H2>
      <P>You have the following rights under the Privacy Act 1988 (Cth) and the APPs:</P>
      <UL
        items={[
          'Right of access — you may request a copy of the personal information we hold about you. We will respond within 30 calendar days. We may charge a reasonable cost-recovery fee for substantial requests, which we will disclose before proceeding.',
          'Right of correction — you may request that we correct personal information you believe is inaccurate, out of date, incomplete, irrelevant, or misleading. We will assess the request and either correct the information or, if we disagree, provide reasons in writing.',
          'Right to complain — you may complain to Briks directly about how we have handled your personal information. If you are not satisfied with our response, you may complain to the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.',
          'Right of anonymity / pseudonymity — where lawful and practicable, you may deal with us using a pseudonym or anonymously. Note that we generally cannot quote or perform building work without verified identity + contact information.',
        ]}
      />
      <P>
        To exercise any of these rights, email{' '}
        <a href={`mailto:${SITE.email}`} className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">
          {SITE.email}
        </a>{' '}
        with the subject line &ldquo;Privacy Request&rdquo; and a clear description of your
        request. We may need to verify your identity before responding to protect your
        information from disclosure to third parties.
      </P>

      <H2 id="notifiable-breach">12. Notifiable data breach scheme</H2>
      <P>
        If we have reasonable grounds to believe that an eligible data breach has occurred, we
        will assess the breach, take all reasonable steps to contain it, and notify affected
        individuals and the Office of the Australian Information Commissioner as required by
        Part IIIC of the Privacy Act (the Notifiable Data Breaches scheme).
      </P>

      <H2 id="overseas">13. Overseas disclosure</H2>
      <P>
        As noted in section 5, transient data routing occurs through United States data centres
        operated by our website host (Vercel Inc.). Where this routing involves personal
        information, we have taken reasonable steps to ensure the recipient handles the
        information consistently with the APPs, including through contractual commitments and
        Vercel&rsquo;s public commitments to the APP and EU GDPR frameworks. We do not actively
        disclose personal information to overseas recipients for marketing or non-essential
        operational purposes.
      </P>

      <H2 id="children">14. Children + minors</H2>
      <P>
        Our services are directed at adults. We do not knowingly collect personal information
        from children under 18. If a parent or guardian becomes aware that their child has
        provided personal information to us without consent, please contact us and we will take
        reasonable steps to delete the information from our records.
      </P>

      <H2 id="changes">15. Changes to this Privacy Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. The version in effect at any
        given time is the version posted at this URL. The &ldquo;Last updated&rdquo; date at the top of this
        document indicates when the policy was last revised. For material changes we will take
        reasonable steps to bring the changes to your attention before they take effect.
      </P>

      <H2 id="contact">16. Contact us</H2>
      <P>
        For all privacy-related enquiries, requests, or complaints, contact Briks Building
        Services Pty Ltd at:
      </P>
      <P>
        Email:{' '}
        <a href={`mailto:${SITE.email}`} className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">
          {SITE.email}
        </a>
        <br />
        Postal: Adelaide, South Australia, Australia
        <br />
        ABN: {SITE.abn}
      </P>

      <H2 id="legal-disclosure">17. Independent legal advice</H2>
      <P>
        This Privacy Policy is a general statement of how Briks handles personal information.
        It is not legal advice. If you require legal advice about your privacy rights or how
        the Privacy Act 1988 (Cth) applies to your circumstances, consult a qualified
        Australian legal practitioner.
      </P>
    </div>
  )
}
