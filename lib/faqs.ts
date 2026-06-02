// FAQ source-of-truth — keyed by audience. Pages pull subsets.

export type QA = { q: string; a: string }

export const FAQ_GENERAL: QA[] = [
  {
    q: 'What kind of jobs does Briks do?',
    a: 'Maintenance, repairs, handyman jobs, and renovations — kitchens, bathrooms, extensions, decks, fit-outs. Plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, locksmith, glazier, HVAC. The only thing we do not do is new home builds.',
  },
  {
    q: 'How fast can you come out?',
    a: 'We move quickly on every job. Routine work is quoted promptly and a tradesperson on-site soon after. Genuine emergencies — burst pipes, no power, broken access — dispatch right away, around the clock. Renovations get a site visit and itemised quote without unnecessary delay.',
  },
  {
    q: 'Where do you work?',
    a: 'Adelaide metro. From Gawler in the north to Aldinga in the south, Glenelg in the west to Mount Barker in the east. 38+ suburbs covered. See the service area page for the full list.',
  },
  {
    q: 'Is there a contract or subscription?',
    a: 'No. Briks is pay-per-job. Call us when you need a tradie. There is no subscription, no retainer, no lock-in. Use us once or every week — either works.',
  },
  {
    q: 'What if a tradesperson does bad work?',
    a: 'One name carries the liability — Briks. If remediation is required, we coordinate and cover it; you do not chase an individual tradesperson for a fix. Every job is documented with photos and an audit trail.',
  },
]

export const FAQ_HOMEOWNERS: QA[] = [
  {
    q: 'Is there a call-out fee?',
    a: 'No call-out fee on jobs over an hour. Smaller jobs are quoted up front before any work starts. Bring us a list of small jobs and we bundle them into one visit.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Phone, online form, or email. Two sentences is enough — broken thing, address, when it is a problem. We come back quickly with a written price.',
  },
  {
    q: 'Do you do renovations for homeowners?',
    a: 'Yes — kitchens, bathrooms, extensions, decks, structural alterations. Project-managed end-to-end with itemised quotes. We do not do new home builds.',
  },
  {
    q: 'Can I be home for the work?',
    a: 'Yes, or not. We work whichever way suits — you home, you out, key handover, lockbox. Photos before and after either way.',
  },
  {
    q: 'How do I pay?',
    a: 'Single tax invoice once the job is finished. Direct deposit, card, or EFT. Larger renovations are split into staged payments tied to milestones.',
  },
]

export const FAQ_LANDLORDS: QA[] = [
  {
    q: 'I manage my own rental — does Briks work for me?',
    a: 'Yes. Many Adelaide landlords self-manage and use Briks for everything an agency would coordinate — repairs, compliance, end-of-lease make-ready, after-hours emergencies.',
  },
  {
    q: 'Can you provide compliance certs?',
    a: 'Yes. Every electrical job comes with a Certificate of Compliance, every gas job with a gasfitting cert, every waterproofing job with a waterproofing cert. Smoke alarm and RCD testing on request.',
  },
  {
    q: 'What about end-of-lease make-ready?',
    a: 'Full service — cleaning, carpet steam, painting, repairs, garden cleanup, lock re-key, bond inspection prep — coordinated as one job with one invoice.',
  },
  {
    q: 'Can you handle after-hours tenant emergencies?',
    a: 'Yes. 24/7 dispatch for burst pipes, hot water, power, broken access. Tenant calls us, we dispatch, you get a notification + photos + invoice when done.',
  },
  {
    q: 'Are tradies licensed and insured?',
    a: 'Every tradesperson in our network is licensed for their trade and carries appropriate public liability insurance. We verify both before onboarding and re-check annually.',
  },
]

export const FAQ_PROPERTY_MANAGERS: QA[] = [
  {
    q: 'Do we have to change any of our Tapi workflow?',
    a: 'No. Briks is a preferred supplier inside Tapi. Your property managers approve work orders exactly as they do today. Once approved, the work order routes to Briks instead of to a list of individual trades. Setup inside Tapi takes about 10 minutes.',
  },
  {
    q: 'How is each job priced — will landlords pay more?',
    a: 'Every job is priced on its own scope, sent to the agency before dispatch. Because Briks aggregates volume across multiple agencies, the customer-facing total typically lands at or below the walk-up rates an agency pays ad-hoc. Agency rate cards available on intro for volume.',
  },
  {
    q: 'Can our existing trusted tradespeople still be used?',
    a: 'Yes. Agencies can nominate their preferred trades and Briks dispatches to them first where licensing and availability align. The rest of the network fills gaps and scales after-hours capacity.',
  },
  {
    q: 'How does Briks select which tradesperson gets a job?',
    a: 'Quotes are scored automatically: 60% price, 25% speed / availability, 15% internal quality rating. Only licensed and insured trades enter the network.',
  },
  {
    q: 'How do we explain this to landlords?',
    a: 'Briks provides a one-page landlord FAQ that your agency can send alongside the first Briks-generated invoice. The key message: the agency has appointed a single professional maintenance supplier with documented jobs and one invoice per repair.',
  },
  {
    q: 'How long does setup take?',
    a: 'Quick. The agency adds Briks as preferred supplier in Tapi, signs the service agreement, and completes a brief discovery call so we understand property types and landlord expectations. Tradesperson onboarding handled separately.',
  },
  {
    q: 'What kind of agency is Briks the right fit for?',
    a: 'Agencies with 50+ residential rental doors, using Tapi or a platform that integrates with Tapi (PropertyMe, PropertyTree, Console Cloud, Managed App).',
  },
  {
    q: 'What if we want to leave?',
    a: 'Remove Briks as a preferred supplier inside Tapi at any time. We return in-flight job documentation, hand over communication threads, and do not retain tradesperson exclusivity.',
  },
]

export const FAQ_BUSINESSES: QA[] = [
  {
    q: 'Do you work outside trading hours?',
    a: 'Yes. After-hours and overnight work is one of the reasons businesses use us — fit-outs, refits, plumbing rough-ins, electrical that needs the lights off. Quoted with the off-hours premium baked in up front.',
  },
  {
    q: 'Can you handle commercial fit-outs?',
    a: 'Yes — shopfronts, cafés, offices, retail. Project-managed with the same flow as residential renovations. From $25k. Larger commercial builds quoted on scope.',
  },
  {
    q: 'Do you handle strata maintenance?',
    a: 'Yes. We invoice the strata committee, body corporate, or strata manager directly. Documentation suitable for committee minutes and AGM reporting included.',
  },
  {
    q: 'What about compliance — test-and-tag, RCD, smoke alarms?',
    a: 'All handled. Annual compliance schedules can be set up and tracked, with reminders sent before each due date. Certificates filed digitally.',
  },
  {
    q: 'Can I get a recurring maintenance schedule?',
    a: 'Yes. Quarterly or annual preventative maintenance schedules tailored to the premises. HVAC servicing, fire safety, hot water, gutter cleaning, all coordinated.',
  },
]

export const FAQ_TRADES: QA[] = [
  {
    q: 'How do tradies join Briks?',
    a: 'Apply via the Trade Partners page. We verify licence, insurance, and references. First few jobs are observed before full onboarding. We pay tradies promptly — none of the ninety-day nonsense.',
  },
  {
    q: 'What does Briks pay tradies?',
    a: 'Your normal hourly or job rate. We do not squeeze trades on margin. The customer pays our markup on top of your rate, not out of it.',
  },
  {
    q: 'How do you allocate jobs?',
    a: 'Quotes are scored: 60% price, 25% speed / availability, 15% internal quality rating. Quality rating goes up with job feedback, photos, and on-time completion.',
  },
  {
    q: 'Is there exclusivity?',
    a: 'No. You keep all your other clients. Briks is one channel among your existing book.',
  },
  {
    q: 'What gets a tradie removed from the network?',
    a: 'Three quality strikes (no-shows, bad finish without remediation, customer disputes), licence lapse, or insurance lapse. We re-onboard if issues are resolved.',
  },
]
