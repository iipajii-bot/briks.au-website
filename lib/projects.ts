// Real project entries — populate as photos + outcomes land.
// Component reads SITE.features.showProjectGallery flag; section hides until true.

export type Trade =
  | 'plumbing'
  | 'electrical'
  | 'roofing'
  | 'carpentry'
  | 'general'
  | 'hvac'
  | 'glazing'
  | 'gyprock'
  | 'concreting'
  | 'landscaping'

export type ProjectSpan = 'large' | 'medium' | 'small'

export type Project = {
  id: string
  image: string // /projects/<filename>
  title: string // 'Burst pipe — late-night response'
  suburb: string
  trade: Trade
  span: ProjectSpan
  blurb?: string
}

// Empty until photos arrive. Add real entries below.
export const PROJECTS: Project[] = []

// Placeholder tiles — render when PROJECTS empty so layout still demos.
// Remove this export once real PROJECTS populated.
export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 'placeholder-1',
    image: '',
    title: 'Hot-water replacement',
    suburb: 'Norwood',
    trade: 'plumbing',
    span: 'large',
    blurb: 'Same-day hot-water unit swap. Tenant back to hot water before dinner.',
  },
  {
    id: 'placeholder-2',
    image: '',
    title: 'Switchboard upgrade',
    suburb: 'Glenelg',
    trade: 'electrical',
    span: 'medium',
    blurb: 'Old fuse box replaced with RCD-protected switchboard, certified.',
  },
  {
    id: 'placeholder-3',
    image: '',
    title: 'Roof leak repair',
    suburb: 'Mitcham',
    trade: 'roofing',
    span: 'small',
    blurb: 'Storm-damage flashing replaced. Documented for insurance.',
  },
  {
    id: 'placeholder-4',
    image: '',
    title: 'End-of-lease make-ready',
    suburb: 'Magill',
    trade: 'general',
    span: 'small',
    blurb: 'Patch + paint + carpet steam. Bond-ready, fast turnaround.',
  },
  {
    id: 'placeholder-5',
    image: '',
    title: 'Split-system install',
    suburb: 'Prospect',
    trade: 'hvac',
    span: 'small',
    blurb: 'Reverse-cycle unit installed and certified same morning.',
  },
  {
    id: 'placeholder-6',
    image: '',
    title: 'Window replacement',
    suburb: 'Henley Beach',
    trade: 'glazing',
    span: 'small',
    blurb: 'Cracked frame + glass replaced. Re-sealed weatherproof.',
  },
]

export const TRADE_LABELS: Record<Trade, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  roofing: 'Roofing',
  carpentry: 'Carpentry',
  general: 'General maintenance',
  hvac: 'HVAC',
  glazing: 'Glazing',
  gyprock: 'Gyprock',
  concreting: 'Concreting',
  landscaping: 'Landscaping',
}
