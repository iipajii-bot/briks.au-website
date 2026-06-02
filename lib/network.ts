/**
 * Anonymized tradie network.
 *
 * Why anonymized:
 * - Bench composition shifts. Pinning identities to a marketing page locks
 *   us into specific people we may rotate off for cause.
 * - Tradies prefer it — they don't want their personal name on lead-gen
 *   funnels for someone else's brand.
 * - Customer-facing point: you get the *right specialist for the job*, not
 *   the closest body. Anonymity reinforces that.
 *
 * Data is illustrative — real bench updates as relationships form.
 */

export type NetworkTradie = {
  trade: string
  yearsExperience: number
  area: string // suburb cluster
  licenseType: string // SA-specific license / cert
  insurance: string // public liability headline
  speciality?: string // optional — "heritage homes", "commercial fit-out" etc
}

export const NETWORK_TRADIES: NetworkTradie[] = [
  {
    trade: 'Plumber',
    yearsExperience: 14,
    area: 'Eastern suburbs',
    licenseType: 'PIC license · Master Plumber',
    insurance: '$20M public liability',
    speciality: 'Heritage drainage + waterproofing',
  },
  {
    trade: 'Plumber',
    yearsExperience: 9,
    area: 'Western + coastal',
    licenseType: 'PIC license · gas-fitter ticket',
    insurance: '$10M public liability',
    speciality: 'Hot water + gas appliance',
  },
  {
    trade: 'Electrician',
    yearsExperience: 18,
    area: 'Metro-wide',
    licenseType: 'A-grade electrical license',
    insurance: '$20M public liability',
    speciality: 'Switchboard upgrades + safety switches',
  },
  {
    trade: 'Electrician',
    yearsExperience: 7,
    area: 'Northern suburbs',
    licenseType: 'A-grade electrical license',
    insurance: '$10M public liability',
    speciality: 'Smart-home + EV charging',
  },
  {
    trade: 'Carpenter',
    yearsExperience: 22,
    area: 'CBD + Eastern',
    licenseType: 'Cert IV Building · BLD license',
    insurance: '$20M public liability',
    speciality: 'Custom joinery + structural',
  },
  {
    trade: 'Painter',
    yearsExperience: 16,
    area: 'Metro-wide',
    licenseType: 'BLD painter contractor license',
    insurance: '$10M public liability',
    speciality: 'Heritage + low-VOC interiors',
  },
  {
    trade: 'Tiler',
    yearsExperience: 12,
    area: 'Metro-wide',
    licenseType: 'Cert III Wall + Floor Tiling · waterproofing ticket',
    insurance: '$10M public liability',
    speciality: 'Wet-area waterproofing to AS 3740',
  },
  {
    trade: 'Roofer',
    yearsExperience: 19,
    area: 'Metro + Hills',
    licenseType: 'BLD roof plumber license · working-at-heights',
    insurance: '$20M public liability',
    speciality: 'Storm repair + re-pointing',
  },
  {
    trade: 'Gutter specialist',
    yearsExperience: 11,
    area: 'Metro-wide',
    licenseType: 'Working-at-heights · roof plumber ticket',
    insurance: '$10M public liability',
    speciality: 'Replacement + leaf protection',
  },
  {
    trade: 'Gas fitter',
    yearsExperience: 15,
    area: 'Metro-wide',
    licenseType: 'PIC license · Type A gas-fitter',
    insurance: '$20M public liability',
    speciality: 'Cooktop + hot water swap-outs',
  },
  {
    trade: 'HVAC technician',
    yearsExperience: 13,
    area: 'Metro + Southern',
    licenseType: 'ARC refrigerant handling · electrical cert',
    insurance: '$10M public liability',
    speciality: 'Split + ducted reverse cycle',
  },
  {
    trade: 'Handyman',
    yearsExperience: 21,
    area: 'Metro-wide',
    licenseType: 'BLD handyman license · WHS cert',
    insurance: '$10M public liability',
    speciality: 'Multi-task EOL + maintenance',
  },
]

export type VetCheck = {
  title: string
  body: string
}

export const VET_CHECKS: VetCheck[] = [
  {
    title: 'License + ticket verified',
    body: "We pull the live record from CBS or the trade's licensing body before the first job — and re-check on renewal.",
  },
  {
    title: 'Insurance current',
    body: 'Certificate of currency on file for every tradie. We refuse to dispatch when a policy lapses, full stop.',
  },
  {
    title: 'Two-job trial',
    body: 'New tradies run two paid jobs at our risk before they go on the regular bench. We watch the work, the comms, and the cleanup.',
  },
  {
    title: 'Customer feedback loop',
    body: 'Every job ends with a 30-second customer review. Two soft strikes and the tradie comes off rotation while we investigate.',
  },
]
