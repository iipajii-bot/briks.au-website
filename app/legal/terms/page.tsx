import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service | Briks Building Services',
  description:
    'Terms of Service for Briks Building Services Pty Ltd (ABN 90 697 367 721). Service terms, payment, warranty, liability limitations + Australian Consumer Law acknowledgements.',
  alternates: { canonical: '/legal/terms' },
}

const LAST_UPDATED = '13 May 2026'
const EFFECTIVE_DATE = '13 May 2026'

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${SITE.url}/legal/terms` },
  ],
}

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Terms of Service"
        title={<>The terms under which{' '}<span className="text-[#8a6e3f]">we work together.</span></>}
        subtitle={<>These Terms of Service govern your engagement of Briks Building Services Pty Ltd (ABN {SITE.abn}) and your use of our website at {SITE.url}. Read carefully — by engaging us, accepting a quote, or using our website, you accept these Terms. Your statutory rights under Australian Consumer Law are preserved and are not excluded, restricted, or modified by these Terms.</>}
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
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">Questions about these terms?</p>
          <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
            Email{' '}
            <a href={`mailto:${SITE.email}`} className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">{SITE.email}</a>{' '}
            with subject line &ldquo;Terms Enquiry&rdquo;.
          </p>
          <p className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#5a5650]">
            <Link href="/legal/privacy" className="hover:text-[#1a1a1a] underline">Privacy Policy</Link>
          </p>
        </div>
      </section>
    </>
  )
}

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em] leading-[1.2] pt-8 mb-4 scroll-mt-24" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{children}</h2>
  )
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[#3a3735] text-base md:text-[17px] leading-[1.75] mb-4">{children}</p>
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
      <H2 id="parties">1. Parties + interpretation</H2>
      <P>
        These Terms of Service (&ldquo;Terms&rdquo;) form a binding contract between you
        (&ldquo;you&rdquo;, the &ldquo;Customer&rdquo;) and Briks Building Services Pty Ltd
        (ACN/ABN {SITE.abn}) (&ldquo;Briks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;).
      </P>
      <P>
        In these Terms: &ldquo;Services&rdquo; means the building services coordination, scoping,
        project management, dispatch of sub-contracted tradespeople, and related deliverables
        described in a written quote accepted by you; &ldquo;Service Provider&rdquo; means a
        licensed trade contractor (e.g. plumber, electrician, carpenter, painter, tiler,
        roofer, gas fitter, HVAC technician, handyman) engaged by Briks under sub-contract to
        perform the practical trade work at your property; &ldquo;Quote&rdquo; means a written
        document we issue describing the proposed scope, line items, and fixed total price for
        the Services; &ldquo;Property&rdquo; means the address at which Services are to be
        performed; &ldquo;Australian Consumer Law&rdquo; or &ldquo;ACL&rdquo; means the
        Competition and Consumer Act 2010 (Cth) Schedule 2.
      </P>
      <P>
        By accepting a Quote, engaging us, or using our website, you accept these Terms in
        full. If you do not accept these Terms, do not engage us.
      </P>

      <H2 id="acl-acknowledgement">2. Australian Consumer Law — your guaranteed rights</H2>
      <P>
        <strong>Important.</strong> Where you engage us as a &ldquo;consumer&rdquo; within the
        meaning of section 3 of the Australian Consumer Law (including engagements of goods or
        services up to $100,000, or above that amount where the services are of a kind
        ordinarily acquired for personal, domestic, or household use), you have automatic
        guarantees under the ACL that <strong>cannot be excluded, restricted, or
        modified</strong> by these Terms or any other contractual document, including
        guarantees that:
      </P>
      <UL items={[
        'Services will be supplied with due care and skill (ACL s. 60).',
        'Services will be reasonably fit for any disclosed purpose (ACL s. 61).',
        'Services will be supplied within a reasonable time when no time is fixed (ACL s. 62).',
      ]} />
      <P>
        Nothing in these Terms operates to exclude, restrict, or modify any guarantee, right,
        or remedy implied by or conferred on you under the ACL, the Sale of Goods Act 1895
        (SA), or any other law of South Australia or the Commonwealth, where to do so would
        be unlawful. To the maximum extent permitted by law, all other implied terms,
        conditions, warranties, and guarantees are excluded.
      </P>

      <H2 id="briks-role">3. Briks&rsquo; role — coordinator + head contractor</H2>
      <P>
        Briks operates as a <strong>head contractor and project coordinator</strong>. We
        engage licensed sub-contracted Service Providers under separate sub-contract
        agreements to perform the practical trade work. Customers contract with Briks for the
        Services as a whole — including scoping, quoting, dispatching, project managing, photo
        documenting, and invoicing.
      </P>
      <P>
        You agree that Briks may, at our reasonable discretion, select, allocate, substitute,
        or replace any Service Provider we engage for your job, provided the substitute holds
        equivalent qualifications and licensing.
      </P>

      <H2 id="quotes">4. Quotes</H2>
      <UL items={[
        'Quotes are valid for thirty (30) calendar days from the date issued, unless a different validity period is stated on the face of the Quote.',
        'Quotes are based on the scope of work described and on the site conditions observed at the on-site inspection. Where site conditions vary materially from those observed at inspection — including but not limited to: concealed defects, asbestos or hazardous materials, structural conditions not apparent without invasive inspection, council or strata restrictions not disclosed at quoting — we may issue a written variation for your approval before continuing work.',
        'Quotes include a contingency line where appropriate. Costs beyond contingency require a written variation accepted by you in writing (including email or WhatsApp confirmation) before work proceeds.',
        'Verbal estimates are not Quotes and do not bind either party. A binding Quote is always in writing on Briks letterhead.',
        'Acceptance of a Quote, by written confirmation, email reply, WhatsApp reply, or by allowing Service Providers onto the Property, constitutes acceptance of these Terms.',
      ]} />

      <H2 id="payment">5. Payment</H2>
      <UL items={[
        'Tax invoices are issued on completion of work unless a different schedule is agreed in writing (e.g. progress payments for larger projects).',
        'Default payment terms are 14 calendar days from invoice date (Net 14). Commercial customers may request Net 30 by prior written agreement.',
        'Payments are made by direct bank transfer to the account shown on the invoice. Briks does not currently accept credit card payments. Where a third-party payment processor is offered in the future, the processor\'s fees may be passed through.',
        'Late payment may attract interest at the Reserve Bank of Australia cash rate plus 4% per annum, calculated daily on the outstanding balance from the due date, in line with the Late Payment of Commercial Debts schedule and applicable law.',
        'In the event of non-payment, Briks may suspend further work, retain unsupplied materials, pursue debt recovery (including reasonable legal + collection costs payable by you), and report defaults to credit agencies as permitted by law.',
        'Goods supplied remain Briks\' property until paid in full, in accordance with the Personal Property Securities Act 2009 (Cth). Briks may register a security interest where appropriate.',
      ]} />

      <H2 id="workmanship-warranty">6. Workmanship warranty</H2>
      <P>
        Subject to your statutory rights under the ACL, Briks warrants that the workmanship of
        Services we coordinate will be carried out to a tradesman-like standard, and provides
        a workmanship warranty of twelve (12) months from the date of completion (the
        &ldquo;Warranty Period&rdquo;).
      </P>
      <P>
        The Warranty Period does not apply to:
      </P>
      <UL items={[
        'Goods, fixtures, fittings, or appliances supplied by you or by third parties — these are covered only by the relevant manufacturer\'s warranty (we will supply documentation to enable you to make a warranty claim direct with the manufacturer).',
        'Wear and tear, misuse, abuse, neglect, accidental damage, or modifications made after completion by you or by third parties.',
        'Damage arising from acts of God, weather events, flood, fire, storm, lightning, earthquake, or force majeure.',
        'Damage arising from tenant or third-party conduct at the Property post-completion.',
        'Issues notified to us more than twelve (12) months after the date of completion.',
        'Pre-existing defects or conditions of the Property disclosed or reasonably apparent prior to commencement.',
      ]} />
      <P>
        To make a warranty claim, contact us in writing within the Warranty Period describing
        the defect. Briks will inspect within a reasonable time and, if the claim is valid,
        coordinate remediation at our cost. If the claim is found not to be a warranty matter,
        we may charge a reasonable inspection fee, disclosed before attendance.
      </P>
      <P>
        Nothing in this clause limits your statutory rights under the ACL where they apply.
      </P>

      <H2 id="customer-obligations">7. Customer obligations</H2>
      <UL items={[
        'Provide safe and reasonable access to the Property at the agreed times. Repeated failed access attempts attributable to you may attract a re-attendance fee, disclosed before re-booking.',
        'Disclose all relevant site conditions you know or reasonably should know about, including hazardous materials (asbestos pre-1990 buildings), services routing, council orders, strata restrictions, and any prior unsuccessful repair attempts.',
        'Obtain any consents required from co-owners, body corporates, landlords, or neighbours where the work touches shared structures.',
        'Pay invoices when due.',
        'Treat Briks coordinators and Service Providers with respect. We reserve the right to withdraw from a job and charge for work performed where coordinators or Service Providers experience abusive, threatening, or unsafe conduct.',
      ]} />

      <H2 id="cancellation">8. Cancellation + rescheduling</H2>
      <UL items={[
        'You may cancel a booking without charge up to 48 hours before the scheduled start time.',
        'Cancellation inside 48 hours of scheduled start may attract a cancellation fee equal to one (1) hour of the scheduled tradesperson\'s charge-out rate, reflecting irrecoverable booking costs.',
        'Where work has commenced and you elect to cancel, you are liable for all work performed and materials supplied to the date of cancellation, plus any irrecoverable supplier-cancellation costs.',
        'Briks may reschedule for reasons including extreme weather, supplier delays beyond our reasonable control, or illness/injury to the assigned Service Provider. We will notify you as early as reasonably practicable.',
      ]} />

      <H2 id="liability">9. Limitation of liability</H2>
      <P>
        Subject to clause 2 (Australian Consumer Law) and to the maximum extent permitted by
        law:
      </P>
      <UL items={[
        'Briks\' total aggregate liability to you for any and all claims, losses, damages, or causes of action arising out of or in connection with these Terms or the Services — whether in contract, tort (including negligence), under statute, or otherwise — is limited, at Briks\' option, to (i) the cost of re-supplying the affected Services; (ii) the cost of remediating the affected work; or (iii) a refund of amounts paid by you to Briks for the affected Services.',
        'Briks is not liable for any indirect, consequential, special, incidental, or punitive losses, including loss of profits, loss of revenue, loss of business opportunity, loss of rental income, loss of data, loss of goodwill, or loss of expected savings, even if we have been advised of the possibility of such losses.',
        'Briks is not liable for failures or delays caused by events outside our reasonable control, including but not limited to acts of God, weather events, pandemic restrictions, supplier insolvency, civil unrest, war, government action, or industrial action (force majeure).',
        'Where damage at the Property is caused by Service Provider negligence, the Service Provider\'s public liability insurance is the primary cover. Briks requires each Service Provider to hold a minimum $10 million public liability policy ($20 million for senior bench positions). Briks will reasonably coordinate the claim on your behalf but is not the insurer.',
      ]} />
      <P>
        Where these limitations would not be enforceable under the ACL because you are a
        consumer (as defined in section 3 of the ACL), then Briks\' liability for failure to
        comply with an ACL consumer guarantee is, to the maximum extent permitted by law,
        limited to: (a) for services — the supplying of the services again, or payment of the
        cost of having the services supplied again; (b) for goods — the replacement or
        repair of the goods, the supply of equivalent goods, or payment of the cost of
        replacement, repair, or equivalent supply.
      </P>

      <H2 id="indemnity">10. Indemnity</H2>
      <P>
        You indemnify Briks against any loss, damage, claim, demand, cost, or expense
        (including reasonable legal costs on a solicitor-and-own-client basis) suffered or
        incurred by Briks arising from or in connection with: (a) your breach of these Terms;
        (b) your breach of any law; (c) your failure to disclose hazardous materials, services
        routing, or other relevant site conditions; (d) damage caused by tenants, occupants,
        or third parties at the Property; (e) any consents, approvals, or authorisations you
        were obliged to obtain but did not obtain.
      </P>
      <P>
        This indemnity does not apply to loss or damage caused by Briks\' own negligence,
        wilful misconduct, or breach of these Terms or the ACL.
      </P>

      <H2 id="ip">11. Intellectual property</H2>
      <P>
        All website content, designs, photography, copy, layouts, code, schemas, and other
        material at {SITE.url} is owned by or licensed to Briks Building Services Pty Ltd. You
        may not reproduce, modify, distribute, publish, or commercially use any such material
        without prior written consent, except for personal non-commercial purposes.
      </P>
      <P>
        Photos taken by Briks during the course of a job (including before/after photos)
        remain Briks\' property and may be used for portfolio, training, marketing, and case
        study purposes in de-identified form. We will not publish photos that identify your
        Property, address, or you personally without your prior written consent.
      </P>

      <H2 id="privacy">12. Privacy</H2>
      <P>
        Our handling of personal information is governed by our{' '}
        <Link href="/legal/privacy" className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">
          Privacy Policy
        </Link>
        . By engaging us you acknowledge having had a reasonable opportunity to review the
        Privacy Policy.
      </P>

      <H2 id="dispute">13. Dispute resolution</H2>
      <UL items={[
        'If a dispute arises, contact Briks in writing first at admin@briks.au with subject line "Dispute". We will respond and attempt to resolve the matter in good faith within 21 calendar days.',
        'If the dispute is not resolved within 21 days, either party may refer the matter to mediation conducted by a mutually agreed mediator. The cost of mediation will be shared equally.',
        'If mediation does not resolve the dispute within a further 30 days, either party may commence court proceedings.',
        'For consumer-grade disputes you may also have rights under the SA Consumer and Business Services framework. For building work disputes specifically, the Building Work Contractors Act 1995 (SA) sets out additional dispute resolution avenues which are preserved by these Terms.',
      ]} />

      <H2 id="governing-law">14. Governing law + jurisdiction</H2>
      <P>
        These Terms are governed by the laws of South Australia and the Commonwealth of
        Australia. Both parties submit to the non-exclusive jurisdiction of the courts of
        South Australia. Nothing in this clause prevents either party from seeking interim or
        urgent relief in a court of competent jurisdiction.
      </P>

      <H2 id="severance">15. Severance + waiver</H2>
      <P>
        If any provision of these Terms is held to be invalid, void, or unenforceable, that
        provision is severed and the remainder of the Terms continues in full force. A waiver
        of any provision is effective only if given in writing and signed by an authorised
        officer of Briks.
      </P>

      <H2 id="assignment">16. Assignment</H2>
      <P>
        You may not assign your rights or obligations under these Terms without Briks\' prior
        written consent. Briks may assign or sub-contract any of our rights or obligations
        under these Terms in the ordinary course of business.
      </P>

      <H2 id="licensing">17. Licensing + qualifications — transparency</H2>
      <P>
        Briks Building Services Pty Ltd operates as a coordinator and head contractor. Briks
        itself does not hold a Building Work Contractors Licence under the Building Work
        Contractors Act 1995 (SA). All work that requires licensing — including plumbing, gas
        fitting, electrical, restricted building work, and any other regulated trade — is
        performed by sub-contracted Service Providers who themselves hold the relevant
        licences and insurance under South Australian law.
      </P>
      <P>
        Before engaging any Service Provider for your job, Briks verifies the Service Provider
        holds: (a) the relevant trade licence in force in South Australia; (b) public liability
        insurance of at least $10 million; and (c) workers&rsquo; compensation cover where they
        engage employees. Copies of licence and insurance certificates are available on
        reasonable written request before work commences.
      </P>
      <P>
        Where the Building Work Contractors Act 1995 (SA) or any other licensing law requires
        a written building work contract to be entered into directly between the customer and
        a licensed building work contractor (typically for residential building work above
        prescribed thresholds), Briks will arrange for such a contract to be issued in the
        name of the licensed Service Provider, and Briks&rsquo; engagement will be limited to
        coordination, project management, and administration services that do not themselves
        require a Building Work Contractors Licence.
      </P>

      <H2 id="cooling-off">18. Cooling-off period — domestic building work</H2>
      <P>
        Where these Terms apply to a domestic building work contract within the meaning of the
        Building Work Contractors Act 1995 (SA), you may have a statutory right to cool off
        and withdraw from the contract within five (5) clear business days after you receive a
        signed copy of the contract, in accordance with section 31 of that Act. To exercise
        the cooling-off right, give Briks written notice (email is sufficient) within the
        cooling-off period. Briks may retain a reasonable amount for any out-of-pocket
        expenses incurred up to the date of withdrawal, as permitted by the Act.
      </P>
      <P>
        Cooling-off rights do not apply to commercial customers, to engagements outside the
        scope of the Building Work Contractors Act, or where you have waived cooling-off in
        writing as permitted by the Act. If you are unsure whether cooling-off applies to your
        engagement, ask us in writing before accepting the Quote.
      </P>

      <H2 id="changes">19. Changes to these Terms</H2>
      <P>
        Briks may update these Terms from time to time. The version in effect on the date you
        accept a Quote applies to that engagement. Subsequent changes do not retroactively
        apply to engagements already underway. Material changes will be communicated by
        prominent notice on this page.
      </P>

      <H2 id="electronic">20. Electronic acceptance + record</H2>
      <P>
        Acceptance of a Quote (whether by email reply, WhatsApp reply, written signature, or
        allowing Service Providers onto the Property) constitutes electronic acceptance of
        these Terms with the same legal effect as a written signature under the Electronic
        Transactions Act 1999 (Cth) and the Electronic Transactions Act 2000 (SA).
      </P>

      <H2 id="contact">21. Contact us</H2>
      <P>
        Briks Building Services Pty Ltd
        <br />
        ABN: {SITE.abn}
        <br />
        Email:{' '}
        <a href={`mailto:${SITE.email}`} className="text-[#8a6e3f] hover:text-[#1a1a1a] underline">
          {SITE.email}
        </a>
        <br />
        Postal: Adelaide, South Australia, Australia
      </P>

      <H2 id="legal-disclosure">22. Independent legal advice — important notice</H2>
      <P>
        These Terms are a general statement of contractual terms. They are not legal advice
        and are not a substitute for legal advice. If you require legal advice about your
        rights or obligations, the application of the Australian Consumer Law, the Building
        Work Contractors Act 1995 (SA), the Residential Tenancies Act 1995 (SA), or any other
        applicable law, you should consult a qualified Australian legal practitioner. Briks
        recommends customers entering into large or commercially significant engagements
        obtain independent legal advice before accepting a Quote.
      </P>
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5650] mt-8 pt-6 border-t border-[#e2ddd3] leading-[1.6]">
        This document was last reviewed: {LAST_UPDATED}. Statutory references are to
        Commonwealth and South Australian legislation in force at the date of last review.
        Legislative references may change; the substantive obligations they refer to remain
        in effect under the legislation as amended from time to time.
      </p>
    </div>
  )
}
