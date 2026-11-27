export const SITE = {
  url: 'https://www.briks.au',
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
  founderName: 'Pargat Singh',
  abn: '90 697 367 721',
  // WhatsApp — international format digits only, no + or spaces
  whatsapp: '61449517367',
  whatsappDisplay: '+61 449 517 367',
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
        { label: 'Emergency contacts', href: '/emergency' },
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
      seeAll: { label: 'How we work', href: '/how-it-works' },
    },
  ],
  about: [
    {
      label: 'Company',
      intro: 'Why Briks exists, who runs it.',
      items: [
        { label: 'About Briks', href: '/about', blurb: 'The story and four rules.' },
        { label: 'Trade network', href: '/about/network', blurb: 'Standards, vetting, allocation.' },
        { label: 'Reviews', href: '/reviews', blurb: 'What Adelaide customers say.' },
      ],
      seeAll: { label: 'Read the story', href: '/about' },
    },
    {
      label: 'Join the network',
      intro: 'Trade recruitment.',
      items: [
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
      "Buying a property? A building inspection before you commit can find hidden water damage, structural issues and electrical problems. Use the report to decide whether to buy, walk away or negotiate. Briks can organise repairs by independent trades licensed in South Australia for their own work, with a written quote before work starts.",
    ctaText: 'Book an Inspection',
    whyBriks: [
      'Independent — no kickbacks from agents, builders, or vendors.',
      'Inspector is an experienced builder, not a checkbox-tick service.',
      'Plain-English recommendation: buy, walk, or negotiate the price down.',
      'Heritage and modern builds — we know what each one hides.',
    ],
    jobExamples: [
      {
        title: 'Pre-settlement building inspection',
        body: 'A pre-settlement inspection usually checks for failing waterproofing and corroded balcony steel. Briks organises an independent licensed inspector, who reports the findings so the buyer can negotiate remediation.',
      },
      {
        title: 'Heritage home pre-purchase check',
        body: 'A pre-purchase inspection of an older home often finds asbestos, structural movement and unrecorded electrical work. Briks organises a licensed inspector to document the findings for the buyer.',
      },
      {
        title: 'New-build handover defects',
        body: 'New-build defects are usually listed and sent to the builder under their warranty obligation. Briks organises the inspection and follows up repairs before the buyer takes the keys.',
      },
      {
        title: 'Pre-auction building inspection',
        body: 'A pre-auction inspection usually identifies major defects before bidding. Briks organises a licensed inspector to check the property and report the findings to the buyer.',
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
        a: 'Yes. Bluestone footings, settlement cracks, lath-and-plaster, lead paint, slate roofs, original wiring runs. Different game from a 5-year-old build, and Briks organises repairs for both.',
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
      'Independent trades, licensed in South Australia for their own work.',
      'Documented before/after so you have a record for landlords or your own files.',
    ],
    jobExamples: [
      {
        title: 'Small household repair list',
        body: 'Small repairs such as a sticking door, loose tap, fence panel, light, smoke alarm and gutter clean are common. Briks organises a handyperson to quote and complete them.',
      },
      {
        title: 'Rental turnover preparation',
        body: 'A rental turnover usually needs door alignment, paint touch-ups, smoke alarm checks, lock changes and blind repairs. Briks organises licensed trades to quote and complete the work.',
      },
      {
        title: 'Investor portfolio maintenance',
        body: 'Ongoing investor maintenance usually covers repairs across several properties. Briks organises licensed trades for each job and provides one invoice per finished repair.',
      },
    ],
    deliverables: [
      'Photos before and after each item',
      'Single tax invoice with itemised work',
      'Compliance certs where the work required them',
      'Manufacturer warranties on products may apply.',
    ],
    faqs: [
      {
        q: 'Is there a minimum visit?',
        a: 'Simple problems are often sorted over the phone. Homeowners and businesses get a written quote before work starts.',
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
    tagline: 'Phone help for simple problems.',
    description:
      'Burst pipes, no power, broken access or storm damage. If anyone is in danger, call 000. For no power or wires down, call SA Power Networks on 13 13 66. For a burst pipe, turn the water off at the meter if safe. Briks can organise repairs during business hours.',
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
      "Emergencies don’t follow business hours. A burst pipe at midnight. No power on a Sunday. A storm-damaged eave. If anyone is in danger, call 000. If you smell gas, leave the area, do not use switches or flames, and call Australian Gas Networks on 1800 427 532. For no power or wires down, call SA Power Networks on 13 13 66. For a burst pipe, turn the water off at the meter if safe. Briks can organise the repair during business hours.",
    ctaText: 'Report an Emergency',
    whyBriks: [
      'Real human picks up the phone — no answering service or IVR maze.',
      'Pre-agreed emergency roster, no scrambling for who can come.',
      'Make-safe and isolate first, then quote the full repair separately.',
      'Before and after photos and one invoice for each finished job.',
    ],
    jobExamples: [
      {
        title: 'Burst pipe above ceiling',
        body: 'A burst pipe above a ceiling is a common emergency. Briks organises a plumber licensed in South Australia to find the source, isolate the water and quote the repair.',
      },
      {
        title: 'Switchboard fault and outage',
        body: 'A power outage across part of a house usually points to a switchboard fault. Briks organises an electrician licensed in South Australia to trace the fault and quote the repair.',
      },
      {
        title: 'Storm-damaged window',
        body: 'A branch through a window during a storm is a common call. Briks organises a licensed tradesperson to make the opening safe and quote the repair.',
      },
    ],
    deliverables: [
      'Make-safe completion certificate',
      'Before and after photos and one invoice for each finished job.',
      'Full repair quote separate from the make-safe',
      'Compliance certs (electrical, gas, plumbing) where required',
    ],
    faqs: [
      {
        q: 'What counts as an emergency?',
        a: 'Anything that\'s causing immediate damage, danger, or makes the property unliveable — burst pipes, no power, no hot water in winter, broken access, gas leaks, storm damage. Cosmetic stuff is non-emergency.',
      },
      {
        q: 'Do you offer after-hours cover?',
        a: 'No after-hours cover. Homeowners and businesses get a written quote first. Landlords and agencies set an approval limit; anything over it is quoted first. One invoice from Briks for each finished job.',
      },
      {
        q: 'Insurance reports: do you write them?',
        a: 'Briks organises repairs. For each finished job, you get before and after photos and one invoice from Briks.',
      },
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: 'Droplets',
    tagline: 'Plumbers licensed in South Australia for plumbing work.',
    description:
      'Independent trades licensed in South Australia for their work. Hot water, taps, drains, waterproofing, blockages.',
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
      "Briks organises plumbing on residential and commercial properties. The work is done by independent trades licensed in South Australia for plumbing work. For each finished job, you get before and after photos and one invoice from Briks.",
    ctaText: 'Request a Plumber',
    whyBriks: [
      'Plumbers licensed in South Australia for plumbing work.',
      'Plumbing Compliance Certificate supplied on every job.',
      'Replace before fail — we tell you when patching just delays the inevitable.',
      'Coordinated with electrician or tiler when the job spans multiple trades.',
    ],
    jobExamples: [
      {
        title: 'Hot water unit failure',
        body: 'A failed hot water unit is a common problem. Briks organises a trade licensed in South Australia to check the unit and quote any repair or replacement.',
      },
      {
        title: 'Toilet leak and waterproofing',
        body: 'A slow leak at the toilet base can compromise the bathroom subfloor. Briks organises licensed trades to remove the toilet, reinstate waterproofing and fit a replacement.',
      },
      {
        title: 'Septic system fault',
        body: 'A failed septic system on a hills property often involves a pump fault. Briks organises a licensed trade to diagnose the cause and quote the repair.',
      },
    ],
    deliverables: [
      'Plumbing Compliance Certificate (where applicable)',
      'Photos of underlying work before sealing up',
      'Manufacturer warranty on installed units, as provided by the manufacturer.',
      'Itemised invoice — labour, parts, certs',
    ],
    faqs: [
      {
        q: 'Hot water replacement?',
        a: 'Briks can organise a licensed plumber to replace common hot water units. Large solar or custom commercial systems may need a quote first. The plumber makes the unit safe where possible.',
      },
      {
        q: 'Septic and rural systems?',
        a: 'Yes. Adelaide Hills, Onkaparinga, McLaren Vale rural properties — pump replacement, system flush, drain field assessment.',
      },
      {
        q: 'Backflow prevention testing?',
        a: 'Yes. Briks can organise backflow testing for commercial and dual-occupancy residential properties. A licensed plumber does the work.',
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: 'Plug',
    tagline: 'Compliant electrical, no shortcuts.',
    description:
      'Independent electricians licensed in South Australia for electrical work: repairs, installations, switchboard upgrades and safety checks. The electrician provides a Certificate of Compliance for the work.',
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
      "Electrical safety is a legal obligation. Briks works with electricians licensed in South Australia for electrical work in homes and businesses. The electrician provides a Certificate of Compliance for the work. Switchboard upgrades are planned with you.",
    ctaText: 'Request an Electrician',
    whyBriks: [
      'SA-licensed sparkies on every job — no exceptions, no shortcuts.',
      'Certificate of Compliance provided by the electrician for the electrical work.',
      'Smoke alarm and RCD compliance reports for landlords.',
      'Switchboard upgrades scheduled around your day, not the other way.',
    ],
    jobExamples: [
      {
        title: 'Switchboard upgrade',
        body: 'An older ceramic-fuse switchboard is commonly upgraded to a modern RCD-protected board. Briks organises a licensed electrician to quote and carry out the work.',
      },
      {
        title: 'Rental RCD and smoke checks',
        body: 'Pre-tenancy compliance usually covers RCD testing and smoke alarm checks. Briks organises licensed trades to carry out the checks and provides one invoice.',
      },
      {
        title: 'Investor safety audit',
        body: 'An investor safety audit usually covers electrical checks, RCD testing and smoke alarm checks across a portfolio. Briks organises licensed trades and provides a summary for the owner.',
      },
    ],
    deliverables: [
      'Certificate of Compliance (CoC) provided by the electrician for electrical work.',
      'Switchboard label updated with new circuits',
      'RCD test result and date',
      'Smoke alarm test stickers',
      'Photos of underlying work before sealing up',
    ],
    faqs: [
      {
        q: 'Smoke alarm compliance for rentals?',
        a: 'Yes. Interconnected hardwired smoke alarms can be checked by an electrician licensed in South Australia for electrical work. Briks can organise the testing.',
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
        title: 'Exterior door replacement',
        body: 'A twisted exterior door is commonly replaced with a solid-core unit, with the frame realigned and locks rekeyed. Briks organises a licensed carpenter to quote and complete the work.',
      },
      {
        title: 'Deck rebuild',
        body: 'A failed timber deck is usually stripped and rebuilt on the existing bearers, with new stairs and balustrade. Briks organises a licensed carpenter to quote and complete the work.',
      },
      {
        title: 'Built-in wardrobe installation',
        body: 'A built-in wardrobe is commonly designed to fill an alcove, with drawers and hanging space. Briks organises a licensed joiner to design, make and install it.',
      },
    ],
    deliverables: [
      'Photos before and after',
      'Timber grade and source documentation (structural)',
      'Engineer certification (where structural)',
      'Manufacturer hardware warranty, not a Briks warranty.',
      'No Briks workmanship warranty',
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
        title: 'Interior repaint',
        body: 'A full interior repaint usually covers walls, ceilings, trims and doors. Briks organises a licensed painter to quote and complete the work with proper masking.',
      },
      {
        title: 'Weatherboard exterior repaint',
        body: 'A weatherboard exterior repaint often starts with lead-paint testing. Briks organises a licensed painter to quote and complete the work, including access for two-storey areas.',
      },
      {
        title: 'Cornice and ceiling rose restoration',
        body: 'Damaged ornate cornice and ceiling roses are commonly restored to the original profile. Briks organises a licensed plasterer to repair and repaint the ceiling.',
      },
    ],
    deliverables: [
      'Paint colour code list for every room and surface',
      'Manufacturer warranties may apply',
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
      'Wall and floor tiling, waterproofing by a licensed waterproofer, splashbacks, regrouting, repairs. Large-format, mosaic, herringbone. Tilers handle the layouts.',
    included: [
      'Bathroom and ensuite full tile',
      'Kitchen splashbacks',
      'Floor tiling — small format and large',
      'Mosaic and herringbone layouts',
      'AS 3740 waterproofing standard',
      'Regrouting and resealing',
      'Outdoor and pool tiling',
    ],
    heroText:
      "Bad waterproofing causes costly damage in bathrooms. In wet areas, Briks organises waterproofing by an independent trade licensed in South Australia for waterproofing. AS 3740 is the standard. Large-format and unusual layouts (herringbone, fishscale, mosaic) are handled by tilers. We coordinate with the plumber if rough-in needs adjusting before the tiles go down.",
    ctaText: 'Book a Tiler',
    whyBriks: [
      'AS 3740 waterproofing standard for wet-area work',
      'Large-format and pattern layouts (herringbone, mosaic, fishscale) routine.',
      'Coordinated with plumber when rough-ins need adjusting first.',
      'Tile and grout codes recorded so future repairs match.',
    ],
    jobExamples: [
      {
        title: 'Bathroom strip and retile',
        body: 'A bathroom strip and retile usually involves replumbing, waterproofing by a licensed waterproofer, and new floor and wall tiles. Briks organises the licensed trades and one invoice.',
      },
      {
        title: 'Outdoor herringbone patio',
        body: 'An outdoor patio in herringbone porcelain needs correct drainage falls and sealed grout. Briks organises a licensed tiler to quote and lay the patio.',
      },
      {
        title: 'Pool tile re-grout',
        body: 'Failed grout around a pool is commonly stripped and replaced with epoxy grout. Briks organises a licensed tiler to inspect the tiles and quote the work.',
      },
    ],
    deliverables: [
      'AS 3740 waterproofing standard (wet areas)',
      'Tile and grout product codes for future matching',
      'Sealant log with reseal due dates',
      'Photos at each stage — strip, waterproof, tile, grout, seal',
    ],
    faqs: [
      {
        q: 'Waterproofing certificate — included?',
        a: 'Briks organises wet-area work (bathroom, ensuite, laundry, balcony) by independent trades licensed in South Australia for their own work. AS 3740 is the waterproofing standard.',
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
      "A small leak can become a ceiling collapse. Briks organises tile, metal and Colorbond roof repairs, full replacements, gutters, downpipes and ventilation. If anyone is in danger, call 000. For storm damage, check with your insurer about a claim. Briks can organise repairs once it is safe.",
    ctaText: 'Book a Roof Inspection',
    whyBriks: [
      'Active leaks prioritised — make-safe first, full repair quoted second.',
      'Tile, metal, and Colorbond all handled — same crew.',
      'Storm-damage repairs organised for insurance claims.',
      'Full gutter replacement, not just clean — when the gutters are done, we tell you straight.',
    ],
    jobExamples: [
      {
        title: 'Storm tile roof repair',
        body: 'Hail-damaged tile roofs usually need broken tiles replaced and ridges re-bedded. Briks organises a licensed roofer to quote the repair and provide a report for the insurer.',
      },
      {
        title: 'Gutter and downpipe replacement',
        body: 'Rusted gutters and downpipes are commonly removed and replaced, with the fascia checked. Briks organises a licensed roofer to quote and complete the work.',
      },
      {
        title: 'Roof ventilation install',
        body: 'Roof-mounted ventilation is commonly installed to address summer ceiling-cavity heat. Briks organises independent licensed trades to install it and seal the flashing.',
      },
    ],
    deliverables: [
      'Photos before and after, including roof-level shots',
      'Storm-damage repairs for insurance claims',
      'Manufacturer warranties may apply (Colorbond, gutter, whirlybird)',
      'Bedding and pointing repairs organised',
    ],
    faqs: [
      {
        q: 'Flat roof leak diagnosis?',
        a: 'Yes. Membrane roofs, box gutters, parapet flashings — these are the trickiest leaks. We trace by water testing, not just visual inspection.',
      },
      {
        q: 'Storm damage repairs for insurance claims?',
        a: 'Yes. Briks organises the repairs. A trade licensed in South Australia assesses the damage and quotes where needed. Before and after photos and one invoice from Briks are provided for each finished job.',
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
      'TV mounting, shelves, doors, fixtures, picture hanging, small repairs. Phone help for simple problems.',
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
      "Most homeowners save up six small jobs before calling anyone. Briks bundles handyman work: bring us a list and it gets done in one visit, with one written quote first. Every Briks handyman is carpenter-trained, not a 'general worker' filling time.",
    ctaText: 'Book a Handyman',
    whyBriks: [
      'Phone help for simple problems.',
      'Carpenter-trained handymen, not generalists.',
      'Photos and invoice for every visit, even tiny stuff.',
      '30-day follow-up included if anything needs adjusting.',
    ],
    jobExamples: [
      {
        title: 'Small repair list',
        body: 'Small jobs such as a TV mount, shelves, door rollers, taps and pictures are common. Briks organises a handyperson to quote and complete them in one visit.',
      },
      {
        title: 'TV mount and shelving',
        body: 'Wall-mounting a TV, fitting floating shelves and re-hanging a settled door are common jobs. Briks organises a handyperson to quote and complete the work.',
      },
      {
        title: 'Furniture assembly',
        body: 'Flat-pack nursery furniture such as a cot, change table and dresser is commonly assembled and anchored to walls. Briks organises a handyperson to quote and complete the work.',
      },
    ],
    deliverables: [
      'Photos of each item completed',
      'Single tax invoice with itemised list',
      '30-day follow-up included for any adjustments',
      'Manufacturer warranties where applicable',
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
        a: 'If a shelf shifts or a door drops after work we organised, contact us and we can organise a licensed trade to assess it.',
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
        title: 'Kitchen rebuild',
        body: 'A kitchen rebuild usually includes new cabinetry, stone benchtops and a cooktop, with plumbing and electrical work by licensed trades. Briks organises the trades and one invoice.',
      },
      {
        title: 'Bathroom strip and retile',
        body: 'A bathroom strip usually includes a new layout, walk-in shower, large-format tile and waterproofing. Briks organises licensed trades to quote and complete the work.',
      },
      {
        title: 'Rear extension',
        body: 'A single-storey rear extension usually needs engineer-signed structural work and council approval. Briks organises the licensed trades and coordinates the project.',
      },
      {
        title: 'Deck and pergola',
        body: 'An outdoor deck and pergola usually includes a slatted roof and outdoor kitchen rough-in. Briks organises licensed trades for the carpentry, lighting and gas work.',
      },
    ],
    deliverables: [
      'Itemised quote with line-by-line scope',
      'Real schedule with milestone dates',
      'Photos at every stage — demo, frame, fit-out, finish',
      'Engineer certification (structural)',
      'Compliance certificates (electrical, plumbing, waterproofing)',
      'Manufacturer warranties on products may apply. Briks gives no workmanship warranty.',
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
        title: 'Rental turnover clean and repairs',
        body: 'A rental turnover usually covers cleaning, paint touch-ups, carpet steam, garden tidy and a lock change. Briks organises licensed trades and one invoice.',
      },
      {
        title: 'Furnished apartment turnover',
        body: 'A furnished apartment turnover usually includes upholstery cleaning, a kitchen scrub and blind repairs. Briks organises the work and provides one invoice.',
      },
      {
        title: 'Investor portfolio turnover',
        body: 'Bulk turnover across several rental properties is common for investors. Briks organises licensed trades for each property and provides a single coordinated invoice.',
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
        q: 'Bond-inspection repairs: what Briks can organise',
        a: 'We clean and document to a standard checked against the entry condition report. If the inspecting agent flags items, we come back and address them at no extra charge.',
      },
      {
        q: 'Lock re-key included?',
        a: 'Yes. Front and back door locks re-keyed, new keys cut for the new tenancy, old key set destroyed.',
      },
      {
        q: 'Carpet steam cleaning',
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
        title: 'Quarterly maintenance schedule',
        body: 'A quarterly walk-through usually covers smoke alarms, RCD testing, filters, gutters and hot water. Briks organises licensed trades and provides one invoice.',
      },
      {
        title: 'Café annual maintenance',
        body: 'Annual café maintenance usually covers HVAC service, grease trap, exhaust hood clean and an electrical safety check. Briks organises licensed trades and one invoice.',
      },
      {
        title: 'Strata common-area safety audit',
        body: 'A common-area safety audit usually covers smoke alarms, exit signs, extinguishers, RCDs and balcony waterproofing. Briks organises licensed trades and a report for the committee.',
      },
    ],
    deliverables: [
      'Maintenance work organised',
      'Completion certificate for each visit',
      'Photo log per property',
      'Year-end summary report',
      'Reminder emails before each cycle',
    ],
    faqs: [
      {
        q: 'How often?',
        a: 'Depends on the property and the systems. Smoke alarms annual, HVAC 6-monthly, gutter clean twice a year on tree-lined sites, hot water annually. Briks can organise the maintenance.',
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
  { label: 'Business-hours contact', body: 'Emergencies: call 000 if in danger.' },
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
    blurb: 'Shopfronts, offices, strata. Repairs and maintenance organised.',
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
  { id: 'fitout', label: 'Commercial Fit-out', blurb: 'Shopfronts, offices, retail. Repairs and maintenance organised.' },
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
    title: 'Licensed Independent Trades',
    body: "Every trade we arrange is licensed in South Australia for their own work. We organise the job and give you one invoice at the end.",
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
      'Call one number for help with simple problems. If anyone is in danger, call 000.',
  },
  {
    number: '02',
    icon: 'ClipboardCheck',
    title: 'On-site scope.',
    body: 'A coordinator inspects the property — measures, photographs, identifies the right trades. We do not quote off vague descriptions.',
    sla: 'Written quote before work starts: one invoice for each finished job',
    stall:
      'Tight timeline? Tell us up front. We do not promise response, arrival or completion times.',
  },
  {
    number: '03',
    icon: 'Wrench',
    title: 'Trades sequenced.',
    body: 'We organise licensed independent trades for the work. You get one invoice from Briks for each finished job.',
    sla: 'Daily 5pm photo update for jobs over two days · single point of contact end-to-end',
    stall:
      'Trade no-show or weather delay? You hear from us before you notice. We resequence, communicate the new plan, and absorb the slack — not pass it on.',
  },
  {
    number: '04',
    icon: 'FileCheck',
    title: 'Sign-off + handover.',
    body: 'Final walk-through, defects logged and fixed, photo report and invoice in your inbox. One job, one number on the bill.',
    sla: 'Before and after photos: one invoice for each finished job',
    stall:
      'Spot something later? There is no Briks workmanship warranty. Manufacturer warranties may apply.',
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
