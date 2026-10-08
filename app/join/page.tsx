import type { Metadata } from 'next'
import JoinForm from '@/components/join/JoinForm'

export const metadata: Metadata = {
  title: 'Join the Briks Tradie Panel — Apply Online',
  description:
    'Adelaide tradies: apply to join the Briks panel for regular property-maintenance work. Tell us your trade, insurance and best rates — takes about 5 minutes.',
  alternates: { canonical: '/join' },
  // Shared by text with tradies we recruit; not a search landing page.
  robots: { index: false, follow: true },
}

/**
 * Tradie signup. The form posts straight to the Briks ops server
 * (ops.briks.au/api/join), which validates it and files it for review —
 * nothing is stored on this site.
 */
export default function JoinPage() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 bg-[#f3f0ea] min-h-[70vh]">
      <div
        className="max-w-[560px] mx-auto sm:rounded-[18px] overflow-hidden bg-[#fdfcf9]"
        style={{ boxShadow: '0 1px 2px rgba(60,40,20,0.06), 0 12px 40px rgba(60,40,20,0.08)' }}
      >
        <JoinForm />
      </div>
    </section>
  )
}
