import { writeFileSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../public/recruitment-posters')
mkdirSync(OUT_DIR, { recursive: true })

const trades = [
  {
    slug: 'plumber',
    label: 'Plumber',
    line1: 'Toilet replacement',
    line2: 'needed.',
    desc1: 'Toilet needs replacing at a residential',
    desc2: 'property in Adelaide. Licensed plumber only.',
  },
  {
    slug: 'electrician',
    label: 'Electrician',
    line1: 'Power points need',
    line2: 'installing.',
    desc1: 'A few extra power points need installing at',
    desc2: 'a property in Adelaide. Licensed only.',
  },
  {
    slug: 'tiler',
    label: 'Tiler',
    line1: 'Bathroom retile',
    line2: 'needed.',
    desc1: 'Bathroom floor and walls need retiling at a',
    desc2: 'residential property in Adelaide.',
  },
  {
    slug: 'cleaner',
    label: 'Cleaner',
    line1: 'End of lease clean',
    line2: 'needed.',
    desc1: 'Full end of lease clean needed for a property',
    desc2: 'in Adelaide. Professional cleaner only.',
  },
]

const PHONE_CHUNKS = ['04', '49', '517', '367']
const BLUR_REGION = { x: 100, y: 870, w: 660, h: 155 }

const INK      = '#1a1a1a'
const BRASS    = '#8a6e3f'
const HAIRLINE = '#e2ddd3'
const MUTED    = '#5a5650'
const PAPER    = '#ffffff'

function renderPhoneBoxes() {
  const startX = 40
  const startY = 80
  const boxW = 130
  const boxH = 130
  const gap = 30
  let out = ''
  let x = startX

  PHONE_CHUNKS.forEach((chunk, ci) => {
    out += `<rect x="${x}" y="${startY}" width="${boxW}" height="${boxH}" fill="${PAPER}" stroke="${HAIRLINE}" stroke-width="1.5"/>`

    const digits = chunk.split('')
    const digitSpacing = chunk.length === 2 ? 50 : 36
    const digitsStart = x + (boxW - (digits.length - 1) * digitSpacing) / 2 - 18

    digits.forEach((d, di) => {
      const rot = (di % 2 === 0 ? -1 : 1) * (2 + (ci + di) % 3)
      const color = (ci + di) % 2 === 0 ? INK : BRASS
      const dx = digitsStart + di * digitSpacing
      const dy = startY + 108
      out += `<text x="${dx}" y="${dy}" class="display" font-size="80" fill="${color}" transform="rotate(${rot}, ${dx + 18}, ${dy - 25})">${d}</text>`
    })

    if (ci < PHONE_CHUNKS.length - 1) {
      out += `<text x="${x + boxW + 7}" y="${startY + 75}" class="display" font-size="38" fill="${HAIRLINE}">·</text>`
    }

    x += boxW + gap
  })

  return out
}

function svg(trade) {
  const decoyRef = 1000 + Math.floor(Math.random() * 8999)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <style>
      .display { font-family: 'Bricolage Grotesque', 'Times New Roman', serif; font-weight: 600; }
      .sans    { font-family: 'Inter Tight', 'Helvetica Neue', Arial, sans-serif; }
    </style>
  </defs>

  <rect width="1080" height="1350" fill="${PAPER}"/>
  <rect x="48" y="48" width="984" height="1254" fill="none" stroke="${HAIRLINE}" stroke-width="1"/>

  <text x="80" y="118" class="sans" font-size="20" fill="${BRASS}" letter-spacing="6">ADELAIDE  ·  ${trade.label.toUpperCase()}  ·  REF ${decoyRef}</text>
  <line x1="80" y1="138" x2="1000" y2="138" stroke="${HAIRLINE}" stroke-width="1"/>

  <!-- Headline 2-line -->
  <text x="80" y="310" class="display" font-size="88" fill="${INK}" letter-spacing="-2">${trade.line1}</text>
  <text x="80" y="410" class="display" font-size="88" fill="${INK}" letter-spacing="-2">${trade.line2}</text>

  <!-- Description 2-line -->
  <text x="80" y="490" class="sans" font-size="28" fill="${MUTED}">${trade.desc1}</text>
  <text x="80" y="528" class="sans" font-size="28" fill="${MUTED}">${trade.desc2}</text>

  <line x1="80" y1="590" x2="1000" y2="590" stroke="${HAIRLINE}" stroke-width="1"/>

  <!-- Contact card -->
  <g transform="translate(80, 780) rotate(-0.6)">
    <rect x="0" y="0" width="920" height="310" fill="${PAPER}" stroke="${BRASS}" stroke-width="2"/>
    <text x="40" y="55" class="sans" font-size="18" fill="${BRASS}" letter-spacing="6">MSG THIS NUMBER  ·  READ BOXES LEFT TO RIGHT</text>
    ${renderPhoneBoxes()}
  </g>

  <text x="80" y="1240" class="sans" font-size="18" fill="${MUTED}" letter-spacing="4">ADELAIDE  ·  REF ${decoyRef}</text>
  <line x1="80" y1="1255" x2="1000" y2="1255" stroke="${HAIRLINE}" stroke-width="1"/>
</svg>
`
}

for (const t of trades) {
  const svgPath  = resolve(OUT_DIR, `${t.slug}.svg`)
  const pngPath  = resolve(OUT_DIR, `${t.slug}.png`)
  const finalPath = resolve(OUT_DIR, `${t.slug}-final.png`)

  writeFileSync(svgPath, svg(t), 'utf8')
  execSync(`rsvg-convert -w 1080 -h 1350 "${svgPath}" -o "${pngPath}"`)

  const { x, y, w, h } = BLUR_REGION
  execSync(`magick "${pngPath}" \\( +clone -region ${w}x${h}+${x}+${y} -blur 0x5 \\) -composite "${finalPath}"`)

  console.log(`✓ ${t.slug}-final.png`)
}

console.log(`\nDone → ${OUT_DIR}`)
