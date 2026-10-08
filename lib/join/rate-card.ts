// Copied from briks-ops (lib/rate-card.ts). The ops server re-validates every
// submission with its own copy — keep the two in sync when trades, areas or
// rate items change.
/**
 * The tradie rate card — the single source for the public /join form, the
 * /api/join validator and the owner's review/comparison screens. Pure data and
 * helpers (no db), so the 'use client' form can import it.
 *
 * Every amount is AUD ex GST.
 */

export const AREAS = [
  { key: 'NORTH', label: 'Northern suburbs (Salisbury, Elizabeth, Mawson Lakes)' },
  { key: 'NORTH_EAST', label: 'North-east (Modbury, Tea Tree Gully, Campbelltown)' },
  { key: 'EAST', label: 'Eastern suburbs (Norwood, Burnside, Magill)' },
  { key: 'SOUTH', label: 'Southern suburbs (Marion, Morphett Vale, Noarlunga)' },
  { key: 'WEST', label: 'Western suburbs (Port Adelaide, Henley Beach, West Lakes)' },
  { key: 'CBD', label: 'CBD & inner suburbs' },
  { key: 'HILLS', label: 'Adelaide Hills' },
  { key: 'GAWLER_BAROSSA', label: 'Gawler & Barossa' },
  { key: 'FLEURIEU', label: 'Fleurieu Peninsula' },
] as const
export type AreaKey = (typeof AREAS)[number]['key']
export const AREA_KEYS = AREAS.map((a) => a.key) as AreaKey[]
export const areaLabel = (k: string) => AREAS.find((a) => a.key === k)?.label.split(' (')[0] ?? k

export const TRADES = [
  { key: 'PLUMBER', label: 'Plumber', licensed: true },
  { key: 'ELECTRICIAN', label: 'Electrician', licensed: true },
  { key: 'GASFITTER', label: 'Gasfitter', licensed: true },
  { key: 'HVAC', label: 'Air-con / HVAC', licensed: true },
  { key: 'CARPENTER', label: 'Carpenter', licensed: false },
  { key: 'HANDYMAN', label: 'Handyman', licensed: false },
  { key: 'PAINTER', label: 'Painter', licensed: false },
  { key: 'TILER', label: 'Tiler', licensed: false },
  { key: 'PLASTERER', label: 'Plasterer', licensed: false },
  { key: 'ROOFER', label: 'Roofer', licensed: false },
  { key: 'GUTTERS', label: 'Gutters & downpipes', licensed: false },
  { key: 'FENCER', label: 'Fencer', licensed: false },
  { key: 'LANDSCAPER', label: 'Landscaping / gardening', licensed: false },
  { key: 'CONCRETER', label: 'Concreter', licensed: false },
  { key: 'CLEANER', label: 'Cleaner', licensed: false },
  { key: 'LOCKSMITH', label: 'Locksmith', licensed: false },
  { key: 'GLAZIER', label: 'Glazier', licensed: false },
  { key: 'FLOORING', label: 'Flooring', licensed: false },
  { key: 'PEST', label: 'Pest control', licensed: true },
  { key: 'RUBBISH', label: 'Rubbish removal', licensed: false },
] as const
export type TradeKey = (typeof TRADES)[number]['key']
export const TRADE_KEYS = TRADES.map((t) => t.key) as TradeKey[]
export const tradeLabel = (k: string) => TRADES.find((t) => t.key === k)?.label ?? k
export const tradeLabelLower = (k: string) => tradeLabel(k).toLowerCase()

export type RateItem = { key: string; label: string; unit: string; required?: boolean; hint?: string }

export const COMMON_ITEMS: RateItem[] = [
  { key: 'hourly', label: 'Hourly rate', unit: 'per hour', required: true },
  { key: 'callout', label: 'Call-out / attendance fee', unit: 'fixed', required: true, hint: 'Say how many minutes it covers in your notes' },
  { key: 'after_hours', label: 'After-hours hourly rate', unit: 'per hour' },
  { key: 'min_charge', label: 'Minimum charge', unit: 'fixed' },
]

const CARPENTRY: RateItem[] = [
  { key: 'door_hang', label: 'Hang internal door', unit: 'fixed' },
  { key: 'door_hardware', label: 'Replace door handle / lock', unit: 'fixed' },
  { key: 'fence_paling', label: 'Replace fence palings', unit: 'per m' },
  { key: 'flatpack', label: 'Flat-pack assembly', unit: 'per hour' },
]

export const TRADE_ITEMS: Record<TradeKey, RateItem[]> = {
  PLUMBER: [
    { key: 'tap_washer', label: 'Replace tap washer / cartridge', unit: 'fixed' },
    { key: 'toilet_unblock', label: 'Unblock toilet', unit: 'fixed' },
    { key: 'drain_clear', label: 'Clear blocked drain (eel/jetter)', unit: 'fixed' },
    { key: 'toilet_suite', label: 'Replace toilet suite (labour)', unit: 'fixed' },
    { key: 'hws_electric', label: 'Replace electric HWS (labour)', unit: 'fixed' },
    { key: 'hws_gas', label: 'Replace gas HWS (labour)', unit: 'fixed' },
    { key: 'leak_detect', label: 'Leak detection', unit: 'per hour' },
  ],
  ELECTRICIAN: [
    { key: 'power_point', label: 'Replace double power point', unit: 'fixed' },
    { key: 'light_fitting', label: 'Replace light fitting', unit: 'fixed' },
    { key: 'smoke_alarm', label: 'Replace 240V smoke alarm', unit: 'fixed' },
    { key: 'rcd_test', label: 'Safety switch (RCD) test', unit: 'fixed' },
    { key: 'fault_find', label: 'Fault finding', unit: 'per hour' },
  ],
  GASFITTER: [
    { key: 'gas_leak', label: 'Gas leak test & repair (first hour)', unit: 'fixed' },
    { key: 'cooktop', label: 'Replace gas cooktop (labour)', unit: 'fixed' },
  ],
  HVAC: [
    { key: 'split_service', label: 'Service split system', unit: 'fixed' },
    { key: 'split_install', label: 'Install split system ≤7kW (labour)', unit: 'fixed' },
  ],
  CARPENTER: CARPENTRY,
  HANDYMAN: CARPENTRY,
  PAINTER: [
    { key: 'wall_m2', label: 'Walls, 2 coats', unit: 'per m²' },
    { key: 'ceiling_m2', label: 'Ceiling, 2 coats', unit: 'per m²' },
    { key: 'bedroom_3x3', label: '3×3 bedroom walls + ceiling', unit: 'fixed' },
    { key: 'door_frame', label: 'Door + frame', unit: 'fixed' },
  ],
  TILER: [
    { key: 'wall_m2', label: 'Wall tiling', unit: 'per m²' },
    { key: 'floor_m2', label: 'Floor tiling', unit: 'per m²' },
    { key: 'regrout_shower', label: 'Regrout shower', unit: 'fixed' },
    { key: 'tile_replace', label: 'Replace single broken tile', unit: 'fixed' },
  ],
  PLASTERER: [
    { key: 'patch_small', label: 'Patch hole up to 300mm', unit: 'fixed' },
    { key: 'cornice_m', label: 'Cornice', unit: 'per m' },
    { key: 'sheet_m2', label: 'Replace plasterboard', unit: 'per m²' },
  ],
  ROOFER: [
    { key: 'leak_repair', label: 'Roof leak investigation & repair', unit: 'fixed' },
    { key: 'tile_replace', label: 'Replace broken roof tiles', unit: 'fixed' },
  ],
  GUTTERS: [
    { key: 'clean_single', label: 'Gutter clean, single storey', unit: 'fixed' },
    { key: 'gutter_replace', label: 'Replace guttering', unit: 'per m' },
    { key: 'downpipe', label: 'Replace downpipe', unit: 'fixed' },
  ],
  FENCER: [
    { key: 'colorbond_m', label: 'Colorbond fence supply & install', unit: 'per m' },
    { key: 'paling_m', label: 'Paling fence supply & install', unit: 'per m' },
  ],
  LANDSCAPER: [
    { key: 'mow_small', label: 'Mow small block (<500m²)', unit: 'fixed' },
    { key: 'hedge', label: 'Hedge trimming', unit: 'per hour' },
    { key: 'green_waste', label: 'Green waste removal', unit: 'per trailer' },
  ],
  CONCRETER: [
    { key: 'slab_m2', label: 'Concrete slab', unit: 'per m²' },
    { key: 'path_m', label: 'Path', unit: 'per m' },
  ],
  CLEANER: [
    { key: 'eol_3br', label: 'End-of-lease clean, 3 bedroom', unit: 'fixed' },
    { key: 'general', label: 'General cleaning', unit: 'per hour' },
    { key: 'carpet_room', label: 'Carpet steam clean', unit: 'per room' },
  ],
  LOCKSMITH: [
    { key: 'rekey', label: 'Rekey cylinder', unit: 'fixed' },
    { key: 'lockout', label: 'Lockout attendance', unit: 'fixed' },
  ],
  GLAZIER: [
    { key: 'window_small', label: 'Replace standard window pane (<1m²)', unit: 'fixed' },
    { key: 'boardup', label: 'Emergency board-up', unit: 'fixed' },
  ],
  FLOORING: [
    { key: 'vinyl_m2', label: 'Vinyl / vinyl plank', unit: 'per m²' },
    { key: 'carpet_m2', label: 'Carpet', unit: 'per m²' },
  ],
  PEST: [
    { key: 'general_house', label: 'General pest treatment, house', unit: 'fixed' },
    { key: 'termite_inspect', label: 'Termite inspection', unit: 'fixed' },
  ],
  RUBBISH: [
    { key: 'trailer', label: 'Per trailer load', unit: 'fixed' },
    { key: 'skip_equiv', label: 'Small skip equivalent', unit: 'fixed' },
  ],
}

/** Every rate item (common + trade-specific) for a trade, in form order. */
export const itemsFor = (trade: TradeKey): RateItem[] => [...COMMON_ITEMS, ...TRADE_ITEMS[trade]]
export const itemFor = (trade: string, key: string): RateItem | undefined =>
  TRADE_KEYS.includes(trade as TradeKey) ? itemsFor(trade as TradeKey).find((i) => i.key === key) : undefined

/** Short unit suffix shown after a price field. */
export const unitShort = (u: string) => (u === 'per hour' ? '/hr' : u === 'fixed' ? 'each' : u)

export const INSURANCE_COVERS = [
  { key: '5M', label: '$5M' },
  { key: '10M', label: '$10M' },
  { key: '20M', label: '$20M' },
  { key: 'OTHER', label: 'Other' },
] as const

/** "Jobs a week" buckets, stored as the bucket's upper bound. */
export const JOBS_PER_WEEK = [
  { value: 2, label: '1–2' },
  { value: 5, label: '3–5' },
  { value: 10, label: '6–10' },
  { value: 20, label: '10+' },
] as const
export const jobsPerWeekLabel = (n: number | null | undefined) => JOBS_PER_WEEK.find((j) => j.value === n)?.label ?? '—'

export const RESPONSE_TIMES = [
  { key: 'SAME_DAY', label: 'Same day' },
  { key: 'NEXT_DAY', label: 'Next day' },
  { key: '2_3_DAYS', label: '2–3 days' },
  { key: 'WEEK', label: 'Within a week' },
] as const
export const responseTimeLabel = (k: string | null | undefined) => RESPONSE_TIMES.find((r) => r.key === k)?.label ?? '—'

/** Rate card as stored on TradieApplication.ratesJson. */
export type TradeRates = {
  hourly: number
  callout: number
  after_hours?: number
  min_charge?: number
  items?: Record<string, number>
}
export type RatesPayload = Partial<Record<TradeKey, TradeRates>>

export const money = (n: number) =>
  `$${n.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`

/**
 * Flatten a trade's rates into TradieRate-shaped rows (label/unit from this
 * file, never from the submission).
 */
export function flattenRates(trade: TradeKey, r: TradeRates): { itemKey: string; label: string; unit: string; amount: number }[] {
  const out: { itemKey: string; label: string; unit: string; amount: number }[] = []
  const push = (key: string, amount: number | undefined) => {
    if (amount === undefined || amount === null) return
    const it = itemFor(trade, key)
    if (it) out.push({ itemKey: key, label: it.label, unit: it.unit, amount })
  }
  for (const c of COMMON_ITEMS) push(c.key, r[c.key as 'hourly' | 'callout' | 'after_hours' | 'min_charge'])
  for (const [k, v] of Object.entries(r.items ?? {})) push(k, v)
  return out
}

/**
 * The wording Tradie.trade has always used (components/TradieForm.tsx's
 * select). Approved signups are stored in this vocabulary so the edit form
 * shows the right trade and saving it doesn't silently change it.
 */
export const LEGACY_TRADE_NAME: Record<TradeKey, string> = {
  PLUMBER: 'Plumbing', ELECTRICIAN: 'Electrical', GASFITTER: 'Gas', HVAC: 'HVAC',
  CARPENTER: 'Carpentry', HANDYMAN: 'Handyman', PAINTER: 'Painting', TILER: 'Tiling',
  PLASTERER: 'Plastering', ROOFER: 'Roofing', GUTTERS: 'Gutters', FENCER: 'Fencing',
  LANDSCAPER: 'Landscaping', CONCRETER: 'Concreting', CLEANER: 'Cleaning', LOCKSMITH: 'Locksmith',
  GLAZIER: 'Glazier', FLOORING: 'Flooring', PEST: 'Pest control', RUBBISH: 'Rubbish removal',
}

/** Best-effort map from a Tradie.trade free-text value ("Plumbing") to a trade key. */
export function tradeKeyFromText(text: string | null | undefined): TradeKey | null {
  const t = (text ?? '').trim().toLowerCase()
  if (!t) return null
  const exact = TRADES.find((x) => x.key.toLowerCase() === t || x.label.toLowerCase() === t)
  if (exact) return exact.key
  const stems: [string, TradeKey][] = [
    ['plumb', 'PLUMBER'], ['electr', 'ELECTRICIAN'], ['gas', 'GASFITTER'], ['hvac', 'HVAC'], ['air', 'HVAC'],
    ['carpent', 'CARPENTER'], ['handy', 'HANDYMAN'], ['paint', 'PAINTER'], ['til', 'TILER'], ['plaster', 'PLASTERER'],
    ['roof', 'ROOFER'], ['gutter', 'GUTTERS'], ['fenc', 'FENCER'], ['landscap', 'LANDSCAPER'], ['garden', 'LANDSCAPER'],
    ['concret', 'CONCRETER'], ['clean', 'CLEANER'], ['lock', 'LOCKSMITH'], ['glaz', 'GLAZIER'], ['floor', 'FLOORING'],
    ['pest', 'PEST'], ['rubbish', 'RUBBISH'],
  ]
  return stems.find(([s]) => t.includes(s))?.[1] ?? null
}

/** Rough guess of the trade a job needs from its scope text, to pre-select the tradie list. */
export function guessTradeFromScope(scope: string | null | undefined): TradeKey | null {
  const s = (scope ?? '').toLowerCase()
  const rules: [RegExp, TradeKey][] = [
    [/\b(plumb|tap|toilet|drain|hot water|hws|leak|blocked|cistern|shower)/, 'PLUMBER'],
    [/\b(electric|power ?point|light|switch|smoke alarm|rcd|wiring)/, 'ELECTRICIAN'],
    [/\b(gas)\b/, 'GASFITTER'],
    [/\b(air.?con|split system|hvac)/, 'HVAC'],
    [/\b(paint)/, 'PAINTER'],
    [/\b(tile|tiling|grout)/, 'TILER'],
    [/\b(plaster|cornice)/, 'PLASTERER'],
    [/\b(roof)/, 'ROOFER'],
    [/\b(gutter|downpipe)/, 'GUTTERS'],
    [/\b(fence|fencing|paling)/, 'FENCER'],
    [/\b(lawn|mow|garden|hedge)/, 'LANDSCAPER'],
    [/\b(lock|key|rekey)/, 'LOCKSMITH'],
    [/\b(window|glass|glazing)/, 'GLAZIER'],
    [/\b(carpet|vinyl|flooring)/, 'FLOORING'],
    [/\b(pest|termite|cockroach)/, 'PEST'],
    [/\b(clean)/, 'CLEANER'],
    [/\b(door|carpent|handyman|hinge|handle)/, 'HANDYMAN'],
  ]
  return rules.find(([re]) => re.test(s))?.[1] ?? null
}
