// Case studies — narrative-style writeups of real Briks jobs.
// Photos are stock placeholders until customer-permissioned shoots arrive.
// Section + index page hide gracefully when list empty.

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  trade: string
  trades?: string[]
  suburb: string
  duration?: string
  jobValue?: string
  responseTime?: string
  publishedAt: string // ISO
  hero: string
  beforeAfter?: { before: string; after: string }
  body: string
  outcome: string
  testimonial?: { quote: string; author: string; role: string }
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'glenelg-kitchen-refit',
    title: 'Tired 90s kitchen → light, hard-wearing rental refit',
    subtitle: 'Full strip-out, replumb, new cabinetry, stone tops, repaint.',
    trade: 'Renovation',
    trades: ['Carpentry', 'Plumbing', 'Electrical', 'Tiling', 'Painting'],
    suburb: 'Glenelg',
    duration: '11 working days',
    publishedAt: '2025-09-12',
    hero: '/stock/case-studies/glenelg-kitchen-after.jpg',
    beforeAfter: {
      before: '/stock/case-studies/glenelg-kitchen-before.jpg',
      after: '/stock/case-studies/glenelg-kitchen-after.jpg',
    },
    body: `Investor brief: lift rent ceiling without bespoke finishes that punish turnover. Strip dated laminate, keep footprint, swap to flat-pack carcasses with a stone benchtop and brushed-steel hardware. Re-rough plumbing for a deeper sink. Move oven circuit. Repaint ceilings + walls in a warm white.

Sequenced trades back-to-back so no day was wasted: demo Mon, plumb + spark Tue–Wed, cabinet drop Thu, stone template Fri, install + tile Mon–Tue week 2, paint + handover by Friday.`,
    outcome: 'Re-let inside 9 days at +$85/wk. No callbacks in 6 months.',
  },
  {
    slug: 'burnside-bathroom-leak-rebuild',
    title: 'Slow leak under tiles → full waterproof rebuild',
    subtitle: 'Membrane failure traced, floor cut, rebuilt to AS 3740.',
    trade: 'Bathroom',
    trades: ['Plumbing', 'Waterproofing', 'Tiling', 'Carpentry'],
    suburb: 'Burnside',
    duration: '7 working days',
    publishedAt: '2025-08-04',
    hero: '/stock/case-studies/burnside-bathroom-after.jpg',
    beforeAfter: {
      before: '/stock/case-studies/burnside-bathroom-before.jpg',
      after: '/stock/case-studies/burnside-bathroom-after.jpg',
    },
    body: `Owner had a damp patch in the hallway ceiling. Two prior plumbers chased the wrong stack. We pulled three tiles in the shower hob, found pinholing in the membrane, and traced water tracking back along the bearer.

Rebuild rather than patch: cut floor, replace one bearer, new sheet membrane with proper fall, full re-tile, new screen. Documented every layer with photos for the owner's insurer.`,
    outcome: 'Insurance claim accepted on first pass. Dry for 8 months running.',
    testimonial: {
      quote: 'Two plumbers missed it. Briks found it in an hour and rebuilt it properly.',
      author: 'Melissa T.',
      role: 'Homeowner, Burnside',
    },
  },
  {
    slug: 'norwood-end-of-lease-turnaround',
    title: 'End-of-lease turnaround in 5 days',
    subtitle: 'Patch, paint, regrout, replace fittings — re-let-ready.',
    trade: 'Maintenance',
    trades: ['Painting', 'Handyman', 'Tiling', 'Plumbing'],
    suburb: 'Norwood',
    duration: '5 working days',
    publishedAt: '2025-10-21',
    hero: '/stock/case-studies/norwood-eol-after.jpg',
    beforeAfter: {
      before: '/stock/case-studies/norwood-eol-before.jpg',
      after: '/stock/case-studies/norwood-eol-after.jpg',
    },
    body: `Property manager needed a 3-bed unit re-let-ready before the next inspection. Wall damage in two rooms, scuffed trim throughout, mildew in the wet areas, two leaking tap sets, broken blind.

One coordinator, four trades, single key handover. Daily photo update to the PM at 5pm so they could brief the owner without chasing.`,
    outcome: 'Listed Saturday, leased the following Wednesday. Zero owner queries.',
    testimonial: {
      quote: 'One contact, one invoice, photo updates daily. That is the whole pitch.',
      author: 'Sarah M.',
      role: 'Property Manager, Adelaide CBD',
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
