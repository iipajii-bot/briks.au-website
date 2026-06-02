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
    metaTitle: 'Plumber Adelaide — Licensed Plumbing, Drains, Hot Water | Briks',
    metaDescription:
      'Licensed plumbers across Adelaide. Blocked drains, leaking taps, hot water, gas plumbing, emergency callouts. PIC-licensed, insured, vetted bench. One number, one invoice.',
    hero: {
      eyebrow: 'Plumbing — Adelaide',
      headline: 'Licensed plumbers.',
      headlineAccent: 'Picked, briefed, on site.',
      subhead:
        'Blocked drains, leaking taps, dead hot water systems, gas plumbing, slow leaks under tiles. Briks coordinates PIC-licensed Adelaide plumbers — vetted, insured, paid promptly so they take our calls first.',
    },
    longTail: [
      'emergency plumber Adelaide',
      'blocked drain Adelaide',
      'hot water repair Adelaide',
      'leaking tap repair Adelaide',
      'gas plumbing Adelaide',
      'after hours plumber Adelaide',
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
      'A licensed plumber attends, scopes the fault on-site, and gives you a written quote before any work starts. We do not quote off vague phone descriptions — too easy to miss the real cause.',
      'For emergencies (active leak, no water, no hot water, gas smell), the dispatch is immediate from a pre-agreed roster. Make-safe first, full repair scoped after the property is stable.',
      'Every plumbing job is logged with photos and a written description. Insurance claim or landlord report — you get the paperwork the same day.',
    ],
    standards: [
      {
        label: 'PIC license verified',
        body: 'Every plumber on the bench holds a current South Australian Plumbing, Gas Fitting and Electrical (PIC) license. We pull the live record before the first job and re-check on renewal.',
      },
      {
        label: 'AS 3500 compliance',
        body: 'All plumbing work meets Australian Standard AS 3500 (plumbing and drainage). Not negotiable. Compliance certificates issued where required.',
      },
      {
        label: '$10M+ public liability',
        body: 'Minimum $10M public liability per tradie. Senior plumbers on the bench carry $20M. Certificate of currency on file before dispatch.',
      },
    ],
    whenToCall: {
      call: [
        'Active leak — water visible, ceiling staining, or damp patches spreading',
        'No hot water (especially with a tenant in the property)',
        'Burst pipe or main shut-off needed',
        'Gas smell — call us and turn the meter off at the street',
        'Slow leak you cannot trace (it is almost never where the wet patch is)',
        'Hot water replacement — gas-to-electric or heat pump conversions need a licensed plumber',
        'Anything connected to the gas line — illegal for an unlicensed person to touch',
      ],
      diy: [
        'Plunging a basic toilet block (give it 5 minutes — most clear)',
        'Replacing a tap washer if you have done one before',
        'Cleaning a slow drain with hot water and bicarb',
        'Resetting a tripped electric hot water unit (read the manual first)',
      ],
    },
    faqs: [
      {
        q: 'How much does a plumber cost in Adelaide?',
        a: 'Adelaide plumber rates vary widely by job type. A blocked drain clear typically costs less than a hot water replacement, which costs less than a gas line install. Briks does not publish rates because every job is sized differently — we attend, scope, and give a written quote before work starts. No callout fee in the fine print.',
      },
      {
        q: 'Are plumbers licensed in South Australia?',
        a: 'Yes. All plumbing work in SA must be carried out by a person holding a current Plumbing, Gas Fitting and Electrical (PIC) license issued by Consumer and Business Services SA. Unlicensed plumbing is illegal and voids most home insurance policies.',
      },
      {
        q: 'What does PIC license mean?',
        a: 'PIC stands for Plumbing, Gas Fitting and Electrical Contractor — the licensing scheme administered by Consumer and Business Services South Australia. Holding a current PIC license confirms the plumber has met training, insurance, and competency requirements set by the SA government.',
      },
      {
        q: 'Who do I call for a burst pipe in Adelaide?',
        a: 'For a burst pipe, shut off the water at the meter (street-side) first, then call Briks on WhatsApp or the form. We dispatch from an emergency plumber roster across Adelaide and prioritise active leaks. Make-safe arrives same day.',
      },
      {
        q: 'Can a plumber install a gas hot water system?',
        a: 'Only a plumber holding a Type A gas-fitter ticket on top of their plumbing license can install a gas hot water system in South Australia. Briks plumbers who do gas work hold both. Certificate of compliance is issued and lodged with the energy regulator.',
      },
      {
        q: 'How quickly can a plumber attend in Adelaide?',
        a: 'Briks emergency callouts (active leak, no water, no hot water, gas) are dispatched within 60 minutes inside the metro area. Routine repairs are scoped on-site within 48 hours of the call. We confirm the window in writing before you commit.',
      },
      {
        q: 'What is covered by plumbing insurance?',
        a: 'Briks-coordinated plumbing work is backed by the tradie\'s public liability cover (minimum $10M per job). Workmanship is covered by Briks for 12 months on top of any manufacturer warranty on installed parts.',
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
    metaTitle: 'Electrician Adelaide — A-Grade Licensed | Briks Building Services',
    metaDescription:
      'A-grade licensed electricians across Adelaide. Switchboard upgrades, safety switches, EV chargers, smoke alarms, emergency callouts. Briks coordinates a vetted bench — one number, one invoice.',
    hero: {
      eyebrow: 'Electrical — Adelaide',
      headline: 'A-grade electricians.',
      headlineAccent: 'No shortcuts.',
      subhead:
        'Switchboard upgrades, safety switches, EV chargers, smoke alarm compliance, no-power emergencies. Briks dispatches A-grade SA-licensed sparks who carry full liability cover and lodge every job with the regulator.',
    },
    longTail: [
      'A-grade electrician Adelaide',
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
      'Hardwired smoke alarm replacement to AS 3786 + SA rental compliance',
      'Power point additions, relocations, and replacements',
      'Ceiling fan and pendant light installation',
      'LED downlight replacement (low-voltage to mains-rated)',
      'Stove and oven hardwiring',
      'Solar isolator and inverter fault-finding',
      'No-power and tripping circuit emergency callouts',
    ],
    whatsInvolved: [
      'An A-grade electrician attends, identifies the circuit and load involved, and quotes in writing. For switchboard work, we photograph the existing board so the quote is line-by-line — not estimated off a phone description.',
      'No-power emergencies (whole-house outage that is not network-side) are dispatched within an hour. We confirm whether it is a Briks-fixable internal fault or a SA Power Networks issue before billing.',
      'Every notifiable electrical job is lodged with the Office of the Technical Regulator. You get the Certificate of Compliance the same week.',
    ],
    standards: [
      {
        label: 'A-grade SA license',
        body: 'Every Briks electrician holds a current A-grade electrical license from Consumer and Business Services SA. License numbers are verified before onboarding and re-checked annually.',
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
        q: 'What is an A-grade electrician?',
        a: 'An A-grade electrician in South Australia holds the highest tier of electrical license issued by Consumer and Business Services SA. They are qualified to design, install, alter, and repair electrical installations — including switchboard work and meter-box-side work that B-grade or restricted licenses cannot legally touch.',
      },
      {
        q: 'Do I need a licensed electrician in SA?',
        a: 'Yes. All electrical work in South Australia other than plugging in a pre-wired appliance must be carried out by a person holding a current SA electrical license. Unlicensed work is illegal under the Plumbers, Gas Fitters and Electricians Act and voids most home insurance policies.',
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
        a: 'Yes. South Australian residential tenancy law requires hardwired or 10-year sealed-battery smoke alarms in every bedroom and on every level. Replacement is the landlord\'s responsibility and must be done by a licensed electrician for hardwired units.',
      },
      {
        q: 'Can you install an EV charger at home?',
        a: 'Yes. EV charger installation is mandatory licensed work in SA — Briks A-grade sparks install single-phase wall-mounted chargers (Tesla, Zappi, Wallbox) and three-phase fast chargers. We assess your switchboard capacity before quoting.',
      },
      {
        q: 'What is a safety switch?',
        a: 'A safety switch (RCD — Residual Current Device) cuts power within 30 milliseconds when it detects current leaking to earth — usually because someone has touched a live wire. Required on all power and lighting circuits in SA homes built after 1991, and strongly recommended as a retrofit for older houses.',
      },
      {
        q: 'How fast can you respond to no-power calls?',
        a: 'Briks dispatches to no-power emergencies inside the Adelaide metro area within 60 minutes. We diagnose internal fault vs SA Power Networks issue first — no point billing for a callout if the network is down.',
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
    metaTitle: 'Carpenter Adelaide — Joinery, Decks, Doors, Wardrobes | Briks',
    metaDescription:
      'Adelaide carpenters and joiners. Custom built-ins, decks, door installation, skirting and architraves, structural repair, timber floor work. Vetted bench, written quotes, one invoice.',
    hero: {
      eyebrow: 'Carpentry — Adelaide',
      headline: 'Carpenters who measure twice.',
      headlineAccent: 'And turn up.',
      subhead:
        'Custom joinery, decks, door hangs that actually close, structural timber, skirting and architrave replacement. Briks dispatches carpenters with twenty-year benches behind them — not the apprentice the boss is trying to keep busy.',
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
        label: 'Cert IV Building + BLD license',
        body: 'Lead carpenters on the bench hold Certificate IV in Building and Construction plus a current SA Builders License (BLD) where required for structural work and decks.',
      },
      {
        label: 'AS 1684 timber framing',
        body: 'Structural timber framing meets Australian Standard AS 1684 (residential timber-framed construction). Span tables, bracing, and tie-down done to spec.',
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
        a: 'Carpenters performing structural work, decks over a certain height, or contracting for jobs above the SA threshold (currently $12,000 including labour and materials) must hold a Builders License (BLD) issued by Consumer and Business Services SA. Briks lead carpenters hold Cert IV in Building plus a BLD.',
      },
      {
        q: 'What is the difference between a carpenter and a joiner?',
        a: 'A carpenter works with structural and on-site timber — framing, decks, doors, floors. A joiner makes finished timber components — cabinets, wardrobes, joinery — usually in a workshop. Briks bench includes both and we match the right specialist to the job.',
      },
      {
        q: 'Can a carpenter fix structural issues?',
        a: 'A licensed carpenter (with BLD) can repair and replace structural timber — bearers, joists, studs, roof trusses, stair stringers — where the work is like-for-like. Anything that changes load paths needs a structural engineer\'s certificate, which we coordinate.',
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
    metaTitle: 'Painter Adelaide — Interior, Exterior, Heritage | Briks',
    metaDescription:
      'Adelaide painters for interior, exterior, heritage facades, end-of-lease repaints. Low-VOC options, profile-matched cutting in, prep that actually lasts. Vetted bench, one invoice.',
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
        label: 'BLD painter license',
        body: 'Lead painters hold a current SA Painter Contractor license (BLD class) for jobs over the licensed threshold. Smaller jobs are still done to the same standard.',
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
        a: 'Water-based interior paint is touch-dry in 1-2 hours and walk-on dry in 4-6 hours. We let walls cure overnight before pushing furniture against them. For oil-based or trade enamel, allow 24 hours before contact.',
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
    metaTitle: 'Tiler Adelaide — Bathrooms, Splashbacks, Waterproofing | Briks',
    metaDescription:
      'Adelaide tilers and waterproofers. Bathrooms, kitchens, floors, regrouts. Certified to AS 3740, photo-documented membrane, ten-year guarantee. Vetted bench, one invoice.',
    hero: {
      eyebrow: 'Tiling — Adelaide',
      headline: 'Waterproofing first.',
      headlineAccent: 'Tiles second.',
      subhead:
        'Bathrooms, kitchens, splashbacks, regrouts, full wet-area rebuilds. Briks tilers carry waterproofing certificates and document every layer of membrane with photos. AS 3740 is not optional — and most leaks we get called to are membrane failures from someone else.',
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
      'Regrout and silicone replacement (extends a tiled bathroom 5-10 years)',
      'Outdoor tiling — patios, alfresco, pool surrounds',
      'Heritage encaustic and tessellated tile repair',
      'Crack-isolation membrane for substrate movement',
      'Stone, slate, and travertine sealing',
    ],
    whatsInvolved: [
      'Wet-area work starts with waterproofing — sheet or liquid membrane to AS 3740, photographed before tiling. We will not tile over someone else\'s membrane unless we can verify it.',
      'For full bathroom rebuilds, we sequence with plumbing and electrical so trades are not waiting on each other. Substrate prep (cement sheet, Villaboard, screed) before tile.',
      'Grout and silicone are matched to the tile and the room. Epoxy grout in heavy-use commercial. Cement-based grout sealed for residential. Mould-resistant silicone in showers.',
    ],
    standards: [
      {
        label: 'AS 3740 waterproofing',
        body: 'All wet areas are waterproofed to Australian Standard AS 3740 (Waterproofing of domestic wet areas). Membrane application is photographed at every layer for the customer\'s records.',
      },
      {
        label: 'Cert III + waterproofing ticket',
        body: 'Lead tilers hold Certificate III in Wall and Floor Tiling plus a current waterproofing certificate. Waterproofing on its own is licensed work in SA.',
      },
      {
        label: 'AS 3958 tiling standard',
        body: 'Tile installation follows AS 3958 (Ceramic tiles — guide to the installation of ceramic tiles). Substrate flatness, adhesive choice, and movement joints all to spec.',
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
        'Any tiling job where you want a 10-year warranty on workmanship',
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
        a: 'AS 3740 is the Australian Standard for Waterproofing of Domestic Wet Areas — bathrooms, ensuites, laundries, and balconies above habitable rooms. It specifies membrane materials, fall to drains, junctions at penetrations, and minimum coverage heights. Compliance is required by the National Construction Code.',
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
        a: 'Regrout removes old grout and replaces it — fast, cheap, cosmetic. Buys 5-10 years on a sound tile job. Retile strips tiles, rebuilds the membrane, and lays new tile — invasive, costs more, but is the only fix for membrane failure or movement-cracked tiles.',
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
        a: 'Porcelain (water absorption under 0.5%) is the best general-purpose wet-area tile — durable, low-porosity, easy to clean. Glazed ceramic is fine for walls. Natural stone (marble, travertine) needs sealing every 1-2 years. Avoid textured matte porcelain on shower floors with hard water.',
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
    metaTitle: 'Roofer Adelaide — Repairs, Restoration, Storm Damage | Briks',
    metaDescription:
      'Adelaide roof repair, restoration, storm-damage callouts. Tile re-pointing, metal roof, leak fixing. Working-at-heights certified, $20M cover, insurance work. Vetted bench, one invoice.',
    hero: {
      eyebrow: 'Roofing — Adelaide',
      headline: 'Roof leaks find you.',
      headlineAccent: 'We find the cause.',
      subhead:
        'Active leaks, storm damage, ridge re-pointing, full restoration, metal-roof replacement. Briks roofers carry working-at-heights tickets, $20M cover, and document every fault with photos for the insurer.',
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
      'Storm damage gets make-safe within 24 hours. Tarps, temporary patching, water diversion. Full repair is scoped after the property is stable, photographed for the insurer.',
      'Tile re-pointing uses flexible polymer pointing, not the old cement ridge that cracks at the first hot summer. Re-bedding where bedding has failed underneath.',
    ],
    standards: [
      {
        label: 'BLD roof plumber license',
        body: 'Roof plumbers (metal roofs, gutters, flashings) hold a current SA Builders License (BLD) for plumbing-roof work. Re-roofing and structural roof work is licensed.',
      },
      {
        label: 'Working-at-heights ticket',
        body: 'Every Briks roofer holds a current Working-at-Heights ticket. Harness, anchor, and fall-arrest setup mandatory on every job above 2m — including small repairs.',
      },
      {
        label: '$20M public liability',
        body: 'Roofers on the bench carry $20M public liability minimum (vs $10M baseline) — reflecting the risk of working above other people\'s property.',
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
        q: 'Can you repair storm damage same day?',
        a: 'Briks dispatches make-safe (tarps, temporary patching, water diversion) within 24 hours of an active storm-damage call. Full repair is scoped after the property is stable and the weather has cleared. Photo report to the insurer same day.',
      },
      {
        q: 'Insurance work — do you do it?',
        a: 'Yes. Briks documents every fault with photos, written description, and cause-and-effect summary. Insurance-ready PDF report is emailed within 24 hours of the inspection — sufficient for most home and landlord policies.',
      },
      {
        q: 'Tile vs metal roof in SA?',
        a: 'Tile roofs are quieter, more thermally stable, and traditional for heritage Adelaide homes — but heavier and need re-pointing. Metal (Colorbond) roofs are lighter, faster to install, longer-lasting per dollar, and better for solar panel mounting. Both perform well in Adelaide if installed correctly.',
      },
      {
        q: 'How long does a roof last in Adelaide?',
        a: 'A well-maintained Adelaide tile roof lasts 60-80 years (with re-pointing every 30). Colorbond metal roofs last 40-60 years. The biggest predictor is the quality of installation and whether maintenance happens — neglected roofs of either type fail in 20-25 years.',
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
    metaTitle: 'Gutter Repair & Installation Adelaide | Briks Building Services',
    metaDescription:
      'Adelaide gutter cleaning, replacement, leaf guard, downpipes, fascia. Storm damage and insurance work. Working-at-heights certified, vetted bench, one invoice.',
    hero: {
      eyebrow: 'Gutters — Adelaide',
      headline: 'Gutters are boring.',
      headlineAccent: 'Until the ceiling collapses.',
      subhead:
        'Cleaning, replacement, leaf guard, sagging fixes, downpipe and fascia work. Briks gutter specialists work above your soffit so you do not — properly licensed, harnessed, insured.',
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
        label: '$10M+ public liability',
        body: 'Minimum $10M public liability cover for damage to roof, eaves, and surrounding property. Certificate of currency on file.',
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
        a: 'Both Colorbond and Zincalume use the same base metal (zinc-aluminium-magnesium coated steel — Zincalume) — Colorbond just adds a baked-on colour coating. In Adelaide conditions, both last 25-40 years. Colorbond gives you colour matching to roof and fascia; Zincalume is slightly cheaper.',
      },
      {
        q: 'Do you replace fascia at the same time?',
        a: 'Where fascia is rotted or split behind a gutter, replacing the gutter without fixing the fascia means the new gutter sags within months. Briks scopes fascia condition during the gutter quote and includes fascia work where needed — quoted line-by-line so nothing is hidden.',
      },
      {
        q: 'Storm damage to gutters — do you do insurance work?',
        a: 'Yes. We document the damage with photos, written description, and cause-and-effect summary. Insurance-ready PDF report emailed within 24 hours. Most home and landlord policies accept Briks reports without an additional assessor visit.',
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
    metaTitle: 'Gas Fitter Adelaide — Hot Water, Cooktops, Leak Repair | Briks',
    metaDescription:
      'Type A licensed gas fitters across Adelaide. Hot water installation, cooktops, gas leaks, certificates of compliance. Vetted bench, $20M cover, one invoice.',
    hero: {
      eyebrow: 'Gas — Adelaide',
      headline: 'Gas fitting is licensed work.',
      headlineAccent: 'For good reason.',
      subhead:
        'Gas hot water installation, cooktop and oven connection, leak repair, certificates of compliance. Briks gas fitters hold Type A tickets, lodge every job with the regulator, and dispatch within an hour for active leaks.',
    },
    longTail: [
      'licensed gas fitter Adelaide',
      'gas hot water installation SA',
      'cooktop installation Adelaide',
      'gas leak repair Adelaide',
      'Type A gas fitting',
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
      'Active leaks (gas smell, hissing, browning grass over a buried line) are dispatched within 60 minutes inside metro Adelaide. Make-safe — turn off the meter, isolate the appliance — before full repair.',
      'Every gas job ends with a Certificate of Compliance lodged with the SA Office of the Technical Regulator. Copy in your inbox the same week.',
    ],
    standards: [
      {
        label: 'Type A gas fitter ticket',
        body: 'Every Briks gas fitter holds a current Type A gas-fitter authorisation issued by Consumer and Business Services SA. Type A covers domestic and small-commercial appliances — the work most people need.',
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
        q: 'What is a Type A gas fitter?',
        a: 'A Type A gas fitter holds an authorisation from Consumer and Business Services SA to install, alter, and repair Type A gas appliances — domestic and small-commercial appliances under 500MJ/h input. Most home and rental gas work falls within Type A.',
      },
      {
        q: 'Is a gas certificate of compliance required in SA?',
        a: 'Yes. Every notifiable gas installation, alteration, or appliance change in South Australia must be lodged with the Office of the Technical Regulator via the eCoC system. This is required by the Plumbers, Gas Fitters and Electricians Act and by your insurer.',
      },
      {
        q: 'How quickly can you respond to a gas leak?',
        a: 'Briks dispatches to active gas leaks (smell of gas, audible hissing, lawn browning) within 60 minutes inside the Adelaide metro area. Step one: turn off the meter at the street and ventilate the area before we arrive.',
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
        a: 'Yes for any hard-piped BBQ connection — that is gas fitting work and must be done by a Type A licensed person. A BBQ on a portable LPG bottle with a consumer-supplied hose and regulator does not require a gas fitter.',
      },
      {
        q: 'Gas vs electric hot water — which is cheaper in SA?',
        a: 'In Adelaide, gas hot water has historically been cheaper to run than electric storage, but heat pump electric (with rooftop solar) is now competitive or cheaper over a 10-year window. Briks gives a straight comparison based on your hot water demand, gas connection cost, and existing solar.',
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
    metaTitle: 'Air Conditioning Adelaide — Split, Ducted, Service | Briks',
    metaDescription:
      'Adelaide air conditioning installation, repair, service. Split systems, ducted reverse cycle, evaporative. ARC licensed installers, electrical-cert techs, vetted bench, one invoice.',
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
      'ARC licensed installer SA',
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
        body: 'AC installers carry a restricted electrical license for connecting AC units to existing circuits. Where switchboard work is needed, an A-grade Briks electrician handles it — no handball, no chase between trades.',
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
        'Refrigerant top-up (suspected leak — ARC license required)',
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
        a: 'Yes — significantly. The difference between a 3-star and 5-star rated split system on the same room can be 30-40% in running cost over 10 years. Higher-star units cost more upfront but pay back inside 4-5 years for any system used regularly. Briks recommends specific models, not just star ratings.',
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
    metaTitle: 'Handyman Adelaide — Small Jobs, Repairs, EOL | Briks',
    metaDescription:
      'Adelaide handyman services. Picture hanging, TV mounting, flat pack, fence repair, end-of-lease patch and paint, door adjustment. No job too small. Vetted bench, one invoice.',
    hero: {
      eyebrow: 'Handyman — Adelaide',
      headline: 'No job too small.',
      headlineAccent: 'No callout fee buried in the fine print.',
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
        label: 'BLD handyman license',
        body: 'For jobs above the SA threshold (currently $12,000 inclusive), Briks handymen hold a BLD (Builders License) — handyman class. Smaller jobs are still done to the same standard.',
      },
      {
        label: 'WHS-compliant practices',
        body: 'Ladder safety, manual handling, and basic fall protection on every job. No heroics on a shaky setup just to save 20 minutes.',
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
        a: 'Handymen performing work above the SA Builders License threshold (currently $12,000 inclusive of labour and materials) need a BLD handyman class license. Below the threshold, no license is required — but every Briks handyman holds public liability insurance regardless of job size.',
      },
      {
        q: 'What is the minimum job size?',
        a: 'No minimum. Briks coordinates handyman calls for a single picture hang or a 30-item end-of-lease list. We bundle small tasks into a single visit so the callout cost spreads across the list — better value than calling for one item.',
      },
      {
        q: 'Can a handyman do plumbing?',
        a: 'A handyman can replace a tap washer or unblock a drain in some circumstances, but anything beyond minor consumer repair is licensed plumbing work in SA and must go to a PIC-licensed plumber. Briks routes the call to the right tradie — same coordinator, same invoice.',
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
        a: 'Time depends on the unit. A small IKEA bedside table is 30-45 minutes. A wardrobe is 2-3 hours. A full kitchen flat-pack is a one-day job. Briks quotes a fixed price per unit so you know before booking.',
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
