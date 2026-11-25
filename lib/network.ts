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
    licenseType: 'Licensed in South Australia for plumbing work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Heritage drainage + waterproofing',
  },
  {
    trade: 'Plumber',
    yearsExperience: 9,
    area: 'Western + coastal',
    licenseType: 'Licensed in South Australia for gas fitting work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Hot water + gas appliance',
  },
  {
    trade: 'Electrician',
    yearsExperience: 18,
    area: 'Metro-wide',
    licenseType: 'Licensed in South Australia for electrical work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Switchboard upgrades + safety switches',
  },
  {
    trade: 'Electrician',
    yearsExperience: 7,
    area: 'Northern suburbs',
    licenseType: 'Licensed in South Australia for electrical work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Smart-home + EV charging',
  },
  {
    trade: 'Carpenter',
    yearsExperience: 22,
    area: 'CBD + Eastern',
    licenseType: 'Licensed in South Australia for building work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Custom joinery + structural',
  },
  {
    trade: 'Painter',
    yearsExperience: 16,
    area: 'Metro-wide',
    licenseType: 'Licensed in South Australia for painting work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Heritage + low-VOC interiors',
  },
  {
    trade: 'Tiler',
    yearsExperience: 12,
    area: 'Metro-wide',
    licenseType: 'Cert III Wall + Floor Tiling · waterproofing ticket',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Wet-area waterproofing to AS 3740',
  },
  {
    trade: 'Roofer',
    yearsExperience: 19,
    area: 'Metro + Hills',
    licenseType: 'Licensed in South Australia for plumbing work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Storm repair + re-pointing',
  },
  {
    trade: 'Gutter specialist',
    yearsExperience: 11,
    area: 'Metro-wide',
    licenseType: 'Working-at-heights · roof plumber ticket',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Replacement + leaf protection',
  },
  {
    trade: 'Gas fitter',
    yearsExperience: 15,
    area: 'Metro-wide',
    licenseType: 'Licensed in South Australia for gas fitting work',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Cooktop + hot water swap-outs',
  },
  {
    trade: 'HVAC technician',
    yearsExperience: 13,
    area: 'Metro + Southern',
    licenseType: 'ARC refrigerant handling · electrical cert',
    insurance: 'Licensed in South Australia for their own work',
    speciality: 'Split + ducted reverse cycle',
  },
  {
    trade: 'Handyman',
    yearsExperience: 21,
    area: 'Metro-wide',
    licenseType: 'Licensed in South Australia for their trade',
    insurance: 'Licensed in South Australia for their own work',
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
    body: "The work is done by independent trades licensed in South Australia for their own work.",
  },
  {
    title: 'Licensed in South Australia for their trade',
    body: 'Ask each independent trade for their certificate of currency before work starts.',
  },
  {
    title: 'Two-job trial',
    body: 'New trades must be licensed in South Australia for their own work.',
  },
  {
    title: 'Customer feedback loop',
    body: 'Every job ends with a 30-second customer review. Two soft strikes and the tradie comes off rotation while we investigate.',
  },
]
