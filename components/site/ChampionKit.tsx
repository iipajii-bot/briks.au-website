'use client'

/**
 * Property-manager champion kit: their numbers, then a ready email to the principal
 * that updates as they type. Copy button + mailto (mailto may do nothing on some devices,
 * so the full text is always visible and copyable).
 */
import { useId, useMemo, useState } from 'react'
import TimeBackCalculator, { type TimeBackValues } from './TimeBackCalculator'
import { fmt } from './personal'

function buildEmail(v: TimeBackValues, name: string, agency: string) {
  const ag = agency || 'our agency'
  const link = `https://www.briks.au/for-agencies?doors=${Math.round(v.doors)}${agency ? `&agency=${encodeURIComponent(agency)}` : ''}`
  const subject = `Trying Briks on my portfolio at ${ag}`
  const body = [
    'Hi,',
    '',
    `Tenant repairs take me about ${fmt(v.hoursWeek, 1)} hours a week across ${fmt(v.doors)} doors (an estimate from ${fmt(v.req, 1)} requests a door a year at ${fmt(v.mins)} minutes each).`,
    '',
    'Briks Building Services runs a maintenance desk for agencies. Tenants call their number for repairs and they sort simple problems on the phone. When a trade is needed they book a licensed one, arrange access, keep the tenant updated and send us a report every Friday with photos. Jobs under our approval limit go ahead; anything over it is quoted to us first.',
    '',
    `Routine repairs under our approval limit go ahead; anything bigger comes to me as a quote by email, and nothing starts until I approve it in writing. Our owners stay with us. They suggest seeing it work on one portfolio first, with no lock-in, and I would like that to be mine. All we need to do is add them as a supplier and send them my tenant list.`,
    '',
    `Details: ${link}`,
    '',
    'Could we talk about it this week?',
    '',
    'Thanks,',
    name || '',
  ].join('\n')
  return { subject, body }
}

export default function ChampionKit({ defaultDoors = 200, defaultName = '', defaultAgency = '' }: { defaultDoors?: number; defaultName?: string; defaultAgency?: string }) {
  const uid = useId()
  const [name, setName] = useState(defaultName)
  const [agency, setAgency] = useState(defaultAgency)
  const [copied, setCopied] = useState<'idle' | 'done' | 'select'>('idle')

  const input =
    'mt-1.5 block w-full rounded-sm border border-[#c0bcb4] bg-white px-3.5 py-3 text-[16px] text-gray-900 focus:border-[#1a1a1a] focus:outline-none'

  return (
    <TimeBackCalculator defaultDoors={defaultDoors} doorsLabel="Doors you manage">
      {(v) => <EmailPanel v={v} name={name} agency={agency} setName={setName} setAgency={setAgency} uid={uid} input={input} copied={copied} setCopied={setCopied} />}
    </TimeBackCalculator>
  )
}

function EmailPanel({
  v,
  name,
  agency,
  setName,
  setAgency,
  uid,
  input,
  copied,
  setCopied,
}: {
  v: TimeBackValues
  name: string
  agency: string
  setName: (s: string) => void
  setAgency: (s: string) => void
  uid: string
  input: string
  copied: 'idle' | 'done' | 'select'
  setCopied: (s: 'idle' | 'done' | 'select') => void
}) {
  const { subject, body } = useMemo(() => buildEmail(v, name.trim(), agency.trim()), [v, name, agency])
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`)
      setCopied('done')
    } catch {
      const el = document.getElementById(`${uid}-email`)
      if (el) {
        const r = document.createRange()
        r.selectNodeContents(el)
        const s = window.getSelection()
        s?.removeAllRanges()
        s?.addRange(r)
      }
      setCopied('select')
    }
    window.setTimeout(() => setCopied('idle'), 2500)
  }

  return (
    <div className="mt-4 rounded-sm bg-[#fafaf7] p-5 text-[#1a1a1a]">
      <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a6e3f]">Your email to your principal</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="font-heading text-[13px] font-semibold">Your name</label>
          <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} autoComplete="given-name" className={input} />
        </div>
        <div>
          <label htmlFor={`${uid}-agency`} className="font-heading text-[13px] font-semibold">Your agency</label>
          <input id={`${uid}-agency`} value={agency} onChange={(e) => setAgency(e.target.value.slice(0, 40))} autoComplete="organization" className={input} />
        </div>
      </div>
      <p className="mt-4 text-[13px] text-[#5a5650]">
        <span className="font-semibold text-[#1a1a1a]">Subject:</span> {subject}
      </p>
      <pre
        id={`${uid}-email`}
        className="mt-2 max-h-[260px] overflow-auto whitespace-pre-wrap rounded-sm border border-[#e2ddd3] bg-white p-4 font-sans text-[14px] leading-relaxed text-[#3a3735]"
      >
        {body}
      </pre>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={copy}
          className="font-heading inline-flex min-h-[48px] items-center justify-center rounded-sm bg-[#1a1a1a] px-5 text-[15px] font-semibold text-[#fafaf7] transition-colors hover:bg-[#6a5530]"
        >
          {copied === 'done' ? 'Copied' : copied === 'select' ? 'Selected, press copy' : 'Copy the email'}
        </button>
        <a
          href={mailto}
          className="font-heading inline-flex min-h-[48px] items-center justify-center rounded-sm border border-[#c0bcb4] bg-white px-5 text-[15px] font-semibold text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
        >
          Open in my email
        </a>
      </div>
    </div>
  )
}
