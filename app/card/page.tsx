import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, UserPlus, PlayCircle, Building2, KeyRound, Home, ArrowRight } from 'lucide-react'
import { SITE, sitePhoneHref } from '@/lib/constants'

// Link page behind the NFC business card and its QR code. Stands alone: no site header or footer.
export const metadata: Metadata = {
  title: { absolute: `${SITE.founderName} | Briks Building Services` },
  description: 'Save Pargat’s contact, call or email Briks, or see how a repair runs from the tenant’s call to the Friday report.',
  alternates: { canonical: '/card' },
  robots: { index: false, follow: true },
}

const primary =
  'font-heading flex min-h-[60px] w-full items-center justify-center gap-3 rounded-md bg-[#1a1a1a] px-6 text-[17px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:bg-[#6a5530] active:translate-y-px'
const row =
  'group flex min-h-[60px] w-full items-center gap-4 rounded-md border border-[#c0bcb4] bg-white px-5 text-left transition-colors duration-200 hover:border-[#1a1a1a] active:translate-y-px'
const rowLabel = 'font-heading text-[16px] font-semibold text-[#1a1a1a]'
const rowSub = 'block text-[13.5px] text-[#5a5650]'
const icon = 'h-5 w-5 shrink-0 text-[#8a6e3f]'

export default function CardPage() {
  return (
    <div className="min-h-screen bg-[#fafaf7] px-4 pb-14 pt-[max(24px,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-[440px] flex-col gap-5">
        {/* Who */}
        <header className="rounded-lg bg-[#1a1a1a] px-6 pb-7 pt-8 text-[#fafaf7]">
          <Image src="/brand/briks-mark-light.png" alt="Briks logo" width={56} height={69} priority className="h-auto w-14" />
          <h1 className="font-display mt-6 text-[34px] font-bold leading-none tracking-[-0.02em]">{SITE.founderName}</h1>
          <p className="font-heading mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#b89868]">
            Founder · {SITE.name}
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-[#d6d0c4]">
            Tenants call us. We save you the headache. Every repair handled, approved by you, and on one report every Friday.
          </p>
        </header>

        {/* Main actions */}
        <a href="/card/pargat-singh.vcf" className={primary}>
          <UserPlus className="h-5 w-5" aria-hidden /> Save my contact
        </a>

        <div className="flex flex-col gap-3">
          <a href={sitePhoneHref()} className={row}>
            <Phone className={icon} aria-hidden />
            <span className="min-w-0 flex-1"><span className={rowLabel}>Call {SITE.phoneDisplay}</span><span className={rowSub}>Mon to Fri, 8am to 6pm</span></span>
          </a>
          <a href={`mailto:${SITE.email}`} className={row}>
            <Mail className={icon} aria-hidden />
            <span className="min-w-0 flex-1"><span className={rowLabel}>Email {SITE.email}</span><span className={rowSub}>A reply within one business hour</span></span>
          </a>
          <a href="/demo" className={row}>
            <PlayCircle className={icon} aria-hidden />
            <span className="min-w-0 flex-1"><span className={rowLabel}>See how a repair runs</span><span className={rowSub}>76-second demo: tenant’s call to Friday report</span></span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#5a5650] transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        {/* Who it is for */}
        <div>
          <p className="eyebrow mb-3">Read more</p>
          <div className="flex flex-col gap-3">
            <Link href="/for-agencies" className={row}>
              <Building2 className={icon} aria-hidden />
              <span className="min-w-0 flex-1"><span className={rowLabel}>For real estate agencies</span><span className={rowSub}>Send us one job. Judge us on that.</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#5a5650]" aria-hidden />
            </Link>
            <Link href="/for-landlords" className={row}>
              <KeyRound className={icon} aria-hidden />
              <span className="min-w-0 flex-1"><span className={rowLabel}>For landlords</span><span className={rowSub}>Repairs handled with your tenant</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#5a5650]" aria-hidden />
            </Link>
            <Link href="/for-homeowners" className={row}>
              <Home className={icon} aria-hidden />
              <span className="min-w-0 flex-1"><span className={rowLabel}>For homeowners</span><span className={rowSub}>A written quote before any work</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#5a5650]" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Proof */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[#e2ddd3] bg-[#e2ddd3] text-[13.5px]">
          {[
            ['Insurance', 'Public liability insured'],
            ['Trades', 'Licensed in South Australia'],
            ['Based in', 'Adelaide'],
            ['ABN', SITE.abn],
          ].map(([k, v]) => (
            <div key={k} className="bg-white px-4 py-3">
              <dt className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a5650]">{k}</dt>
              <dd className="mt-0.5 font-medium text-[#1a1a1a]">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="text-center text-[13px] text-[#5a5650]">
          <Link href="/" className="underline decoration-[#c0bcb4] underline-offset-4 hover:decoration-[#8a6e3f]">briks.au</Link>
          {' · '}{SITE.legalName}
        </p>
      </div>
    </div>
  )
}
