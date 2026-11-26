/**
 * Guides and comparison pages (/guides/[slug], /compare/[slug]).
 *
 * Rules for every entry:
 *  - Facts about South Australian tenancy law come from sa.gov.au and are listed in `sources`.
 *  - Facts about Briks match the live offer: Briks organises the work; independent trades licensed in SA do it;
 *    approval limits for routine jobs, written approval for bigger jobs; no fees or prices published;
 *    no 24-hour cover; no response-time promises; no guarantees.
 *  - No invented statistics, prices or benchmarks. Comparisons are qualitative and fair to the alternative.
 *  - No em dashes.
 */

export type Block =
  | { t: 'p'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'steps'; items: { title: string; body: string }[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'note'; title?: string; text: string }

export type Guide = {
  slug: string
  kind: 'guide' | 'compare'
  title: string // <title>, under 60 chars
  description: string // meta description, under 160 chars
  eyebrow: string
  h1: string
  /** 40 to 70 word direct answer shown first (extractable by AI search). */
  answer: string
  published: string
  updated: string
  sections: { h: string; blocks: Block[] }[]
  faqs: { q: string; a: string }[]
  sources: { label: string; url: string; note?: string }[]
  related: { label: string; href: string }[]
  cta: { title: string; body: string; label: string; href: string }
}

const SA_REPAIRS = {
  label: 'SA Government: Repairs and maintenance in private rental properties',
  url: 'https://www.sa.gov.au/topics/housing/renting-and-letting/renting-privately/during-a-tenancy/Repairs-and-maintenance',
  note: 'page last updated 1 July 2026',
}

const CTA_AGENCY = {
  title: 'Run tenant repairs through one number',
  body: 'Briks takes the calls, books licensed trades and sends one report on Friday.',
  label: 'How it works for agencies',
  href: '/for-agencies',
}
const CTA_LANDLORD = {
  title: 'Self-managing a rental in Adelaide?',
  body: 'Your tenants call Briks. You set the approval limit and get photos and one invoice.',
  label: 'Set up your rental',
  href: '/for-landlords',
}

const D = '2026-11-25'

export const GUIDES: Guide[] = [
  // ───────────────────────────────── 1
  {
    slug: 'outsourcing-property-maintenance',
    kind: 'guide',
    title: 'Outsourcing Tenant Maintenance: Agency Guide | Briks',
    description:
      'How Australian real estate agencies hand tenant repair calls to an outside maintenance desk: what changes, what stays with the agency, and what to ask first.',
    eyebrow: 'Guide for real estate agencies',
    h1: 'How agencies outsource tenant maintenance, and what stays in-house',
    answer:
      'Outsourcing maintenance means tenants report repairs to an outside desk instead of the property manager. The desk works out urgency, books a licensed trade, arranges access and updates everyone. The agency keeps the owner relationship, the approval limit and the final say on anything over it.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'What a maintenance desk takes off the property manager',
        blocks: [
          { t: 'p', text: 'Most of the time a repair costs a property manager is not the repair. It is the calls around it: taking the report, finding a trade, chasing a time, relaying access, answering "any update?" and matching the invoice to the job. An outside desk takes that loop.' },
          {
            t: 'list',
            items: [
              'Tenant calls and messages about repairs',
              'Working out what is urgent and what can be booked in order',
              'Simple fixes talked through on the phone before anyone is sent',
              'Booking a licensed trade and arranging access with the tenant',
              'Keeping the tenant updated until the job is done',
              'Collecting before and after photos and one invoice per job',
              'A weekly summary of every job for the agency',
            ],
          },
        ],
      },
      {
        h: 'What should stay with the agency',
        blocks: [
          { t: 'p', text: 'A good arrangement does not move control. The agency should keep the owner relationship, set the approval limit each job must sit under, and approve anything over it with the owner. Preferred trades the agency already trusts can keep working through the desk.' },
          { t: 'note', title: 'A simple test', text: 'If the owner would be surprised to learn who decided a repair, the arrangement has moved too much control. Over-limit work should always come back to the property manager first.' },
        ],
      },
      {
        h: 'How it usually starts',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Add the desk as a supplier', body: 'In PropertyMe, PropertyTree, Reapit PM or similar, the desk is set up like any contractor so work orders and invoices flow as normal.' },
              { title: 'Share one tenant contact list', body: 'Names, phone numbers and addresses for the portfolio being started, so the desk knows who is calling. Agree how that data is stored and who it is shared with.' },
              { title: 'Agree the rules', body: 'The approval limit, preferred trades, which jobs always need a call first, and what happens with calls outside business hours.' },
              { title: 'Tell the tenants', body: 'One email or SMS with the new number. The property manager stays the contact for everything that is not a repair.' },
              { title: 'Review after a month', body: 'Look at the reports, the owner feedback and the property manager’s week before rolling it out further.' },
            ],
          },
        ],
      },
      {
        h: 'Questions to ask any maintenance desk',
        blocks: [
          {
            t: 'list',
            items: [
              'Who actually does the work, and how can we check each trade’s South Australian licence?',
              'How do approvals work, and who signs off jobs over our limit?',
              'Do you take any commission or rebate from the trades? (Ask for this in writing.)',
              'What happens to an urgent call outside your hours?',
              'How is tenant data stored, and who is it shared with?',
              'Can we leave after the first month without a penalty?',
            ],
          },
        ],
      },
      {
        h: 'How Briks does it',
        blocks: [
          { t: 'p', text: `Briks runs this as the Briks Maintenance Line for Adelaide agencies. Routine repairs under the agency’s approval limit go ahead; anything bigger is emailed to the property manager as a quote, followed by a phone call, and starts only after written approval. Briks does not offer 24-hour cover, and urgent safety issues go to 000, Australian Gas Networks or SA Power Networks first.` },
        ],
      },
    ],
    faqs: [
      { q: 'Does outsourcing maintenance mean losing control of owners?', a: 'It should not. The owner relationship, the approval limit and any over-limit decision stay with the agency. The desk handles the calls and the booking, and reports back.' },
      { q: 'Do we need new software to outsource maintenance?', a: 'Usually not. The desk is added as a supplier in the property management software you already use, and work orders and invoices move by email like any contractor.' },
      { q: 'Who approves jobs with an outsourced maintenance desk?', a: 'The agency should. With Briks, routine repairs under the approval limit the agency sets go ahead; anything bigger is quoted to the property manager and starts only after written approval.' },
    ],
    sources: [],
    related: [
      { label: 'In-house vs outsourced maintenance', href: '/compare/in-house-vs-outsourced-maintenance' },
      { label: 'Adding a maintenance supplier', href: '/guides/adding-a-maintenance-supplier' },
    ],
    cta: CTA_AGENCY,
  },

  // ───────────────────────────────── 2
  {
    slug: 'urgent-repairs-rental-sa',
    kind: 'guide',
    title: 'Urgent Repairs in SA Rentals: What To Do | Briks',
    description:
      'What counts as an urgent repair in a South Australian rental, who to call first, landlord entry rules, and what a tenant can do if the landlord does not act.',
    eyebrow: 'Guide for tenants, landlords and property managers',
    h1: 'Urgent repairs in a South Australian rental: what to do first',
    answer:
      'In South Australia, urgent repairs such as a gas leak must be reported to the landlord as soon as possible, and the landlord can enter without notice to fix them. If anyone is in danger call 000 first. For a gas smell call Australian Gas Networks on 1800 427 532; for power faults call SA Power Networks on 13 13 66.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'Make it safe first',
        blocks: [
          {
            t: 'list',
            items: [
              'Anyone in danger, fire, or a serious injury: call 000.',
              'Smell of gas: leave the area, do not use switches or flames, and call Australian Gas Networks on 1800 427 532.',
              'Power out, sparking or wires down: keep clear and call SA Power Networks on 13 13 66.',
              'Burst pipe or water pouring in: if it is safe, turn the water off at the meter.',
            ],
          },
          { t: 'p', text: 'Once everyone is safe, report the problem to the landlord or property manager straight away, with photos if you can.' },
        ],
      },
      {
        h: 'What the rules say',
        blocks: [
          { t: 'p', text: 'The SA Government says landlords and tenants share responsibility for repairs. Tenants must tell the landlord when something needs fixing, and the landlord must carry out repairs within a reasonable time. Urgent repairs, such as a gas leak, need to be reported as soon as possible. Other repairs should be requested in writing using the request for repairs form.' },
          { t: 'p', text: 'A landlord can enter to carry out a repair at the tenant’s request, or after giving at least 48 hours’ notice. No notice is required to enter for urgent repairs.' },
        ],
      },
      {
        h: 'If the landlord does not fix it',
        blocks: [
          { t: 'p', text: 'According to the SA Government, a tenant can apply to the South Australian Civil and Administrative Tribunal (SACAT) for the repairs to be done, for compensation, or for the tenancy to end. For urgent problems, a tenant can organise the repair and give the landlord the invoice from an authorised repairer. A licensed professional must do the repair and provide a report stating the cause of the problem and the work carried out.' },
          { t: 'note', title: 'Keep a record', text: 'Write down when you reported the problem, who you spoke to, and keep photos. It makes any later conversation, or a SACAT application, much simpler.' },
        ],
      },
      {
        h: 'For landlords and property managers',
        blocks: [
          { t: 'p', text: 'Agree before it happens: which trade gets called for each kind of urgent job, the spend a make-safe can go ahead under, and how the tenant reaches someone. Briks organises repairs for Adelaide rentals once the property is safe. It does not offer 24-hour cover, so emergencies still start with the numbers above.' },
        ],
      },
    ],
    faqs: [
      { q: 'Can my landlord come in without notice for an urgent repair in SA?', a: 'Yes. The SA Government says no notice is required for a landlord to enter for urgent repairs. For other repairs the landlord can enter at the tenant’s request or after at least 48 hours’ notice, preferably in writing.' },
      { q: 'Can a tenant get an urgent repair done and send the bill to the landlord in SA?', a: 'If the landlord refuses to fix an urgent problem, the SA Government says a tenant can organise the repair and give the landlord the invoice from an authorised repairer. A licensed professional must do the work and provide a report on the cause and the work done.' },
      { q: 'Who do I call for a gas leak in Adelaide?', a: 'Leave the area, avoid switches and flames, and call Australian Gas Networks on 1800 427 532. If anyone is in danger call 000. Then tell your landlord or property manager.' },
    ],
    sources: [SA_REPAIRS],
    related: [
      { label: 'Who pays for repairs in an SA rental?', href: '/guides/who-pays-for-rental-repairs-sa' },
      { label: 'Check this first: simple fixes', href: '/help' },
      { label: 'Urgent repairs with Briks', href: '/emergency' },
    ],
    cta: CTA_LANDLORD,
  },

  // ───────────────────────────────── 3
  {
    slug: 'who-pays-for-rental-repairs-sa',
    kind: 'guide',
    title: 'Who Pays for Rental Repairs in SA? | Briks',
    description:
      'Landlord or tenant: who pays for repairs in an SA rental. Appliances, smoke alarms, locks, pests, light globes and tenant damage, from SA Government guidance.',
    eyebrow: 'Guide for landlords and tenants',
    h1: 'Who pays for repairs in a South Australian rental?',
    answer:
      'In South Australia the landlord usually pays for repairs such as wiring, gas heaters, listed appliances and locks, even if the tenant knew about the problem at move-in. Tenants usually handle light globes, air-con filter cleaning and general gardening, and must repair damage they or their visitors cause.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'Landlord or tenant: the usual split',
        blocks: [
          {
            t: 'table',
            head: ['Item', 'Usually', 'Notes'],
            rows: [
              ['Electrical wiring, gas heaters, larger repairs', 'Landlord', 'Must be done within a reasonable time once reported.'],
              ['Tap filters and similar replacement items', 'Landlord', 'Listed by the SA Government as a landlord item.'],
              ['Ovens, air conditioners, gas heaters listed on the lease', 'Landlord', 'Landlord must list appliances and give manuals at the start.'],
              ['Sticking or broken locks', 'Landlord', 'The property must be kept secure.'],
              ['Smoke alarms', 'Landlord', 'Every rental must have a working smoke alarm.'],
              ['White ants, possums, birds', 'Landlord', 'Remove and seal entry points.'],
              ['Light globes', 'Tenant', ''],
              ['Cleaning air-con filters', 'Tenant', ''],
              ['Mowing and weeding', 'Tenant', 'Annual work such as pruning fruit trees sits with the landlord.'],
              ['Damage the tenant or visitors caused', 'Tenant', 'Including damage from neglect.'],
              ['Lost keys', 'Tenant', 'Cost of access or a new key.'],
            ],
          },
          { t: 'p', text: 'Landlords are responsible for repairs even if the tenant knew about the problem when they moved in. The exceptions are items excluded in the tenancy agreement and serious structural issues listed in a housing improvement notice.' },
        ],
      },
      {
        h: 'Tenant damage',
        blocks: [
          { t: 'p', text: 'Tenants must repair damage they cause, including damage from neglect or by visitors, within a reasonable time. If the landlord offers to do the repair and the tenant agrees, the SA Government says the landlord can charge SACAT’s set hourly rate for the time spent (listed at $33.85 an hour at the time of writing) plus materials.' },
        ],
      },
      {
        h: 'Appliances',
        blocks: [
          { t: 'p', text: 'Landlords maintain the domestic appliances in the property, such as an oven, air conditioner or gas heater. At the start of the agreement the landlord must list them on the lease and give the tenant the manuals or instructions. If that is not done, the tenant cannot be held responsible for damage caused while using the appliance. New or replacement appliances must meet minimum energy and water efficiency standards.' },
        ],
      },
      {
        h: 'Where Briks fits',
        blocks: [
          { t: 'p', text: `For self-managing Adelaide landlords, Briks takes the tenant’s repair call, talks through simple fixes, and books a licensed trade when one is needed. Anything over your approval limit is quoted to you first, and every job comes with before and after photos and one invoice.` },
        ],
      },
    ],
    faqs: [
      { q: 'Does the landlord pay for a broken air conditioner in SA?', a: 'Usually yes, if the air conditioner is a domestic appliance provided with the property. The SA Government says landlords maintain appliances such as ovens, air conditioners and gas heaters. Tenants usually clean the filters.' },
      { q: 'Who replaces light globes in an SA rental?', a: 'The tenant usually replaces light globes. Wiring faults, broken light fittings and switches are the landlord’s responsibility.' },
      { q: 'Does the landlord have to fix something the tenant knew about at move-in?', a: 'Yes, in general. The SA Government says landlords are responsible for repairs even if the tenant knew about the problem when they moved in, unless the item is excluded in the agreement or is a serious structural issue in a housing improvement notice.' },
    ],
    sources: [SA_REPAIRS],
    related: [
      { label: 'Urgent repairs in an SA rental', href: '/guides/urgent-repairs-rental-sa' },
      { label: 'For self-managing landlords', href: '/for-landlords' },
      { label: 'Check this first: simple fixes', href: '/help' },
    ],
    cta: CTA_LANDLORD,
  },

  // ───────────────────────────────── 5
  {
    slug: 'adding-a-maintenance-supplier',
    kind: 'guide',
    title: 'Adding a Maintenance Supplier: PM Checklist | Briks',
    description:
      'What a property manager needs to set up a new maintenance supplier in their property management software, and what to send them before the first work order.',
    eyebrow: 'Checklist for property managers',
    h1: 'Adding a new maintenance supplier: a property manager’s checklist',
    answer:
      'Set the supplier up as a contractor in your property management software with their ABN, trading name, email for work orders and invoices, and the trades they cover. Then send them the tenant contact details, your approval limit, preferred trades and access rules before the first work order goes out.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'In your software',
        blocks: [
          { t: 'p', text: 'Menus differ between PropertyMe, PropertyTree, Reapit PM and others, but every one has a supplier or contractor record. You will need:' },
          {
            t: 'list',
            items: [
              'Business name and ABN (Briks: Briks Building Services Pty Ltd, ABN 90 697 367 721)',
              'An email address for work orders, and one for invoices if different',
              'A phone number tenants and staff can use',
              'The kind of work they cover',
              'Payment details, taken from their invoice and confirmed by phone on a number you already hold',
            ],
          },
          { t: 'note', title: 'Bank details', text: 'Never change a supplier’s bank details from an email alone. Confirm by calling a number you already have on file.' },
        ],
      },
      {
        h: 'Before the first work order',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Approval limit', body: 'The amount a job can go ahead under, and who approves anything over it.' },
              { title: 'Tenant contact list', body: 'Names, numbers and addresses for the properties they will cover, and how that data must be stored.' },
              { title: 'Preferred trades', body: 'Any trades you want used first, and any you do not.' },
              { title: 'Access rules', body: 'Keys, lockboxes, pets, and properties where the owner wants a call first.' },
              { title: 'Licence and insurance documents', body: 'Ask for each trade’s South Australian licence details and current insurance certificates for your file.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: 'Does adding a maintenance supplier need an integration?', a: 'No. Most property management software sends work orders by email and records supplier invoices for payment from trust. An integration is optional.' },
      { q: 'What should I check before paying a new supplier?', a: 'Check the ABN on the ABN Lookup site, ask for licence and insurance details for the trades doing the work, and confirm bank details by phone on a number you already hold.' },
    ],
    sources: [],
    related: [
      { label: 'Outsourcing tenant maintenance', href: '/guides/outsourcing-property-maintenance' },
      { label: 'For property managers', href: '/for-property-managers' },
    ],
    cta: CTA_AGENCY,
  },

  // ───────────────────────────────── 6
  {
    slug: 'in-house-vs-outsourced-maintenance',
    kind: 'compare',
    title: 'In-House vs Outsourced Rental Maintenance | Briks',
    description:
      'In-house maintenance coordination vs an outsourced maintenance desk for a real estate agency: control, cost, cover, and when each one makes sense.',
    eyebrow: 'Comparison for agency principals',
    h1: 'In-house vs outsourced maintenance for a rental agency',
    answer:
      'In-house coordination gives an agency direct control and staff who know every property, but it costs salary and stops when that person is away. An outsourced desk takes the calls and bookings without adding staff, while the agency keeps approval limits and owner decisions. Many agencies outsource only tenant repair calls.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'Side by side',
        blocks: [
          {
            t: 'table',
            head: ['', 'In-house coordinator', 'Outsourced desk'],
            rows: [
              ['Who takes tenant repair calls', 'Agency staff', 'The desk, under the agency’s rules'],
              ['Approvals', 'Agency staff', 'Agency approval limit; bigger jobs approved in writing'],
              ['Knowledge of each property', 'Strong, builds over years', 'Builds from job history and the agency’s notes'],
              ['Cover during leave or turnover', 'Gaps unless backfilled', 'Continues'],
              ['Control of approvals', 'Agency', 'Agency (approval limit, over-limit decisions)'],
              ['Owner relationship', 'Agency', 'Agency'],
            ],
          },
        ],
      },
      {
        h: 'When in-house makes sense',
        blocks: [
          { t: 'p', text: 'A large portfolio with steady volume, a long-serving coordinator and its own trade panel can justify a dedicated role. So can portfolios with unusual properties where local knowledge is the whole job.' },
        ],
      },
      {
        h: 'When outsourcing makes sense',
        blocks: [
          { t: 'p', text: 'When repair calls are spread across property managers who should be leasing, inspecting and looking after owners, an outside desk takes the interruptions without adding a role. Starting on one portfolio first shows whether it works before committing.' },
        ],
      },
    ],
    faqs: [
      { q: 'What does an agency keep when it outsources maintenance?', a: 'Its owners, its approval limits and the final say on every job over the limit. The desk takes the calls, the booking and the chasing.' },
      { q: 'Can we outsource only some properties?', a: 'Yes. Briks usually starts on one property manager’s portfolio so the agency can compare before rolling it out.' },
    ],
    sources: [],
    related: [
      { label: 'Briks vs a property management VA', href: '/compare/briks-vs-pm-virtual-assistant' },
      { label: 'Briks vs calling trades directly', href: '/compare/briks-vs-adhoc-trades' },
    ],
    cta: CTA_AGENCY,
  },

  // ───────────────────────────────── 7
  {
    slug: 'briks-vs-pm-virtual-assistant',
    kind: 'compare',
    title: 'Maintenance Desk vs Property Management VA | Briks',
    description:
      'A property management VA vs an outsourced maintenance desk for tenant repairs: what each does, local trade knowledge, and who carries the follow-up.',
    eyebrow: 'Comparison for agencies',
    h1: 'A maintenance desk or a property management VA for tenant repairs?',
    answer:
      'A property management virtual assistant handles admin tasks the agency assigns, often including logging repairs and messaging trades. A maintenance desk like Briks takes the whole repair: the tenant’s call, the local licensed trade, access, follow-up, photos and one invoice. A VA works across many tasks; a desk works only on repairs.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'Side by side',
        blocks: [
          {
            t: 'table',
            head: ['', 'PM virtual assistant', 'Briks maintenance desk'],
            rows: [
              ['Scope', 'Whatever admin the agency assigns', 'Tenant repairs only, start to finish'],
              ['Who finds the trade', 'Usually the agency’s existing trade list', 'Briks books an independent licensed trade, or your preferred trade'],
              ['Local Adelaide trade knowledge', 'Depends on the person', 'Adelaide-based'],
              ['Who the tenant talks to', 'Often still the property manager', 'Briks'],
              ['Invoices', 'Each trade invoices separately', 'One invoice per job from Briks'],
            ],
          },
        ],
      },
      {
        h: 'Using both',
        blocks: [
          { t: 'p', text: 'They are not exclusive. Some agencies keep a VA for leasing admin, arrears reminders and data entry, and send tenant repairs to a desk. The VA then works from the desk’s weekly report instead of chasing trades.' },
        ],
      },
    ],
    faqs: [
      { q: 'Can a virtual assistant manage tenant maintenance?', a: 'A VA can log requests and message trades, but usually works from the agency’s trade list and processes, so the property manager still owns the outcome. A maintenance desk owns the repair from the call to the invoice.' },
    ],
    sources: [],
    related: [
      { label: 'In-house vs outsourced maintenance', href: '/compare/in-house-vs-outsourced-maintenance' },
      { label: 'For property managers', href: '/for-property-managers' },
    ],
    cta: CTA_AGENCY,
  },

  // ───────────────────────────────── 8
  {
    slug: 'briks-vs-adhoc-trades',
    kind: 'compare',
    title: 'Briks vs Calling Trades Yourself | Briks',
    description:
      'Calling a plumber or electrician yourself vs having Briks organise the repair: who finds the trade, quotes, access, photos, invoices, and when DIY booking is better.',
    eyebrow: 'Comparison for landlords and homeowners',
    h1: 'Should you call a trade yourself or have the repair organised?',
    answer:
      'Calling a trade yourself suits simple one-off jobs when you know a good local trade. Having Briks organise it suits jobs that need more than one trade, a tenant to be contacted, or photos and one invoice for your records. Homeowners get a written quote first.',
    published: D,
    updated: D,
    sections: [
      {
        h: 'Side by side',
        blocks: [
          {
            t: 'table',
            head: ['', 'Calling a trade yourself', 'Briks organises it'],
            rows: [
              ['Finding the right trade', 'You search and ring around', 'Briks books an independent licensed trade'],
              ['Quote before work', 'Up to you to ask', 'Written quote (homeowners) or your approval limit (rentals)'],
              ['Tenant access', 'You arrange it', 'Briks arranges it with the tenant'],
              ['Jobs needing two or more trades', 'You coordinate each one', 'One booking, one invoice'],
              ['Photos and records', 'If the trade sends them', 'Before and after photos with every finished job'],
            ],
          },
        ],
      },
      {
        h: 'When calling direct is the better choice',
        blocks: [
          { t: 'p', text: 'If you live at the property, already have a plumber or electrician you trust, and the job is simple, calling them direct is quick. Before anyone is sent, try the simple checks in our check-this-first guide; a tripped safety switch or a smoke alarm battery needs no trade at all.' },
        ],
      },
    ],
    faqs: [
      { q: 'When should I call a tradie directly?', a: 'When the job is simple, you are at the property and you already have a trade you trust. Use Briks when a tenant needs contacting, more than one trade is involved, or you want photos and one invoice for your records.' },
    ],
    sources: [],
    related: [
      { label: 'Check this first: simple fixes', href: '/help' },
      { label: 'For homeowners', href: '/for-homeowners' },
      { label: 'For landlords', href: '/for-landlords' },
    ],
    cta: { title: 'Got a job?', body: 'Tell us what it is. We book a licensed trade and send a written quote first.', label: 'Get a written quote', href: '/for-homeowners' },
  },
]

export const getGuide = (slug: string, kind: Guide['kind']) => GUIDES.find((g) => g.slug === slug && g.kind === kind)
