/**
 * Trade-specific landing page data.
 * Drives /services/[trade] dynamic route.
 *
 * Keyword clusters built per ai-seo skill:
 * - primary: highest-volume Adelaide-local query
 * - longTail: 6-8 specific intent variations
 * - faqs: 8 question-format keywords (Q + A) — primed for AI Overview citation
 *   + Article/FAQPage schema lifts citation rate ~30-40%
 * - relatedTrades: cross-link cluster
 *
 * Body copy follows /copywriting skill: voice = dry, confident, slightly
 * underdog Australian. No exclamation marks. No "amazing." Concrete > abstract.
 */

export type TradeFAQ = { q: string; a: string }

export type Trade = {
  slug: string
  name: string // display name e.g. "Plumbing"
  noun: string // tradesperson noun e.g. "Plumber"
  primaryKeyword: string
  metaTitle: string
  metaDescription: string
  hero: {
    eyebrow: string
    headline: string
    headlineAccent: string
    subhead: string
  }
  longTail: string[]
  /** Common jobs we handle — keyword-rich bullets, no pricing. */
  commonJobs: string[]
  /** What's involved — process explainer paragraphs. */
  whatsInvolved: string[]
  /** Standards / certifications — credibility. */
  standards: { label: string; body: string }[]
  /** When to call vs DIY — honest carve-out. */
  whenToCall: { call: string[]; diy: string[] }
  faqs: TradeFAQ[]
  relatedTrades: string[] // slugs
}

export const TRADES: Trade[] = [
  // 1. PLUMBING
  {
    slug: 'plumbing',
    name: 'Plumbing',
    noun: 'Plumber',
    primaryKeyword: 'Plumber Adelaide',
    metaTitle: 'Plumber in Adelaide: Leaks, Drains, Hot Water | Briks',
    metaDescription:
      'Briks coordinates independent plumbers and gas fitters licensed in South Australia. Blocked drains, leaking taps, hot water, gas plumbing. One number, one invoice.',
    hero: {
      eyebrow: 'Plumbing — Adelaide',
      headline: 'Licensed plumbers.',
      headlineAccent: 'Picked, briefed, on site.',
      subhead:
        'Briks coordinates independent plumbers and gas fitters licensed in South Australia. Blocked drains, leaking taps, dead hot water systems, gas plumbing, slow leaks under tiles.',
    },
    longTail: [
      'emergency plumber Adelaide',
      'blocked drain Adelaide',
      'hot water repair Adelaide',
      'leaking tap repair Adelaide',
      'gas plumbing Adelaide',
      'plumber Adelaide',
      'hot water system replacement SA',
    ],
    commonJobs: [
      'Blocked drains, sinks, toilets, and stormwater pits',
      'Burst pipes and slow leaks (including the ones tracking under tiles)',
      'Hot water system repair and replacement — gas, electric, heat pump',
      'Leaking tap, mixer, and shower head replacement',
      'Toilet repair and replacement (cistern, pan, full suite)',
      'Gas plumbing — cooktop, oven, and hot water connections',
      'Tap pressure issues and water hammer fixes',
      'Pipe relocation for kitchen and bathroom renovations',
      'Hot water relief valve and tempering valve replacements',
      'Backflow prevention device testing and certification',
    ],
    whatsInvolved: [
      'A plumber licensed in South Australia attends and scopes the fault on-site. Homeowners and businesses get a written quote before work starts. Landlords and agencies set an approval limit, and anything over it is quoted first.',
      'If anyone is in danger, call 000. Gas smell: leave the area, do not use switches or flames, call Australian Gas Networks on 1800 427 532. For an active water leak or burst pipe, turn the water off at the meter if safe. Briks can organise the repair afterwards once it is safe.',
      'For each finished plumbing job, Briks gives you before and after photos and one invoice. For an insurance claim or landlord report, you get the paperwork with the finished job.',
    ],
    standards: [
      {
        label: 'Licensed in South Australia for plumbing work',
        body: 'Plumbers Briks organises are independent trades licensed in South Australia for plumbing work.',
      },
      {
        label: 'AS 3500 plumbing and drainage standard',
        body: 'Plumbing work must meet Australian Standard AS 3500 (plumbing and drainage). The work is done by trades licensed in South Australia for plumbing work.',
      },
      {
        label: 'Ask about public liability insurance',
        body: 'Ask each trade about public liability insurance. Briks organises the work; the trade is licensed in South Australia for their own work.',
      },
    ],
    whenToCall: {
      call: [
        'Active leak — water visible, ceiling staining, or damp patches spreading',
        'No hot water (especially with a tenant in the property)',
        'Burst pipe or main shut-off needed',
        'Gas smell — call us and turn the meter off at the street',
        'Slow leak you cannot trace (it is almost never where the wet patch is)',
        'Hot water replacement: gas-to-electric or heat pump conversions need a plumber licensed in South Australia for plumbing work',
        'Anything connected to the gas line — illegal for an unlicensed person to touch',
      ],
      diy: [
        'Plunging a basic toilet block: try this first',
        'Replacing a tap washer if you have done one before',
        'Cleaning a slow drain with hot water and bicarb',
        'Resetting a tripped electric hot water unit (read the manual first)',
      ],
    },
    faqs: [
      {
        q: 'How much does a plumber cost in Adelaide?',
        a: 'Adelaide plumber rates vary widely by job type. A blocked drain clear typically costs less than a hot water replacement, which costs less than a gas line install. Briks does not publish rates because every job is sized differently. A licensed plumber looks at the job and you get a written quote before work starts.',
      },
      {
        q: 'Are plumbers licensed in South Australia?',
        a: 'Yes. Plumbing work is done by independent trades licensed in South Australia for plumbing work.',
      },
      {
        q: 'What does a South Australian trade licence mean?',
        a: 'Trades are licensed in South Australia for their own work. Briks coordinates the work and is not a licensed builder, plumber, electrician or gas fitter.',
      },
      {
        q: 'Who do I call for a burst pipe in Adelaide?',
        a: 'For a burst pipe, turn the water off at the meter if it is safe. Then contact Briks during business hours to organise the repair.',
      },
      {
        q: 'Can a plumber install a gas hot water system?',
        a: 'Gas hot water systems must be installed by a trade licensed in South Australia for gas fitting work. Briks coordinates the work through independent licensed trades.',
      },
      {
        q: 'How quickly can a plumber attend in Adelaide?',
        a: 'Briks does not offer emergency callouts or after-hours cover. It can organise repairs during business hours. Homeowners and businesses get a written quote before work starts.',
      },
      {
        q: 'What is covered by plumbing insurance?',
        a: 'Plumbing work organised by Briks is done by independent trades licensed in South Australia for plumbing work. Briks gives no workmanship warranty of its own. Manufacturer warranties on products may apply; check the terms.',
      },
      {
        q: 'Do you service my suburb?',
        a: 'Briks plumbers cover the full Adelaide metropolitan area — eastern, western, northern, southern, and CBD. Hills and outer suburbs by arrangement. Quickest way to confirm: send the address via WhatsApp.',
      },
    ],
    relatedTrades: ['gas', 'tiling', 'handyman'],
  },

  // 2. ELECTRICAL
  {
    slug: 'electrical',
    name: 'Electrical',
    noun: 'Electrician',
    primaryKeyword: 'Electrician Adelaide',
    metaTitle: 'Electrician in Adelaide: Power, Lights, Switchboards | Briks',
    metaDescription:
      'Electrical jobs across Adelaide are handled by independent trades licensed in South Australia for electrical work. Switchboard upgrades, safety switches, EV chargers, smoke alarms. Briks coordinates the job: one number, one invoice from Briks.',
    hero: {
      eyebrow: 'Electrical — Adelaide',
      headline: 'Electrical trades licensed in South Australia.',
      headlineAccent: 'No shortcuts.',
      subhead:
        'Switchboard upgrades, safety switches, EV chargers, smoke alarm replacement, and power outages. Briks organises the work, and the electricians are licensed in South Australia for electrical work. Power out or wires down: call SA Power Networks on 13 13 66.',
    },
    longTail: [
      'Electrical work Adelaide',
      'switchboard upgrade Adelaide',
      'safety switch installation Adelaide',
      'EV charger installation Adelaide',
      'smoke alarm replacement SA',
      'ceiling fan installation Adelaide',
      'emergency electrician Adelaide',
    ],
    commonJobs: [
      'Switchboard upgrades — including ceramic-fuse to circuit-breaker conversion',
      'Safety switch (RCD) installation and testing',
      'EV charger installation (single and three-phase)',
      'Hardwired smoke alarm replacement to AS 3786. Check SA rental requirements.',
      'Power point additions, relocations, and replacements',
      'Ceiling fan and pendant light installation',
      'LED downlight replacement (low-voltage to mains-rated)',
      'Stove and oven hardwiring',
      'Solar isolator and inverter fault-finding',
      'No-power and tripping circuit emergency callouts',
    ],
    whatsInvolved: [
      'An electrician licensed in South Australia for electrical work attends and identifies the circuit and load involved. Homeowners and businesses get a written quote before work starts. For switchboard work, the electrician checks the existing board and quotes the work.',
      'Power out or wires down: call SA Power Networks on 13 13 66. Once it is safe, Briks can organise an electrician licensed in South Australia for electrical work. Homeowners and businesses get a written quote before work starts.',
      'Every notifiable electrical job is lodged with the Office of the Technical Regulator. You get the Certificate of Compliance the same week.',
    ],
    standards: [
      {
        label: 'Electrical licence in South Australia',
        body: 'The electricians Briks organises are independent trades licensed in South Australia for electrical work.',
      },
      {
        label: 'AS/NZS 3000 wiring rules',
        body: 'All work complies with AS/NZS 3000 (the Wiring Rules). We do not cut corners on conduit, depth, or RCD coverage — even on small jobs.',
      },
      {
        label: 'Certificate of Compliance',
        body: 'Every notifiable job is lodged with the SA Office of the Technical Regulator. You receive a copy of the eCoC for your records and your insurer.',
      },
    ],
    whenToCall: {
      call: [
        'Switchboard sparking, buzzing, or warm to touch — turn the main off and call us',
        'Repeated tripping that resets and trips again',
        'Burning smell from any outlet, switch, or appliance',
        'No power to one circuit (oven, hot water, lights) while the rest works',
        'Anything involving the meter box or main switch — illegal for an unlicensed person',
        'EV charger install (mandatory licensed work in SA)',
        'Smoke alarm replacement in a rental — non-negotiable for compliance',
      ],
      diy: [
        'Resetting a tripped circuit (once — repeat trips need a sparky)',
        'Replacing a globe in an existing fitting',
        'Changing 9V smoke alarm batteries (hardwired alarm replacement is licensed work)',
        'Plugging in a portable appliance and testing it on a known-working outlet',
      ],
    },
    faqs: [
      {
        q: 'What does a licensed electrician do?',
        a: 'An electrician licensed in South Australia for electrical work can design, install, alter and repair electrical installations. That includes switchboard work. Ask for the licence details for the work you need.',
      },
      {
        q: 'Do I need a licensed electrician in SA?',
        a: 'Yes. All electrical work in South Australia other than plugging in a pre-wired appliance must be carried out by a person licensed in South Australia for electrical work. Unlicensed work is illegal under the Plumbers, Gas Fitters and Electricians Act.',
      },
      {
        q: 'How much is a switchboard upgrade?',
        a: 'Switchboard upgrades vary widely depending on whether it is a like-for-like board swap, a ceramic-fuse to circuit-breaker conversion, or a full meter-box rework. Briks attends, photographs the board, and quotes in writing. We do not estimate switchboard work over the phone.',
      },
      {
        q: 'When should I replace my switchboard?',
        a: 'Replace a switchboard when it has ceramic fuses (1980s and earlier), no safety switches (RCDs), visible scorching or melting, frequent unexplained tripping, or when adding heavy load (EV charger, ducted aircon, solar). A ceramic-fuse board is a known fire risk and most insurers now flag it.',
      },
      {
        q: 'Are smoke alarms mandatory in SA rentals?',
        a: 'Yes. South Australian residential tenancy law requires hardwired or 10-year sealed-battery smoke alarms in every bedroom and on every level. The landlord is responsible for replacement. Hardwired units must be replaced by an electrician licensed in South Australia for electrical work.',
      },
      {
        q: 'Can you install an EV charger at home?',
        a: 'Yes. EV charger installation must be done by an electrician licensed in South Australia for electrical work. Briks organises the installation of single-phase wall-mounted chargers (Tesla, Zappi, Wallbox) and three-phase fast chargers, with the electrician assessing switchboard capacity before quoting.',
      },
      {
        q: 'What is a safety switch?',
        a: 'A safety switch (RCD — Residual Current Device) cuts power within 30 milliseconds when it detects current leaking to earth — usually because someone has touched a live wire. Required on all power and lighting circuits in SA homes built after 1991, and strongly recommended as a retrofit for older houses.',
      },
      {
        q: 'How fast can you respond to no-power calls?',
        a: 'For a power outage or wires down, call SA Power Networks on 13 13 66. If anyone is in danger, call 000. Briks can organise the repair afterwards once it is safe.',
      },
    ],
    relatedTrades: ['hvac', 'gas', 'handyman'],
  },

  // 3. CARPENTRY
  {
    slug: 'carpentry',
    name: 'Carpentry',
    noun: 'Carpenter',
    primaryKeyword: 'Carpenter Adelaide',
    metaTitle: 'Carpenter in Adelaide: Doors, Decks, Built-ins | Briks',
    metaDescription:
      'Adelaide carpenters and joiners. Custom built-ins, decks, door installation, skirting and architraves, structural repair, timber floor work. Independent trades, written quotes for homeowners and businesses, one invoice from Briks.',
    hero: {
      eyebrow: 'Carpentry — Adelaide',
      headline: 'Carpenters who measure twice.',
      headlineAccent: 'And turn up.',
      subhead:
        'Custom joinery, decks, door hangs that close properly, structural timber, skirting and architrave replacement. Briks organises independent carpenters for this work.',
    },
    longTail: [
      'custom joinery Adelaide',
      'deck builder Adelaide',
      'door installation Adelaide',
      'skirting board replacement Adelaide',
      'built-in wardrobe Adelaide',
      'structural carpentry SA',
      'timber repair Adelaide',
    ],
    commonJobs: [
      'Custom built-in wardrobes and bookcases',
      'Kitchen and bathroom carcasses for renovation work',
      'Deck and pergola construction (treated pine, merbau, modwood)',
      'Door hanging — internal, external, and bifold',
      'Skirting, architrave, and cornice replacement (heritage profiles matched)',
      'Floorboard repair, replacement, and lift-and-relay',
      'Stair tread, riser, and balustrade work',
      'Structural timber — bearer, joist, and stud replacement',
      'Roof truss repair after storm or pest damage',
      'Window and door frame repair (heritage and modern)',
    ],
    whatsInvolved: [
      'A carpenter attends, measures, and discusses material options on-site. Custom joinery is drawn before any timber is ordered — you sign off on the drawing, then we build.',
      'For decks and pergolas, we check footings, council setback, and (where required) handle the building consent paperwork. No surprises mid-build.',
      'Heritage work is matched to the existing profile — we mill replacement skirting and architrave to match 1900s and 1920s Adelaide homes. Photos and a sample for sign-off before installation.',
    ],
    standards: [
      {
        label: 'Independent trades',
        body: 'For structural work and decks, Briks organises independent trades, each licensed in South Australia for their own work.',
      },
      {
        label: 'AS 1684 timber framing',
        body: 'Structural timber framing is covered by Australian Standard AS 1684 (residential timber-framed construction), including span tables, bracing and tie-down.',
      },
      {
        label: 'BCA + council compliance',
        body: 'Decks, pergolas, and structural alterations are designed and built to the National Construction Code (BCA Vol 2). Where consent is required, we manage the application.',
      },
    ],
    whenToCall: {
      call: [
        'Anything structural — roof, walls, floor framing',
        'Deck or pergola over 1m above ground (consent needed)',
        'Door that has dropped, twisted, or no longer latches',
        'Heritage skirting, architrave, or cornice damage (profile-matching is skilled work)',
        'Built-in wardrobe or storage you actually want to last',
        'Pest or rot damage in framing or bearers',
        'Floorboards lifting, springing, or squeaking badly',
      ],
      diy: [
        'Hanging a picture or shelf into a stud (use a stud-finder)',
        'Tightening loose hinges with longer screws',
        'Sanding and re-coating a small floorboard scratch',
        'Flat-pack assembly (handyman job — cheaper than a carpenter)',
      ],
    },
    faqs: [
      {
        q: 'Do carpenters need a license in SA?',
        a: 'Briks coordinates independent carpenters who are licensed in South Australia for their own work. For structural work or decks, ask to see the licence for the job.',
      },
      {
        q: 'What is the difference between a carpenter and a joiner?',
        a: 'A carpenter works with structural and on-site timber: framing, decks, doors, floors. A joiner makes finished timber components: cabinets, wardrobes, joinery, usually in a workshop. Briks coordinates both trades and organises the job.',
      },
      {
        q: 'Can a carpenter fix structural issues?',
        a: 'A carpenter licensed in South Australia for the work can repair and replace structural timber, such as bearers, joists, studs, roof trusses and stair stringers, where the work is like-for-like. Anything that changes load paths needs a structural engineer’s certificate. Briks organises the repair.',
      },
      {
        q: 'How much does a custom wardrobe cost?',
        a: 'Custom wardrobe pricing depends on cabinet width, internal layout, door type (sliding, hinged, mirrored), and finish. Briks measures on-site, draws the cabinet, and quotes in writing before any timber is ordered. No estimating off room dimensions over the phone.',
      },
      {
        q: 'Do you build decks in Adelaide?',
        a: 'Yes. Briks builds decks across Adelaide using treated pine, merbau, and composite board (Modwood, NewTechWood). We handle footings, drainage, and council consent paperwork where required for decks above 1m.',
      },
      {
        q: 'Can you replace damaged floorboards?',
        a: 'Yes. We lift damaged floorboards, replace with profile-matched timber (including heritage Baltic and Cypress), and refinish in place where possible. Whole-room replacement and re-sanding is also offered for badly damaged floors.',
      },
      {
        q: 'What timbers do you use?',
        a: 'For structural work, MGP10/MGP12 pine and LVL for engineered loads. For decks, treated pine (H3/H4), merbau, and composite. For interior joinery, MDF cores with timber veneer or 2-pack finish — and solid timber where the brief calls for it.',
      },
      {
        q: 'How long does door installation take?',
        a: 'A standard internal door swap (existing frame, like-for-like door) takes 1-2 hours. A new external door including weather-seal and lockset takes 3-4 hours. New frame and door — half a day. Brick or solid-render walls add time.',
      },
    ],
    relatedTrades: ['painting', 'handyman', 'tiling'],
  },

  // 4. PAINTING
  {
    slug: 'painting',
    name: 'Painting',
    noun: 'Painter',
    primaryKeyword: 'Painter Adelaide',
    metaTitle: 'Painter in Adelaide: Interior and Exterior | Briks',
    metaDescription:
      'Adelaide painters for interior, exterior, heritage facades, end-of-lease repaints. Low-VOC options, profile-matched cutting in, careful prep. Independent trades, one invoice from Briks.',
    hero: {
      eyebrow: 'Painting — Adelaide',
      headline: 'The cut-in tells you',
      headlineAccent: 'who you hired.',
      subhead:
        'Interior repaints, weatherboard, render, heritage facades, end-of-lease patch-and-paint. Briks painters prep first, paint second — sand, fill, undercoat, and only then top-coat. The work shows in five years.',
    },
    longTail: [
      'house painter Adelaide',
      'interior painting Adelaide',
      'exterior painting Adelaide',
      'low-VOC paint SA',
      'heritage painting Adelaide',
      'rental repaint Adelaide',
      'end of lease painting Adelaide',
    ],
    commonJobs: [
      'Full interior repaints (walls, ceilings, trim) in occupied or vacant homes',
      'Exterior weatherboard, render, and brick painting',
      'Heritage facade repaints with original profile preservation',
      'Ceiling-only work (water staining, smoke damage)',
      'Trim and skirting refresh in heritage profiles',
      'End-of-lease patch, fill, and paint to make-good standard',
      'Roof painting (terracotta and metal — coordinated w/ roofer for prep)',
      'Feature wall and accent colour application',
      'Door, frame, and architrave gloss work',
      'Gate, fence, and pergola staining and painting',
    ],
    whatsInvolved: [
      'Walk-through first. We agree the colour, sheen, and prep level on-site — paint catalogue or your own samples. We point out hidden costs (rust spots in render, lead paint in pre-1970 homes) before quoting.',
      'Prep is most of the cost and most of the longevity. Sand, fill, dust, undercoat where bare. We do not paint over loose paint and call it done — that is why exterior work falls off in two years elsewhere.',
      'Two top coats is standard. Cutting in by brush, rolled out for body. Drop sheets, masked frames, daily clean-down. You can move furniture back the next morning on water-based work.',
    ],
    standards: [
      {
        label: 'Painter licence',
        body: 'The painters Briks coordinates are independent trades licensed in South Australia for their own work. Homeowners and businesses get a written quote before work starts.',
      },
      {
        label: 'AS/NZS 2311 painting standard',
        body: 'Surface prep, primer selection, and top-coat application follow AS/NZS 2311 (Painting of Buildings). Hot-weather application limits respected — we do not spray render at 38°C.',
      },
      {
        label: 'Low-VOC and SA-approved paints',
        body: 'We use Dulux, Taubmans, and Wattyl product lines — including their low-VOC and zero-VOC ranges. Heritage work uses British Paints or matched alternatives where original spec calls for it.',
      },
    ],
    whenToCall: {
      call: [
        'Whole-room or whole-house repaints',
        'Exterior work above one storey',
        'Heritage homes (pre-1970 — lead paint risk)',
        'Render or stucco patch-and-paint',
        'End-of-lease repaint where bond is on the line',
        'Roof painting (terracotta, Colorbond, Zincalume)',
        'Anything that needs scaffold or two-storey ladders',
      ],
      diy: [
        'A single feature wall in a low-traffic room',
        'Touch-up of existing paint where you have the original tin',
        'Garden fence panels at ground level',
        'Re-coating a small piece of furniture',
      ],
    },
    faqs: [
      {
        q: 'How much does it cost to paint a 3-bed house in Adelaide?',
        a: 'A full 3-bed interior repaint in Adelaide depends on ceiling height, prep required (filling, lead paint), trim coverage, and finish chosen. Briks attends, measures wall and ceiling area, and quotes in writing — no per-square-metre estimating that misses the prep work.',
      },
      {
        q: 'What paint is best for SA conditions?',
        a: 'For Adelaide exteriors, Dulux Weathershield or Taubmans All-Weather hold up best against UV and the temperature swings. For interiors, low-VOC water-based acrylics (Dulux Wash & Wear, Taubmans Endure) clean easily and are safe for occupied homes.',
      },
      {
        q: 'Do you do low-VOC paint?',
        a: 'Yes. Briks painters use low-VOC and zero-VOC ranges from Dulux (envirO2), Taubmans (Pure Performance), and Wattyl (ID Advanced). Recommended for nurseries, asthma-sensitive households, and occupied homes.',
      },
      {
        q: 'How long does an interior repaint take?',
        a: 'A full 3-bedroom interior typically takes 4-6 working days including prep, two top coats on walls and ceilings, and trim work. Single rooms are 1-2 days. We confirm the schedule and daily plan in writing before starting.',
      },
      {
        q: 'Can you paint a heritage facade?',
        a: 'Yes. Briks paints heritage Adelaide facades — bluestone trim, render, weatherboard — with profile-matched cutting in and lead-paint encapsulation where required for pre-1970 homes. We coordinate with carpentry for any rotten timber before paint.',
      },
      {
        q: 'Do you fix holes before painting?',
        a: 'Yes. Filling, sanding, and priming all damage is standard prep — included in every Briks repaint quote. We do not skip it and pass it off as a "minor extra."',
      },
      {
        q: 'What is the prep process?',
        a: 'Standard prep: protect floors and furniture, sand glossy and damaged surfaces, fill nail holes and gouges, sand fill flat, dust down, spot-prime bare patches, then two top coats. Exterior adds pressure-clean, scrape loose paint, and full-surface primer where flaking is widespread.',
      },
      {
        q: 'When can I move furniture back?',
        a: 'Water-based interior paint is usually touch-dry in 1 to 2 hours and walk-on dry in 4 to 6 hours. Allow walls to cure overnight before pushing furniture against them. For oil-based or trade enamel, allow 24 hours before contact.',
      },
    ],
    relatedTrades: ['carpentry', 'handyman', 'tiling'],
  },

  // 5. TILING
  {
    slug: 'tiling',
    name: 'Tiling & Waterproofing',
    noun: 'Tiler',
    primaryKeyword: 'Tiler Adelaide',
    metaTitle: 'Tiler in Adelaide: Bathrooms, Splashbacks | Briks',
    metaDescription:
      'Adelaide tilers and waterproofers. Bathrooms, kitchens, floors, regrouts. AS 3740 is the standard for wet-area waterproofing. Independent trades, one invoice from Briks.',
    hero: {
      eyebrow: 'Tiling — Adelaide',
      headline: 'Waterproofing first.',
      headlineAccent: 'Tiles second.',
      subhead:
        'Bathrooms, kitchens, splashbacks, regrouts, full wet-area rebuilds. Briks coordinates independent trades who are licensed in South Australia for their own work. AS 3740 is the standard for wet-area waterproofing.',
    },
    longTail: [
      'bathroom tiler Adelaide',
      'kitchen splashback Adelaide',
      'waterproofing Adelaide',
      'AS 3740 waterproofing',
      'pool tiling Adelaide',
      'floor tiling Adelaide',
      'regrouting Adelaide',
    ],
    commonJobs: [
      'Full bathroom retile (strip, waterproof, tile, grout)',
      'Shower base rebuild and re-membrane',
      'Kitchen splashback in tile, mosaic, or glass',
      'Laundry, ensuite, and powder room fit-outs',
      'Floor tile replacement (large-format porcelain, terrazzo, encaustic)',
      'Regrout and silicone replacement',
      'Outdoor tiling — patios, alfresco, pool surrounds',
      'Heritage encaustic and tessellated tile repair',
      'Crack-isolation membrane for substrate movement',
      'Stone, slate, and travertine sealing',
    ],
    whatsInvolved: [
      'Wet-area work should start with waterproofing: sheet or liquid membrane to AS 3740, photographed before tiling. Tiling over an existing membrane should only proceed if it can be verified.',
      'For full bathroom rebuilds, we sequence with plumbing and electrical so trades are not waiting on each other. Substrate prep (cement sheet, Villaboard, screed) before tile.',
      'Grout and silicone are matched to the tile and the room. Epoxy grout in heavy-use commercial. Cement-based grout sealed for residential. Mould-resistant silicone in showers.',
    ],
    standards: [
      {
        label: 'AS 3740 waterproofing',
        body: 'Wet areas should be waterproofed to Australian Standard AS 3740 (Waterproofing of domestic wet areas). Membrane application can be photographed at each layer for the customer’s records.',
      },
      {
        label: 'Cert III + waterproofing ticket',
        body: 'Lead tilers hold Certificate III in Wall and Floor Tiling plus a current waterproofing certificate. Waterproofing on its own is licensed work in SA.',
      },
      {
        label: 'AS 3958 tiling standard',
        body: 'Tile installation should follow AS 3958 (Ceramic tiles: guide to the installation of ceramic tiles). Substrate flatness, adhesive choice, and movement joints should meet the standard.',
      },
    ],
    whenToCall: {
      call: [
        'Anything in a wet area — shower, bath, laundry (waterproofing is licensed work)',
        'Floor tiling over 6m² (a bad screed shows for the life of the floor)',
        'Cracked tiles or grout in a wet area (it\'s rarely cosmetic — usually movement)',
        'Heritage encaustic or terrazzo restoration',
        'Outdoor tiling in freeze-thaw or pool environments',
        'Splashbacks — measuring and cutting around outlets is fiddly',
        'Any tiling job',
      ],
      diy: [
        'Re-siliconing a single corner or bath edge',
        'Replacing one cracked tile in a non-wet area (matching tile required)',
        'Sealing existing porous tiles (slate, travertine) — paintable sealer',
        'Cleaning grout with bicarb and a stiff brush before deciding to regrout',
      ],
    },
    faqs: [
      {
        q: 'What is AS 3740?',
        a: 'AS 3740 is the Australian Standard for Waterproofing of Domestic Wet Areas: bathrooms, ensuites, laundries, and balconies above habitable rooms. It specifies membrane materials, fall to drains, junctions at penetrations, and minimum coverage heights. Compliance is required by the National Construction Code.',
      },
      {
        q: 'Do tilers need waterproofing certification in SA?',
        a: 'Tiling itself is not licensed in SA, but waterproofing is. A waterproofer must hold a current waterproofing certificate from a Registered Training Organisation. Briks lead tilers hold both the tiling Cert III and the waterproofing ticket.',
      },
      {
        q: 'How long does a bathroom retile take?',
        a: 'A full bathroom strip-and-retile (including waterproofing membrane cure time) typically takes 7-10 working days from demo to grout. Adding plumbing rough-in or new joinery extends it. Briks confirms the day-by-day schedule before starting.',
      },
      {
        q: 'Why does my shower keep leaking?',
        a: 'Most shower leaks are membrane failures, not tile or grout failures. Common causes: membrane not turned up the wall to required height, no membrane at the hob junction, membrane punctured by tile fixings, or no membrane installed at all. The fix is rarely cosmetic — usually a strip-and-rebuild.',
      },
      {
        q: 'What is the difference between regrout and retile?',
        a: 'Regrout removes old grout and replaces it: fast, cheap, cosmetic. It can improve the look of a sound tile job. Retile strips tiles, rebuilds the membrane, and lays new tile: invasive, costs more, but addresses membrane failure or movement-cracked tiles.',
      },
      {
        q: 'How much does it cost to tile a bathroom?',
        a: 'Bathroom tiling cost depends on tile choice (ceramic vs porcelain vs natural stone), tile size, room layout, prep needed, and whether waterproofing is part of the scope. Briks measures on-site and quotes line-by-line. We do not estimate off room dimensions.',
      },
      {
        q: 'Can you match existing tiles?',
        a: 'Yes — within reason. Discontinued tiles can sometimes be sourced through trade suppliers. If matching is impossible, we discuss a feature-strip or floor-only retile that visually masks the change.',
      },
      {
        q: 'What tiles work best in wet areas?',
        a: 'Porcelain is a durable, low-porosity, easy-clean choice for general wet areas. Glazed ceramic is fine for walls. Natural stone (marble, travertine) needs regular sealing. Avoid textured matte porcelain on shower floors with hard water.',
      },
    ],
    relatedTrades: ['plumbing', 'carpentry', 'painting'],
  },

  // 6. ROOFING
  {
    slug: 'roofing',
    name: 'Roofing',
    noun: 'Roofer',
    primaryKeyword: 'Roofer Adelaide',
    metaTitle: 'Roof Repairs in Adelaide: Leaks, Tiles, Iron | Briks',
    metaDescription:
      'Adelaide roof repair, restoration and storm damage repairs. Tile re-pointing, metal roofs and leak fixing. Trades are licensed in South Australia for their work, with one invoice from Briks.',
    hero: {
      eyebrow: 'Roofing — Adelaide',
      headline: 'Roof leaks find you.',
      headlineAccent: 'We find the cause.',
      subhead:
        'Active leaks, storm damage, ridge re-pointing, full restoration, metal roof replacement. Roof trades are independent and licensed in South Australia for their work. Briks provides before and after photos and one invoice for each finished job.',
    },
    longTail: [
      'roof repair Adelaide',
      'roof leak repair Adelaide',
      'tile roof restoration Adelaide',
      'metal roof Adelaide',
      'storm damage repair Adelaide',
      'ridge cap repointing Adelaide',
      'roof inspection Adelaide',
    ],
    commonJobs: [
      'Active leak diagnosis (the wet patch is rarely under the leak)',
      'Cracked or slipped tile replacement and re-bedding',
      'Ridge cap re-pointing with flexible pointing',
      'Full tile roof restoration — clean, repoint, re-coat',
      'Metal roof patch, flashing, and replacement',
      'Colorbond and Zincalume re-roofs',
      'Storm-damage make-safe and full repair',
      'Skylight installation and resealing',
      'Whirlybird and roof vent installation',
      'Pre-purchase and pre-storm-season roof inspections',
    ],
    whatsInvolved: [
      'Inspection first. Active leaks need a roofer on the roof — not a guess from the ground. We photograph the fault and the surrounding roof so the quote is line-by-line.',
      'Storm damage make-safe can be organised once it is safe. Tarps, temporary patching, water diversion. Full repair is quoted after the property is stable, with before and after photos.',
      'Tile re-pointing uses flexible polymer pointing, not the old cement ridge that cracks at the first hot summer. Re-bedding where bedding has failed underneath.',
    ],
    standards: [
      {
        label: 'Licensed in South Australia for roof plumbing',
        body: 'Roof plumbers (metal roofs, gutters, flashings) are licensed in South Australia for roof plumbing work. Re-roofing and structural roof work are done by trades licensed in South Australia.',
      },
      {
        label: 'Working-at-heights ticket',
        body: 'Every Briks roofer holds a current Working-at-Heights ticket. Harness, anchor, and fall-arrest setup mandatory on every job above 2m — including small repairs.',
      },
      {
        label: 'Trades are licensed in South Australia for their work',
        body: 'Roof work above other people’s property needs care. Briks organises the repair with independent trades licensed in South Australia for their work.',
      },
    ],
    whenToCall: {
      call: [
        'Active leak — water in the ceiling, ceiling staining, water marks',
        'Storm damage — missing tiles, lifted iron, debris on roof',
        'Ridge cap cracking visible from the ground',
        'Re-roof — full tile or metal replacement',
        'Skylight installation or replacement',
        'Pre-storm-season inspection (Adelaide gets hit hard in winter)',
        'Anything where you would otherwise be on a 2m+ ladder',
      ],
      diy: [
        'Visual inspection from the ground with binoculars',
        'Photographing what you see for the roofer to quote off',
        'Clearing visible debris from gutters at ground level',
        'Spotting mould or stains on internal ceilings (sign of slow leak)',
      ],
    },
    faqs: [
      {
        q: 'How much does it cost to fix a roof leak in Adelaide?',
        a: 'Roof leak repair cost depends on whether it is a single tile replacement, a flashing repair, ridge re-pointing, or a more involved structural fix. Briks roofer attends, photographs the fault, and quotes in writing. We do not quote roof leaks over the phone — too easy to miss the actual cause.',
      },
      {
        q: 'Do roofers need working-at-heights certification?',
        a: 'Yes. Under SA Work Health and Safety Regulations 2012, anyone working at height above 2m must hold current working-at-heights training and use compliant fall-arrest equipment. Briks roofers carry the ticket and use harnesses on every job.',
      },
      {
        q: 'How often should a roof be inspected?',
        a: 'For Adelaide tile roofs, a visual inspection every 12-18 months and a closer inspection every 5 years catches most issues before they become leaks. Metal roofs are lower-maintenance but should be checked after major storms. Pre-storm-season (April-May) inspection is the highest-value window.',
      },
      {
        q: 'What is roof repointing?',
        a: 'Roof repointing replaces the cement and pointing that secures ridge caps and hip caps to the surrounding tiles. Original cement bedding cracks over 20-30 years; modern flexible polymer pointing flexes with thermal movement and lasts much longer.',
      },
      {
        q: 'Can you organise storm damage repairs?',
        a: 'Briks can organise make-safe work (tarps, temporary patching, water diversion) for storm damage. Full repair is scoped after the property is stable and the weather has cleared. Before and after photos are provided for each finished job.',
      },
      {
        q: 'Insurance work: do you do it?',
        a: 'Yes. Briks organises repairs, including work that may be part of an insurance claim. You get before and after photos and one invoice from Briks for each finished job. Check with your insurer about claim requirements.',
      },
      {
        q: 'Tile vs metal roof in SA?',
        a: 'Tile roofs are quieter, more thermally stable, and traditional for heritage Adelaide homes — but heavier and need re-pointing. Metal (Colorbond) roofs are lighter, faster to install, longer-lasting per dollar, and better for solar panel mounting. Both perform well in Adelaide if installed correctly.',
      },
      {
        q: 'How long does a roof last in Adelaide?',
        a: 'A well-maintained Adelaide tile roof lasts 60-80 years (with re-pointing every 30). Colorbond metal roofs last 40-60 years. The biggest predictor is the quality of installation and whether maintenance happens. Neglected roofs of either type fail in 20-25 years.',
      },
    ],
    relatedTrades: ['gutters', 'plumbing', 'carpentry'],
  },

  // 7. GUTTERS
  {
    slug: 'gutters',
    name: 'Gutters',
    noun: 'Gutter specialist',
    primaryKeyword: 'Gutter installation Adelaide',
    metaTitle: 'Gutter Repairs and Cleaning in Adelaide | Briks',
    metaDescription:
      'Adelaide gutter cleaning, replacement, leaf guard, downpipes, fascia. Storm damage and insurance work. Independent trades licensed in South Australia for their own work. One invoice from Briks.',
    hero: {
      eyebrow: 'Gutters — Adelaide',
      headline: 'Gutters are boring.',
      headlineAccent: 'Until the ceiling collapses.',
      subhead:
        'Cleaning, replacement, leaf guard, sagging fixes, downpipe and fascia work. Briks organises independent trades, licensed in South Australia for their own work, to handle gutter work above your soffit so you do not have to.',
    },
    longTail: [
      'gutter cleaning Adelaide',
      'gutter replacement Adelaide',
      'leaf guard Adelaide',
      'downpipe repair Adelaide',
      'gutter sagging fix',
      'fascia replacement Adelaide',
    ],
    commonJobs: [
      'Full gutter clean (residential and small commercial)',
      'Sagging gutter re-bracket and re-fall to downpipes',
      'Colorbond gutter replacement (Quad, OG, Half-Round)',
      'Downpipe replacement and stormwater connection',
      'Leaf guard installation (steel mesh, plastic, or aluminium)',
      'Fascia capping and replacement (rotten timber fascia rebuild)',
      'Storm-damage gutter and downpipe repair',
      'Box gutter and valley repair',
      'Soffit and eave timber replacement',
      'Gutter guard cleaning and re-tensioning',
    ],
    whatsInvolved: [
      'Inspection first — we photograph from above (drone or ladder) so you can see what the quote covers. Sagging gutters are usually a bracket spacing or fascia rot problem, not the gutter itself.',
      'Replacement is sized to roof catchment area. Half-round looks heritage-correct on older homes; Quad and OG suit most post-1970 builds. Colour-matched to roof or fascia.',
      'Leaf guard is only worth it for some homes. We will tell you straight — gum-tree-heavy yards yes, no overhanging trees probably no. We do not push it onto every job.',
    ],
    standards: [
      {
        label: 'Working-at-heights ticket',
        body: 'Gutter work above 2m is working-at-heights work. Briks gutter techs are ticketed, harnessed, and use ladder-stabilisers on every job. We refuse jobs we cannot safely access.',
      },
      {
        label: 'Roof plumber qualification',
        body: 'Gutter, fascia, and downpipe work is roof plumbing — covered by SA roof plumber qualifications. Stormwater connection to mains is licensed plumbing.',
      },
      {
        label: 'Ask about public liability insurance',
        body: 'Work is done by independent trades, each licensed in South Australia for their own work. Briks does not provide its own insurance cover. Ask the trade about insurance before work starts.',
      },
    ],
    whenToCall: {
      call: [
        'Gutters overflowing in light rain (means full or wrong fall)',
        'Visible sagging or pulling away from fascia',
        'Water cascading off roof past the gutter line',
        'Soffit or eave timber visibly rotting',
        'Storm damage — gutter detached, downpipe ripped off',
        'Annual cleaning if your property has overhanging trees',
        'Anything that involves climbing a ladder over 2m',
      ],
      diy: [
        'Visual gutter check from the ground (binoculars)',
        'Listening for water rushing past the gutter in rain',
        'Spotting downpipe blockages by looking at the discharge in rain',
        'Checking ground around downpipe outlets for erosion',
      ],
    },
    faqs: [
      {
        q: 'How often should gutters be cleaned in Adelaide?',
        a: 'In Adelaide, residential gutters should be cleaned at least once a year — twice yearly if the property has overhanging gum trees, plane trees, or ornamental pears. Pre-storm-season (April-May) and post-leaf-fall (June) are the highest-value clean windows.',
      },
      {
        q: 'What causes gutters to sag?',
        a: 'Most sagging is caused by bracket failure (corroded or pulled out), debris weight (from missed cleans), or rotten fascia behind the gutter. The fix depends on the cause — re-bracketing, replacement, or fascia rebuild. Briks identifies which one before quoting.',
      },
      {
        q: 'Is leaf guard worth it in SA?',
        a: 'Leaf guard pays back fast for properties with significant tree cover (gum, plane, fig, ornamental pear). For roofs without overhanging trees, leaf guard is largely unnecessary and traps fine debris. Briks gives a straight answer — we do not push leaf guard onto every gutter job.',
      },
      {
        q: 'How much does gutter replacement cost?',
        a: 'Gutter replacement cost depends on linear metres, profile (Quad, OG, Half-Round, custom), fascia condition, and downpipe count. Briks measures the run on-site, factors in fascia repair where needed, and quotes line-by-line.',
      },
      {
        q: 'Colorbond vs Zincalume — which lasts longer?',
        a: 'Colorbond uses Zincalume steel as its base metal and adds a baked-on colour coating; Zincalume is the same base metal without the colour coating. In Adelaide conditions, both are durable roofing materials. Colorbond gives you colour matching to roof and fascia; Zincalume is usually cheaper.',
      },
      {
        q: 'Do you replace fascia at the same time?',
        a: 'Where fascia is rotted or split behind a gutter, replacing the gutter without fixing the fascia means the new gutter sags within months. Briks scopes fascia condition during the gutter quote and includes fascia work where needed — quoted line-by-line so nothing is hidden.',
      },
      {
        q: 'Storm damage to gutters: do you do insurance work?',
        a: 'Yes. Briks can organise repairs for storm damage to gutters. For each finished job it provides before and after photos and one invoice from Briks. Check with your insurer about what your policy covers.',
      },
      {
        q: 'How long does gutter replacement take?',
        a: 'A standard 3-bedroom house full gutter and downpipe replacement takes 1-2 working days. Adding fascia repair extends it to 2-3 days. We confirm the schedule and the weather window before starting.',
      },
    ],
    relatedTrades: ['roofing', 'plumbing', 'carpentry'],
  },

  // 8. GAS
  {
    slug: 'gas',
    name: 'Gas Fitting',
    noun: 'Gas fitter',
    primaryKeyword: 'Gas fitter Adelaide',
    metaTitle: 'Gas Fitter in Adelaide: Hot Water, Cooktops | Briks',
    metaDescription:
      'Independent gas fitters licensed in South Australia for gas fitting work. Hot water installation, cooktops, gas leak repairs. One invoice from Briks.',
    hero: {
      eyebrow: 'Gas — Adelaide',
      headline: 'Gas fitting is licensed work.',
      headlineAccent: 'For good reason.',
      subhead:
        'Gas hot water installation, cooktop and oven connection, leak repair. Independent gas fitters licensed in South Australia for gas fitting work. Briks organises the job and provides one invoice for each finished job.',
    },
    longTail: [
      'licensed gas fitter Adelaide',
      'gas hot water installation SA',
      'cooktop installation Adelaide',
      'gas leak repair Adelaide',
      'Gas fitting',
      'gas appliance certification SA',
    ],
    commonJobs: [
      'Gas hot water system installation and replacement',
      'Cooktop and oven hardwiring (natural gas and LPG)',
      'BBQ hard-line install and bayonet fittings',
      'Gas point relocation for kitchen renovations',
      'Gas leak diagnosis and repair (active and slow)',
      'LPG-to-natural-gas conversions and vice versa',
      'Gas appliance servicing (heater, hot water, cooktop)',
      'Gas meter relocation and upgrade',
      'Heritage gas line decommission and capping',
      'Certificate of Compliance issuance for all gas work',
    ],
    whatsInvolved: [
      'On-site inspection first. Gas work cannot be quoted accurately without seeing the appliance, the run, and the meter. We photograph the existing setup so the quote is line-by-line.',
      'If anyone is in danger, call 000. If you smell gas, leave the area, do not use switches or flames, and call Australian Gas Networks on 1800 427 532. Briks can organise the repair afterwards once it is safe.',
      'Every gas job ends with a Certificate of Compliance lodged with the SA Office of the Technical Regulator. Copy in your inbox the same week.',
    ],
    standards: [
      {
        label: 'Independent gas fitter licensed in South Australia',
        body: 'The independent gas fitters Briks works with are licensed in South Australia for gas fitting work. They handle domestic and small-commercial gas appliances.',
      },
      {
        label: 'AS/NZS 5601 gas installations',
        body: 'All gas work is installed to Australian Standard AS/NZS 5601 (Gas installations). Pipe sizing, run protection, ventilation, and clearances all to spec.',
      },
      {
        label: 'eCoC lodgement',
        body: 'Every notifiable gas job is lodged with the SA Office of the Technical Regulator via the eCoC (electronic Certificate of Compliance) system. Required by law and required by your insurer.',
      },
    ],
    whenToCall: {
      call: [
        'Gas smell anywhere — call us and turn the meter off at the street',
        'Hissing sound near a gas appliance or pipe',
        'Browning patches in lawn over a buried gas line',
        'Hot water replacement (gas-to-electric requires both gas and plumbing licenses)',
        'Cooktop, oven, or BBQ install (illegal for unlicensed work)',
        'Renovation work that requires gas point relocation',
        'Gas appliance not lighting or pilot won\'t stay on',
      ],
      diy: [
        'Lighting a pilot if the appliance is functioning normally (read manual)',
        'Replacing a BBQ hose and regulator (consumer-replaceable parts only)',
        'Cleaning burner heads on a cooktop (off and isolated)',
        'Reading your gas meter to track usage',
      ],
    },
    faqs: [
      {
        q: 'What is a licensed gas fitter?',
        a: 'A gas fitter licensed in South Australia for gas fitting work can install, alter and repair gas appliances. This includes domestic and small-commercial appliances used in homes and rentals.',
      },
      {
        q: 'Is a gas certificate of compliance required in SA?',
        a: 'Yes. Every notifiable gas installation, alteration, or appliance change in South Australia must be lodged with the Office of the Technical Regulator via the eCoC system. This is required by the Plumbers, Gas Fitters and Electricians Act and by your insurer.',
      },
      {
        q: 'How quickly can you respond to a gas leak?',
        a: 'If you smell gas or suspect a leak, leave the area. Do not use switches or flames. Call Australian Gas Networks on 1800 427 532. If anyone is in danger, call 000. Briks can organise the repair afterwards once it is safe.',
      },
      {
        q: 'Can you install LPG and natural gas?',
        a: 'Yes. Briks gas fitters install both LPG (bottled) and natural gas (mains) systems and are licensed for conversions in either direction. Heritage Adelaide homes and outer-metro properties on LPG are common — we handle bayonet fittings and regulator setup.',
      },
      {
        q: 'How much does it cost to install a gas cooktop?',
        a: 'Gas cooktop installation cost depends on whether the gas point is already in place, the cooktop position, and any electrical work needed for ignition. Briks attends, scopes the run, and quotes in writing. Lodgement of the eCoC is included.',
      },
      {
        q: 'Do I need a gas fitter for a BBQ install?',
        a: 'Yes for any hard-piped BBQ connection: that is gas fitting work and must be done by a gas fitter licensed in South Australia for gas fitting work. A BBQ on a portable LPG bottle with a consumer-supplied hose and regulator does not require a gas fitter.',
      },
      {
        q: 'Gas vs electric hot water — which is cheaper in SA?',
        a: 'In Adelaide, gas hot water has historically been cheaper to run than electric storage, but heat pump electric (with rooftop solar) is now competitive or cheaper over a 10-year window. Ask a plumber licensed in South Australia for a comparison based on your hot water demand, gas connection cost and existing solar.',
      },
      {
        q: 'When should a gas appliance be serviced?',
        a: 'Gas appliances should be serviced every 2 years (or per manufacturer manual). Annual service is recommended for ducted gas heaters and continuous-flow hot water in heavy use. Service includes burner clean, flue check, gas pressure, and safety device test.',
      },
    ],
    relatedTrades: ['plumbing', 'electrical', 'hvac'],
  },

  // 9. HVAC
  {
    slug: 'hvac',
    name: 'Air Conditioning & HVAC',
    noun: 'HVAC technician',
    primaryKeyword: 'Air conditioning Adelaide',
    metaTitle: 'Air-Con Repairs and Service in Adelaide | Briks',
    metaDescription:
      'Adelaide air conditioning installation, repair and service. Split systems, ducted reverse cycle, evaporative. Work is done by independent trades licensed in South Australia for their own work. One invoice from Briks for each finished job.',
    hero: {
      eyebrow: 'HVAC — Adelaide',
      headline: 'Adelaide summers don\'t negotiate.',
      headlineAccent: 'Your AC shouldn\'t either.',
      subhead:
        'Split system installation, ducted reverse cycle, AC repair, evaporative service, multi-head systems. Briks HVAC techs are ARC-licensed for refrigerant handling and hold electrical certs for the install side — one tradie, no handball.',
    },
    longTail: [
      'split system installation Adelaide',
      'ducted reverse cycle Adelaide',
      'AC repair Adelaide',
      'evaporative cooler service Adelaide',
      'Air conditioning installation SA',
      'multi-head split system Adelaide',
    ],
    commonJobs: [
      'Single split system installation (1.5kW – 9kW)',
      'Multi-head split system (one outdoor unit, multiple indoor heads)',
      'Ducted reverse cycle install and replacement',
      'Evaporative cooler installation and seasonal service',
      'AC repair — not cooling, not heating, leaking, noisy',
      'Refrigerant top-up (R32, R410A) — licensed handling only',
      'Split system relocation (clean install at the new house)',
      'Ducted heating gas-to-reverse-cycle conversions',
      'Pre-summer AC service and clean',
      'Smart-home thermostat integration (Sensibo, Mitsubishi MELCloud)',
    ],
    whatsInvolved: [
      'Site visit before quote. Split-system sizing depends on room volume, insulation, window aspect, and ceiling height — not just floor area. We measure and recommend the right capacity.',
      'Install includes pipework, condensate drainage, electrical, and weatherproof penetration. We do not install indoor heads where the outdoor unit cannot be properly mounted — better to walk away than do it badly.',
      'Refrigerant work is licensed under the Australian Refrigeration Council (ARC). Briks HVAC techs hold ARC tickets for handling R32 and R410A. Refrigerant logs kept on file.',
    ],
    standards: [
      {
        label: 'ARC refrigerant license',
        body: 'Every Briks HVAC tech holds an Australian Refrigeration Council (ARC) license for handling refrigerant. Required by law for any work that touches the refrigerant circuit.',
      },
      {
        label: 'Restricted electrical license',
        body: 'AC installers are licensed in South Australia for their own work. Where switchboard work is needed, a licensed electrician handles it. Briks coordinates the trades.',
      },
      {
        label: 'AS/NZS 5149 refrigeration safety',
        body: 'All work meets Australian Standard AS/NZS 5149 (Refrigerating systems and heat pumps — safety and environmental requirements). Includes refrigerant charge limits and ventilation.',
      },
    ],
    whenToCall: {
      call: [
        'New AC install (split, multi-head, ducted) — licensed and ticketed work',
        'AC blowing warm air or not cooling',
        'Refrigerant top-up (suspected leak: licensed in SA for refrigeration work)',
        'Ducted system not balancing across rooms',
        'Pre-summer service if it\'s been over 18 months',
        'Strange noises (rattle, hiss, gurgle) from indoor or outdoor unit',
        'Unit dripping water indoors (drainage issue)',
      ],
      diy: [
        'Cleaning the indoor filter (every 1-2 months in summer)',
        'Clearing leaves and debris from around the outdoor unit',
        'Resetting the unit at the wall (off, wait 5 minutes, on)',
        'Checking the remote batteries before assuming the unit is faulty',
      ],
    },
    faqs: [
      {
        q: 'What is an ARC license?',
        a: 'An ARC license is issued by the Australian Refrigeration Council and is mandatory for anyone handling refrigerant in Australia. Installing, servicing, or decommissioning an AC unit without an ARC ticket is illegal under the Ozone Protection and Synthetic Greenhouse Gas Management Act.',
      },
      {
        q: 'Split vs ducted in Adelaide — which makes sense?',
        a: 'Split systems are best for cooling individual rooms, single-zone living, or staged install. Ducted reverse cycle is best for whole-of-house comfort, multi-zone control, and homes with existing duct space. Briks recommends based on your floor plan, insulation, and how you actually use the house — not on what we want to sell.',
      },
      {
        q: 'How much does ducted reverse cycle cost to install?',
        a: 'Ducted reverse cycle install cost depends on the size of the home, number of zones, ceiling space, and any electrical upgrades needed. Briks attends, measures, designs the duct layout, and quotes line-by-line. We do not estimate ducted off floor area alone.',
      },
      {
        q: 'How often should AC be serviced?',
        a: 'Split systems should be serviced every 18-24 months. Ducted systems annually. Evaporative coolers seasonally (drain and clean before summer, drain again before winter). Filter cleaning is a homeowner monthly job during heavy-use seasons.',
      },
      {
        q: 'Why is my AC blowing warm air?',
        a: 'Common causes: low refrigerant charge (likely leak — needs ARC tech), dirty filter (DIY), dirty condenser coil outdoor (service required), faulty compressor (technician diagnosis), or wrong mode setting on the remote. Briks diagnoses on-site and quotes the fix in writing.',
      },
      {
        q: 'Evaporative vs reverse cycle for SA summers?',
        a: 'Evaporative cooling works well in Adelaide\'s dry summer days but loses effectiveness in humid weather and provides no heating. Reverse cycle handles heating and cooling year-round and dehumidifies. Most modern Adelaide homes choose reverse cycle as the primary system; evaporative remains popular as a low-running-cost summer-only option.',
      },
      {
        q: 'Can you relocate a split system?',
        a: 'Yes. Briks relocates split systems — recover the refrigerant (ARC-licensed work), remove indoor and outdoor units, re-pipe at the new location, evacuate, recharge, and commission. Often the install itself costs about as much as the relocation labour, so worth a straight comparison before deciding.',
      },
      {
        q: 'Energy rating — does it matter?',
        a: 'Yes. Star ratings affect running cost. Higher star units usually cost more upfront and use less energy over time. Briks organises the work; ask the licensed trade about model options before you decide.',
      },
    ],
    relatedTrades: ['electrical', 'gas', 'plumbing'],
  },

  // 10. HANDYMAN
  {
    slug: 'handyman',
    name: 'Handyman',
    noun: 'Handyman',
    primaryKeyword: 'Handyman Adelaide',
    metaTitle: 'Handyman in Adelaide: Small Jobs, One Visit | Briks',
    metaDescription:
      'Adelaide handyman work, organised by Briks. Picture hanging, TV mounting, flat pack, fence repair, end-of-lease patch and paint, door adjustment. One invoice from Briks.',
    hero: {
      eyebrow: 'Handyman — Adelaide',
      headline: 'No job too small.',
      headlineAccent: 'Send the list. Get a written quote.',
      subhead:
        'Picture hanging, TV mounting, flat pack, fence repair, sticky doors, fly screen replacement, end-of-lease patch-and-paint. The jobs that fall through the cracks because they are not big enough to bother a tradie. Briks coordinates a handyman whose whole job is the small stuff.',
    },
    longTail: [
      'small jobs Adelaide handyman',
      'picture hanging Adelaide',
      'TV mounting Adelaide',
      'flat pack assembly Adelaide',
      'end of lease repairs Adelaide',
      'fence repair Adelaide',
      'door adjustment Adelaide',
    ],
    commonJobs: [
      'Picture hanging, mirror mounting, gallery walls',
      'TV wall mounting (plaster, brick, stud) with cable management',
      'Flat-pack assembly (IKEA, Kmart, custom)',
      'Sticky door adjustment, hinge replacement, lock fitting',
      'Fly screen and security door re-mesh and replacement',
      'Fence panel replacement and gate repair',
      'Curtain rod, blind, and window furnishing install',
      'Shelving, bookcase, and storage bracket install',
      'Tap washer replacement (non-licensed minor plumbing)',
      'End-of-lease patch, fill, paint touch-up, and odd-job list',
    ],
    whatsInvolved: [
      'Most handyman jobs are quoted by the hour or by a fixed list — your choice. Send the list (photos help) via WhatsApp and we send back a written quote before booking.',
      'For end-of-lease, we work off the property condition report and tick items as they are completed. Photo evidence of every fix sent back at the end so the bond manager has no question.',
      'No minimum job. A single picture hung is fine. We bundle small tasks into a single visit so the callout cost is shared across the list.',
    ],
    standards: [
      {
        label: 'Trade licensed in South Australia for this work',
        body: 'The work is done by independent trades, each licensed in South Australia for their own work. Briks organises the job and is not a licensed builder, plumber, electrician or gas fitter.',
      },
      {
        label: 'WHS-compliant practices',
        body: 'Ladder safety, manual handling and basic fall protection are important on any job. No heroics on a shaky setup just to save time.',
      },
      {
        label: 'Scope discipline',
        body: 'A handyman is not a plumber, electrician, or gas fitter. We refuse work that legally needs a licensed trade and route it to the right Briks tradie instead — same coordinator, same invoice.',
      },
    ],
    whenToCall: {
      call: [
        'Job lists with 3+ small items',
        'TV mounting (especially on brick or plaster)',
        'Flat pack with more than 50 parts',
        'End-of-lease bond preparation',
        'Anything physical you would rather not do (heavy lift, ladder work)',
        'Door, lock, or hinge problems past basic adjustment',
        'Fence and gate repairs at ground level',
      ],
      diy: [
        'Hanging a single light picture into plaster',
        'Tightening loose hinges with a screwdriver',
        'Replacing a single batteries-included smoke alarm (10-year sealed)',
        'Basic IKEA flat-pack with two people and a Saturday',
      ],
    },
    faqs: [
      {
        q: 'Do handymen need a license in SA?',
        a: 'The work is done by independent trades, each licensed in South Australia for their own work. Briks itself is not a licensed builder, plumber, electrician or gas fitter.',
      },
      {
        q: 'What is the minimum job size?',
        a: 'No minimum. Briks coordinates handyman calls for a single picture hang or a 30-item end-of-lease list. We bundle small tasks into a single visit so the callout cost spreads across the list — better value than calling for one item.',
      },
      {
        q: 'Can a handyman do plumbing?',
        a: 'A handyman can replace a tap washer or unblock a drain in some circumstances, but anything beyond minor consumer repair is licensed plumbing work in South Australia and must go to a plumber licensed in South Australia for plumbing work. Briks organises the repair and provides one invoice for each finished job.',
      },
      {
        q: 'How much does a handyman cost per hour in Adelaide?',
        a: 'Handyman hourly rates vary by job complexity and tools required. Briks quotes either by the hour or as a fixed list — your choice. Send the job list (photos help) via WhatsApp and we send back a written quote before booking. No callout fee buried in the fine print.',
      },
      {
        q: 'Do you do end-of-lease patch-up?',
        a: 'Yes. End-of-lease (also called bond clean prep) is one of the most common Briks handyman jobs. We work off the property condition report, fix-fill-paint each line item, photograph each fix, and send a completion summary back to the property manager.',
      },
      {
        q: 'Can you mount a TV on a brick wall?',
        a: 'Yes. TV mounting on brick uses masonry bolts rated for the panel weight and bracket spec. Briks handymen mount on plasterboard (with stud finder), brick, and concrete render. Cable management (concealed in conduit or wall channel) included on request.',
      },
      {
        q: 'Flat pack assembly — how long does it take?',
        a: 'Time depends on the unit and the job. A small flat-pack item is a smaller job than a wardrobe, and a full kitchen flat-pack is a larger job. Briks organises the work. Homeowners and businesses get a written quote before work starts.',
      },
      {
        q: 'Can you fit blinds and curtains?',
        a: 'Yes. Briks handymen install roller blinds, venetians, plantation shutters, curtain tracks, and pelmets. We can also re-mount existing fixtures that have come loose. Tools and brackets supplied where needed.',
      },
    ],
    relatedTrades: ['painting', 'carpentry', 'plumbing'],
  },
]

export function getTrade(slug: string): Trade | undefined {
  return TRADES.find((t) => t.slug === slug)
}
