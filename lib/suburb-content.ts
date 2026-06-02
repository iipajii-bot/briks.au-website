/**
 * Per-suburb content for /areas/[slug] programmatic SEO pages.
 *
 * Anti-thin-content strategy (per programmatic-seo skill):
 *  - profile: shared structural skeleton across similar suburbs
 *  - character: hand-written 1-2 sentence specific to *this* suburb
 *  - jobLean: which trades surface most often in this suburb's housing stock
 *  - commonIssues: 2-3 issues specific to the era/build type
 *  - nearby: cross-link cluster (avoids orphan pages, builds hub-and-spoke)
 *
 * Each page derives 6+ unique content blocks from these inputs, so even with
 * a shared template, no two pages read alike.
 */

export type SuburbProfile =
  | 'cbd-inner' // CBD apartment + townhouse mix
  | 'heritage-east' // 1900s-1930s solid stone heritage
  | 'beach-west' // 1960s-2000s coastal residential
  | 'new-build-north' // 1990s-2020s newer estates
  | 'established-south' // mixed 1960s-1990s suburban
  | 'hills' // larger blocks, older builds, rural-fringe
  | 'industrial-mix' // mixed residential/light commercial

export type SuburbContent = {
  slug: string
  name: string
  region: string
  profile: SuburbProfile
  postcode?: string
  /** 1-2 sentence character paragraph — hand-written, unique per suburb. */
  character: string
  /** Trade slugs (from lib/trades.ts) ordered by demand frequency. */
  jobLean: string[]
  /** 2-3 issues specific to this suburb's housing era/type. */
  commonIssues: string[]
  /** Slugs of nearby suburbs for cross-linking. */
  nearby: string[]
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/cbd/g, 'cbd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Helper for profile-based defaults — hand-overridden per suburb in CONTENT below.
const DEFAULTS: Record<SuburbProfile, { jobLean: string[]; commonIssues: string[] }> = {
  'cbd-inner': {
    jobLean: ['plumbing', 'electrical', 'painting', 'tiling', 'handyman'],
    commonIssues: [
      'Apartment bathroom membrane failures and waterproofing leaks between levels',
      'Strata-coordinated electrical and plumbing work requiring after-hours scheduling',
      'Heritage shopfront fit-outs in CBD commercial mixed with residential above',
    ],
  },
  'heritage-east': {
    jobLean: ['plumbing', 'roofing', 'painting', 'carpentry', 'tiling'],
    commonIssues: [
      'Original cement-bedded ridge caps cracking — re-pointing every 25-30 years',
      'Galvanised plumbing reaching end of life — full replumb common in 1920s homes',
      'Lead paint in pre-1970 weatherboard requiring encapsulation before repaint',
    ],
  },
  'beach-west': {
    jobLean: ['roofing', 'gutters', 'painting', 'hvac', 'plumbing'],
    commonIssues: [
      'Salt-corroded Colorbond and metal flashings — coastal exposure shortens lifespan',
      'Storm and wind damage — west-facing facades take the brunt of seabreeze and gale',
      'Reverse-cycle AC condenser corrosion from salt-laden air',
    ],
  },
  'new-build-north': {
    jobLean: ['hvac', 'electrical', 'handyman', 'plumbing', 'painting'],
    commonIssues: [
      'Reverse-cycle AC sizing wrong for double-storey new builds — uneven cooling',
      'Builder-grade fittings reaching warranty cliff at 5-7 years',
      'Solar inverter and meter-board issues on heavily PV-equipped homes',
    ],
  },
  'established-south': {
    jobLean: ['plumbing', 'roofing', 'painting', 'tiling', 'electrical'],
    commonIssues: [
      'Ceramic-fuse switchboards still common in 1960s-1970s housing — fire risk',
      'Original-spec brick veneer with deteriorating mortar in chimneys and parapets',
      'Hot water systems past replacement age in long-held family homes',
    ],
  },
  hills: {
    jobLean: ['roofing', 'gutters', 'plumbing', 'electrical', 'painting'],
    commonIssues: [
      'Bushfire-zone compliance for re-roofs and ember-guard gutter retrofits',
      'Tank water and septic systems requiring specialist plumbing',
      'Larger-block downpipe and stormwater dispersal across rural-fringe blocks',
    ],
  },
  'industrial-mix': {
    jobLean: ['electrical', 'plumbing', 'carpentry', 'painting', 'handyman'],
    commonIssues: [
      'Mixed residential-light-commercial zoning requiring different compliance approach',
      'Older rendered facades with structural cracking from soil movement',
      'Three-phase electrical demand from home workshops and small businesses',
    ],
  },
}

const RAW: Array<{
  name: string
  region: string
  profile: SuburbProfile
  postcode?: string
  character: string
  nearby: string[]
  jobLean?: string[]
  commonIssues?: string[]
}> = [
  // ===== CBD + INNER =====
  {
    name: 'Adelaide CBD',
    region: 'CBD + Inner',
    profile: 'cbd-inner',
    postcode: '5000',
    character:
      'High-rise apartments, heritage shopfronts, and student towers crammed into the city grid. Most jobs are after-hours strata work, retail fit-outs, or apartment leak chasing across multiple floors.',
    nearby: ['north-adelaide', 'kent-town', 'stepney', 'parkside'],
  },
  {
    name: 'North Adelaide',
    region: 'CBD + Inner',
    profile: 'heritage-east',
    postcode: '5006',
    character:
      'Bluestone Victorian terraces, mansion-row sandstone, and heritage commercial along O\'Connell Street. The local council protects facade detail aggressively — repairs need profile-matched materials and council-aware scoping.',
    nearby: ['adelaide-cbd', 'walkerville', 'prospect', 'kent-town'],
  },
  {
    name: 'Norwood',
    region: 'CBD + Inner',
    profile: 'heritage-east',
    postcode: '5067',
    character:
      'Inner-east heritage with The Parade as the spine — bluestone cottages, semi-detached villas, and converted commercial. Renovation work dominates the bench here.',
    nearby: ['kent-town', 'stepney', 'magill', 'glenside'],
  },
  {
    name: 'Kent Town',
    region: 'CBD + Inner',
    profile: 'industrial-mix',
    postcode: '5067',
    character:
      'Converted warehouses, light industrial, and pockets of high-density residential. Adaptive reuse fit-outs and heritage-industrial repairs are the regular work.',
    nearby: ['adelaide-cbd', 'norwood', 'stepney', 'eastwood'],
  },
  {
    name: 'Stepney',
    region: 'CBD + Inner',
    profile: 'industrial-mix',
    postcode: '5069',
    character:
      'Tight inner-east block with old workshops being converted to townhouses. Mixed-use zoning means jobs swing between residential and small-commercial scope.',
    nearby: ['norwood', 'kent-town', 'maylands', 'st-peters'],
  },
  {
    name: 'Glenside',
    region: 'CBD + Inner',
    profile: 'heritage-east',
    postcode: '5065',
    character:
      'Quiet established east — interwar bungalows, mature gardens, and a tight grid of leafy streets. Maintenance and reno work skew toward heritage care.',
    nearby: ['norwood', 'glenunga', 'toorak-gardens', 'parkside'],
  },
  {
    name: 'Parkside',
    region: 'CBD + Inner',
    profile: 'heritage-east',
    postcode: '5063',
    character:
      'Inner-south heritage cottages and post-war infill. Walkable to the CBD, dense block sizes, and constant turnover of small reno jobs.',
    nearby: ['adelaide-cbd', 'unley', 'eastwood', 'glenside'],
  },
  {
    name: 'Eastwood',
    region: 'CBD + Inner',
    profile: 'heritage-east',
    postcode: '5063',
    character:
      'Tight inner-south footprint of bluestone semis and 1920s bungalows backing onto Glen Osmond Road. End-of-lease and routine maintenance dominate.',
    nearby: ['parkside', 'unley', 'glenside', 'norwood'],
  },

  // ===== EAST =====
  {
    name: 'Magill',
    region: 'East',
    profile: 'established-south',
    postcode: '5072',
    character:
      'Long ribbon along Magill Road from inner-east to foothill. Mix of 1950s brick veneer and original 1920s stone — broad price range and broad job mix.',
    nearby: ['burnside', 'beulah-park', 'norwood', 'rosslyn-park'],
  },
  {
    name: 'Burnside',
    region: 'East',
    profile: 'heritage-east',
    postcode: '5066',
    character:
      'Premium eastern suburb with sandstone villas, mature plane-tree streets, and heritage council overlays. Insurance work and high-spec renovation are the standout categories.',
    nearby: ['glenunga', 'toorak-gardens', 'erindale', 'rosslyn-park'],
  },
  {
    name: 'Beulah Park',
    region: 'East',
    profile: 'heritage-east',
    postcode: '5067',
    character:
      'Compact heritage pocket between Norwood and Burnside — character cottages and the Beulah Park railway line legacy. Renovation and end-of-lease work are constant.',
    nearby: ['norwood', 'magill', 'erindale', 'marryatville'],
  },
  {
    name: 'Glenunga',
    region: 'East',
    profile: 'heritage-east',
    postcode: '5064',
    character:
      'Quiet residential east anchored by Glenunga International School. Bungalow-era stock with steady kitchen and bathroom renovation work.',
    nearby: ['burnside', 'glenside', 'toorak-gardens', 'wattle-park'],
  },
  {
    name: 'Toorak Gardens',
    region: 'East',
    profile: 'heritage-east',
    postcode: '5065',
    character:
      'Premium east-side enclave of large interwar villas and mature gardens. Heritage-respect renovation is the norm — large jobs run multi-trade for weeks.',
    nearby: ['burnside', 'glenside', 'glenunga', 'beulah-park'],
  },
  {
    name: 'Marryatville',
    region: 'East',
    profile: 'heritage-east',
    postcode: '5068',
    character:
      'Wedge of established east bordered by The Parade and Kensington Road. Tight leafy streets, big trees, and bungalow stock — high reno demand.',
    nearby: ['beulah-park', 'norwood', 'erindale', 'kensington'],
  },
  {
    name: 'Erindale',
    region: 'East',
    profile: 'established-south',
    postcode: '5066',
    character:
      'Quiet pocket east of Burnside — mid-century brick veneer and infill townhouses. Routine maintenance, hot-water swap-outs, and AC retrofits dominate.',
    nearby: ['burnside', 'magill', 'rosslyn-park', 'beulah-park'],
  },
  {
    name: 'Rosslyn Park',
    region: 'East',
    profile: 'established-south',
    postcode: '5072',
    character:
      'Foothill-edge east with split levels and sloping blocks. Drainage, retaining, and roof-line work surface more often than in flatter eastern suburbs.',
    nearby: ['magill', 'burnside', 'erindale', 'wattle-park'],
  },

  // ===== WEST + COAST =====
  {
    name: 'Hindmarsh',
    region: 'West + Coast',
    profile: 'industrial-mix',
    postcode: '5007',
    character:
      'Inner-west blend of converted warehouses, brewery sites, and original cottages. Adaptive-reuse fit-outs and warehouse-to-loft conversions are common briefs.',
    nearby: ['adelaide-cbd', 'thebarton', 'bowden', 'west-hindmarsh'],
  },
  {
    name: 'Henley Beach',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5022',
    character:
      'Coastal residential with the Esplanade frontage and tightly held heritage stock backing onto Military Road. Salt corrosion and storm-prep work define the routine.',
    nearby: ['grange', 'west-beach', 'fulham', 'glenelg'],
  },
  {
    name: 'Glenelg',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5045',
    character:
      'High-density coastal — apartments, holiday rentals, and 1900s seaside cottages. Investor and short-stay turnaround work runs all year, alongside salt-driven exterior repairs.',
    nearby: ['brighton', 'west-beach', 'somerton-park', 'morphettville'],
  },
  {
    name: 'Brighton',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5048',
    character:
      'Family beach suburb with original 1960s brick veneer and progressive coastal infill. Roof restoration and gutter replacement are the standout categories.',
    nearby: ['glenelg', 'seacliff', 'somerton-park', 'hove'],
  },
  {
    name: 'Seacliff',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5049',
    character:
      'Cliff-edge southern coastal stretch with mid-century homes and weatherboard cottages. Westerly weather load drives constant exterior maintenance.',
    nearby: ['brighton', 'kingston-park', 'marino', 'hallett-cove'],
  },
  {
    name: 'West Beach',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5024',
    character:
      'Beachfront west with airport-adjacent residential and a mix of 1970s family homes and modern infill. Salt and aircraft-noise glazing replacements both feature.',
    nearby: ['henley-beach', 'glenelg', 'fulham', 'lockleys'],
  },
  {
    name: 'Grange',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5022',
    character:
      'Esplanade north of Henley with quiet residential streets. Heritage cottages, sand-blown roofs, and constant exterior repaints.',
    nearby: ['henley-beach', 'tennyson', 'west-lakes', 'fulham'],
  },
  {
    name: 'Semaphore',
    region: 'West + Coast',
    profile: 'beach-west',
    postcode: '5019',
    character:
      'Heritage seaside village north of the Port — Federation cottages, weatherboard fronts, and a working-class repair tradition. Coastal-exposure work dominates.',
    nearby: ['largs-bay', 'port-adelaide', 'taperoo', 'ethelton'],
  },

  // ===== SOUTH =====
  {
    name: 'Unley',
    region: 'South',
    profile: 'heritage-east',
    postcode: '5061',
    character:
      'Inner-south heritage spine along Unley Road — bluestone semis, character bungalows, and tight-grid streets. Renovation work is relentless.',
    nearby: ['parkside', 'mitcham', 'eastwood', 'glandore'],
  },
  {
    name: 'Mitcham',
    region: 'South',
    profile: 'heritage-east',
    postcode: '5062',
    character:
      'Foothill-edge south with sandstone villas and craftsman bungalows. Retaining walls, sloping-block drainage, and heritage roof work feature heavily.',
    nearby: ['unley', 'blackwood', 'belair', 'bedford-park'],
  },
  {
    name: 'Blackwood',
    region: 'South',
    profile: 'hills',
    postcode: '5051',
    character:
      'Hills-foothill suburb with bushfire-zone compliance overlays and large established blocks. Re-roof and gutter work is the regular call.',
    nearby: ['mitcham', 'belair', 'aldgate', 'flagstaff-hill'],
  },
  {
    name: 'Bedford Park',
    region: 'South',
    profile: 'established-south',
    postcode: '5042',
    character:
      'Flinders University catchment — student rentals, post-war brick veneer, and a constant churn of end-of-lease and bond-prep jobs.',
    nearby: ['mitcham', 'marion', 'seacombe-gardens', 'tonsley'],
  },
  {
    name: 'Marion',
    region: 'South',
    profile: 'established-south',
    postcode: '5043',
    character:
      'Centred on Westfield Marion — 1960s-1970s brick veneer with progressive infill. AC retrofits, switchboard upgrades, and bathroom renovations dominate.',
    nearby: ['bedford-park', 'oaklands-park', 'mitchell-park', 'morphettville'],
  },
  {
    name: 'Aberfoyle Park',
    region: 'South',
    profile: 'new-build-north',
    postcode: '5159',
    character:
      'Outer-south estate suburb of late-1980s through 2000s family homes. Builder-grade fittings reaching end-of-life — common-as-mud water heater swaps.',
    nearby: ['flagstaff-hill', 'happy-valley', 'reynella', 'morphett-vale'],
  },
  {
    name: 'Flagstaff Hill',
    region: 'South',
    profile: 'new-build-north',
    postcode: '5159',
    character:
      'Hills-fringe family suburb with 1980s-2000s split-level and single-storey homes. Sloping blocks add a drainage and retaining flavour.',
    nearby: ['aberfoyle-park', 'blackwood', 'happy-valley', 'eden-hills'],
  },
  {
    name: 'Seacombe Gardens',
    region: 'South',
    profile: 'established-south',
    postcode: '5047',
    character:
      'Compact post-war residential pocket south of Marion. Steady end-of-lease and tap-and-toilet maintenance work.',
    nearby: ['marion', 'bedford-park', 'oaklands-park', 'darlington'],
  },

  // ===== NORTH =====
  {
    name: 'Prospect',
    region: 'North',
    profile: 'heritage-east',
    postcode: '5082',
    character:
      'Inner-north strip along Prospect Road — Federation villas, mid-century infill, and a strong cafe-and-renovation culture. Reno work is the standout.',
    nearby: ['walkerville', 'broadview', 'enfield', 'north-adelaide'],
  },
  {
    name: 'Walkerville',
    region: 'North',
    profile: 'heritage-east',
    postcode: '5081',
    character:
      'Premium small council with sandstone villas, leafy streets, and aggressive heritage protection. Profile-matched repairs are a hard requirement.',
    nearby: ['prospect', 'north-adelaide', 'gilberton', 'medindie'],
  },
  {
    name: 'Enfield',
    region: 'North',
    profile: 'established-south',
    postcode: '5085',
    character:
      'Northern post-war residential with steady investor stock and turnover. End-of-lease, switchboard upgrades, and routine plumbing keep the rotation full.',
    nearby: ['prospect', 'broadview', 'sefton-park', 'kilburn'],
  },
  {
    name: 'Salisbury',
    region: 'North',
    profile: 'established-south',
    postcode: '5108',
    character:
      'Major northern hub with mid-century housing commission stock progressively renovated. Investor portfolios and rental maintenance dominate.',
    nearby: ['mawson-lakes', 'parafield', 'modbury', 'pooraka'],
  },
  {
    name: 'Modbury',
    region: 'North',
    profile: 'established-south',
    postcode: '5092',
    character:
      'North-east established suburb centred on Tea Tree Plaza. 1960s-1970s brick veneer with high AC retrofit demand.',
    nearby: ['tea-tree-gully', 'salisbury', 'greenwith', 'ridgehaven'],
  },
  {
    name: 'Tea Tree Gully',
    region: 'North',
    profile: 'established-south',
    postcode: '5091',
    character:
      'North-east family suburb with hills-fringe character. Mixed eras and broad job spread across the bench.',
    nearby: ['modbury', 'greenwith', 'ridgehaven', 'highbury'],
  },
  {
    name: 'Mawson Lakes',
    region: 'North',
    profile: 'new-build-north',
    postcode: '5095',
    character:
      'Master-planned 2000s-onwards new town with high-density apartments and townhouses. Body-corporate coordinated maintenance is the regular work.',
    nearby: ['salisbury', 'parafield', 'pooraka', 'parafield-gardens'],
  },
  {
    name: 'Greenwith',
    region: 'North',
    profile: 'new-build-north',
    postcode: '5125',
    character:
      'Outer north-east estate suburb of 1990s-2010s family homes. Solar-equipped, AC-equipped, and reaching the warranty cliff for builder-grade fittings.',
    nearby: ['tea-tree-gully', 'modbury', 'fairview-park', 'st-agnes'],
  },

  // ===== HILLS =====
  {
    name: 'Stirling',
    region: 'Hills',
    profile: 'hills',
    postcode: '5152',
    character:
      'Adelaide Hills village atmosphere with European-style autumn streetscapes. Larger blocks, heritage stone, and bushfire-zone compliance shape the work.',
    nearby: ['aldgate', 'crafers', 'bridgewater', 'mylor'],
  },
  {
    name: 'Aldgate',
    region: 'Hills',
    profile: 'hills',
    postcode: '5154',
    character:
      'Wooded Hills suburb with heritage cottages and 1980s-1990s family homes on bush blocks. Tank water, septic, and ember-zone roofing are routine.',
    nearby: ['stirling', 'bridgewater', 'mylor', 'mount-barker'],
  },
  {
    name: 'Mount Barker',
    region: 'Hills',
    profile: 'hills',
    postcode: '5251',
    character:
      'Fastest-growing Hills regional town with major estate development alongside heritage core. Mix of new-build and heritage work side by side.',
    nearby: ['hahndorf', 'aldgate', 'bridgewater', 'littlehampton'],
  },
  {
    name: 'Hahndorf',
    region: 'Hills',
    profile: 'hills',
    postcode: '5245',
    character:
      'Tourist-heritage town with German pioneer cottages, pubs, and heritage-protected main street. Heritage-appropriate work is non-negotiable.',
    nearby: ['mount-barker', 'aldgate', 'bridgewater', 'verdun'],
  },
  {
    name: 'Crafers',
    region: 'Hills',
    profile: 'hills',
    postcode: '5152',
    character:
      'Quiet Hills suburb adjacent to Stirling — original cottages, stone houses, and large eucalypt blocks. Bushfire compliance and re-roofs feature.',
    nearby: ['stirling', 'aldgate', 'belair', 'piccadilly'],
  },
  {
    name: 'Bridgewater',
    region: 'Hills',
    profile: 'hills',
    postcode: '5155',
    character:
      'Hills hamlet with the historic Bridgewater Mill at its centre. Heritage stone work, tank-water plumbing, and bushfire-zone roofing dominate.',
    nearby: ['stirling', 'aldgate', 'mount-barker', 'hahndorf'],
  },
]

export const SUBURB_CONTENT: SuburbContent[] = RAW.map((r) => {
  const slug = slugify(r.name)
  const defaults = DEFAULTS[r.profile]
  return {
    slug,
    name: r.name,
    region: r.region,
    profile: r.profile,
    postcode: r.postcode,
    character: r.character,
    jobLean: r.jobLean ?? defaults.jobLean,
    commonIssues: r.commonIssues ?? defaults.commonIssues,
    nearby: r.nearby,
  }
})

export function getSuburb(slug: string): SuburbContent | undefined {
  return SUBURB_CONTENT.find((s) => s.slug === slug)
}

export const SUBURB_SLUGS = SUBURB_CONTENT.map((s) => s.slug)

/**
 * Profile-derived intro lead — used as the SEO intro paragraph.
 * Combines profile pattern with suburb name for unique-but-extractable content.
 */
export function profileLead(s: SuburbContent): string {
  switch (s.profile) {
    case 'cbd-inner':
      return `${s.name} is dense, mixed, and noisy — apartment leaks, strata-coordinated trade work, and after-hours retail fit-outs are the bread-and-butter calls. Briks coordinates the right trade for the building, the body corp, and the time of day.`
    case 'heritage-east':
      return `${s.name} is heritage-heavy — sandstone villas, bluestone semis, and bungalow stock that needs profile-matched care. Council heritage overlays mean repairs need the right materials and an eye for original detail. Briks dispatches tradies who have done this work twenty times before.`
    case 'beach-west':
      return `${s.name} is a coastal residential pocket — and salt, wind, and storm-load define the maintenance schedule. Roof, gutter, and exterior paint cycles run shorter than inland Adelaide. Briks coordinates the trades who know what salt does to fasteners and flashings.`
    case 'new-build-north':
      return `${s.name} is dominated by 1990s-2020s estate housing — solar panels on every second roof, ducted reverse-cycle as standard, and builder-grade fittings hitting their warranty cliff. Briks dispatches HVAC, electrical, and plumbing techs who specialise in the work this housing stock generates.`
    case 'established-south':
      return `${s.name} is mid-century established residential — brick veneer, original switchboards, and hot water systems past replacement age. Common jobs run the full trade spectrum, and Briks coordinates whichever specialist your house actually needs.`
    case 'hills':
      return `${s.name} sits in the Adelaide Hills — bushfire compliance, tank water, septic systems, and large rural-fringe blocks shape the work. Briks dispatches tradies certified for ember-zone roofs, Hills-grade gutters, and the plumbing setups Hills homes actually use.`
    case 'industrial-mix':
      return `${s.name} sits across mixed residential and light-commercial zoning — converted warehouses, small workshops, and infill housing. Job scope shifts between domestic and small-commercial code, and Briks routes the right trade for the right compliance path.`
  }
}
