// FAQ source-of-truth — keyed by audience. Pages pull subsets.

export type QA = { q: string; a: string }

export const FAQ_GENERAL: QA[] = [
  {
    q: 'What kind of jobs does Briks do?',
    a: 'Maintenance, repairs, handyman jobs, and renovations — kitchens, bathrooms, extensions, decks, fit-outs. Plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, locksmith, glazier, HVAC. The only thing we do not do is new home builds.',
  },
  {
    q: 'How fast can you come out?',
    a: 'Briks does not promise response or completion times. Homeowners and businesses get a written quote before work starts, including for renovations. Landlords and agencies set an approval limit. Anything over it is quoted first. If anyone is in danger call 000. Briks can organise the repair once it is safe.',
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
    q: 'Do I get a quote before any work?',
    a: 'Yes. Homeowners and businesses get a written quote before work starts. Bring us a list of small jobs and Briks can organise them in one visit.',
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
    a: 'Yes. Adelaide landlords who self-manage can use Briks to coordinate repairs, maintenance and renovation work.',
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
    a: 'No. Briks does not offer after-hours or emergency dispatch. If anyone is in danger call 000. For a burst pipe, turn the water off at the meter if safe. Briks can organise the repair once it is safe. Finished jobs get before and after photos and one invoice from Briks.',
  },
  {
    q: 'Are tradies licensed and insured?',
    a: 'The trades Briks arranges are independent and licensed in South Australia for their own work. Briks is not a licensed builder, plumber, electrician or gas fitter. Ask each trade about their own insurance.',
  },
]

export const FAQ_PROPERTY_MANAGERS: QA[] = [
  {
    q: 'Do we have to change our property management software?',
    a: 'No. You add Briks as a supplier in PropertyMe, PropertyTree, Reapit PM or whatever you use. Work orders reach us by email and our invoices are paid from trust like any contractor.',
  },
  {
    q: 'Do we deal with owners, or do you?',
    a: 'You do. We invoice your agency and never contact owners without your written permission.',
  },
  {
    q: 'Can our existing trusted trades still be used?',
    a: 'Yes. Tell us your preferred trades and they can keep working through Briks. Otherwise we book an independent trade licensed in South Australia for the work.',
  },
  {
    q: 'Who approves the work?',
    a: 'You set an approval limit. Jobs under it go ahead and appear on your Friday report. Anything over it is quoted to you first, and nothing starts until you or the owner approve it.',
  },
  {
    q: 'How do we explain this to owners?',
    a: 'Your agency has appointed one maintenance supplier. Each job comes with before and after photos and one invoice, and anything over your approval limit was approved by you in writing before it started.',
  },
  {
    q: 'How do we start?',
    a: 'Add Briks as a supplier, send one tenant contact list for the portfolio we start with, and agree your approval limit and rules. It starts on one property manager’s portfolio; after the first month you decide whether to roll it out.',
  },
  {
    q: 'What if we want to stop?',
    a: 'There is no lock-in. Tell us, and we hand back any open jobs with their notes and photos.',
  },
]

export const FAQ_BUSINESSES: QA[] = [
  {
    q: 'Do you work outside trading hours?',
    a: 'No. We do not offer after hours or overnight cover. We can organise repairs, maintenance and renovation work once it is safe.',
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
    a: 'Apply via the Trade Partners page. Trades must be licensed in South Australia for their own work. We organise repairs, maintenance and renovation work.',
  },
  {
    q: 'What does Briks pay tradies?',
    a: 'Your normal hourly or job rate. We do not squeeze your rate.',
  },
  {
    q: 'How do you allocate jobs?',
    a: 'Quotes are compared on price, availability and quality. Before and after photos are provided for each finished job.',
  },
  {
    q: 'Is there exclusivity?',
    a: 'No. You keep all your other clients. Briks is one channel among your existing book.',
  },
  {
    q: 'What gets a tradie removed from the network?',
    a: 'Trades must be licensed in South Australia for their own work.',
  },
]
