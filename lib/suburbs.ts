// Adelaide suburb coverage list — used for ServiceArea section + schema areaServed.
// Grouped by region for SEO context. Add/remove as actual coverage changes.

export type SuburbGroup = {
  region: string
  suburbs: string[]
}

export const SUBURB_GROUPS: SuburbGroup[] = [
  {
    region: 'CBD + Inner',
    suburbs: [
      'Adelaide CBD',
      'North Adelaide',
      'Norwood',
      'Kent Town',
      'Stepney',
      'Glenside',
      'Parkside',
      'Eastwood',
    ],
  },
  {
    region: 'East',
    suburbs: [
      'Magill',
      'Burnside',
      'Beulah Park',
      'Glenunga',
      'Toorak Gardens',
      'Marryatville',
      'Erindale',
      'Rosslyn Park',
    ],
  },
  {
    region: 'West + Coast',
    suburbs: [
      'Hindmarsh',
      'Henley Beach',
      'Glenelg',
      'Brighton',
      'Seacliff',
      'West Beach',
      'Grange',
      'Semaphore',
    ],
  },
  {
    region: 'South',
    suburbs: [
      'Unley',
      'Mitcham',
      'Blackwood',
      'Bedford Park',
      'Marion',
      'Aberfoyle Park',
      'Flagstaff Hill',
      'Seacombe Gardens',
    ],
  },
  {
    region: 'North',
    suburbs: [
      'Prospect',
      'Walkerville',
      'Enfield',
      'Salisbury',
      'Modbury',
      'Tea Tree Gully',
      'Mawson Lakes',
      'Greenwith',
    ],
  },
  {
    region: 'Hills',
    suburbs: ['Stirling', 'Aldgate', 'Mount Barker', 'Hahndorf', 'Crafers', 'Bridgewater'],
  },
]

// Flat list for schema + flat chip rendering.
export const ALL_SUBURBS: string[] = SUBURB_GROUPS.flatMap((g) => g.suburbs)
