'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2 as CheckCircle, Pencil as PencilSimple, AlertCircle as WarningCircle } from 'lucide-react'
import { formatAbn } from '@/lib/join/abn'
import { errorsForStep, validateJoin } from '@/lib/join/join-schema'
import {
  AREAS,
  COMMON_ITEMS,
  INSURANCE_COVERS,
  JOBS_PER_WEEK,
  RESPONSE_TIMES,
  TRADES,
  TRADE_ITEMS,
  areaLabel,
  jobsPerWeekLabel,
  responseTimeLabel,
  tradeLabel,
  unitShort,
  type RateItem,
  type TradeKey,
} from '@/lib/join/rate-card'

// The signup is stored by the Briks ops server; this page only collects it.
const OPS_URL = process.env.NEXT_PUBLIC_OPS_URL || 'https://ops.briks.au'

/**
 * The public tradie signup wizard. No server actions: one POST to the ops server's
 * /api/join at the end. Progress is mirrored to localStorage (try/catch — it can be blocked)
 * so a tradie who switches apps to find their ABN doesn't lose their answers.
 */

const C = {
  bg: '#f3f0ea',
  card: '#fdfcf9',
  ink: '#1c1a17',
  muted: '#5f5a52',
  line: '#d9d2c4',
  soft: '#f6f2ea',
  brass: '#7d6236',
  danger: '#a83434',
  ok: '#256b37',
}

const STORE = 'briks-join-v1'
const STEPS = ['About you', 'Your trades', 'Business & insurance', 'Your rates', 'Check & send']

type Form = {
  name: string
  businessName: string
  phone: string
  email: string
  baseSuburb: string
  areas: string[]
  trades: string[]
  otherTrade: string
  abn: string
  gst: '' | 'yes' | 'no'
  licenceNumber: string
  insurance: '' | 'yes' | 'no'
  cover: '' | '5M' | '10M' | '20M' | 'OTHER'
  coverOther: string
  insurer: string
  expiry: string
  jobsPerWeek: number
  responseTime: string
  /** trade → itemKey → what they typed */
  rates: Record<string, Record<string, string>>
  ratesNote: string
  agree: boolean
  hp: string
}

const EMPTY: Form = {
  name: '', businessName: '', phone: '', email: '', baseSuburb: '', areas: [], trades: [], otherTrade: '',
  abn: '', gst: '', licenceNumber: '', insurance: '', cover: '', coverOther: '', insurer: '', expiry: '',
  jobsPerWeek: 0, responseTime: '', rates: {}, ratesNote: '', agree: false, hp: '',
}

function amount(s: string | undefined): number | undefined {
  const t = (s ?? '').replace(/[$,\s]/g, '')
  return t === '' ? undefined : Number(t)
}

function toPayload(f: Form, startedAt: number) {
  const rates: Record<string, unknown> = {}
  for (const t of f.trades) {
    const r = f.rates[t] ?? {}
    const row: Record<string, unknown> = { hourly: amount(r.hourly), callout: amount(r.callout) }
    for (const k of ['after_hours', 'min_charge']) if (amount(r[k]) !== undefined) row[k] = amount(r[k])
    const items: Record<string, number> = {}
    for (const it of TRADE_ITEMS[t as TradeKey] ?? []) {
      const v = amount(r[it.key])
      if (v !== undefined) items[it.key] = v
    }
    if (Object.keys(items).length) row.items = items
    rates[t] = row
  }
  return {
    name: f.name, businessName: f.businessName, phone: f.phone, email: f.email, baseSuburb: f.baseSuburb,
    areas: f.areas, trades: f.trades, otherTrade: f.otherTrade,
    abn: f.abn, gstRegistered: f.gst === '' ? undefined : f.gst === 'yes', licenceNumber: f.licenceNumber,
    hasInsurance: f.insurance === '' ? undefined : f.insurance === 'yes',
    insuranceCover: f.insurance === 'yes' && f.cover ? f.cover : undefined,
    insuranceOther: f.cover === 'OTHER' ? f.coverOther : undefined,
    insurer: f.insurance === 'yes' ? f.insurer : undefined,
    insuranceExpiry: f.insurance === 'yes' ? f.expiry : undefined,
    maxJobsPerWeek: f.jobsPerWeek || undefined,
    responseTime: f.responseTime || undefined,
    rates, ratesNote: f.ratesNote, agree: f.agree, startedAt, company_website: f.hp,
  }
}

// ── Small UI pieces ───────────────────────────────────────────────

const INPUT =
  'w-full rounded-[12px] border px-4 text-[16px] text-gray-900 bg-white placeholder:text-gray-500 min-h-[48px] outline-none focus:ring-2 focus:ring-[#7d6236]/40'

function Field({ label, hint, error, children, id }: { label: string; hint?: string; error?: string; children: React.ReactNode; id?: string }) {
  return (
    <div data-field-error={error ? 'true' : undefined}>
      <label htmlFor={id} className="block text-[15px] font-semibold mb-1.5" style={{ color: C.ink }}>
        {label}
      </label>
      {hint && (
        <p className="text-[14px] mb-1.5" style={{ color: C.muted }}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p role="alert" className="flex items-start gap-1.5 text-[14px] mt-1.5" style={{ color: C.danger }}>
          <WarningCircle size={18} className="shrink-0 mt-0.5" /> {error}
        </p>
      )}
    </div>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-[12px] border px-4 text-left text-[15px] font-medium min-h-[48px] cursor-pointer transition-colors"
      style={{ background: on ? C.brass : '#fff', color: on ? '#fff' : C.ink, borderColor: on ? C.brass : C.line }}
    >
      {on && <Check size={18} className="shrink-0" />}
      {children}
    </button>
  )
}

function YesNo({ value, onChange, name }: { value: '' | 'yes' | 'no'; onChange: (v: 'yes' | 'no') => void; name: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label={name}>
      {(['yes', 'no'] as const).map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className="rounded-[12px] border text-[16px] font-semibold min-h-[48px] cursor-pointer"
          style={{ background: value === v ? C.brass : '#fff', color: value === v ? '#fff' : C.ink, borderColor: value === v ? C.brass : C.line }}
        >
          {v === 'yes' ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  )
}

function PriceField({ item, value, onChange, error, id }: { item: RateItem; value: string; onChange: (v: string) => void; error?: string; id: string }) {
  return (
    <div data-field-error={error ? 'true' : undefined}>
      <label htmlFor={id} className="block text-[15px] font-medium mb-1" style={{ color: C.ink }}>
        {item.label}
        {item.required && <span style={{ color: C.danger }}> *</span>}
      </label>
      {item.hint && (
        <p className="text-[13px] mb-1" style={{ color: C.muted }}>
          {item.hint}
        </p>
      )}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-700" aria-hidden>
            $
          </span>
          <input
            id={id}
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
            className={`${INPUT} pl-8`}
            style={{ borderColor: error ? C.danger : C.line }}
          />
        </div>
        <span className="text-[14px] w-[64px] shrink-0" style={{ color: C.muted }}>
          {unitShort(item.unit)}
        </span>
      </div>
      {error && (
        <p role="alert" className="text-[14px] mt-1" style={{ color: C.danger }}>
          {error}
        </p>
      )}
    </div>
  )
}

const BTN_PRIMARY = 'inline-flex items-center justify-center gap-2 rounded-[12px] px-6 text-[16px] font-semibold text-white min-h-[52px] cursor-pointer disabled:opacity-60'
const BTN_GHOST = 'inline-flex items-center justify-center gap-2 rounded-[12px] border px-5 text-[16px] font-semibold min-h-[52px] cursor-pointer bg-white text-gray-900'

// ── The wizard ────────────────────────────────────────────────────

export default function JoinForm() {
  const [f, setF] = useState<Form>(EMPTY)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [restored, setRestored] = useState(false)
  const startedAt = useRef(0)
  const topRef = useRef<HTMLDivElement>(null)

  // Restore a half-finished form (and note when this visit started, for the time-trap).
  useEffect(() => {
    startedAt.current = Date.now()
    try {
      const raw = localStorage.getItem(STORE)
      if (raw) {
        const saved = JSON.parse(raw) as { f?: Partial<Form>; step?: number }
        if (saved.f) setF({ ...EMPTY, ...saved.f, agree: false, hp: '' })
        if (saved.step && saved.step >= 1 && saved.step <= 5) setStep(saved.step)
      }
    } catch {
      /* storage blocked or corrupt — start fresh */
    }
    setRestored(true)
  }, [])

  useEffect(() => {
    if (!restored || done) return
    try {
      localStorage.setItem(STORE, JSON.stringify({ f: { ...f, agree: false, hp: '' }, step }))
    } catch {
      /* ignore */
    }
  }, [f, step, restored, done])

  const set = useCallback(<K extends keyof Form>(k: K, v: Form[K]) => {
    setF((p) => ({ ...p, [k]: v }))
    setErrors((p) => {
      if (!(k in p) && !Object.keys(p).some((e) => e.startsWith(`${String(k)}.`))) return p
      const n = { ...p }
      for (const e of Object.keys(n)) if (e === k || e.startsWith(`${String(k)}.`)) delete n[e]
      return n
    })
  }, [])

  const setRate = (trade: string, key: string, v: string) => {
    setF((p) => ({ ...p, rates: { ...p.rates, [trade]: { ...(p.rates[trade] ?? {}), [key]: v } } }))
    setErrors((p) => {
      const n = { ...p }
      delete n[`rates.${trade}.${key}`]
      delete n[`rates.${trade}.items.${key}`]
      return n
    })
  }

  const toggle = (k: 'areas' | 'trades', v: string) => set(k, f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v])

  const licensedPicked = useMemo(() => TRADES.filter((t) => t.licensed && f.trades.includes(t.key)), [f.trades])
  const firstName = f.name.trim().split(/\s+/)[0] || ''

  const goto = (n: number) => {
    setStep(n)
    setFormError(null)
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start' })
      topRef.current?.focus({ preventScroll: true })
    })
  }

  const scrollToError = () =>
    requestAnimationFrame(() => document.querySelector('[data-field-error="true"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }))

  const next = () => {
    const res = validateJoin(toPayload(f, startedAt.current))
    const errs = res.ok ? {} : errorsForStep(step, res.errors)
    setErrors(errs)
    if (Object.keys(errs).length) {
      scrollToError()
      return
    }
    goto(step + 1)
  }

  const submit = async () => {
    setFormError(null)
    const res = validateJoin(toPayload(f, startedAt.current))
    if (!res.ok) {
      setErrors(res.errors)
      const bad = [1, 2, 3, 4, 5].find((s) => Object.keys(errorsForStep(s, res.errors)).length)
      if (bad && bad !== step) goto(bad)
      else scrollToError()
      return
    }
    setSending(true)
    try {
      const r = await fetch(`${OPS_URL}/api/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toPayload(f, startedAt.current)),
      })
      const j = (await r.json().catch(() => null)) as { ok?: boolean; errors?: Record<string, string>; error?: string } | null
      if (r.ok && j?.ok) {
        try {
          localStorage.removeItem(STORE)
        } catch {
          /* ignore */
        }
        setDone(firstName)
        requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: 'start' }))
      } else if (j?.errors) {
        setErrors(j.errors)
        setFormError(j.errors.form ?? 'Please check the highlighted answers.')
        const bad = [1, 2, 3, 4, 5].find((s) => Object.keys(errorsForStep(s, j.errors!)).length)
        if (bad) goto(bad)
      } else {
        setFormError(j?.error ?? 'Something went wrong. Please try again in a minute.')
      }
    } catch {
      setFormError('We could not reach the server. Check your signal and try again — your answers are saved.')
    } finally {
      setSending(false)
    }
  }

  const err = (k: string) => errors[k]
  const bd = (k: string) => ({ borderColor: err(k) ? C.danger : C.line })

  if (done !== null) {
    return (
      <div ref={topRef} tabIndex={-1} className="px-6 py-12 text-center outline-none">
        <CheckCircle size={56} style={{ color: C.ok }} className="mx-auto" />
        <h1 className="mt-4 text-[28px] leading-tight font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
          Thanks{done ? ` ${done}` : ''} — we’ll be in touch within 2 business days.
        </h1>
        <p className="mt-3 text-[16px]" style={{ color: C.muted }}>
          We’ll review your details and rates and call or text you on the mobile you gave us.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div ref={topRef} tabIndex={-1} className="outline-none px-5 sm:px-8 pt-6 pb-2">
        <p className="text-[13px] font-semibold tracking-wide uppercase" style={{ color: C.brass }}>
          Step {step} of 5
        </p>
        <h1 className="mt-1 text-[26px] leading-tight font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
          {STEPS[step - 1]}
        </h1>
        <div className="mt-3 flex gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < step ? C.brass : C.line }} />
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 py-5 space-y-5">
        {/* Honeypot — real people never see or fill this. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" name="company_website" value={f.hp} onChange={(e) => setF((p) => ({ ...p, hp: e.target.value }))} />
          </label>
        </div>

        {step === 1 && (
          <>
            <p className="text-[16px]" style={{ color: C.muted }}>
              Join the Briks trusted-tradie panel. Takes about 5 minutes.
            </p>
            <Field label="Full name *" id="j-name" error={err('name')}>
              <input id="j-name" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} className={INPUT} style={bd('name')} />
            </Field>
            <Field label="Business name" id="j-biz" error={err('businessName')}>
              <input id="j-biz" autoComplete="organization" value={f.businessName} onChange={(e) => set('businessName', e.target.value)} className={INPUT} style={bd('businessName')} />
            </Field>
            <Field label="Mobile *" id="j-phone" error={err('phone')}>
              <input id="j-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={f.phone} onChange={(e) => set('phone', e.target.value)} className={INPUT} style={bd('phone')} />
            </Field>
            <Field label="Email" id="j-email" error={err('email')}>
              <input id="j-email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} className={INPUT} style={bd('email')} />
            </Field>
            <Field label="Base suburb" id="j-suburb" error={err('baseSuburb')}>
              <input id="j-suburb" autoComplete="address-level2" value={f.baseSuburb} onChange={(e) => set('baseSuburb', e.target.value)} className={INPUT} style={bd('baseSuburb')} />
            </Field>
            <Field label="Areas you cover *" hint="Tick every area you’re happy to travel to." error={err('areas')}>
              <div className="flex flex-col gap-2">
                {AREAS.map((a) => (
                  <Chip key={a.key} on={f.areas.includes(a.key)} onClick={() => toggle('areas', a.key)}>
                    {a.label}
                  </Chip>
                ))}
              </div>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Tick every trade you do *" hint="We’ll ask for your rates for each one." error={err('trades')}>
              <div className="flex flex-wrap gap-2">
                {TRADES.map((t) => (
                  <Chip key={t.key} on={f.trades.includes(t.key)} onClick={() => toggle('trades', t.key)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Something else?" hint="If your trade isn’t listed, tell us here." id="j-other" error={err('otherTrade')}>
              <input id="j-other" value={f.otherTrade} onChange={(e) => set('otherTrade', e.target.value)} className={INPUT} style={bd('otherTrade')} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field label="ABN *" id="j-abn" hint="11 digits. We check it against the ABN rules." error={err('abn')}>
              <input id="j-abn" inputMode="numeric" autoComplete="off" placeholder="12 345 678 901" value={f.abn} onChange={(e) => set('abn', formatAbn(e.target.value))} className={INPUT} style={bd('abn')} />
            </Field>
            <Field label="Registered for GST? *" error={err('gstRegistered')}>
              <YesNo name="Registered for GST" value={f.gst} onChange={(v) => set('gst', v)} />
            </Field>
            <Field
              label={licensedPicked.length ? 'Licence number *' : 'Licence number'}
              id="j-lic"
              hint={licensedPicked.length ? `Needed for ${licensedPicked.map((t) => t.label).join(', ')}.` : 'If you hold a trade licence.'}
              error={err('licenceNumber')}
            >
              <input id="j-lic" autoComplete="off" value={f.licenceNumber} onChange={(e) => set('licenceNumber', e.target.value)} className={INPUT} style={bd('licenceNumber')} />
            </Field>
            <Field label="Public liability insurance? *" error={err('hasInsurance')}>
              <YesNo name="Public liability insurance" value={f.insurance} onChange={(v) => set('insurance', v)} />
            </Field>
            {f.insurance === 'no' && (
              <p className="rounded-[12px] px-4 py-3 text-[15px]" style={{ background: C.soft, color: C.ink }}>
                Most of our jobs need public liability — you can still apply, we’ll talk it through.
              </p>
            )}
            {f.insurance === 'yes' && (
              <div className="space-y-5 rounded-[14px] border p-4" style={{ borderColor: C.line, background: C.soft }}>
                <Field label="Cover amount *" error={err('insuranceCover')}>
                  <div className="grid grid-cols-2 gap-2">
                    {INSURANCE_COVERS.map((c) => (
                      <Chip key={c.key} on={f.cover === c.key} onClick={() => set('cover', c.key)}>
                        {c.label}
                      </Chip>
                    ))}
                  </div>
                </Field>
                {f.cover === 'OTHER' && (
                  <Field label="How much cover? *" id="j-cover-other" error={err('insuranceOther')}>
                    <input id="j-cover-other" value={f.coverOther} onChange={(e) => set('coverOther', e.target.value)} className={INPUT} style={bd('insuranceOther')} />
                  </Field>
                )}
                <Field label="Insurer *" id="j-insurer" error={err('insurer')}>
                  <input id="j-insurer" value={f.insurer} onChange={(e) => set('insurer', e.target.value)} className={INPUT} style={bd('insurer')} />
                </Field>
                <Field label="Policy expiry date *" id="j-expiry" error={err('insuranceExpiry')}>
                  <input id="j-expiry" type="date" min={new Date().toISOString().slice(0, 10)} value={f.expiry} onChange={(e) => set('expiry', e.target.value)} className={INPUT} style={bd('insuranceExpiry')} />
                </Field>
              </div>
            )}
            <Field label="How many jobs a week can you take? *" error={err('maxJobsPerWeek')}>
              <div className="grid grid-cols-2 gap-2">
                {JOBS_PER_WEEK.map((j) => (
                  <Chip key={j.value} on={f.jobsPerWeek === j.value} onClick={() => set('jobsPerWeek', j.value)}>
                    {j.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="How quickly can you usually attend? *" error={err('responseTime')}>
              <div className="grid grid-cols-2 gap-2">
                {RESPONSE_TIMES.map((r) => (
                  <Chip key={r.key} on={f.responseTime === r.key} onClick={() => set('responseTime', r.key)}>
                    {r.label}
                  </Chip>
                ))}
              </div>
            </Field>
          </>
        )}

        {step === 4 && (
          <>
            <section className="rounded-[16px] border px-5 py-6" style={{ background: C.soft, borderColor: C.line }}>
              <h2 className="text-[22px] leading-tight font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Before you add your rates
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed">
                Briks looks after property managers, landlords and homeowners across Adelaide, and we pass the work to a small panel of trusted tradies. We’re not
                offering one-off jobs — we’ll be sending you <strong>regular work that builds up over time</strong>.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed">
                Because of that, we ask for your <strong>best rates</strong> — sharper than you’d charge a one-off private customer. In return you get steady jobs
                without quoting, advertising or chasing customers: we handle the client, the booking and the invoicing.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed font-semibold">
                Please enter your genuine best rate for each item (ex GST). These are the rates we’ll book you at.
              </p>
            </section>

            {f.trades.map((t) => {
              const items = TRADE_ITEMS[t as TradeKey] ?? []
              const r = f.rates[t] ?? {}
              return (
                <section key={t} className="rounded-[16px] border p-4 space-y-4" style={{ borderColor: C.line, background: '#fff' }}>
                  <h3 className="text-[19px] font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                    {tradeLabel(t)}
                  </h3>
                  {COMMON_ITEMS.map((it) => (
                    <PriceField key={it.key} id={`r-${t}-${it.key}`} item={it} value={r[it.key] ?? ''} onChange={(v) => setRate(t, it.key, v)} error={err(`rates.${t}.${it.key}`)} />
                  ))}
                  {items.length > 0 && (
                    <>
                      <p className="text-[14px] pt-1" style={{ color: C.muted }}>
                        Common jobs — leave blank if you don’t do it.
                      </p>
                      {items.map((it) => (
                        <PriceField key={it.key} id={`r-${t}-${it.key}`} item={it} value={r[it.key] ?? ''} onChange={(v) => setRate(t, it.key, v)} error={err(`rates.${t}.items.${it.key}`)} />
                      ))}
                    </>
                  )}
                </section>
              )
            })}

            <Field label="Anything else about your pricing?" id="j-ratesnote" hint="Call-out minutes covered, travel zones, materials mark-up…" error={err('ratesNote')}>
              <textarea id="j-ratesnote" rows={4} value={f.ratesNote} onChange={(e) => set('ratesNote', e.target.value)} className={`${INPUT} py-3`} style={bd('ratesNote')} />
            </Field>
          </>
        )}

        {step === 5 && (
          <>
            <p className="text-[16px]" style={{ color: C.muted }}>
              Have a quick look over everything before you send it.
            </p>
            <Summary title="About you" onEdit={() => goto(1)}>
              <Row k="Name" v={f.name} />
              <Row k="Business" v={f.businessName} />
              <Row k="Mobile" v={f.phone} />
              <Row k="Email" v={f.email} />
              <Row k="Base suburb" v={f.baseSuburb} />
              <Row k="Areas" v={f.areas.map(areaLabel).join(', ')} />
            </Summary>
            <Summary title="Trades" onEdit={() => goto(2)}>
              <Row k="Trades" v={[...f.trades.map(tradeLabel), f.otherTrade].filter(Boolean).join(', ')} />
            </Summary>
            <Summary title="Business & insurance" onEdit={() => goto(3)}>
              <Row k="ABN" v={f.abn} />
              <Row k="GST registered" v={f.gst === 'yes' ? 'Yes' : f.gst === 'no' ? 'No' : ''} />
              <Row k="Licence" v={f.licenceNumber} />
              <Row k="Public liability" v={f.insurance === 'yes' ? `Yes — ${f.cover === 'OTHER' ? f.coverOther : `$${f.cover}`}, ${f.insurer}, expires ${f.expiry}` : f.insurance === 'no' ? 'No' : ''} />
              <Row k="Jobs a week" v={jobsPerWeekLabel(f.jobsPerWeek)} />
              <Row k="Can attend" v={responseTimeLabel(f.responseTime)} />
            </Summary>
            <Summary title="Your rates (ex GST)" onEdit={() => goto(4)}>
              {f.trades.map((t) => {
                const r = f.rates[t] ?? {}
                const filled = [...COMMON_ITEMS, ...(TRADE_ITEMS[t as TradeKey] ?? [])].filter((it) => (r[it.key] ?? '') !== '')
                return (
                  <div key={t} className="py-2">
                    <p className="text-[15px] font-semibold">{tradeLabel(t)}</p>
                    <ul className="mt-1 space-y-0.5">
                      {filled.map((it) => (
                        <li key={it.key} className="flex justify-between gap-3 text-[14px]">
                          <span style={{ color: C.muted }}>{it.label}</span>
                          <span className="tabular-nums shrink-0">
                            ${r[it.key]} {unitShort(it.unit)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
              {f.ratesNote && <Row k="Notes" v={f.ratesNote} />}
            </Summary>

            <div data-field-error={err('agree') ? 'true' : undefined}>
              <label className="flex items-start gap-3 rounded-[14px] border p-4 cursor-pointer" style={{ borderColor: err('agree') ? C.danger : C.line, background: '#fff' }}>
                <input
                  type="checkbox"
                  checked={f.agree}
                  onChange={(e) => set('agree', e.target.checked)}
                  className="mt-1 h-6 w-6 shrink-0 accent-[#7d6236]"
                />
                <span className="text-[15px] leading-relaxed text-gray-900">
                  I confirm these details are correct and these are the rates I’ll charge Briks Building Services for the next 12 months unless we agree otherwise in writing.
                </span>
              </label>
              {err('agree') && (
                <p role="alert" className="text-[14px] mt-1.5" style={{ color: C.danger }}>
                  {err('agree')}
                </p>
              )}
            </div>
            <p className="text-[14px]" style={{ color: C.muted }}>
              We keep your details to offer you work and never sell them.
            </p>
            {formError && (
              <p role="alert" className="rounded-[12px] px-4 py-3 text-[15px]" style={{ background: '#f8e5e0', color: C.danger }}>
                {formError}
              </p>
            )}
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button type="button" onClick={() => goto(step - 1)} className={BTN_GHOST} style={{ borderColor: C.line }} disabled={sending}>
              <ArrowLeft size={20} /> Back
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={next} className={`${BTN_PRIMARY} flex-1`} style={{ background: C.brass }}>
              Next <ArrowRight size={20} />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={sending} className={`${BTN_PRIMARY} flex-1`} style={{ background: C.brass }}>
              {sending ? 'Sending…' : 'Send my application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Summary({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-[14px] border p-4" style={{ borderColor: C.line, background: '#fff' }}>
      <div className="flex items-center justify-between gap-3 mb-1">
        <h2 className="text-[17px] font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
          {title}
        </h2>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 text-[15px] font-semibold min-h-[44px] px-2 cursor-pointer" style={{ color: C.brass }}>
          <PencilSimple size={18} /> Edit
        </button>
      </div>
      <div className="divide-y" style={{ borderColor: C.line }}>
        {children}
      </div>
    </section>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  if (!v) return null
  return (
    <div className="flex justify-between gap-4 py-2 text-[15px]">
      <span style={{ color: C.muted }}>{k}</span>
      <span className="text-right break-words min-w-0 font-medium">{v}</span>
    </div>
  )
}
