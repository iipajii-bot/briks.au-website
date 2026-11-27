import { SITE } from '@/lib/constants'

// Contact card behind the "Save my contact" button on /card (and the NFC business card).
export const dynamic = 'force-static'

export function GET() {
  const mobile = `+61${SITE.phone.replace(/^0/, '')}`
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Singh;Pargat;;;',
    `FN:${SITE.founderName}`,
    `ORG:${SITE.name}`,
    'TITLE:Founder',
    `TEL;TYPE=CELL,VOICE:${mobile}`,
    `EMAIL;TYPE=WORK:${SITE.email}`,
    `URL:${SITE.url}`,
    'ADR;TYPE=WORK:;;;Adelaide;SA;;Australia',
    'NOTE:Property repairs coordinated for real estate agencies\\, landlords and homeowners. Mon to Fri 8am to 6pm.',
    'END:VCARD',
  ]
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pargat-singh-briks.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
