/**
 * Blog posts — long-form, SEO-optimised content.
 *
 * Each post follows ai-seo + copywriting principles:
 *  - definition block in first paragraph (extractable for AI Overviews)
 *  - H2/H3 headings phrased as queries
 *  - statistics + standards cited where possible (+37-40% citation boost)
 *  - FAQs answer long-tail questions
 *  - relatedTrades + relatedSuburbs build internal link clusters
 *  - "lastUpdated" surfaces freshness signal
 *
 * Body is structured (not free-form markdown) so we render without a parser.
 */

export type BlogBlock =
  | { type: 'p'; content: string }
  | { type: 'h2'; content: string; id?: string }
  | { type: 'h3'; content: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; content: string; cite?: string }
  | { type: 'callout'; title: string; body: string }

export type BlogFAQ = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string
  /** 40-60 char SEO description — for meta + OG. */
  description: string
  /** 1-line summary surfaced on index cards. */
  excerpt: string
  publishedAt: string
  updatedAt: string
  /** Reading time minutes — auto-calc done at render. */
  category:
    | 'Maintenance'
    | 'Renovation'
    | 'Compliance'
    | 'Property Management'
    | 'Trades Explained'
    | 'Heritage'
  primaryKeyword: string
  hero?: string
  body: BlogBlock[]
  faqs: BlogFAQ[]
  relatedTrades: string[]
  relatedSuburbs: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  // 1. HOT WATER REPAIR VS REPLACE
  {
    slug: 'hot-water-system-repair-vs-replace-adelaide',
    title: 'When to repair vs replace your hot water system in Adelaide',
    description:
      'Adelaide hot water systems last 8-15 years depending on type. Repair vs replace decision, gas vs electric vs heat pump, and what costs more over 10 years.',
    excerpt:
      'A 12-year-old gas storage unit leaking at the relief valve is almost always replace, not repair. Here is the honest decision tree.',
    publishedAt: '2026-04-12',
    updatedAt: '2026-05-08',
    category: 'Maintenance',
    primaryKeyword: 'hot water repair Adelaide',
    body: [
      {
        type: 'p',
        content:
          'A hot water system in Adelaide typically lasts 8-12 years for electric storage, 10-15 years for gas storage, 15-20 years for continuous-flow gas, and 12-15 years for heat pump units. The repair-vs-replace decision turns on three factors: age, fault type, and what the next 10 years of running costs look like.',
      },
      { type: 'h2', content: 'How long do hot water systems actually last in Adelaide?' },
      {
        type: 'p',
        content:
          'Adelaide\'s hard water (around 100-150 ppm hardness in mains supply) shortens electric storage tank life through scale buildup on the heating element. Coastal suburbs (Glenelg, Henley Beach, Brighton, Semaphore) see additional corrosion on outdoor-mounted units. The realistic lifespan ranges:',
      },
      {
        type: 'ul',
        items: [
          'Electric storage tank — 8-12 years (sacrificial anode replaced at year 5 extends to 14)',
          'Gas storage tank — 10-15 years (similar anode service window)',
          'Continuous-flow gas (instantaneous) — 15-20 years',
          'Heat pump — 12-15 years (compressor is the limiting factor)',
          'Solar hot water — 15-20 years on the panels, 10 years on the booster tank',
        ],
      },
      { type: 'h2', content: 'When repair makes sense' },
      {
        type: 'p',
        content:
          'Repair is the right call when the unit is under 8 years old, the fault is a single replaceable component, and parts cost less than 30% of replacement. Common repair-friendly faults:',
      },
      {
        type: 'ul',
        items: [
          'Failed thermostat or element on an electric unit (~$200-400 in parts)',
          'Faulty thermocouple or pilot assembly on gas storage',
          'Pressure-relief valve drip from valve fatigue (replaceable)',
          'Tempering valve failure (mandatory replacement, low cost)',
          'Sacrificial anode replacement (extends tank life by 5-7 years if done before year 7)',
        ],
      },
      { type: 'h2', content: 'When replace makes sense' },
      {
        type: 'p',
        content:
          'Replace when the tank itself has failed (rust-through, weeping seams, water around the base when no relief valve is dripping). Tank failure is terminal — no patching it.',
      },
      {
        type: 'ul',
        items: [
          'Tank visibly leaking from the body, not just the relief valve',
          'Unit over 12 years old AND a major fault has appeared',
          'Repair quote exceeds 40% of like-for-like replacement',
          'You\'re moving from gas storage to heat pump (efficiency upgrade payback under 5 years for households on solar)',
          'Continuous hot water reliability is critical (tenant property, business)',
        ],
      },
      { type: 'h2', content: 'Gas, electric, or heat pump for SA conditions?' },
      {
        type: 'p',
        content:
          'For Adelaide households with rooftop solar, heat pump electric is now the lowest 10-year running cost choice — typically 60-70% cheaper to run than gas storage when paired with daytime solar. Without solar, gas continuous-flow remains competitive on running cost. Pure electric storage is the most expensive to run and rarely the right new install in 2026.',
      },
      {
        type: 'callout',
        title: 'Replace before failure if you can',
        body: 'A planned replacement on a 12-year-old gas unit beats an emergency replacement at midnight on a Sunday. Most Briks plumbers carry common units in the truck — same-day swap-out is often possible if scoped during routine maintenance.',
      },
      { type: 'h2', content: 'What to expect from a replacement quote' },
      {
        type: 'p',
        content:
          'A proper hot water replacement quote covers: removal and disposal of old unit, supply of new unit, install (plumbing connections, gas if applicable, electrical if heat pump), commissioning, and lodgement of the certificate of compliance with the SA regulator. Anything missing from that list is missing from the job.',
      },
    ],
    faqs: [
      {
        q: 'How do I know if my hot water system is leaking from the tank?',
        a: 'A genuine tank leak shows as water under or around the base of the unit when no other valve (relief valve, tempering valve) is dripping. A small amount of water from the relief valve is normal during heating cycles; continuous water around the base is tank failure and means replacement.',
      },
      {
        q: 'Can I replace gas with electric or vice versa?',
        a: 'Yes — but it requires both a licensed plumber (PIC) and an A-grade electrician. Briks coordinates both under one job number so you get one written quote and one invoice. Switching from gas to heat-pump electric is the most common upgrade in Adelaide right now.',
      },
      {
        q: 'How long does a hot water replacement take?',
        a: 'A like-for-like swap (gas-to-gas or electric-to-electric in the same location) takes 3-4 hours. A type-change (gas to heat pump) typically takes a full day because it adds electrical work and condensate drainage.',
      },
      {
        q: 'Is a hot water tempering valve mandatory in SA?',
        a: 'Yes. Australian Standard AS 3500.4 requires that hot water delivered to bathroom and ensuite outlets does not exceed 50°C. A tempering valve at the outlet of the hot water unit is the standard compliance method and must be installed by a licensed plumber.',
      },
    ],
    relatedTrades: ['plumbing', 'gas', 'electrical'],
    relatedSuburbs: ['glenelg', 'norwood', 'burnside'],
  },

  // 2. END OF LEASE CHECKLIST FOR LANDLORDS
  {
    slug: 'end-of-lease-repair-checklist-sa-landlords',
    title: 'End-of-lease repair checklist for SA landlords',
    description:
      'A complete end-of-lease repair checklist for South Australian landlords. What\'s tenant responsibility vs landlord, photo evidence, and common bond-deduction items.',
    excerpt:
      'The wall holes are obvious. The mould in the cooktop extractor is not. Here is the full SA-compliant end-of-lease checklist — and the ten items that catch landlords out.',
    publishedAt: '2026-03-28',
    updatedAt: '2026-05-08',
    category: 'Property Management',
    primaryKeyword: 'end of lease repairs Adelaide',
    body: [
      {
        type: 'p',
        content:
          'In South Australia, end-of-lease repair responsibility splits between tenant make-good and landlord routine maintenance. The Residential Tenancies Act 1995 sets the line: tenants must return the property in the same condition as the entry condition report (fair wear and tear excepted), and landlords must keep the property in a reasonable state of repair throughout the tenancy.',
      },
      { type: 'h2', content: 'What counts as fair wear and tear in SA?' },
      {
        type: 'p',
        content:
          'Fair wear and tear is the gradual deterioration of a property from normal use over time. Examples include faded paintwork on walls exposed to direct sun, slight carpet flattening in walkways, and minor scuff marks at door handles. Damage from negligence, abuse, or accidents is not fair wear and tear and is the tenant\'s responsibility to repair.',
      },
      { type: 'h2', content: 'Tenant-responsibility checklist' },
      {
        type: 'ul',
        items: [
          'Wall holes from picture hooks, TV mounts, or shelves (tenant-installed)',
          'Stains on carpet, floors, or walls from spills, pet accidents, or smoke damage',
          'Damage to fly screens, blind cords, or curtain tracks',
          'Burnt or cracked benchtop from hot pans or knives',
          'Mould caused by tenant ventilation failure (e.g. blocked exhaust fans, no shower fan use)',
          'Garden overgrowth where the lease specified tenant maintenance',
          'Light bulbs blown during tenancy (tenant replaces)',
          'Fly screens torn, security door damage from tenant action',
        ],
      },
      { type: 'h2', content: 'Landlord-responsibility checklist' },
      {
        type: 'ul',
        items: [
          'Repaint where exit condition is general fade or wear (post-2 years tenancy)',
          'Hot water system end-of-life replacement',
          'Air conditioner servicing where last service is overdue',
          'Smoke alarm replacement (mandatory for hardwired and 10-year sealed-battery units)',
          'Roof leak repairs from age-related ridge cap failure or membrane fatigue',
          'Pest treatment except where tenant has caused infestation',
          'Stormwater clearing and gutter cleaning between tenancies',
          'Compliance items reaching their renewal cycle (RCD testing, smoke alarms)',
        ],
      },
      { type: 'h2', content: 'The ten items that catch SA landlords out' },
      {
        type: 'ol',
        items: [
          'Cooktop extractor fan filters and ducting — mould inside ducting is rarely the tenant\'s job to deep-clean',
          'Hot water tempering valve service — landlord obligation, often forgotten between tenancies',
          'Garage door springs and openers — wear-and-tear for the landlord',
          'Hardwired smoke alarms hitting their 10-year replacement date during a tenancy',
          'RCD (safety switch) testing — mandatory in SA rentals',
          'Pool fence compliance certificates renewing during tenancy',
          'Carpet steam clean as per lease wording — verify whether it is tenant exit or landlord responsibility',
          'Painted ceilings discoloured by gas heater fumes (heater is landlord plant)',
          'Garden taps and fittings reaching end of life — landlord plumbing',
          'Window flyscreens damaged by long-term sun rather than tenant action',
        ],
      },
      { type: 'h2', content: 'Photo evidence is the difference between bond returned and dispute' },
      {
        type: 'p',
        content:
          'For every end-of-lease repair, photograph: the issue from three angles, the surrounding context for scale, the tenant\'s entry condition report photo of the same area, and the post-repair result. Briks coordinators take and supply this set as standard for every end-of-lease job we run, packaged as a PDF for the property manager to forward to the bond office if needed.',
      },
      {
        type: 'callout',
        title: 'Brief the property manager early',
        body: 'Most bond disputes start because the property manager only sees the property at exit inspection. Briks runs a 5-day end-of-lease turnaround with daily photo updates so the PM can brief the owner without chasing — and the next tenant moves in without delay.',
      },
    ],
    faqs: [
      {
        q: 'Who pays for repainting at end of lease in SA?',
        a: 'In South Australia, repainting is generally the landlord\'s responsibility unless the tenant has caused damage beyond fair wear and tear. Smoke staining, deliberate marks, or unauthorised colour changes are tenant responsibility. General fade after 2+ years of occupancy is landlord responsibility.',
      },
      {
        q: 'Can a landlord deduct from bond for fair wear and tear?',
        a: 'No. The Residential Tenancies Act 1995 (SA) explicitly excludes fair wear and tear from tenant liability. Bond deductions for items covered by fair wear and tear are typically refused by Consumer and Business Services SA on dispute review.',
      },
      {
        q: 'How quickly can end-of-lease work be turned around?',
        a: 'Briks runs end-of-lease turnarounds in 5 working days for a standard 3-bedroom property — patch and paint, regrout where needed, fitting replacements, and one coordinated handover. Longer for properties with substantial damage or staged trade work.',
      },
      {
        q: 'Do I need photos for every end-of-lease repair?',
        a: 'For SA bond disputes, photo evidence of the original condition (from entry report), the damage at exit, and the post-repair state is the strongest defence. Briks supplies this as a packaged PDF for every end-of-lease job we coordinate.',
      },
    ],
    relatedTrades: ['painting', 'handyman', 'tiling', 'plumbing'],
    relatedSuburbs: ['norwood', 'glenelg', 'unley', 'prospect'],
  },

  // 3. BATHROOM RENO TIMELINE
  {
    slug: 'bathroom-renovation-timeline-adelaide',
    title: 'How long should a bathroom renovation take in Adelaide?',
    description:
      'A standard Adelaide bathroom renovation takes 2-3 weeks of trade work. Realistic day-by-day timeline, what slows projects down, and how to plan for one-bathroom homes.',
    excerpt:
      'A "two-week bathroom" rarely means two weeks of work. Here is the real Adelaide timeline — strip-out to handover — and the four common reasons it overruns.',
    publishedAt: '2026-04-02',
    updatedAt: '2026-05-08',
    category: 'Renovation',
    primaryKeyword: 'bathroom renovation Adelaide',
    body: [
      {
        type: 'p',
        content:
          'A standard Adelaide bathroom renovation — strip-out, plumbing rough-in, electrical, waterproofing, tiling, fit-off, and silicone — takes 12-15 working days for trades on-site. Including waterproofing membrane cure time, design lead, and fixture supply windows, the calendar timeline is typically 4-6 weeks from quote sign-off to handover.',
      },
      { type: 'h2', content: 'Day-by-day breakdown' },
      {
        type: 'h3',
        content: 'Days 1-2: Strip-out',
      },
      {
        type: 'p',
        content:
          'Demo of existing fittings, tiles, walls (where required), and waterproofing. Bin hire on-site. Existing plumbing and electrical isolated and capped. Sub-floor exposed and inspected for any rot or unexpected condition.',
      },
      {
        type: 'h3',
        content: 'Days 3-4: Plumbing + electrical rough-in',
      },
      {
        type: 'p',
        content:
          'New water and drainage runs, including any mixer relocation. Power, lighting, and exhaust fan circuits. Underfloor heating cable laid where specified. All licensed work signed off before substrate goes back on.',
      },
      {
        type: 'h3',
        content: 'Days 5-6: Substrate + waterproofing',
      },
      {
        type: 'p',
        content:
          'Cement sheet or Villaboard fixed to walls and floor. Bond-breaker tape at junctions. Waterproof membrane applied in two coats with 24-hour cure between. Photo-documented for the customer\'s records and the regulator.',
      },
      {
        type: 'h3',
        content: 'Days 7-10: Tiling',
      },
      {
        type: 'p',
        content:
          'Floor tiles first, then walls. Cuts around penetrations, niches, and fixings. Adhesive cure overnight before grout. Grout, clean, then 24-hour cure before any silicone or fitting work.',
      },
      {
        type: 'h3',
        content: 'Days 11-13: Fit-off + commissioning',
      },
      {
        type: 'p',
        content:
          'Plumbing fit-off (toilet, basin, mixer, shower, towel rails). Electrical fit-off (lights, fan, switch, GPOs). Glass screens fitted and siliconed. Final clean and water-test commissioning.',
      },
      {
        type: 'h3',
        content: 'Days 14-15: Defect rectify + handover',
      },
      {
        type: 'p',
        content:
          'Walk-through inspection with the customer. Defect list logged and addressed. Photo report and Certificates of Compliance handed over.',
      },
      { type: 'h2', content: 'Why bathroom renos overrun (and how to prevent it)' },
      {
        type: 'ol',
        items: [
          'Fixture supply delays — order tiles, vanities, and tapware before strip-out, not during. Custom items add 4-6 weeks lead time.',
          'Substrate surprises — rotted bearers, asbestos in old wall sheet, hidden plumbing layouts. Built into a Briks quote as a contingency line, not a billed extra.',
          'Trade sequencing handball — happens when each trade is hired separately. Briks runs everything under one coordinator so the next trade is ready when the previous one finishes.',
          'Council or strata sign-off lag — relevant for apartments and major renovations. Build into the calendar from day one.',
        ],
      },
      {
        type: 'callout',
        title: 'Single-bathroom households',
        body: 'For a one-bathroom home, plan a portable shower (gym membership, friend\'s house, on-site portable shower trailer hire) for days 7-13. The biggest source of frustration is not the build — it is two weeks of no shower in your own home.',
      },
    ],
    faqs: [
      {
        q: 'How much does a bathroom renovation cost in Adelaide?',
        a: 'Adelaide bathroom renovation cost depends on size, fixture spec, tile choice, and whether plumbing layout changes. Briks attends, scopes the work line-by-line, and quotes in writing — no per-square-metre estimating. Quotes are itemised so you can adjust spec to budget.',
      },
      {
        q: 'Do I need council approval for a bathroom renovation?',
        a: 'Most like-for-like bathroom renovations in SA do not require council development consent, but waterproofing must comply with AS 3740 and certificates of compliance must be lodged for plumbing and electrical work. Major changes (new wet area, structural alteration) may require consent.',
      },
      {
        q: 'Can I keep using my bathroom during the renovation?',
        a: 'No — once strip-out begins, the bathroom is unusable until tiling and fit-off complete (typically days 7-13 unusable). For one-bathroom homes, plan a portable shower or temporary alternative.',
      },
      {
        q: 'What is the longest part of a bathroom renovation?',
        a: 'Tiling typically takes the longest single block (3-4 days) because of cure times between adhesive and grout. Waterproofing cure time (24 hours per coat, 2 coats) also adds two days that look like "waiting" but are doing work.',
      },
    ],
    relatedTrades: ['tiling', 'plumbing', 'electrical', 'carpentry'],
    relatedSuburbs: ['burnside', 'glenelg', 'unley', 'prospect'],
  },

  // 4. KITCHEN REFIT QUOTE
  {
    slug: 'kitchen-refit-quote-adelaide',
    title: 'What\'s a fair quote for a kitchen refit in Adelaide?',
    description:
      'A fair Adelaide kitchen refit quote is itemised, includes contingency for substrate surprises, and matches scope to spec. Here is what to look for and what to refuse.',
    excerpt:
      'A one-line "kitchen refit — $35k" tells you nothing. Here is what an itemised, defensible Adelaide kitchen quote actually contains — and the four red flags that mean walk away.',
    publishedAt: '2026-03-15',
    updatedAt: '2026-05-08',
    category: 'Renovation',
    primaryKeyword: 'kitchen renovation Adelaide',
    body: [
      {
        type: 'p',
        content:
          'A fair Adelaide kitchen refit quote breaks the job into line items: demo, cabinetry, benchtop, splashback, plumbing, electrical, appliances (supply or PC sum), painting, and contingency. Each line should reflect real materials and labour at market rates — not a single bundled number that hides what you are paying for.',
      },
      { type: 'h2', content: 'What an itemised kitchen quote should include' },
      {
        type: 'ul',
        items: [
          'Demo and disposal — separate line, not folded into "labour"',
          'Cabinet carcasses — flat-pack vs custom-made, with brand and material specified',
          'Cabinet doors and hardware — soft-close runners, hinge brand, handle spec',
          'Benchtop — material (laminate, stone, composite), brand, slab count, edge profile',
          'Splashback — tile, glass, or stone with supply unit cost shown',
          'Plumbing — rough-in, fit-off, sink/tap supply (or PC sum)',
          'Electrical — circuits, GPOs, lighting, oven/cooktop hardwire',
          'Painting — wall and ceiling repaint after install',
          'Appliance supply — line items per appliance OR a PC sum if you supply',
          'Contingency — typically 8-12% for hidden substrate or service relocation',
        ],
      },
      { type: 'h2', content: 'Red flags in a kitchen refit quote' },
      {
        type: 'ol',
        items: [
          'A single bundled number with no breakdown — you cannot adjust spec to budget',
          'No contingency line — every kitchen refit hits at least one substrate surprise',
          'Verbal-only quote with text-message confirmations — disputes are unwinnable',
          'No payment schedule tied to milestones — full deposit upfront is rare in a fair quote',
        ],
      },
      { type: 'h2', content: 'How Briks quotes a kitchen refit' },
      {
        type: 'p',
        content:
          'A Briks coordinator attends, measures, photographs the existing kitchen, and discusses spec on-site. The quote comes back as a line-item PDF within 5 working days, with optional spec variations called out (laminate vs stone, flat-pack vs custom). You sign off on the version you want — no bait-and-switch on the second visit.',
      },
      { type: 'h2', content: 'Realistic Adelaide kitchen timeline' },
      {
        type: 'p',
        content:
          'A typical 3-trade kitchen refit (cabinetry, plumbing, electrical, painting) takes 3-4 weeks of trade work plus a 4-8 week supply lead for benchtops and custom cabinetry. From quote sign-off to completion: typically 8-12 weeks calendar time.',
      },
      {
        type: 'callout',
        title: 'Spec range honestly',
        body: 'A "mid-range" Adelaide kitchen with stone benchtop, mid-spec cabinetry, and quality appliances is a substantially different job from a "high-end" kitchen with custom joinery and premium appliances. Briks quotes both bands so you can choose with full information — not get nudged into the higher number after sign-off.',
      },
    ],
    faqs: [
      {
        q: 'How long does a kitchen refit take in Adelaide?',
        a: 'A standard 3-trade kitchen refit takes 3-4 weeks of on-site work plus 4-8 weeks of supply lead time for benchtops and custom cabinetry. Calendar time from quote sign-off is typically 8-12 weeks.',
      },
      {
        q: 'Can I keep using my kitchen during the refit?',
        a: 'During the cabinetry and benchtop install phase (typically week 2-3 of trades on-site), the kitchen is unusable. Plan a temporary microwave-and-bar-fridge setup in another room. Briks projects build this into the schedule with a "minimum-disruption" sequencing option where possible.',
      },
      {
        q: 'Do I need council approval for a kitchen renovation?',
        a: 'Most like-for-like kitchen renovations in SA do not require development consent, but plumbing, electrical, and gas work must be lodged with the regulator via Certificates of Compliance. Structural changes (removing a load-bearing wall, opening up to dining) typically require consent.',
      },
      {
        q: 'What is a PC sum in a kitchen quote?',
        a: 'A PC (Prime Cost) sum is an allowance in the quote for items the customer chooses later — typically appliances, tapware, and handles. The PC sum is replaced by the actual supplier invoice when items are selected. Useful when spec is undecided at quote stage.',
      },
    ],
    relatedTrades: ['carpentry', 'plumbing', 'electrical', 'tiling', 'painting'],
    relatedSuburbs: ['glenelg', 'norwood', 'unley', 'burnside'],
  },

  // 5. HERITAGE PLUMBING
  {
    slug: 'heritage-home-plumbing-adelaide-eastern-suburbs',
    title: 'Heritage home plumbing: what to expect in Adelaide\'s eastern suburbs',
    description:
      'Adelaide heritage plumbing — galvanised pipe replacement, lead pipe phase-out, terracotta drains. What 1900s-1930s eastern suburb plumbing actually looks like under the floor.',
    excerpt:
      'Galvanised, lead, copper, PVC, PEX. Adelaide heritage homes have layers of every era of pipe sitting under the floorboards — and they all fail differently.',
    publishedAt: '2026-02-20',
    updatedAt: '2026-05-08',
    category: 'Heritage',
    primaryKeyword: 'heritage plumbing Adelaide',
    body: [
      {
        type: 'p',
        content:
          'Adelaide eastern-suburb heritage homes — Norwood, Burnside, Toorak Gardens, Walkerville, Marryatville — typically have plumbing from at least three eras layered together. Original galvanised steel from 1900s-1930s, copper rough-in from 1950s-1970s renovation eras, and PVC or PEX patches added in the last 30 years. Each material fails differently, and a full-replumb decision needs to weigh all three.',
      },
      { type: 'h2', content: 'Galvanised steel — the original' },
      {
        type: 'p',
        content:
          'Galvanised steel pipe was standard in Adelaide residential plumbing from the 1880s through the 1960s. It corrodes from the inside out — internal scaling reduces pressure and water becomes brown or rusty after long sit periods. Failure point is typically 60-80 years from install. By 2026, virtually all original galvanised in heritage homes is at end-of-life.',
      },
      { type: 'h2', content: 'Lead — the phase-out' },
      {
        type: 'p',
        content:
          'Lead pipe was used for water service connections in Adelaide until the 1930s and for some interior runs into the 1950s. SA Water has a long-running program to replace lead service mains; private property lead is the homeowner\'s responsibility. If you have a heritage home with original service connection, get it tested.',
      },
      { type: 'h2', content: 'Copper — the workhorse' },
      {
        type: 'p',
        content:
          'Copper became standard in Adelaide from the 1950s and is still in widespread use. Failure modes: pinhole leaks from electrolysis where copper meets steel without dielectric union, and stress-cracking at fittings on unprotected runs. Lifespan: 50-70 years.',
      },
      { type: 'h2', content: 'PVC and PEX — the modern' },
      {
        type: 'p',
        content:
          'Modern heritage renovations typically use PEX for hot and cold water and PVC for drainage. Lifespan of modern PEX is rated at 50+ years, and it tolerates Adelaide\'s hard water far better than copper.',
      },
      { type: 'h2', content: 'Terracotta sewer drains — the classic Adelaide failure' },
      {
        type: 'p',
        content:
          'Original Adelaide sewer connections used vitrified clay (terracotta) pipe. Tree root infiltration through joint gaps is the classic failure — eastern-suburb plane and gum trees are notorious. Modern lining (CIPP — cured-in-place pipe) avoids excavation but is not always feasible. Excavation and replacement to PVC is common in major heritage renovations.',
      },
      { type: 'h2', content: 'When to replumb a heritage home' },
      {
        type: 'ul',
        items: [
          'Brown or rusty water on first draw after sit periods (galvanised internal corrosion)',
          'Pressure noticeably lower at upstairs taps than ground floor',
          'Repeated pinhole leaks across multiple locations',
          'Slow-draining sinks across multiple fixtures (likely main-line tree root issue)',
          'Major renovation work where walls and floors are open anyway — the marginal cost is much lower',
        ],
      },
      {
        type: 'callout',
        title: 'Replumb during reno, not after',
        body: 'The cost of a full replumb done during a major heritage renovation (when walls and floors are open) is typically 30-50% of the cost done as a standalone retrofit. If you are renovating a heritage home and the existing plumbing is mostly original, factor a replumb into the same project.',
      },
    ],
    faqs: [
      {
        q: 'How long do galvanised steel pipes last in Adelaide?',
        a: 'Galvanised steel water pipes typically last 60-80 years in Adelaide conditions. Hard water (high mineral content) and aggressive groundwater (older eastern-suburb properties) can shorten that to 50-60 years. By 2026, virtually all original galvanised in pre-1960s Adelaide homes is at end-of-life.',
      },
      {
        q: 'Should I be worried about lead pipes in my Adelaide heritage home?',
        a: 'If your heritage home has original water service connections from before the 1930s, there is a possibility of lead pipe. SA Water can advise on the public-side connection, but private property lead is the homeowner\'s responsibility. Briks plumbers can inspect and test where lead is suspected.',
      },
      {
        q: 'What does a full replumb cost for a heritage cottage?',
        a: 'Replumb cost depends on house size, accessibility (under-floor space), wall openings required, and whether the work is done during a major renovation or as a standalone retrofit. Briks scopes the work on-site and quotes line-by-line — no per-fixture estimating that misses the actual run lengths.',
      },
      {
        q: 'Can heritage council overlays affect plumbing work?',
        a: 'Heritage overlays in Adelaide eastern suburbs primarily affect external alterations (facades, roofing, fences). Internal plumbing replacement is generally unrestricted. External plumbing visible from the street (downpipes, vents) may be subject to material and colour requirements.',
      },
    ],
    relatedTrades: ['plumbing', 'gas', 'tiling'],
    relatedSuburbs: ['norwood', 'burnside', 'toorak-gardens', 'walkerville', 'marryatville'],
  },

  // 6. STORM DAMAGE INSURANCE
  {
    slug: 'storm-damage-repairs-adelaide-insurance-guide',
    title: 'Storm-damage repairs in Adelaide — what insurance covers',
    description:
      'Adelaide storm season runs winter to early spring. What home insurance typically covers, what triggers a claim, and how to document damage for a clean claim outcome.',
    excerpt:
      'Storm season in Adelaide hits hardest in June-August. The difference between a paid claim and a denied one is usually documentation in the first 24 hours.',
    publishedAt: '2026-04-18',
    updatedAt: '2026-05-08',
    category: 'Compliance',
    primaryKeyword: 'storm damage repair Adelaide',
    body: [
      {
        type: 'p',
        content:
          'Adelaide storm season runs from May through September, with the heaviest weather typically in June-August. Most home insurance policies cover storm damage as a defined event — wind, rain, hail, and lightning. Pre-existing wear that storm conditions exposed (e.g. an aged ridge cap that finally cracks in 80 km/h winds) is often the dispute point.',
      },
      { type: 'h2', content: 'What home insurance typically covers' },
      {
        type: 'ul',
        items: [
          'Roof damage from wind, hail, or fallen trees',
          'Water ingress from storm-driven rain through damaged roofing or windows',
          'Fence damage from wind, fallen trees, or projectiles',
          'Gutter and downpipe damage from hail or debris',
          'Internal water damage from a compromised roof or window',
          'Lightning strike damage to electrical systems and connected appliances',
          'Make-safe costs (tarps, temporary patching, urgent water diversion)',
        ],
      },
      { type: 'h2', content: 'What insurance often disputes' },
      {
        type: 'ul',
        items: [
          'Damage attributed to "wear and tear" — aged tiles or rusted gutters that finally failed',
          'Maintenance items overdue (uncleared gutters causing water ingress)',
          'Mould remediation where the cause is not directly storm-related',
          'Damage to garden, landscaping, and "outside the building" items (limits vary)',
          'Damage where no make-safe was actioned in a reasonable window',
        ],
      },
      { type: 'h2', content: 'The 24-hour documentation window' },
      {
        type: 'p',
        content:
          'In the first 24 hours after a storm, document everything before make-safe work alters the scene. Photos from multiple angles, video walk-through of affected areas, and a written description of what failed and what damage resulted. Briks roof and emergency response includes this documentation as standard — the insurer-ready PDF is in your inbox before the make-safe is finished.',
      },
      {
        type: 'callout',
        title: 'Make-safe is not the same as repair',
        body: 'Insurance covers make-safe (tarps, patching, water diversion) and full repair as separate stages. Approving make-safe early limits secondary damage and protects the claim. Full repair is scoped after the property is stable.',
      },
      { type: 'h2', content: 'How Briks handles a storm-damage call' },
      {
        type: 'ol',
        items: [
          'Initial call triaged within 60 minutes — make-safe dispatched same day',
          'Photo and video documentation captured before any patch work',
          'Written cause-and-effect summary supplied to the customer\'s insurer within 24 hours',
          'Full repair scope and quote provided once insurance approves',
          'Repair work coordinated under one project — roof, plumbing, painting, electrical as needed',
          'Final photo report and Certificates of Compliance supplied at handover',
        ],
      },
    ],
    faqs: [
      {
        q: 'How quickly should I call about storm damage?',
        a: 'Call as soon as the property is safe to inspect. Briks dispatches make-safe inside 60 minutes during storm events. Documentation in the first 24 hours protects the insurance claim — every hour the scene is altered (by you or weather) reduces the evidence available.',
      },
      {
        q: 'Will insurance cover gutter cleaning if storm damage was caused by overflow?',
        a: 'Generally no. Most policies exclude damage caused by maintenance failures, including blocked gutters causing water to back up under the roofline. Annual gutter cleaning (twice yearly for properties under heavy tree cover) is the recommended preventative.',
      },
      {
        q: 'Do I need three quotes for an insurance claim?',
        a: 'Some insurers require three quotes for damage above a certain threshold; others accept one quote from an approved contractor. Briks supplies an itemised insurance-ready quote with photo evidence as standard — most insurers accept it without an additional assessor visit.',
      },
      {
        q: 'What is "make-safe" and is it covered?',
        a: 'Make-safe is the temporary work done to prevent secondary damage — tarps over a hole in the roof, plywood over a broken window, water diversion. It is covered by most home policies as a separate line from full repair, and insurers generally expect it to be actioned promptly.',
      },
    ],
    relatedTrades: ['roofing', 'gutters', 'plumbing', 'electrical'],
    relatedSuburbs: ['glenelg', 'henley-beach', 'brighton', 'aldgate', 'mount-barker'],
  },

  // 7. PROPERTY MANAGER BRIEFING
  {
    slug: 'how-property-managers-should-brief-a-tradie',
    title: 'Property managers: how to brief a tradie so the job actually gets done',
    description:
      'A clear maintenance brief saves property managers hours per week. Six elements every brief should include, common omissions that cause callbacks, and a copy-paste template.',
    excerpt:
      'Half the calls a tradie attends fail because the brief was wrong. Here is how to write one that gets the job done first time.',
    publishedAt: '2026-03-08',
    updatedAt: '2026-05-08',
    category: 'Property Management',
    primaryKeyword: 'maintenance brief property manager',
    body: [
      {
        type: 'p',
        content:
          'A clear maintenance brief contains six elements: property address with access notes, tenant contact and availability, specific issue with photos, scope authority (fix-it-up-to vs report-only), budget cap or PO number, and reporting requirements. Missing any one usually means a second visit, a complaint, or both.',
      },
      { type: 'h2', content: 'The six elements every brief should have' },
      {
        type: 'h3',
        content: '1. Property address + access notes',
      },
      {
        type: 'p',
        content:
          'Full address including unit number. Key safe code, lockbox location, or garage code. Pet warnings. Whether the tradie can enter without the tenant home. Side gate access. Where to park (some Adelaide eastern-suburb streets have time-limited parking).',
      },
      {
        type: 'h3',
        content: '2. Tenant contact + availability',
      },
      {
        type: 'p',
        content:
          'Tenant name and mobile number. Best contact times. Any access conditions (kids napping until 2pm, dog must be put away). Whether the tenant has agreed to the visit window or whether the tradie needs to schedule directly.',
      },
      {
        type: 'h3',
        content: '3. Specific issue + photos',
      },
      {
        type: 'p',
        content:
          'A description of the issue from the tenant\'s words plus photos where possible. "Toilet leaking" is not a brief; "toilet cistern leaking from the inlet valve, water visible on bathroom floor, photo attached" is.',
      },
      {
        type: 'h3',
        content: '4. Scope authority',
      },
      {
        type: 'p',
        content:
          'How much can the tradie spend without coming back to you? "Fix on the spot up to $300, otherwise quote and report" is clear. "Just have a look" is not — the tradie has driven there for nothing if the fix is $50.',
      },
      {
        type: 'h3',
        content: '5. Budget cap or PO',
      },
      {
        type: 'p',
        content:
          'Either a dollar cap on the visit, or a purchase order number you can reconcile against. For Briks-coordinated jobs, the property manager gets a job number and one invoice at the end — no per-trade follow-ups.',
      },
      {
        type: 'h3',
        content: '6. Reporting requirements',
      },
      {
        type: 'p',
        content:
          'What does the property manager need at completion? Photos? Written summary? Certificate of compliance? Briks supplies a photo report with every job by default — but tell the coordinator if you need anything specific (e.g. the landlord\'s preferred format).',
      },
      { type: 'h2', content: 'Copy-paste brief template' },
      {
        type: 'callout',
        title: 'Standard maintenance brief',
        body: 'Property: [address + unit] | Access: [key safe / lockbox / tenant present] | Tenant: [name + mobile + best times] | Issue: [tenant words + photo] | Authority: fix on spot up to [$cap], quote-and-report above | PO: [number] | Report: photo + written summary on completion.',
      },
      { type: 'h2', content: 'How Briks handles property manager briefs' },
      {
        type: 'p',
        content:
          'Briks accepts briefs via Tapi, MaintenanceManager, email, or a custom portal. The coordinator reads the brief, confirms scope with the property manager if anything is missing, schedules with the tenant, and reports back with photos and written summary. One property manager touchpoint, one Briks coordinator, one job number — not five tradies and six emails.',
      },
    ],
    faqs: [
      {
        q: 'What is the most common reason maintenance jobs need a second visit?',
        a: 'Insufficient brief — the tradie attends, finds the issue is different from what was reported, and either has to leave to get parts or has to call the property manager for additional authority. Photos and a clear scope authority statement prevent most second visits.',
      },
      {
        q: 'How does Briks handle tenant access?',
        a: 'Briks coordinators schedule directly with tenants once the brief is approved. We supply the tradie\'s ETA, name, and contact to the tenant via SMS, and confirm access on the day. Property manager only hears from us if there\'s a problem to escalate.',
      },
      {
        q: 'What systems does Briks integrate with?',
        a: 'Briks accepts work orders via Tapi, MaintenanceManager, PropertyMe, REST Professional, and direct email. Most agencies stay in their existing system — Briks fits the workflow rather than imposing a new portal.',
      },
      {
        q: 'How fast does Briks respond to a property manager brief?',
        a: 'Briks acknowledges incoming briefs within business hours of receipt and books an attendance window inside 48 hours for routine work. Emergencies (active leak, no power, no hot water) are dispatched within 60 minutes inside the metro area.',
      },
    ],
    relatedTrades: ['handyman', 'plumbing', 'electrical', 'painting'],
    relatedSuburbs: ['adelaide-cbd', 'norwood', 'glenelg', 'prospect'],
  },

  // 8. GAS VS ELECTRIC HOT WATER
  {
    slug: 'gas-vs-electric-hot-water-sa',
    title: 'Gas vs electric hot water in Adelaide: which makes sense in 2026?',
    description:
      'Adelaide gas vs electric hot water comparison — heat pump efficiency, solar payback, running costs, and which type matches which household profile.',
    excerpt:
      'The answer used to be obvious: gas. With heat pump efficiency and rooftop solar, it\'s not obvious anymore. Here\'s the 10-year run-cost comparison.',
    publishedAt: '2026-02-08',
    updatedAt: '2026-05-08',
    category: 'Trades Explained',
    primaryKeyword: 'gas vs electric hot water Adelaide',
    body: [
      {
        type: 'p',
        content:
          'For Adelaide households in 2026, heat pump electric hot water paired with rooftop solar is now the lowest-running-cost option, typically 60-70% cheaper to run than gas storage when most heating happens during daytime solar hours. For households without solar, gas continuous-flow (instantaneous) remains competitive on running cost but loses on long-term capital — federal and state incentives heavily favour heat pump electric.',
      },
      { type: 'h2', content: 'Running cost — 10 year window' },
      {
        type: 'p',
        content:
          'For an average 2-3 person Adelaide household using ~150L hot water per day, the 10-year running cost ranking in 2026 is:',
      },
      {
        type: 'ol',
        items: [
          'Heat pump + solar: lowest running cost — most heating during daytime PV generation',
          'Heat pump grid-only: next — coefficient of performance (COP) of 3-4 means 3-4 units of heat per unit of electricity',
          'Gas continuous-flow: middle — efficient, predictable',
          'Gas storage: higher than continuous flow due to standing losses',
          'Electric storage off-peak: similar to gas storage in cost, simpler to install',
          'Electric storage continuous: highest — virtually never the right install in 2026',
        ],
      },
      { type: 'h2', content: 'Capital cost' },
      {
        type: 'p',
        content:
          'Heat pump electric units have higher upfront capital than gas storage but Australian and SA government rebates (Small-scale Technology Certificates and the SA Hot Water Rebate program where applicable) typically offset 30-50% of the unit cost. Net capital is comparable or favourable to gas continuous-flow installation for most households.',
      },
      { type: 'h2', content: 'Practical considerations' },
      {
        type: 'ul',
        items: [
          'Heat pump units need outdoor placement with airflow and condensate drainage — most Adelaide homes have suitable space',
          'Heat pump units make a fan/compressor noise (typically 40-50 dB at 1m) — placement near bedroom windows is poor',
          'Gas continuous-flow needs a connected gas line — switching from electric to gas adds significant capital cost',
          'Switching from gas to heat pump is the most common upgrade path in Adelaide right now',
          'Heat pump units have a larger physical footprint than equivalent-capacity gas storage',
        ],
      },
      { type: 'h2', content: 'Which household profile fits which type?' },
      {
        type: 'h3',
        content: 'Heat pump electric (with solar)',
      },
      {
        type: 'p',
        content:
          'Best for: owner-occupied homes with rooftop solar, families of 2-5 people, suburbs with reliable grid connection, customers planning to stay 5+ years to capture the running cost payback.',
      },
      {
        type: 'h3',
        content: 'Gas continuous-flow',
      },
      {
        type: 'p',
        content:
          'Best for: homes already on natural gas, larger households (5+ people), heritage homes where outdoor heat pump placement is constrained, properties without solar where heat pump electric capital is harder to justify.',
      },
      {
        type: 'h3',
        content: 'Gas storage',
      },
      {
        type: 'p',
        content:
          'Best for: like-for-like replacement only when capital is constrained and the existing gas connection is in place. Increasingly rare new install in 2026 — continuous-flow has overtaken it on most metrics.',
      },
      {
        type: 'callout',
        title: 'Get the load profile right',
        body: 'A 270L heat pump unit on a 5-person household will run out during back-to-back morning showers. A 200L unit on a 2-person household has wasted capital. Briks plumbers size on actual household use, not floor area.',
      },
    ],
    faqs: [
      {
        q: 'How much does a heat pump hot water system cost to install in Adelaide?',
        a: 'Heat pump installation cost includes the unit (typically $3,000-5,000), plumbing connection, electrical connection, condensate drainage, and Certificate of Compliance lodgement. Federal and state rebates often offset 30-50% of the unit cost. Briks quotes line-by-line including rebate paperwork.',
      },
      {
        q: 'Is a heat pump hot water system noisy?',
        a: 'Heat pump units run a fan and compressor — typical noise levels are 40-50 dB at 1m, comparable to a quiet split-system air conditioner. Placement matters — avoid mounting close to bedroom windows or outdoor entertaining areas.',
      },
      {
        q: 'Can I run a heat pump from my existing solar?',
        a: 'Yes. Heat pump units typically draw 0.5-1.5 kW during operation, comfortably within the export of most rooftop solar systems. A timer set to operate during daytime solar hours captures the largest running cost saving.',
      },
      {
        q: 'How long does a heat pump hot water system last in Adelaide?',
        a: 'Heat pump hot water units typically last 12-15 years in Adelaide conditions. The compressor is the limiting component. Sacrificial anode replacement at year 5-7 extends tank life similar to a conventional storage unit.',
      },
    ],
    relatedTrades: ['plumbing', 'gas', 'electrical'],
    relatedSuburbs: ['glenelg', 'norwood', 'mawson-lakes', 'greenwith'],
  },

  // 9. COMMERCIAL FIT-OUT
  {
    slug: 'commercial-fit-out-timeline-adelaide',
    title: 'Commercial fit-out timeline: from key handover to first trade',
    description:
      'Adelaide commercial fit-out timeline — typical 8-week build, what happens in each phase, and the four common bottlenecks that delay openings.',
    excerpt:
      'A commercial fit-out runs faster than residential, but the timeline is unforgiving. Here is the realistic Adelaide retail/cafe/office fit-out plan.',
    publishedAt: '2026-01-22',
    updatedAt: '2026-05-08',
    category: 'Renovation',
    primaryKeyword: 'commercial fit-out Adelaide',
    body: [
      {
        type: 'p',
        content:
          'A standard Adelaide retail or cafe fit-out from key handover to first trade typically takes 6-10 weeks. Office fit-outs in commercial buildings follow a similar window but spend more time on services rough-in. Adelaide CBD heritage shopfronts add 2-4 weeks for council and heritage approvals.',
      },
      { type: 'h2', content: 'Week 1-2: Pre-construction' },
      {
        type: 'p',
        content:
          'Final design lock-down. Build sequence agreed with all trades. Council development consent confirmed. Building consent lodged where required. Long-lead items (custom joinery, commercial appliances, refrigeration) ordered.',
      },
      { type: 'h2', content: 'Week 3-4: Strip-out + services rough-in' },
      {
        type: 'p',
        content:
          'Demo of existing fittings. Floor leveling and substrate prep. Plumbing, electrical, and HVAC rough-in. Data and security cabling. Compliance items (sprinkler upgrades, exit signs, emergency lighting) addressed early.',
      },
      { type: 'h2', content: 'Week 5-6: Build + finishes' },
      {
        type: 'p',
        content:
          'Wall construction and partitioning. Joinery install (counter, cabinetry, fixtures). Tiling, flooring, and painting. Glazing where required.',
      },
      { type: 'h2', content: 'Week 7-8: Fit-off + sign-off' },
      {
        type: 'p',
        content:
          'Final fixture install. Refrigeration commissioning for cafes/restaurants. Electrical and plumbing fit-off and Certificates of Compliance. Council final inspection. Cleaning and handover.',
      },
      { type: 'h2', content: 'The four bottlenecks that delay Adelaide fit-outs' },
      {
        type: 'ol',
        items: [
          'Council development consent — application errors and incomplete submissions add 2-4 weeks. Use a consultant who knows the council, especially for heritage shopfronts',
          'Long-lead joinery — custom counters and cabinetry can take 6-8 weeks. Order before strip-out, not during',
          'Trade sequencing failures when each trade is hired separately — Briks runs everything under one coordinator',
          'Compliance discovery during build — sprinkler upgrades, fire-rated glazing, accessibility ramps. Pre-construction audit catches these before they become urgent',
        ],
      },
      {
        type: 'callout',
        title: 'Lock the opening date last',
        body: 'Setting a hard public opening date before pre-construction is the most common cause of stress in Adelaide fit-outs. Set a target window in pre-construction, lock the date once services are roughed in and the build path is clear.',
      },
    ],
    faqs: [
      {
        q: 'Do I need council approval for a commercial fit-out in Adelaide?',
        a: 'Most commercial fit-outs require development consent from the local council, especially when changing use or affecting external appearance. CBD heritage zones add a heritage approval step. Internal-only fit-outs that do not change use may qualify for exempt development.',
      },
      {
        q: 'Can a fit-out run while the previous tenant is still in lease?',
        a: 'Generally no — most commercial leases require possession of the premises before any works commence. Some leases include a fit-out period at lease start during which rent is abated. Negotiate this at lease signing, not after.',
      },
      {
        q: 'How does a commercial fit-out differ from residential renovation?',
        a: 'Commercial work has stricter compliance — fire ratings, exit signage, accessibility, sprinkler upgrades, commercial-grade services capacity. Inspection regimes are more frequent, and certificates of occupancy are required before opening. The work is faster but less forgiving.',
      },
      {
        q: 'Who manages the trades on a commercial fit-out?',
        a: 'Briks coordinates all trades under one project manager — plumbing, electrical, HVAC, joinery, painting, tiling, flooring. The customer (tenant or fit-out designer) deals with one point of contact, signs off one quote, and receives one invoice. No trade-by-trade chasing.',
      },
    ],
    relatedTrades: ['carpentry', 'electrical', 'plumbing', 'hvac', 'painting'],
    relatedSuburbs: ['adelaide-cbd', 'norwood', 'glenelg', 'kent-town'],
  },

  // 10. SHOWER LEAK
  {
    slug: 'why-shower-leaks-after-retiling',
    title: 'Why your shower leaks 6 months after re-tiling (and how to avoid it)',
    description:
      'Most shower leaks after re-tiling are membrane failures, not tile or grout issues. Common AS 3740 mistakes, how to verify a real waterproofer, and what to demand on the next job.',
    excerpt:
      'The tiles look perfect. The grout is clean. And the bedroom ceiling is staining. Six common waterproofing failures — and how to avoid them.',
    publishedAt: '2026-03-04',
    updatedAt: '2026-05-08',
    category: 'Trades Explained',
    primaryKeyword: 'shower leak after retile',
    body: [
      {
        type: 'p',
        content:
          'When a shower leaks within 6-24 months of a re-tile, the cause is almost always waterproofing membrane failure rather than a tile or grout problem. Australian Standard AS 3740 specifies how wet-area waterproofing must be installed, but real-world compliance is patchy — and the consequences only show up months later when the membrane fails under pressure.',
      },
      { type: 'h2', content: 'Why grout is rarely the actual leak' },
      {
        type: 'p',
        content:
          'Cement-based grout is not waterproof and never has been. AS 3740 treats grout as decorative and moisture-tolerant, not as a barrier. The waterproofing membrane underneath the tiles is the actual barrier — and if it has failed, no amount of regrouting fixes the leak. Regrouting a leaking shower is a temporary cosmetic fix, not a repair.',
      },
      { type: 'h2', content: 'Six common waterproofing failures' },
      {
        type: 'h3',
        content: '1. Membrane not turned up the wall to required height',
      },
      {
        type: 'p',
        content:
          'AS 3740 requires the waterproofing membrane to extend at least 100mm above the finished floor inside the shower enclosure (and higher in some configurations). If the membrane stops at floor level, water that gets behind tiles tracks under the wall.',
      },
      {
        type: 'h3',
        content: '2. No membrane at the hob junction',
      },
      {
        type: 'p',
        content:
          'The shower hob (the lip at the entrance) is the highest-risk failure point. Water sits there longest, expansion-contraction cycles are highest, and many tilers skip the bond-breaker tape that AS 3740 requires at this junction.',
      },
      {
        type: 'h3',
        content: '3. Membrane punctured by tile fixings',
      },
      {
        type: 'p',
        content:
          'Some installers fix tile-to-substrate after the membrane is applied without realising the fixings have punctured it. Each puncture is a leak point. The fix is a substrate-fix-then-membrane sequence, never the other way around.',
      },
      {
        type: 'h3',
        content: '4. No bond-breaker tape at junctions',
      },
      {
        type: 'p',
        content:
          'Wall-to-floor junctions and around penetrations need bond-breaker tape so the membrane can flex with substrate movement. Without it, the membrane cracks at junction lines as the building moves and water finds the crack.',
      },
      {
        type: 'h3',
        content: '5. Insufficient membrane thickness',
      },
      {
        type: 'p',
        content:
          'Liquid membranes need two coats minimum, with the first fully cured before the second. Thin single-coat application is a common shortcut and the membrane fails inside 12 months.',
      },
      {
        type: 'h3',
        content: '6. No membrane installed at all',
      },
      {
        type: 'p',
        content:
          'On older homes (pre-2000s), original showers often have no waterproof membrane underneath the tiles — the tiles and grout were the waterproofing. A re-tile that does not strip back to the substrate and apply a membrane is just covering up the original failure.',
      },
      { type: 'h2', content: 'How to verify a real waterproofer' },
      {
        type: 'ul',
        items: [
          'Ask for a current waterproofing certificate (separate from a tiling Cert III)',
          'Ask for photos of the membrane application from previous jobs',
          'Confirm two coats of liquid membrane (not just one) in the quote',
          'Confirm bond-breaker tape application is included',
          'Ask for a 10-year workmanship warranty in writing',
          'Walk away if the quote is "too good to be true" — proper waterproofing is labour-intensive',
        ],
      },
      {
        type: 'callout',
        title: 'Briks documents every layer',
        body: 'Briks tilers photograph the membrane application at every stage — bond-breaker tape, first coat, cure, second coat, cure. The customer gets the photo set with the invoice. If a leak appears later, we have evidence the work was done correctly — and a clean basis for warranty action.',
      },
    ],
    faqs: [
      {
        q: 'Can a leaking shower be fixed without a full retile?',
        a: 'Sometimes. If the leak is localised to a corner or hob, a targeted strip-and-rebuild of that section is feasible. If the leak is spreading or shows signs of widespread membrane failure, a full strip-and-retile is the only durable fix.',
      },
      {
        q: 'How can I tell if the membrane has failed?',
        a: 'Look for: water staining on ceilings of rooms below the bathroom, damp patches in walls adjacent to the shower, mould reappearing fast after cleaning, or grout discolouration that follows pattern lines (suggesting movement). A moisture meter check by a Briks tiler confirms it.',
      },
      {
        q: 'Is shower waterproofing covered by home insurance?',
        a: 'Damage caused by a leaking shower is usually covered, but the repair of the original waterproofing failure is typically excluded as a maintenance issue. Resulting damage to ceilings, walls, and floors below the shower is the insurable component.',
      },
      {
        q: 'How long should waterproofing last?',
        a: 'A correctly installed waterproofing membrane to AS 3740 should last 20-25 years minimum. If a shower starts leaking inside 5 years, the install was almost certainly non-compliant — and the original installer should be held to their workmanship warranty.',
      },
    ],
    relatedTrades: ['tiling', 'plumbing', 'painting'],
    relatedSuburbs: ['burnside', 'norwood', 'glenelg', 'unley'],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

/**
 * Estimate reading time from body blocks. ~200 wpm.
 */
export function readingTimeMinutes(post: BlogPost): number {
  const words = post.body.reduce((acc, b) => {
    if (b.type === 'p' || b.type === 'h2' || b.type === 'h3' || b.type === 'quote') {
      return acc + b.content.split(/\s+/).length
    }
    if (b.type === 'callout') return acc + (b.title + ' ' + b.body).split(/\s+/).length
    if (b.type === 'ul' || b.type === 'ol') return acc + b.items.join(' ').split(/\s+/).length
    return acc
  }, 0)
  return Math.max(3, Math.round(words / 200))
}
