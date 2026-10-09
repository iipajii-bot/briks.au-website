// Copied from briks-ops (lib/rate-card.ts). The ops server re-validates every
// submission with its own copy — keep the two in sync when trades, areas or
// rate items change.
/**
 * The tradie rate card — the single source for the public /join form, the
 * /api/join validator and the owner's review/comparison screens. Pure data and
 * helpers (no db), so the 'use client' form can import it.
 *
 * Every amount is AUD ex GST. Market benchmarks are keyed by MarketBenchmark.key
 * (Tapi SA Property Maintenance Index) — see scripts/seed-market-benchmarks.ts.
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
  { key: 'APPLIANCES', label: 'Appliance repair', licensed: false },
  { key: 'GARAGE', label: 'Garage doors & shutters', licensed: false },
] as const
export type TradeKey = (typeof TRADES)[number]['key']
export const TRADE_KEYS = TRADES.map((t) => t.key) as TradeKey[]
export const isTradeKey = (v: string): v is TradeKey => (TRADE_KEYS as string[]).includes(v)
export const tradeLabel = (k: string) => TRADES.find((t) => t.key === k)?.label ?? k
export const tradeLabelLower = (k: string) => tradeLabel(k).toLowerCase()

/**
 * Units a job can be priced in. Stored verbatim on TradieRate.unit.
 * `fixed` = each / one-off price, `first_hour` = first hour then hourly.
 */
export const UNITS = ['fixed', 'first_hour', 'per m²', 'per m', 'per hour', 'per room', 'per load'] as const

/** One priced everyday job. `market` = a MarketBenchmark key (SA market range shown to the owner). */
export type RateItem = { key: string; label: string; unit: string; market?: string }

/** A "Can you…?" yes/no capability for a trade. */
export type Capability = { key: string; label: string }

/** Hourly and call-out are asked for every ticked trade (step 3). */
export const HOURLY_ITEM: RateItem = { key: 'hourly', label: 'Hourly rate', unit: 'per hour' }
export const CALLOUT_ITEM: RateItem = { key: 'callout', label: 'Call-out fee', unit: 'fixed' }
export const COMMON_ITEMS: RateItem[] = [HOURLY_ITEM, CALLOUT_ITEM]

/** Everyday jobs per trade (step 4). Labour only — parts extra. */
export const TRADE_ITEMS: Record<TradeKey, RateItem[]> = {
  PLUMBER: [
    { key: 'tap_fix', label: 'Fix leaking tap (washer / cartridge)', unit: 'fixed', market: 'sink_tap' },
    { key: 'mixer_replace', label: 'Replace basin / sink mixer', unit: 'fixed', market: 'sink_tap' },
    { key: 'cistern_fix', label: 'Fix running / leaking toilet cistern', unit: 'fixed', market: 'toilet_cistern' },
    { key: 'toilet_seat', label: 'Replace toilet seat', unit: 'fixed', market: 'toilet_seat' },
    { key: 'unblock_basic', label: 'Unblock toilet / sink (plunger or snake)', unit: 'fixed', market: 'sink_drain' },
    { key: 'jetter_first_hr', label: 'Clear drain with jetter', unit: 'first_hour' },
    { key: 'burst_pipe', label: 'Repair burst / leaking pipe', unit: 'fixed' },
    { key: 'shower_tap', label: 'Fix shower tap / spindle', unit: 'fixed', market: 'shower_tap' },
    { key: 'hws_electric', label: 'Swap electric hot water (250L)', unit: 'fixed' },
    { key: 'hws_gas', label: 'Swap gas hot water', unit: 'fixed' },
  ],
  ELECTRICIAN: [
    { key: 'gpo_replace', label: 'Replace power point', unit: 'fixed', market: 'power_point' },
    { key: 'gpo_new', label: 'Add new power point', unit: 'fixed', market: 'power_point' },
    { key: 'light_fitting', label: 'Replace light fitting', unit: 'fixed', market: 'light_fitting' },
    { key: 'light_switch', label: 'Replace light switch', unit: 'fixed', market: 'light_switch' },
    { key: 'bulbs', label: 'Replace bulbs / tubes (call-out)', unit: 'fixed', market: 'light_bulbs' },
    { key: 'downlight_led', label: 'LED downlight (each)', unit: 'fixed', market: 'light_fitting' },
    { key: 'smoke_alarm', label: 'Replace 240V smoke alarm (each)', unit: 'fixed' },
    { key: 'fault_find', label: 'Fault finding', unit: 'first_hour', market: 'wiring' },
    { key: 'ceiling_fan', label: 'Replace ceiling fan', unit: 'fixed', market: 'ceiling_fan' },
    { key: 'exhaust_fan', label: 'Replace exhaust fan', unit: 'fixed', market: 'ventilation' },
  ],
  GASFITTER: [
    { key: 'gas_leak', label: 'Gas leak test & repair', unit: 'first_hour' },
    { key: 'cooktop_gas', label: 'Replace gas cooktop', unit: 'fixed', market: 'stove_top' },
    { key: 'heater_service', label: 'Gas heater service', unit: 'fixed' },
    { key: 'hws_gas', label: 'Swap gas hot water', unit: 'fixed' },
    { key: 'safety_check', label: 'Gas safety check', unit: 'fixed' },
  ],
  HVAC: [
    { key: 'split_service', label: 'Service split system (per unit)', unit: 'fixed' },
    { key: 'fault_diag', label: 'Not cooling / heating — diagnose', unit: 'first_hour' },
    { key: 'split_install_small', label: 'Install split ≤2.6kW back-to-back', unit: 'fixed' },
    { key: 'split_install_large', label: 'Install split ≤7kW back-to-back', unit: 'fixed' },
    { key: 'evap_service', label: 'Evaporative service', unit: 'fixed' },
    { key: 'ducted_service', label: 'Ducted service', unit: 'fixed' },
  ],
  APPLIANCES: [
    { key: 'dishwasher_fix', label: 'Dishwasher repair', unit: 'first_hour', market: 'dishwasher' },
    { key: 'oven_element', label: 'Replace oven element', unit: 'fixed', market: 'oven_parts' },
    { key: 'oven_fault', label: 'Oven / cooktop not working — diagnose', unit: 'first_hour', market: 'stove_top' },
    { key: 'rangehood_fix', label: 'Rangehood repair / replace', unit: 'fixed', market: 'range_hood' },
    { key: 'washing_machine', label: 'Washing machine / dryer repair', unit: 'first_hour' },
  ],
  CARPENTER: [
    { key: 'door_internal', label: 'Hang / replace internal door', unit: 'fixed' },
    { key: 'door_external', label: 'Replace external door', unit: 'fixed' },
    { key: 'door_frame', label: 'Replace door frame', unit: 'fixed', market: 'door_frame' },
    { key: 'deck_board', label: 'Deck board repair', unit: 'per m' },
    { key: 'skirting', label: 'Skirting', unit: 'per m' },
    { key: 'cabinet_fix', label: 'Cabinet door / hinge repair', unit: 'fixed' },
  ],
  HANDYMAN: [
    { key: 'flyscreen', label: 'Replace flyscreen (per window)', unit: 'fixed' },
    { key: 'silicone', label: 'Reseal shower / bath (silicone)', unit: 'fixed' },
    { key: 'door_adjust', label: 'Adjust / plane sticking door', unit: 'fixed' },
    { key: 'door_hardware', label: 'Replace door handle / lock', unit: 'fixed', market: 'door_handle' },
    { key: 'door_frame', label: 'Door frame repair', unit: 'fixed', market: 'door_frame' },
    { key: 'patch_paint', label: 'Patch & paint small hole', unit: 'fixed' },
    { key: 'fixtures', label: 'Install letterbox / curtain rod / blind (each)', unit: 'fixed' },
    { key: 'fence_paling', label: 'Fence paling repair', unit: 'per m' },
    { key: 'bulbs', label: 'Replace bulbs (non-electrical)', unit: 'fixed', market: 'light_bulbs' },
    { key: 'flatpack', label: 'Flat-pack assembly', unit: 'per hour' },
  ],
  PAINTER: [
    { key: 'interior_m2', label: 'Interior walls', unit: 'per m²' },
    { key: 'ceiling_m2', label: 'Ceilings', unit: 'per m²' },
    { key: 'bedroom_3x3', label: '3×3 bedroom walls + ceiling', unit: 'fixed' },
    { key: 'door_frame', label: 'Door + frame', unit: 'fixed' },
    { key: 'patch_paint', label: 'Patch & paint (per patch)', unit: 'fixed' },
    { key: 'exterior_m2', label: 'Exterior walls', unit: 'per m²' },
  ],
  TILER: [
    { key: 'tiles_replace', label: 'Replace 1–3 broken tiles', unit: 'fixed' },
    { key: 'regrout_shower', label: 'Regrout shower', unit: 'fixed' },
    { key: 'silicone_shower', label: 'Silicone reseal shower', unit: 'fixed' },
    { key: 'leaking_shower', label: 'Fix leaking shower without re-tiling', unit: 'fixed', market: 'shower_drain' },
    { key: 'floor_m2', label: 'Floor tiling', unit: 'per m²' },
    { key: 'wall_m2', label: 'Wall tiling', unit: 'per m²' },
    { key: 'waterproof_m2', label: 'Waterproofing', unit: 'per m²' },
  ],
  PLASTERER: [
    { key: 'patch_small', label: 'Patch hole up to 300mm', unit: 'fixed' },
    { key: 'patch_large', label: 'Patch up to 1m²', unit: 'fixed' },
    { key: 'ceiling_damage', label: 'Water-damaged / fallen ceiling', unit: 'per m²' },
    { key: 'ceiling_refix', label: 'Re-fix sagging ceiling', unit: 'per m²' },
    { key: 'cornice', label: 'Cornice', unit: 'per m' },
  ],
  ROOFER: [
    { key: 'leak_check', label: 'Roof leak check & repair', unit: 'first_hour' },
    { key: 'tile_replace', label: 'Replace roof tiles (each)', unit: 'fixed' },
    { key: 'ridge_repoint', label: 'Re-point ridge capping', unit: 'per m' },
    { key: 'sheet_replace', label: 'Replace Colorbond sheet', unit: 'fixed' },
    { key: 'make_safe', label: 'Storm make-safe / tarp', unit: 'fixed' },
  ],
  GUTTERS: [
    { key: 'clean_single', label: 'Gutter clean, single storey', unit: 'fixed' },
    { key: 'clean_double', label: 'Gutter clean, double storey', unit: 'fixed' },
    { key: 'downpipe_unblock', label: 'Unblock downpipe', unit: 'fixed' },
    { key: 'gutter_replace', label: 'Replace guttering', unit: 'per m' },
    { key: 'downpipe_replace', label: 'Replace downpipe', unit: 'fixed' },
  ],
  FENCER: [
    { key: 'repair_section', label: 'Repair 3–5m storm-damaged section', unit: 'fixed' },
    { key: 'colorbond_m', label: 'Colorbond 1.8m (supply + install)', unit: 'per m' },
    { key: 'paling_m', label: 'Paling (supply + install)', unit: 'per m' },
    { key: 'gate_repair', label: 'Gate repair', unit: 'fixed' },
    { key: 'gate_new', label: 'New gate (supply + install)', unit: 'fixed' },
  ],
  LANDSCAPER: [
    { key: 'mow_small', label: 'Mow & edge, small yard', unit: 'fixed' },
    { key: 'mow_large', label: 'Mow & edge, large yard', unit: 'fixed' },
    { key: 'tidy_hour', label: 'Weeding / tidy-up', unit: 'per hour' },
    { key: 'hedge', label: 'Hedge trimming', unit: 'per hour' },
    { key: 'green_waste', label: 'Green waste', unit: 'per load' },
    { key: 'tree_hour', label: 'Tree pruning / removal', unit: 'per hour' },
  ],
  CONCRETER: [
    { key: 'slab_m2', label: 'Slab / path', unit: 'per m²' },
    { key: 'crack_repair', label: 'Crack repair', unit: 'fixed' },
    { key: 'demolish_m2', label: 'Demolish & remove', unit: 'per m²' },
  ],
  CLEANER: [
    { key: 'eol_2br', label: 'End-of-lease clean, 1–2 bed', unit: 'fixed' },
    { key: 'eol_3br', label: 'End-of-lease clean, 3 bed', unit: 'fixed' },
    { key: 'eol_4br', label: 'End-of-lease clean, 4 bed', unit: 'fixed' },
    { key: 'carpet_room', label: 'Carpet steam clean', unit: 'per room' },
    { key: 'windows_single', label: 'Windows, single storey', unit: 'fixed' },
    { key: 'pressure_m2', label: 'Pressure washing', unit: 'per m²' },
  ],
  LOCKSMITH: [
    { key: 'rekey', label: 'Rekey lock (per cylinder)', unit: 'fixed' },
    { key: 'lock_front', label: 'Replace front door lock', unit: 'fixed', market: 'door_lock' },
    { key: 'lock_security', label: 'Replace security door lock', unit: 'fixed', market: 'door_lock' },
    { key: 'window_lock', label: 'Window lock (each)', unit: 'fixed' },
    { key: 'lockout', label: 'Lockout', unit: 'fixed' },
    { key: 'gate_lock', label: 'Gate lock', unit: 'fixed' },
  ],
  GLAZIER: [
    { key: 'pane_small', label: 'Replace window pane <1m²', unit: 'fixed' },
    { key: 'boardup', label: 'Emergency board-up', unit: 'fixed' },
    { key: 'shower_screen', label: 'Shower screen / door', unit: 'fixed', market: 'shower_door' },
    { key: 'sliding_glass', label: 'Sliding door glass', unit: 'fixed' },
  ],
  FLOORING: [
    { key: 'hybrid_m2', label: 'Hybrid / laminate', unit: 'per m²' },
    { key: 'carpet_m2', label: 'Carpet / carpet tiles', unit: 'per m²', market: 'carpet' },
    { key: 'vinyl_m2', label: 'Vinyl', unit: 'per m²', market: 'vinyl' },
    { key: 'remove_m2', label: 'Remove & dispose', unit: 'per m²' },
    { key: 'restretch', label: 'Carpet re-stretch', unit: 'per room' },
    { key: 'scotia', label: 'Scotia', unit: 'per m' },
  ],
  PEST: [
    { key: 'general', label: 'General pest treatment, house', unit: 'fixed' },
    { key: 'termite_inspect', label: 'Termite inspection + report', unit: 'fixed' },
    { key: 'termite_bait', label: 'Termite bait station check / top-up', unit: 'fixed' },
    { key: 'termite_treat', label: 'Termite treatment (from)', unit: 'fixed' },
    { key: 'rodents', label: 'Rodents', unit: 'fixed' },
    { key: 'wasps', label: 'Wasps / bees', unit: 'fixed' },
  ],
  RUBBISH: [
    { key: 'trailer', label: 'Trailer load', unit: 'per load' },
    { key: 'truck', label: 'Small truck load', unit: 'per load' },
    { key: 'mattress', label: 'Mattress', unit: 'fixed' },
    { key: 'whitegoods', label: 'Whitegoods item', unit: 'fixed' },
    { key: 'clearout_hour', label: 'End-of-lease clear-out', unit: 'per hour' },
  ],
  GARAGE: [
    { key: 'service', label: 'Garage door service', unit: 'fixed' },
    { key: 'springs', label: 'Replace springs', unit: 'fixed' },
    { key: 'remote', label: 'New remote + pairing', unit: 'fixed' },
    { key: 'motor_fault', label: 'Motor / opener repair', unit: 'first_hour' },
    { key: 'shutter_repair', label: 'Roller shutter repair (each)', unit: 'fixed' },
  ],
}

/** "Can you…?" capabilities per trade (step 4). Stored as the list of keys the tradie ticked. */
export const CAPABILITIES: Partial<Record<TradeKey, Capability[]>> = {
  PLUMBER: [
    { key: 'jetter', label: 'Drain jetter' },
    { key: 'camera', label: 'Drain camera' },
    { key: 'leak_detect', label: 'Leak detection' },
    { key: 'gas_licence', label: 'Gas fitting licence' },
  ],
  ELECTRICIAN: [
    { key: 'switchboards', label: 'Switchboard work' },
    { key: 'test_tag', label: 'Test & tag' },
    { key: 'aircon_elec', label: 'Air-con electrical' },
  ],
  GASFITTER: [{ key: 'lpg', label: 'LPG as well as natural gas' }],
  HVAC: [
    { key: 'arc', label: 'ARC licence' },
    { key: 'ducted', label: 'Ducted systems' },
    { key: 'evaporative', label: 'Evaporative systems' },
  ],
  APPLIANCES: [
    { key: 'gas_appliances', label: 'Gas appliances' },
    { key: 'install_new', label: 'Install new appliances' },
  ],
  HANDYMAN: [
    { key: 'trailer', label: 'Own trailer' },
    { key: 'carpentry', label: 'Small carpentry' },
  ],
  CARPENTER: [{ key: 'decks', label: 'Decks & stairs' }],
  PAINTER: [
    { key: 'two_storey', label: 'Two-storey' },
    { key: 'mould', label: 'Mould treatment' },
  ],
  TILER: [{ key: 'waterproof_cert', label: 'Waterproofing certificate (AS 3740)' }],
  PLASTERER: [{ key: 'high_ceilings', label: 'Ceilings above 3m' }],
  ROOFER: [
    { key: 'two_storey', label: 'Two-storey' },
    { key: 'height_gear', label: 'Height safety gear' },
  ],
  GUTTERS: [{ key: 'two_storey', label: 'Two-storey' }],
  LANDSCAPER: [
    { key: 'arborist', label: 'Trees over 4m (arborist)' },
    { key: 'trailer', label: 'Own trailer' },
  ],
  CLEANER: [{ key: 'bond_back', label: 'Bond-back guarantee' }],
  LOCKSMITH: [{ key: 'after_hours', label: 'After-hours lockouts' }],
  GARAGE: [{ key: 'motors', label: 'Supply & install openers' }],
  GLAZIER: [{ key: 'after_hours', label: 'After-hours emergencies' }],
}
export const capabilitiesFor = (t: TradeKey): Capability[] => CAPABILITIES[t] ?? []

/**
 * Items older signups (before signup v2) were priced with. Kept so an old
 * application still shows the right label and approves. Never offered on the form.
 */
export const LEGACY_TRADE_ITEMS: Partial<Record<TradeKey, RateItem[]>> = {
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
  CARPENTER: [
    { key: 'door_hang', label: 'Hang internal door', unit: 'fixed' },
    { key: 'door_hardware', label: 'Replace door handle / lock', unit: 'fixed' },
    { key: 'fence_paling', label: 'Replace fence palings', unit: 'per m' },
    { key: 'flatpack', label: 'Flat-pack assembly', unit: 'per hour' },
  ],
  HANDYMAN: [
    { key: 'door_hang', label: 'Hang internal door', unit: 'fixed' },
    { key: 'door_hardware', label: 'Replace door handle / lock', unit: 'fixed' },
    { key: 'fence_paling', label: 'Replace fence palings', unit: 'per m' },
    { key: 'flatpack', label: 'Flat-pack assembly', unit: 'per hour' },
  ],
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

/** Pre-v2 rate rows that lived at the top level of a trade's rates. */
export const LEGACY_RATE_KEYS = {
  after_hours: { label: 'After-hours hourly rate', unit: 'per hour' },
  min_charge: { label: 'Minimum charge', unit: 'fixed' },
} as const

/** Every everyday job for a trade, in form order. */
export const jobsFor = (trade: TradeKey): RateItem[] => TRADE_ITEMS[trade]

/** Every item a trade's rate card can carry (hourly + call-out + jobs), in form order. */
export const itemsFor = (trade: TradeKey): RateItem[] => [...COMMON_ITEMS, ...TRADE_ITEMS[trade]]

/** Lookup for a stored item key: current catalogue first, then the legacy one. */
export const itemFor = (trade: string, key: string): RateItem | undefined => {
  if (!TRADE_KEYS.includes(trade as TradeKey)) return undefined
  const t = trade as TradeKey
  if (key === 'hourly') return HOURLY_ITEM
  if (key === 'callout') return CALLOUT_ITEM
  return TRADE_ITEMS[t].find((i) => i.key === key) ?? LEGACY_TRADE_ITEMS[t]?.find((i) => i.key === key)
}

/** Short unit suffix shown after a price field. */
export const unitShort = (u: string) =>
  ({ fixed: 'each', first_hour: 'first hr', 'per hour': '/hr', 'per m²': '/m²', 'per m': '/m', 'per room': '/room', 'per load': '/load' })[u] ?? u

// ── Business-wide choices (step 3 and step 5) ─────────────────────

export const CALLOUT_MINUTES = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '60 min' },
  { value: 0, label: 'None' },
] as const
export type CalloutMinutes = (typeof CALLOUT_MINUTES)[number]['value']
export const CALLOUT_MINUTES_DEFAULT: CalloutMinutes = 30
export const calloutLabel = (m: number | null | undefined) =>
  m === undefined || m === null ? 'Call-out fee' : m === 0 ? 'Call-out (no time included)' : `Call-out (incl. first ${m} min)`

export const BILLING_BLOCKS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '60 min' },
] as const
export type BillingBlock = (typeof BILLING_BLOCKS)[number]['value']

export const MATERIALS_MARKUPS = [10, 15, 20, 25, 30] as const

export const TRAVEL_FREE_KM = [10, 20, 30, 50] as const
export type TravelFreeKm = (typeof TRAVEL_FREE_KM)[number]

export const WASTE_OPTIONS = [
  { key: 'INCLUDED', label: 'Included' },
  { key: 'AT_COST', label: 'At cost' },
  { key: 'PER_LOAD', label: '$ per load' },
] as const
export type WasteKey = (typeof WASTE_OPTIONS)[number]['key']

export const YEARS_BANDS = [
  { key: 'LT2', label: 'Under 2' },
  { key: '2_5', label: '2–5' },
  { key: '5_10', label: '5–10' },
  { key: '10P', label: '10+' },
] as const
export type YearsBand = (typeof YEARS_BANDS)[number]['key']

export const TEAM_SIZES = [
  { key: 'SOLO', label: 'Just me' },
  { key: 'APPRENTICE', label: 'Me + apprentice' },
  { key: 'SMALL', label: 'Small team (3–5)' },
  { key: 'LARGE', label: 'Bigger team' },
] as const
export type TeamSize = (typeof TEAM_SIZES)[number]['key']

export const POLICE_CHECKS = [
  { key: 'YES', label: 'Yes' },
  { key: 'NO', label: 'No' },
  { key: 'CAN_GET', label: 'Can get one' },
] as const
export type PoliceCheck = (typeof POLICE_CHECKS)[number]['key']

export const WARRANTY_MONTHS = [
  { value: 0, label: 'None' },
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 12, label: '12 months' },
] as const
export type WarrantyMonths = (typeof WARRANTY_MONTHS)[number]['value']

export const PAYMENT_TERMS_DAYS = [
  { value: 7, label: '7 days' },
  { value: 14, label: '14 days' },
  { value: 30, label: '30 days' },
] as const
export type PaymentTermDays = (typeof PAYMENT_TERMS_DAYS)[number]['value']

export const AVAILABILITY = [
  { key: 'WEEKDAYS', label: 'Weekdays' },
  { key: 'WEEKENDS', label: 'Weekends' },
  { key: 'AFTER_HOURS', label: 'After-hours' },
  { key: 'EMERGENCIES', label: 'Emergencies' },
] as const
export type AvailabilityKey = (typeof AVAILABILITY)[number]['key']

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

const labelOf = <T extends { key: string; label: string }>(list: readonly T[], k: string | null | undefined) =>
  list.find((x) => x.key === k)?.label ?? '—'
export const yearsLabel = (k: string | null | undefined) => labelOf(YEARS_BANDS, k)
export const teamLabel = (k: string | null | undefined) => labelOf(TEAM_SIZES, k)
export const policeLabel = (k: string | null | undefined) => labelOf(POLICE_CHECKS, k)
export const wasteLabel = (k: string | null | undefined) => labelOf(WASTE_OPTIONS, k)
export const warrantyLabel = (m: number | null | undefined) => WARRANTY_MONTHS.find((w) => w.value === m)?.label ?? '—'
export const availabilityLabel = (k: string) => labelOf(AVAILABILITY, k)

/** Rate card as stored on TradieApplication.ratesJson (pre-v2 rows also carry after_hours / min_charge). */
export type TradeRates = {
  hourly: number
  callout: number
  calloutMinutes?: CalloutMinutes // absent on pre-v2 rows
  /** job key → $ amount, or 'POI' (price on inspection) */
  items?: Record<string, number | 'POI'>
  after_hours?: number // pre-v2 only
  min_charge?: number // pre-v2 only
}
export type RatesPayload = Partial<Record<TradeKey, TradeRates>>

/** Business-wide pricing terms (stored as TradieApplication.termsJson). */
export type Terms = {
  billingIncrement: BillingBlock
  /** null = quote / inspection visit is free */
  quoteFee: number | null
  afterHours?: number
  emergencyCallout?: number
  materialsMarkupPct: number
  travelFreeKm?: TravelFreeKm
  travelPerKm?: number
  waste: WasteKey
  wastePerLoad?: number
}

/** Tradie profile (stored as TradieApplication.profileJson). */
export type Profile = {
  yearsBand: YearsBand
  team: TeamSize
  policeCheck: PoliceCheck
  warrantyMonths: WarrantyMonths
  paymentTermsDays: PaymentTermDays[]
  availability: AvailabilityKey[]
}

export type CapabilitiesPayload = Partial<Record<TradeKey, string[]>>

export const money = (n: number) =>
  `$${n.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`

/** One TradieRate-shaped row. amount is null when the price is on inspection. */
export type FlatRate = { itemKey: string; label: string; unit: string; amount: number | null; priceOnInspection: boolean }

/**
 * Flatten a trade's rates into TradieRate-shaped rows. Labels and units come
 * from this file (or the stored legacy catalogue), never from the submission.
 * Unknown keys are dropped.
 */
export function flattenRates(trade: TradeKey, r: TradeRates): FlatRate[] {
  const out: FlatRate[] = []
  out.push({ itemKey: 'hourly', label: HOURLY_ITEM.label, unit: HOURLY_ITEM.unit, amount: r.hourly, priceOnInspection: false })
  out.push({ itemKey: 'callout', label: calloutLabel(r.calloutMinutes), unit: CALLOUT_ITEM.unit, amount: r.callout, priceOnInspection: false })
  if (typeof r.after_hours === 'number') out.push({ itemKey: 'after_hours', ...LEGACY_RATE_KEYS.after_hours, amount: r.after_hours, priceOnInspection: false })
  if (typeof r.min_charge === 'number') out.push({ itemKey: 'min_charge', ...LEGACY_RATE_KEYS.min_charge, amount: r.min_charge, priceOnInspection: false })
  for (const [k, v] of Object.entries(r.items ?? {})) {
    const it = itemFor(trade, k)
    if (!it || k === 'hourly' || k === 'callout') continue
    if (v === 'POI') out.push({ itemKey: k, label: it.label, unit: it.unit, amount: null, priceOnInspection: true })
    else if (typeof v === 'number') out.push({ itemKey: k, label: it.label, unit: it.unit, amount: v, priceOnInspection: false })
  }
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
  APPLIANCES: 'Appliances', GARAGE: 'Garage doors',
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
    ['appliance', 'APPLIANCES'], ['garage', 'GARAGE'], ['shutter', 'GARAGE'],
  ]
  return stems.find(([s]) => t.includes(s))?.[1] ?? null
}

/** Rough guess of the trade a job needs from its scope text, to pre-select the tradie list. */
export function guessTradeFromScope(scope: string | null | undefined): TradeKey | null {
  const s = (scope ?? '').toLowerCase()
  const rules: [RegExp, TradeKey][] = [
    [/\b(dishwasher|oven|cooktop|rangehood|range hood)/, 'APPLIANCES'],
    [/\b(garage|roller shutter)/, 'GARAGE'],
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
