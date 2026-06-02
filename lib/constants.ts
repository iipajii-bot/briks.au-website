export const SITE = {
  url: 'https://briks.au',
  name: 'Briks Building Services',
  legalName: 'Briks Building Services Pty Ltd',
  tagline: 'One Call. Every Trade. Zero Hassle.',
  positioning: 'building-services' as const,
  email: 'admin@briks.au',
  // Phone — set when supplied. Empty string = phone hidden site-wide.
  // Format: digits only for tel: link, no spaces or +. e.g. '0411234567' or '61411234567'
  phone: '0449517367',
  // Display format — e.g. '0411 234 567' or '1300 BRIKS' — falls back to phone if empty
  phoneDisplay: '0449 517 367',
  addressLocality: 'Adelaide',
  addressRegion: 'SA',
  postalCode: '5000',
  addressCountry: 'AU',
  geo: { latitude: -34.9285, longitude: 138.6007 },
  founderName: 'Founder',
  abn: '90 697 367 721',
  // WhatsApp — international format digits only, no + or spaces
  whatsapp: '61451975879',
  whatsappDisplay: '+61 451 975 879',
  social: {
    linkedin: 'https://www.linkedin.com/company/briks-building-services',
    facebook: 'https://www.facebook.com/briksbuilding',
    instagram: 'https://www.instagram.com/briksbuilding',
    youtube: 'https://www.youtube.com/@briksbuilding',
  },
  // Feature flags — flip to surface gated content
  features: {
    hasFounderPhoto: false,
    showProjectGallery: false,
    showTestimonials: false,
    showCaseStudies: false,
  },
} as const

/**
 * Returns formatted phone number for display, falling back to raw phone.
 * Returns empty string when phone unset — callers use this to gate phone surfaces.
 */
export const sitePhone = () => {
  if (!SITE.phone) return ''
  return SITE.phoneDisplay || SITE.phone
}

/**
 * Returns tel: href when phone set, empty string otherwise.
 */
export const sitePhoneHref = () => (SITE.phone ? `tel:${SITE.phone}` : '')

/**
 * Returns wa.me href with optional pre-fill text.
 */
export const whatsappHref = (text?: string) => {
  const base = `https://wa.me/${SITE.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const NAV_LINKS = [
  { label: 'Services', href: '/services', mega: 'services' as const },
  { label: 'How We Work', href: '/how-it-works', mega: null },
  { label: 'Our Tradies', href: '/our-tradies', mega: null },
  { label: 'About', href: '/about', mega: 'about' as const },
  { label: 'FAQ', href: '/faq', mega: 'faq' as const },
  { label: 'Contact', href: '/contact', mega: null },
] as const

export type MegaKey = 'services' | 'about' | 'faq'

type MegaCol = {
  label: string
  intro: string
  items: ReadonlyArray<{ label: string; href: string; blurb?: string }>
  seeAll: { label: string; href: string }
}

// Per-nav-item mega menus. Same shape across keys for one Navbar render path.
export const MEGA_MENUS: Record<MegaKey, ReadonlyArray<MegaCol>> = {
  services: [
    {
      label: 'Trades',
      intro: 'Each trade, dedicated page.',
      items: [
        { label: 'Plumbing', href: '/services/plumbing' },
        { label: 'Electrical', href: '/services/electrical' },
        { label: 'Carpentry', href: '/services/carpentry' },
        { label: 'Painting', href: '/services/painting' },
        { label: 'Tiling', href: '/services/tiling' },
        { label: 'Roofing & Gutters', href: '/services/roofing-gutters' },
        { label: 'Handyman', href: '/services/handyman' },
      ],
      seeAll: { label: 'Get a quote', href: '/contact' },
    },
    {
      label: 'Projects',
      intro: 'Bigger jobs, project-managed.',
      items: [
        { label: 'Pre-Buy Inspection', href: '/services/pre-buy-inspection' },
        { label: 'Renovations', href: '/renovations' },
        { label: 'Emergency 24/7', href: '/emergency' },
      ],
      seeAll: { label: 'All projects', href: '/renovations' },
    },
    {
      label: 'Who we work with',
      intro: 'Same trades, four ways in.',
      items: [
        { label: 'Homeowners', href: '/for-homeowners', blurb: 'Repairs, handyman, small renos.' },
        { label: 'Landlords', href: '/for-landlords', blurb: 'Single-property investors.' },
        { label: 'Property Managers', href: '/for-property-managers', blurb: 'Tapi-native, one invoice.' },
        { label: 'Businesses', href: '/for-businesses', blurb: 'Shopfront, office, strata.' },
      ],
      seeAll: { label: 'Case studies', href: '/case-studies' },
    },
  ],
  about: [
    {
      label: 'Company',
      intro: 'Why Briks exists, who runs it.',
      items: [
        { label: 'About Briks', href: '/about', blurb: 'The story and four rules.' },
        { label: 'Trade network', href: '/about/network', blurb: 'Standards, vetting, allocation.' },
      ],
      seeAll: { label: 'Read the story', href: '/about' },
    },
    {
      label: 'Joining + Pricing',
      intro: 'Costs and trade recruitment.',
      items: [
        { label: 'Pricing', href: '/pricing', blurb: 'Tiers, markup, no surprises.' },
        { label: 'Trade partners', href: '/trade-partners', blurb: 'Apply to join the network.' },
      ],
      seeAll: { label: 'Get in touch', href: '/contact' },
    },
  ],
  faq: [
    {
      label: 'General',
      intro: 'Five questions everyone asks.',
      items: [
        { label: 'All FAQs', href: '/faq', blurb: 'Universal questions.' },
      ],
      seeAll: { label: 'Open the FAQ', href: '/faq' },
    },
    {
      label: 'For customers',
      intro: 'By audience.',
      items: [
        { label: 'Homeowners', href: '/faq/homeowners' },
        { label: 'Landlords', href: '/faq/landlords' },
        { label: 'Businesses', href: '/faq/businesses' },
      ],
      seeAll: { label: 'Talk to us', href: '/contact' },
    },
    {
      label: 'For pros',
      intro: 'Agencies + tradies.',
      items: [
        { label: 'Property Managers', href: '/faq/property-managers' },
        { label: 'Tradies', href: '/faq/trades' },
      ],
      seeAll: { label: 'Apply / partner', href: '/trade-partners' },
    },
  ],
}

// Back-compat alias (older imports). Now derived from MEGA_MENUS.
export const SERVICES_MEGA = {
  trades: MEGA_MENUS.services[0],
  projects: MEGA_MENUS.services[1],
  industries: MEGA_MENUS.services[2],
} as const

export type Service = {
  id: string
  title: string
  icon: string
  tagline: string
  description: string
  included: string[]
  heroText: string
  ctaText: string
  whyBriks: string[]
  jobExamples: { title: string; body: string }[]
  deliverables: string[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
  {
    id: 'pre-buy-inspection',
    title: 'Pre-Buy Inspection',
    icon: 'ClipboardCheck',
    tagline: 'Independent inspections before you sign.',
    description:
      'Independent building inspections for buyers, sellers, and landlords. Pre-purchase, pre-settlement, handover, dilapidation. Written report with photos and a plain-English recommendation.',
    included: [
      'Pre-purchase building inspections',
      'Pre-settlement and handover inspections',
      'Dilapidation reports for adjoining works',
      'Pest and termite inspection coordination',
      'Defect reports for new builds',
      'Asbestos visual inspection',
      'Independent second-opinion reports',
    ],
    heroText:
      "Buying a property is the biggest cheque most people write. A 90-minute inspection by a builder who's seen a thousand homes catches the things that cost five figures to fix — hidden water damage, unsignable structural work, dodgy electrical. We turn up, we look hard, we give you a written report with photos and a real recommendation: buy, walk, or negotiate.",
    ctaText: 'Book an Inspection',
    whyBriks: [
      'Independent — no kickbacks from agents, builders, or vendors.',
      'Inspector is an experienced builder, not a checkbox-tick service.',
      'Plain-English recommendation: buy, walk, or negotiate the price down.',
      'Heritage and modern builds — we know what each one hides.',
    ],
    jobExamples: [
      {
        title: 'Glenelg unit · pre-settlement',
        body: 'Caught a failing shower waterproof membrane and corroded balcony steel mid-build. Buyer used the report to negotiate remediation before settlement.',
      },
      {
        title: 'Norwood heritage · pre-buy',
        body: 'Identified asbestos eaves, structural settlement at the rear add-on, and unsigned electrical from a previous reno. Buyer walked, kept their deposit on a finance clause.',
      },
      {
        title: 'Mawson Lakes new build · handover',
        body: '47-item defect list delivered to the builder under their warranty obligation. All items remediated before the buyer took the keys.',
      },
      {
        title: 'Magill auction · pre-auction sniff-test',
        body: 'Two-hour walkthrough day-of-auction, called the buyer with a verbal go/no-go before the bid. Saved them from a roofing replacement they would have inherited.',
      },
    ],
    deliverables: [
      'Written PDF report — typically 20–40 pages',
      '60–100 photos with annotations on issues',
      'Summary recommendation: buy / walk / negotiate',
      'List of negotiable items the vendor should fix',
      'Follow-up call to walk through the report',
    ],
    faqs: [
      {
        q: 'How fast is the report?',
        a: 'Inspection day, written PDF report and photos sent to you soon after. Verbal go/no-go on the day if you need it for an auction or short cooling-off.',
      },
      {
        q: 'Do you do termite inspections too?',
        a: 'We coordinate a licensed pest inspector at the same visit so you get one combined building + pest report. No separate appointment to schedule.',
      },
      {
        q: 'Will you join my conveyancer or agent on a call?',
        a: 'Yes — happy to walk your conveyancer or buyer\'s agent through the report and clarify what\'s vendor-fix vs walk-away.',
      },
      {
        q: 'Heritage homes — do you know what to look for?',
        a: 'Yes. Bluestone footings, settlement cracks, lath-and-plaster, lead paint, slate roofs, original wiring runs. Different game from a 5-year-old build and we know both.',
      },
    ],
  },
  {
    id: 'general-maintenance',
    title: 'General Maintenance',
    icon: 'Wrench',
    tagline: 'Day-to-day upkeep, handled.',
    description:
      'Everything around the home that needs an experienced hand without committing to a major project. Sticky doors, leaking taps, gutters, locks, fence boards, garden tidy.',
    included: [
      'Door, lock, and hardware repairs',
      'Tap and fixture servicing',
      'Gutter cleaning and downpipe clearing',
      'Patch and paint touch-ups',
      'Fence and gate repairs',
      'Garden and grounds maintenance',
      'General handyman work',
    ],
    heroText:
      "Day-to-day maintenance doesn't have to be a headache. Briks bundles every routine repair and bit of upkeep — door hardware, flooring, gutters, garden, general wear-and-tear — into a single coordinated visit. Same tradies you'd hire individually, with the chasing taken out.",
    ctaText: 'Request General Maintenance',
    whyBriks: [
      'Bundle multiple unrelated jobs into one visit, one invoice.',
      'Same tradie can cover plumbing, electrical, carpentry where licensing allows.',
      'Vetted, licensed, insured — no exceptions.',
      'Documented before/after so you have a record for landlords or your own files.',
    ],
    jobExamples: [
      {
        title: 'Unley · 8-item punch list',
        body: 'Stuck back door, loose laundry tap, fence panel, garage light, smoke alarm test, gutter clean, hose tap leak, garden tidy. Knocked over in one afternoon.',
      },
      {
        title: 'Marion rental · turnover prep',
        body: 'Pre-handover punch list before the new tenant moved in. Door alignment, paint touch-ups, smoke alarm cert, lock change, blind repair.',
      },
      {
        title: 'Norwood · ongoing investor',
        body: 'Quarterly visit across a 4-property portfolio. Each property gets a 90-minute walk-through and snag-list cleanup, all one invoice.',
      },
    ],
    deliverables: [
      'Photos before and after each item',
      'Single tax invoice with itemised work',
      'Compliance certs where the work required them',
      '30-day workmanship warranty on all repairs',
    ],
    faqs: [
      {
        q: 'Is there a minimum visit?',
        a: 'No call-out fee on jobs over an hour. Smaller one-offs are quoted up front before any work starts.',
      },
      {
        q: 'Can one tradie cover plumbing AND electrical?',
        a: 'Where the work is within their licensing scope, yes. For licensed-only tasks (gas, electrical, plumbing rough-in) we book the right trade alongside the handyman in the same visit when possible.',
      },
      {
        q: 'Do you tidy up?',
        a: 'Yes. Drop-sheets, dust contained, rubbish removed at the end. We treat your space the way we\'d want our own treated.',
      },
    ],
  },
  {
    id: 'emergency-repairs',
    title: 'Emergency Repairs',
    icon: 'Zap',
    tagline: '24/7 response when it matters.',
    description:
      'Burst pipes, no power, broken access, storm damage. Real humans answer, real tradies dispatch — around the clock.',
    included: [
      'Burst pipes and major water damage',
      'Hot water system failure',
      'Power failure and switchboard fault',
      'Broken locks and access failure',
      'Storm damage and roof leaks',
      'Gas leaks (coordinated with authorities)',
      'Make-safe and isolation',
    ],
    heroText:
      "Emergencies don't follow business hours. A burst pipe at midnight. No power on a Sunday morning. The eave torn off in last night's storm. Briks runs an after-hours roster of vetted tradies with pre-agreed rates so the dispatch happens immediately, the make-safe happens first, and the full repair is quoted before anyone goes further.",
    ctaText: 'Report an Emergency',
    whyBriks: [
      'Real human picks up the phone — no answering service or IVR maze.',
      'Pre-agreed emergency roster, no scrambling for who can come.',
      'Make-safe and isolate first, then quote the full repair separately.',
      'Insurance-ready report with photos for every claim.',
    ],
    jobExamples: [
      {
        title: 'Burnside · 2am burst pipe',
        body: 'Mainline burst above a ceiling. On site within the hour, water isolated, ceiling dropped to dry, full repair quoted next morning.',
      },
      {
        title: 'Salisbury · Sunday switchboard fault',
        body: 'No power across half the house. Licensed sparky on site that afternoon, fault traced to a failed RCD, full switchboard report for insurance.',
      },
      {
        title: 'Brighton · 11pm storm window',
        body: 'Branch through a bedroom window in a storm. Glazed make-safe overnight, replacement glass and frame the next day.',
      },
    ],
    deliverables: [
      'Make-safe completion certificate',
      'Insurance-ready written report with photos',
      'Full repair quote separate from the make-safe',
      'Compliance certs (electrical, gas, plumbing) where required',
    ],
    faqs: [
      {
        q: 'What counts as an emergency?',
        a: 'Anything that\'s causing immediate damage, danger, or makes the property unliveable — burst pipes, no power, no hot water in winter, broken access, gas leaks, storm damage. Cosmetic stuff is non-emergency.',
      },
      {
        q: 'Is there an after-hours premium?',
        a: 'Yes — quoted up front before dispatch. You see the after-hours rate, agree, then the tradie rolls. No surprise charges on the invoice.',
      },
      {
        q: 'Insurance reports — do you write them?',
        a: 'Yes. Photos, written description, cause-and-effect summary. Insurance-ready PDF emailed to you within 24 hours of the make-safe.',
      },
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: 'Droplets',
    tagline: 'Licensed plumbers, full compliance.',
    description:
      'Licensed plumbers for routine and emergency work. Compliance docs supplied without asking. Hot water, taps, drains, waterproofing, blockages.',
    included: [
      'Tap, mixer, and fixture repairs',
      'Toilet repairs and replacements',
      'Hot water system service and replacement',
      'Drain and blocked pipe clearing',
      'Waterproofing certification',
      'Pipe replacement and re-routes',
      'Water pressure and flow diagnosis',
    ],
    heroText:
      "Plumbing on residential and commercial properties requires SA-licensed tradespeople — no exceptions. Every plumber in the Briks network holds the appropriate licence and insurance. We supply Plumbing Compliance documentation with every job. We replace what's about to fail rather than patching it.",
    ctaText: 'Request a Plumber',
    whyBriks: [
      'All plumbers SA-licensed and insurance-verified.',
      'Plumbing Compliance Certificate supplied on every job.',
      'Replace before fail — we tell you when patching just delays the inevitable.',
      'Coordinated with electrician or tiler when the job spans multiple trades.',
    ],
    jobExamples: [
      {
        title: 'Hot water replacement · same-day',
        body: 'Failed gas hot water unit on a winter Saturday. New unit sourced, installed, and certified the same day. No cold weekend.',
      },
      {
        title: 'Toilet rebuild + waterproofing fix',
        body: 'Slow leak at the toilet base had compromised the bathroom subfloor. Removed, reinstated waterproofing, new toilet, full compliance.',
      },
      {
        title: 'Adelaide Hills · septic system',
        body: 'Failed septic in a hills property. Diagnosed pump failure, replaced, full system flush, council-compliant paperwork.',
      },
    ],
    deliverables: [
      'Plumbing Compliance Certificate (where applicable)',
      'Photos of underlying work before sealing up',
      'Manufacturer warranty pass-through on installed units',
      'Itemised invoice — labour, parts, certs',
    ],
    faqs: [
      {
        q: 'Same-day hot water replacement?',
        a: 'Most common units we can install same-day. Less common (large solar systems, custom commercial) usually next-day. We make the unit safe so you have hot water that night either way where possible.',
      },
      {
        q: 'Septic and rural systems?',
        a: 'Yes. Adelaide Hills, Onkaparinga, McLaren Vale rural properties — pump replacement, system flush, drain field assessment.',
      },
      {
        q: 'Backflow prevention testing?',
        a: 'Yes. Annual backflow testing for commercial and dual-occupancy residential, certified and lodged with the relevant authority.',
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: 'Plug',
    tagline: 'Compliant electrical, no shortcuts.',
    description:
      'Licensed electricians for repairs, installations, switchboard upgrades, and safety compliance. Certificate of Compliance lodged on every job.',
    included: [
      'Fault finding and repairs',
      'Light fittings, fans, and downlights',
      'Switchboard upgrades and rewiring',
      'RCD and safety switch installation',
      'Power point installation',
      'Smoke alarm compliance and testing',
      'EV charger and three-phase upgrades',
    ],
    heroText:
      "Electrical safety is a legal obligation. Briks works exclusively with SA-licensed electricians who understand residential and commercial standards. All electrical work comes with a Certificate of Compliance lodged within 24 hours. Switchboard upgrades planned around the household, not your inconvenience.",
    ctaText: 'Request an Electrician',
    whyBriks: [
      'SA-licensed sparkies on every job — no exceptions, no shortcuts.',
      'Certificate of Compliance lodged within 24 hours of completion.',
      'Smoke alarm and RCD compliance reports for landlords.',
      'Switchboard upgrades scheduled around your day, not the other way.',
    ],
    jobExamples: [
      {
        title: 'Norwood · switchboard upgrade',
        body: 'Old ceramic-fuse board upgraded to a fully RCD-protected modern switchboard. Power off for 4 hours, scheduled for a workday so the household was out.',
      },
      {
        title: 'Glenelg rental · RCD + smoke compliance',
        body: 'Investor pre-tenancy compliance — full RCD audit, smoke alarms tested and certified, written report for the property file.',
      },
      {
        title: 'Magill · investor safety audit',
        body: 'Six-property portfolio audit. Each property got a full electrical check, RCD test, smoke alarm cert, and a one-page summary for the owner.',
      },
    ],
    deliverables: [
      'Certificate of Compliance (CoC) — lodged within 24 hours',
      'Switchboard label updated with new circuits',
      'RCD test result and date',
      'Smoke alarm test stickers',
      'Photos of underlying work before sealing up',
    ],
    faqs: [
      {
        q: 'Smoke alarm compliance for rentals?',
        a: 'Yes — interconnected hardwired smoke alarms tested and certified to current SA tenancy regulations. Annual test schedule available.',
      },
      {
        q: 'EV charger installation?',
        a: 'Yes. Single-phase and three-phase installation, load assessment included. We let you know if the switchboard needs an upgrade before quoting the charger.',
      },
      {
        q: 'Three-phase upgrades?',
        a: 'Yes. Coordinated with SA Power Networks for the upgrade, switchboard work, and certification. Full job typically scheduled across a few visits.',
      },
    ],
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    icon: 'Hammer',
    tagline: 'Doors, frames, decking, custom builds.',
    description:
      'Time-served carpenters for repairs, replacements, and custom builds. Heritage profiles matched, modern profiles done clean. Same crew for small jobs and full builds.',
    included: [
      'Door and frame replacement',
      'Skirting, architrave, and cornice',
      'Decking and pergolas',
      'Built-in storage and wardrobes',
      'Stair repair and replacement',
      'Window frames and timber sash repair',
      'Custom joinery and shelving',
    ],
    heroText:
      "Carpentry is half precision and half problem-solving. Briks carpenters handle the small jobs (a door that won't close in winter) and the big ones (a full set of built-in wardrobes) without sending two different people. Heritage profiles matched to original mouldings, modern stuff done square and clean.",
    ctaText: 'Book a Carpenter',
    whyBriks: [
      'Time-served carpenters, not just handymen with a saw.',
      'Heritage cornice, skirting, and architrave matched to original profiles.',
      'Engineer-signed structural carpentry where needed.',
      'Small repairs and full builds done by the same crew — no learning curve mid-project.',
    ],
    jobExamples: [
      {
        title: 'Glenelg · door + frame replacement',
        body: 'Twisted exterior door replaced with a new solid-core unit, frame realigned, weather-sealed, locks rekeyed. Half-day visit.',
      },
      {
        title: 'Burnside · deck rebuild',
        body: 'Failed merbau deck stripped and rebuilt on existing bearers. New stair flight, balustrade, oil finish. Two-week project.',
      },
      {
        title: 'Hyde Park · built-in wardrobe',
        body: 'Custom built-in wardrobe to fill an alcove — internal drawer bank, shaker doors, full hanging space. Designed, made, and installed in three weeks.',
      },
    ],
    deliverables: [
      'Photos before and after',
      'Timber grade and source documentation (structural)',
      'Engineer certification (where structural)',
      'Manufacturer hardware warranty pass-through',
      '12-month workmanship warranty',
    ],
    faqs: [
      {
        q: 'Heritage profile matching?',
        a: 'Yes. We can replicate original cornice, skirting, and architrave profiles either by sourcing matching stock or having custom profiles run for the job.',
      },
      {
        q: 'Engineer-signed structural work?',
        a: 'Yes. Wall removal, beam install, structural openings — we coordinate the structural engineer\'s plans and sign-off as part of the job.',
      },
      {
        q: 'Custom joinery turnaround?',
        a: 'Design, fabrication, and install typically two to four weeks depending on scope and finish. Quoted with a real start and finish date, not a window.',
      },
    ],
  },
  {
    id: 'painting',
    title: 'Painting',
    icon: 'PaintBucket',
    tagline: 'Interior + exterior, prep done right.',
    description:
      'Walls, ceilings, trims, doors, weatherboards, fences. Premium paint, proper prep, clean lines, no overspray.',
    included: [
      'Interior wall and ceiling repaint',
      'Exterior weatherboard, render, and brick',
      'Trim, door, and architrave painting',
      'Fence and deck staining',
      'Wallpaper removal',
      'Plaster patching and prep',
      'Heritage cornice and ceiling restoration',
    ],
    heroText:
      "Most paint jobs fail at the prep, not the paint. Briks painters spend the time on patching, sanding, priming, and masking — then use premium paint on top. The job lasts twice as long. Drop-sheets cover everything, edges are clean, no overspray on your stuff. Touch-up tin of every main colour left with you.",
    ctaText: 'Get a Painting Quote',
    whyBriks: [
      'Premium paint brands as standard — Dulux, Wattyl, Haymes.',
      'Proper sand-fill-prime-mask sequence before the topcoat.',
      'Drop-sheets, masking, no-overspray respect for your stuff.',
      'Touch-up tin of every main colour left for future repairs.',
    ],
    jobExamples: [
      {
        title: 'Marion · 3-bedroom interior repaint',
        body: 'Full interior — walls, ceilings, trims, doors. Three-day job, fully masked, household able to keep one wing usable each day.',
      },
      {
        title: 'Goodwood · weatherboard exterior',
        body: 'Lead-paint tested first, then full weatherboard repaint. Scaffold for two-storey rear, two coats with proper drying time between.',
      },
      {
        title: 'Norwood heritage · cornice restoration',
        body: 'Damaged ornate cornice and ceiling rose restored, plaster repaired, full ceiling repaint with original profile preserved.',
      },
    ],
    deliverables: [
      'Paint colour code list for every room and surface',
      'Manufacturer warranty pass-through (typically 7–15 years)',
      'Photos before, during prep, and after',
      'Touch-up tin of every main colour',
    ],
    faqs: [
      {
        q: 'What paint brands?',
        a: 'Premium grades from Dulux, Wattyl, or Haymes by default. We can match a specific brand or product on request.',
      },
      {
        q: 'Lead paint testing?',
        a: 'Yes — pre-1970 homes get a lead test before sanding. If positive, we follow a contained removal procedure with proper PPE and disposal.',
      },
      {
        q: 'Heritage cornice repair?',
        a: 'Yes. Damaged ornate cornice and ceiling roses can be patched in plaster or replaced section-by-section to preserve the original profile.',
      },
    ],
  },
  {
    id: 'tiling',
    title: 'Tiling & Waterproofing',
    icon: 'Grid3x3',
    tagline: 'Bathrooms, kitchens, floors, outdoor.',
    description:
      'Wall and floor tiling, certified waterproofing, splashbacks, regrouting, repairs. Large-format, mosaic, herringbone — we do the layouts.',
    included: [
      'Bathroom and ensuite full tile',
      'Kitchen splashbacks',
      'Floor tiling — small format and large',
      'Mosaic and herringbone layouts',
      'AS 3740 waterproofing certification',
      'Regrouting and resealing',
      'Outdoor and pool tiling',
    ],
    heroText:
      "Bad waterproofing is the most expensive shortcut in any bathroom. Every Briks tiling job in a wet area uses a certified waterproofer and a written AS 3740 certificate. Large-format and unusual layouts (herringbone, fishscale, mosaic) handled by tilers who do them weekly, not once a year. Coordinated with the plumber if rough-in needs adjusting before the tiles go down.",
    ctaText: 'Book a Tiler',
    whyBriks: [
      'AS 3740 waterproofing certificate on every wet-area job — no exceptions.',
      'Large-format and pattern layouts (herringbone, mosaic, fishscale) routine.',
      'Coordinated with plumber when rough-ins need adjusting first.',
      'Tile and grout codes recorded so future repairs match.',
    ],
    jobExamples: [
      {
        title: 'Burnside · bathroom strip-and-retile',
        body: 'Full strip back to studs, replumb, certified waterproofing, large-format porcelain floor and walls, niche, frameless screen. Two-week job.',
      },
      {
        title: 'Magill · outdoor herringbone patio',
        body: 'Outdoor patio in herringbone porcelain. Drainage falls set, sealed grout for outdoor durability, expansion joints proper.',
      },
      {
        title: 'Hahndorf · pool tile re-grout',
        body: 'Failed grout around a hills pool stripped and replaced with epoxy grout. Tile-by-tile inspection, lifted and reset where bedding had failed.',
      },
    ],
    deliverables: [
      'AS 3740 Waterproofing Certificate (wet areas)',
      'Tile and grout product codes for future matching',
      'Sealant log with reseal due dates',
      'Photos at each stage — strip, waterproof, tile, grout, seal',
    ],
    faqs: [
      {
        q: 'Waterproofing certificate — included?',
        a: 'Yes. Every wet-area job (bathroom, ensuite, laundry, balcony) gets a written AS 3740 waterproofing certificate from a licensed waterproofer.',
      },
      {
        q: 'Large-format tile?',
        a: 'Yes. 600×600, 600×1200, slab tiles up to 1200×2400 — handled with the right vacuum lifters and adhesive system.',
      },
      {
        q: 'Pool tile?',
        a: 'Yes. Pool waterline tile, full pool re-tile, mosaic feature walls. Epoxy grout for chemical resistance, properly cured before refilling.',
      },
    ],
  },
  {
    id: 'roofing-gutters',
    title: 'Roofing & Gutters',
    icon: 'CloudRain',
    tagline: 'Leaks, replacements, gutters, downpipes.',
    description:
      'Tile, metal, and Colorbond roofs. Active leak diagnosis, full replacements, gutter cleaning and replacement, downpipes, ventilation.',
    included: [
      'Active leak diagnosis and repair',
      'Tile replacement and re-bedding',
      'Gutter cleaning and replacement',
      'Downpipe install and re-routing',
      'Whirlybird and ventilation upgrades',
      'Storm damage assessment',
      'Full roof inspections',
    ],
    heroText:
      "A small leak becomes a ceiling collapse. Briks handles tile, metal, and Colorbond roofs — repairs, full replacements, gutters, downpipes, ventilation. Active leaks get prioritised. Storm-damage jobs come with insurance-ready paperwork. We climb up and look properly, we don't diagnose from the ground.",
    ctaText: 'Book a Roof Inspection',
    whyBriks: [
      'Active leaks prioritised — make-safe first, full repair quoted second.',
      'Tile, metal, and Colorbond all handled — same crew.',
      'Storm-damage assessments written for insurance claims.',
      'Full gutter replacement, not just clean — when the gutters are done, we tell you straight.',
    ],
    jobExamples: [
      {
        title: 'Beaumont · storm tile replacement',
        body: 'Hail-damaged tile roof. 80+ tiles replaced, ridge re-bedded, full inspection report submitted to the insurer.',
      },
      {
        title: 'Glenelg · full gutter replace',
        body: 'Rusted Colorbond gutters and downpipes removed and replaced. Fascia checked and reinstated, leaf guard fitted to the high tree-line side.',
      },
      {
        title: 'Aldinga · whirlybird install',
        body: 'Two roof-mounted whirlybirds installed to address summer ceiling-cavity heat. Underflashing sealed, manufacturer warranty registered.',
      },
    ],
    deliverables: [
      'Photos before and after, including roof-level shots',
      'Insurance-ready report for storm-damage claims',
      'Manufacturer warranty pass-through (Colorbond, gutter, whirlybird)',
      'Workmanship warranty on bedding and pointing',
    ],
    faqs: [
      {
        q: 'Flat roof leak diagnosis?',
        a: 'Yes. Membrane roofs, box gutters, parapet flashings — these are the trickiest leaks. We trace by water testing, not just visual inspection.',
      },
      {
        q: 'Storm damage insurance reports?',
        a: 'Yes. Photos, written description, cause-and-effect, repair scope. Insurance-ready PDF emailed within 24 hours of the inspection.',
      },
      {
        q: 'Gutter guard?',
        a: 'Yes. Aluminium mesh gutter guard fitted on tree-lined sides where gutter cleaning becomes a four-times-a-year problem.',
      },
    ],
  },
  {
    id: 'handyman',
    title: 'Handyman',
    icon: 'Wrench',
    tagline: 'Six small jobs, one visit.',
    description:
      'TV mounting, shelves, doors, fixtures, picture hanging, small repairs. No call-out fee on jobs over an hour.',
    included: [
      'TV mounting and shelving',
      'Door hardware and adjustment',
      'Curtain and blind installation',
      'Picture hanging and gallery walls',
      'Small carpentry repairs',
      'Patch and paint touch-ups',
      'Furniture assembly',
    ],
    heroText:
      "Most homeowners save up six small jobs before calling anyone, because the call-out fee makes one job uneconomical. Briks bundles handyman work — bring us a list, we knock it over in one visit, you pay one rate. Every Briks handyman is carpenter-trained, not a 'general worker' filling time.",
    ctaText: 'Book a Handyman',
    whyBriks: [
      'No call-out fee on jobs over an hour — bundle and save.',
      'Carpenter-trained handymen, not generalists.',
      'Photos and invoice for every visit, even tiny stuff.',
      '30-day follow-up included if anything needs adjusting.',
    ],
    jobExamples: [
      {
        title: 'Unley · 9-item afternoon punch list',
        body: 'TV mount, two shelves, sliding door rollers, hose tap, curtain rail, three pictures, smoke alarm, garden tap, drawer runners. One afternoon visit.',
      },
      {
        title: 'Goodwood · TV + shelf + door',
        body: 'Wall-mount TV with cables in conduit, two floating shelves, an interior door re-hung after settlement movement.',
      },
      {
        title: 'Magill · furniture assembly',
        body: 'Full nursery — cot, change table, dresser, wardrobe — assembled and anchored to walls per safety requirements.',
      },
    ],
    deliverables: [
      'Photos of each item completed',
      'Single tax invoice with itemised list',
      '30-day follow-up included for any adjustments',
      'Materials warranty pass-through where applicable',
    ],
    faqs: [
      {
        q: 'Tiniest job worth booking?',
        a: 'If you have one tiny task, ask us — we may be in the area. Otherwise, save up half a dozen and we knock them over together for the price of one visit.',
      },
      {
        q: 'Do you supply the materials?',
        a: 'Yes — we bring brackets, screws, picture hooks, paint, common consumables. For specific products (named TV mount, particular paint colour) tell us and we source it before the visit.',
      },
      {
        q: '30-day follow-up — what does that mean?',
        a: 'If a shelf shifts, a door drops, anything we did needs tweaking within 30 days, we come back at no charge.',
      },
    ],
  },
  {
    id: 'renovations',
    title: 'Renovations',
    icon: 'Hammer',
    tagline: 'Project-managed, end-to-end.',
    description:
      'Kitchens, bathrooms, extensions, decks, structural, commercial fit-outs. Single point of contact, real schedule, finish-quality tradies.',
    included: [
      'Kitchen renovations',
      'Bathroom renovations',
      'Home extensions and additions',
      'Decking, pergolas, outdoor builds',
      'Commercial fit-outs',
      'Structural alterations',
      'Project management end-to-end',
    ],
    heroText:
      "Renovations involve five to ten trades hitting the same site in the right order. Briks runs the schedule, coordinates the trades, and stands behind the finish. Kitchen rebuilds, bathroom strip-outs, extensions, decks, commercial fit-outs — managed as one job. We don't do new home builds; everything else is in scope.",
    ctaText: 'Plan a Renovation',
    whyBriks: [
      'Single point of contact — one person owns the schedule and the finish.',
      'Real schedule with start and finish dates, not vague windows.',
      'Engineer sign-off coordinated where structural work is involved.',
      'Finish-quality tradies — not subbies-of-subbies.',
    ],
    jobExamples: [
      {
        title: 'Burnside · kitchen rebuild',
        body: 'Full kitchen strip and rebuild. New cabinetry, stone benchtops, induction cooktop, replumbed, rewired. Six weeks, household kept usable throughout.',
      },
      {
        title: 'Glenelg · bathroom strip + retile',
        body: 'Master bathroom complete strip. New layout, walk-in shower, freestanding bath, large-format tile, certified waterproofing. Three-week job.',
      },
      {
        title: 'Marion · rear extension',
        body: 'Single-storey rear extension — new master suite and walk-in robe. Engineer-signed structural, all trades coordinated, council approval handled. Twelve-week project.',
      },
      {
        title: 'Aldinga · deck + pergola',
        body: 'Outdoor entertainment area — merbau deck, slatted pergola roof, outdoor kitchen rough-in. Coordinated with sparky and plumber for outdoor lighting and gas.',
      },
    ],
    deliverables: [
      'Itemised quote with line-by-line scope',
      'Real schedule with milestone dates',
      'Photos at every stage — demo, frame, fit-out, finish',
      'Engineer certification (structural)',
      'Compliance certificates (electrical, plumbing, waterproofing)',
      '12-month workmanship warranty + manufacturer warranty pass-through',
    ],
    faqs: [
      {
        q: 'Do you do new home builds?',
        a: 'No. New home builds are out of scope. Renovations, extensions, structural alterations, fit-outs — all in scope.',
      },
      {
        q: 'Engineer sign-off — included?',
        a: 'Yes. For structural alterations (wall removal, beam install, openings, second-storey additions) the structural engineer\'s plans and sign-off are coordinated as part of the job.',
      },
      {
        q: 'Site clean-up daily?',
        a: 'Yes. End-of-day broom, rubbish removed, dust contained, household kept usable where possible. Builders\' clean before handover.',
      },
    ],
  },
  {
    id: 'end-of-lease',
    title: 'End of Lease',
    icon: 'KeyRound',
    tagline: 'Properties turned over, fast.',
    description:
      'Bond-inspection grade clean, paint, repairs, carpet steam, lock re-key, garden cleanup. One job, one invoice, one timeline.',
    included: [
      'Professional cleaning to bond-inspection standard',
      'Carpet and upholstery steam clean',
      'Internal painting and touch-ups',
      'Repair of tenant damage',
      'Garden tidy and rubbish removal',
      'Lock re-keying and key handover',
      'Bond-inspection report preparation',
    ],
    heroText:
      "Vacancy costs money. The faster a property is turned over, the sooner rent resumes. Briks coordinates complete end-of-lease make-good services — bond-inspection grade clean, repairs, paint touch-ups, carpet steam, lock re-key, garden cleanup — managed as a single coordinated job with one invoice.",
    ctaText: 'Book an End of Lease',
    whyBriks: [
      'Bond-inspection grade clean — checked against the entry condition report.',
      'All trades booked in the right order — paint dries before clean, clean before carpet.',
      'Lock re-key included so the new tenant gets fresh keys.',
      'Photo-documented condition report so the property is ready to inspect.',
    ],
    jobExamples: [
      {
        title: 'Marion · 3-bed rental turnover',
        body: 'Tenant departed, full clean + paint touch-ups + carpet steam + garden tidy + lock change. Three-day turnover, ready for inspection on day four.',
      },
      {
        title: 'Glenelg · furnished apartment',
        body: 'Furnished apartment turnover including upholstery clean, kitchen scrub, replacement of damaged blinds, full bond-inspection prep.',
      },
      {
        title: 'Magill · investor portfolio',
        body: 'Bulk turnover across three rental properties for an interstate investor. All three ready within a week, single coordinated invoice.',
      },
    ],
    deliverables: [
      'Bond-inspection ready cleaning report with photos',
      'Lock change record with new key set',
      'Paint touch-up log with colour codes used',
      'Carpet steam clean certificate',
      'Single tax invoice with itemised work',
    ],
    faqs: [
      {
        q: 'Bond-inspection ready — guaranteed?',
        a: 'We clean and document to a standard checked against the entry condition report. If the inspecting agent flags items, we come back and address them at no extra charge.',
      },
      {
        q: 'Lock re-key included?',
        a: 'Yes. Front and back door locks re-keyed, new keys cut for the new tenancy, old key set destroyed.',
      },
      {
        q: 'Carpet steam — warranty?',
        a: 'Yes. Steam clean comes with a written certificate the carpets were professionally cleaned, and a re-clean if anything\'s flagged at inspection.',
      },
    ],
  },
  {
    id: 'preventative-maintenance',
    title: 'Preventative Maintenance',
    icon: 'ShieldCheck',
    tagline: 'Stop problems before they start.',
    description:
      'Scheduled inspections and servicing — HVAC, hot water, smoke alarm, gutters, fire safety. Reminder before each cycle.',
    included: [
      'Annual property inspections',
      'HVAC and air conditioning servicing',
      'Hot water system checks',
      'Fire safety compliance',
      'Smoke alarm testing and replacement',
      'Roof and guttering inspections',
      'Pool, spa, and outdoor maintenance',
    ],
    heroText:
      "The cheapest repair is the one that didn't happen. Briks designs and runs preventative maintenance schedules tailored to a single property or a portfolio — equipment serviced, systems inspected, minor issues caught before they become major. Reminder before each cycle so nothing slips.",
    ctaText: 'Set Up a Schedule',
    whyBriks: [
      'Schedule built around your portfolio, not a generic template.',
      'Reminders before each cycle so you never miss a service.',
      'Single supplier across HVAC, plumbing, electrical, roofing, gardens.',
      'Year-end summary report so you know exactly what was done and what\'s next.',
    ],
    jobExamples: [
      {
        title: 'Self-managing landlord · quarterly schedule',
        body: 'Quarterly walk-through across a 4-property portfolio. Smoke alarm, RCD, HVAC filter, gutter check, hot water service. One coordinator, one invoice.',
      },
      {
        title: 'Café · annual prevent',
        body: 'Annual maintenance for a Glenelg café. HVAC service, grease trap, exhaust hood clean, electrical safety check. Booked for off-trading hours.',
      },
      {
        title: 'Strata committee · annual safety audit',
        body: 'Body corporate annual common-area safety audit — smoke alarms, exit signs, fire extinguishers, RCD, balcony waterproofing. Full report for the AGM.',
      },
    ],
    deliverables: [
      'Tailored schedule calendar (12-month view)',
      'Completion certificate for each visit',
      'Photo log per property',
      'Year-end summary report',
      'Reminder emails before each cycle',
    ],
    faqs: [
      {
        q: 'How often?',
        a: 'Depends on the property and the systems. Smoke alarms annual, HVAC 6-monthly, gutter clean twice a year on tree-lined sites, hot water annually. We tailor it.',
      },
      {
        q: 'Strata-friendly billing and reporting?',
        a: 'Yes. We invoice the strata committee or body corporate manager directly, with documentation suitable for AGM minutes and committee approvals.',
      },
      {
        q: 'Reminder system?',
        a: 'Yes. Email reminder a week before each scheduled cycle so you can confirm or reschedule. Year-end summary so you have the full record.',
      },
    ],
  },
]

// Universal pillars — broad building services positioning.
export const PILLARS = [
  { label: 'Adelaide-first', body: 'Local operators. No offshore VAs.' },
  { label: 'Every trade', body: 'Plumbing to renovations under one roof.' },
  { label: '24 / 7 coverage', body: 'After-hours emergencies handled.' },
  { label: 'One invoice', body: 'Single accountable name on every job.' },
]

// PM-orbit audience — used ONLY on /for-property-managers page.
// Kept here for that page; not surfaced on homepage.
export const ORBIT_AUDIENCE = [
  { label: 'Principals', icon: 'Building2', ring: 1 },
  { label: 'Heads of PM', icon: 'UserCheck', ring: 1 },
  { label: 'Senior PMs', icon: 'Users', ring: 2 },
  { label: 'Trust accountants', icon: 'FileText', ring: 2 },
  { label: 'Landlords', icon: 'Home', ring: 3 },
  { label: 'Tradespeople', icon: 'Wrench', ring: 3 },
]

// Audience tiers — homepage AudienceTiles + nav.
export const AUDIENCES = [
  {
    id: 'homeowners',
    label: 'Homeowners',
    href: '/maintenance',
    icon: 'Home',
    blurb: 'Leaks, repairs, paint, handyman work. One number, fast response.',
  },
  {
    id: 'renovations',
    label: 'Renovations',
    href: '/renovations',
    icon: 'Hammer',
    blurb: 'Kitchens, bathrooms, extensions, fit-outs. Project-managed end-to-end.',
  },
  {
    id: 'property-managers',
    label: 'Property Managers',
    href: '/for-property-managers',
    icon: 'Building2',
    blurb: 'Tapi-native managed supplier. Single invoice per job to your landlords.',
  },
  {
    id: 'businesses',
    label: 'Businesses',
    href: '/for-businesses',
    icon: 'Briefcase',
    blurb: 'Shopfronts, offices, strata. Compliance-ready trades, after-hours coverage.',
  },
] as const

// Trade catalogue — drives long-tail SEO and TradesGrid.
export const TRADES = [
  { id: 'plumbing', label: 'Plumbing', icon: 'Droplets' },
  { id: 'electrical', label: 'Electrical', icon: 'Plug' },
  { id: 'carpentry', label: 'Carpentry', icon: 'Hammer' },
  { id: 'painting', label: 'Painting', icon: 'PaintBucket' },
  { id: 'tiling', label: 'Tiling', icon: 'Grid3x3' },
  { id: 'roofing', label: 'Roofing', icon: 'Home' },
  { id: 'gutters', label: 'Gutters', icon: 'CloudRain' },
  { id: 'gas', label: 'Gas', icon: 'Flame' },
  { id: 'locksmith', label: 'Locksmith', icon: 'KeyRound' },
  { id: 'glazier', label: 'Glazier', icon: 'Square' },
  { id: 'hvac', label: 'HVAC', icon: 'Wind' },
  { id: 'handyman', label: 'Handyman', icon: 'Wrench' },
] as const

// Renovation types for /renovations and homepage RenovationStrip.
// Pricing is never displayed — we quote per job. These are scope categories only.
export const RENOVATION_TYPES = [
  { id: 'kitchen', label: 'Kitchen', blurb: 'Full kitchen rebuilds — cabinetry, stone, plumbing, electrical.' },
  { id: 'bathroom', label: 'Bathroom', blurb: 'Strip-outs, waterproofing, tiling, fixtures.' },
  { id: 'extension', label: 'Extension', blurb: 'Single-room and multi-room additions. Structural.' },
  { id: 'deck', label: 'Deck / Outdoor', blurb: 'Decking, pergolas, paving, outdoor kitchens.' },
  { id: 'fitout', label: 'Commercial Fit-out', blurb: 'Shopfronts, offices, retail. After-hours capable.' },
  { id: 'structural', label: 'Structural', blurb: 'Walls, beams, openings. Engineer-signed.' },
] as const

export const VALUE_PROPS = [
  {
    icon: 'Phone',
    title: 'Single Point of Contact',
    body: 'One number. One email. One team. No juggling multiple tradies or chasing callbacks — we coordinate everything on your behalf.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Fully Vetted Tradespeople',
    body: "Every trade in our network is licensed, insured, and reference-checked. We don't send anyone to your property we wouldn't send to our own.",
  },
  {
    icon: 'FileText',
    title: 'Full Job Reporting',
    body: 'Every job comes with documentation — photos, invoices, compliance certificates — so you have a complete record for your landlords and owners.',
  },
  {
    icon: 'Clock',
    title: 'Fast, Reliable Response',
    body: 'Routine or emergency — we respond fast. Our trades network covers the metro area, so jobs get attended promptly, every time.',
  },
]

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    icon: 'Phone',
    title: 'Tell us the job.',
    body: 'Call, WhatsApp, email, or fill the online form. A real human reads it — no auto-responder, no ticket queue.',
    sla: 'Replied to inside 2 hours · 8am–6pm ACST',
    stall:
      'Out of hours? Emergencies still get a callback within 60 minutes. Routine enquiries hit your inbox first thing the next morning.',
  },
  {
    number: '02',
    icon: 'ClipboardCheck',
    title: 'On-site scope.',
    body: 'A coordinator inspects the property — measures, photographs, identifies the right trades. We do not quote off vague descriptions.',
    sla: 'Inspection booked inside 48 hours · written quote within 24 hours of inspection',
    stall:
      'Tight timeline? Say so up front and we will slot a same-day inspection where possible. We will tell you if we can or cannot meet your date — no soft promises.',
  },
  {
    number: '03',
    icon: 'Wrench',
    title: 'Trades sequenced.',
    body: 'We dispatch the right specialists in the right order. One coordinator owns the job from first day to last — you do not chase tradies.',
    sla: 'Daily 5pm photo update for jobs over two days · single point of contact end-to-end',
    stall:
      'Trade no-show or weather delay? You hear from us before you notice. We resequence, communicate the new plan, and absorb the slack — not pass it on.',
  },
  {
    number: '04',
    icon: 'FileCheck',
    title: 'Sign-off + handover.',
    body: 'Final walk-through, defects logged and fixed, photo report and invoice in your inbox. One job, one number on the bill.',
    sla: 'Defects rectified within 7 days · job report PDF within 24 hours of completion',
    stall:
      'Spot something later? 12-month workmanship guarantee on Briks-coordinated work. One message, we come back.',
  },
]

export const SERVICE_TYPE_OPTIONS = [
  { value: 'general-maintenance', label: 'General Maintenance' },
  { value: 'emergency-repairs', label: 'Emergency Repairs' },
  { value: 'handyman', label: 'Handyman / Small Jobs' },
  { value: 'renovations', label: 'Renovation / Construction' },
  { value: 'pre-buy-inspection', label: 'Pre-Buy / Pre-Settlement Inspection' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'roofing-gutters', label: 'Roofing & Gutters' },
  { value: 'painting', label: 'Painting' },
  { value: 'tiling', label: 'Tiling & Waterproofing' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'preventative-maintenance', label: 'Preventative Maintenance' },
  { value: 'end-of-lease', label: 'End of Lease / Make Ready' },
  { value: 'other', label: 'Other / Not Sure' },
]
