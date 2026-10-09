'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2 as CheckCircle, Pencil as PencilSimple, AlertCircle as WarningCircle } from 'lucide-react'
import { formatAbn } from '@/lib/join/abn'
import { errorsForStep, validateJoin } from '@/lib/join/join-schema'
import {
  AREAS,
  AVAILABILITY,
  BILLING_BLOCKS,
  CALLOUT_MINUTES,
  CALLOUT_MINUTES_DEFAULT,
  INSURANCE_COVERS,
  JOBS_PER_WEEK,
  MATERIALS_MARKUPS,
  PAYMENT_TERMS_DAYS,
  POLICE_CHECKS,
  RESPONSE_TIMES,
  TEAM_SIZES,
  TRADES,
  TRADE_ITEMS,
  TRAVEL_FREE_KM,
  WARRANTY_MONTHS,
  WASTE_OPTIONS,
  YEARS_BANDS,
  areaLabel,
  availabilityLabel,
  capabilitiesFor,
  jobsPerWeekLabel,
  policeLabel,
  responseTimeLabel,
  teamLabel,
  tradeLabel,
  unitShort,
  warrantyLabel,
  wasteLabel,
  yearsLabel,
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

/** v2 = the 5-step signup. The v1 draft shape is ignored, not migrated. */
const STORE = 'briks-join-v2'
const STEPS = ['About you', 'Your trades', 'Your rates', 'Everyday jobs', 'Your business & send']
const POI = 'POI'

type TradeRateForm = {
  hourly: string
  callout: string
  calloutMinutes: number
  /** job key → typed $ amount, or 'POI' */
  items: Record<string, string>
}

type Form = {
  name: string
  businessName: string
  phone: string
  email: string
  baseSuburb: string
  areas: string[]
  trades: string[]
  otherTrade: string
  // Step 3 — rates per trade
  rates: Record<string, TradeRateForm>
  // Step 3 — business terms
  billing: number | null
  quote: '' | 'free' | 'fee'
  quoteFee: string
  afterHours: string
  emergency: string
  markup: '' | '10' | '15' | '20' | '25' | '30' | 'other'
  markupOther: string
  travelKm: number | null
  travelPerKm: string
  waste: '' | 'INCLUDED' | 'AT_COST' | 'PER_LOAD'
  wastePerLoad: string
  // Step 4
  caps: Record<string, string[]>
  ratesNote: string
  // Step 5 — business
  abn: string
  gst: '' | 'yes' | 'no'
  licenceNumber: string
  insurance: '' | 'yes' | 'no'
  cover: '' | '5M' | '10M' | '20M' | 'OTHER'
  coverOther: string
  insurer: string
  expiry: string
  years: string
  team: string
  police: string
  warranty: number | null
  paymentDays: number[]
  availability: string[]
  jobsPerWeek: number
  responseTime: string
  agree: boolean
  hp: string
}

const EMPTY: Form = {
  name: '', businessName: '', phone: '', email: '', baseSuburb: '', areas: [], trades: [], otherTrade: '',
  rates: {},
  billing: null, quote: '', quoteFee: '', afterHours: '', emergency: '', markup: '', markupOther: '',
  travelKm: null, travelPerKm: '', waste: '', wastePerLoad: '',
  caps: {}, ratesNote: '',
  abn: '', gst: '', licenceNumber: '', insurance: '', cover: '', coverOther: '', insurer: '', expiry: '',
  years: '', team: '', police: '', warranty: null, paymentDays: [], availability: [],
  jobsPerWeek: 0, responseTime: '', agree: false, hp: '',
}

const blankRate = (): TradeRateForm => ({ hourly: '', callout: '', calloutMinutes: CALLOUT_MINUTES_DEFAULT, items: {} })
const rateOf = (f: Form, t: string): TradeRateForm => f.rates[t] ?? blankRate()

function amount(s: string | undefined): number | undefined {
  const t = (s ?? '').replace(/[$,\s]/g, '')
  return t === '' ? undefined : Number(t)
}

const toggleIn = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

function toPayload(f: Form, startedAt: number) {
  const rates: Record<string, unknown> = {}
  for (const t of f.trades) {
    const r = rateOf(f, t)
    const items: Record<string, number | 'POI'> = {}
    for (const it of TRADE_ITEMS[t as TradeKey] ?? []) {
      const raw = r.items[it.key]
      if (raw === POI) items[it.key] = POI
      else {
        const v = amount(raw)
        if (v !== undefined) items[it.key] = v
      }
    }
    rates[t] = {
      hourly: amount(r.hourly),
      callout: amount(r.callout),
      calloutMinutes: r.calloutMinutes,
      ...(Object.keys(items).length ? { items } : {}),
    }
  }

  const capabilities: Record<string, string[]> = {}
  for (const t of f.trades) {
    const c = f.caps[t] ?? []
    if (c.length) capabilities[t] = c
  }

  const terms = {
    billingIncrement: f.billing ?? undefined,
    quoteFee: f.quote === 'free' ? null : f.quote === 'fee' ? amount(f.quoteFee) : undefined,
    afterHours: amount(f.afterHours),
    emergencyCallout: amount(f.emergency),
    materialsMarkupPct: f.markup === 'other' ? amount(f.markupOther) : f.markup ? Number(f.markup) : undefined,
    travelFreeKm: f.travelKm ?? undefined,
    travelPerKm: amount(f.travelPerKm),
    waste: f.waste || undefined,
    wastePerLoad: f.waste === 'PER_LOAD' ? amount(f.wastePerLoad) : undefined,
  }

  const profile = {
    yearsBand: f.years || undefined,
    team: f.team || undefined,
    policeCheck: f.police || undefined,
    warrantyMonths: f.warranty ?? undefined,
    paymentTermsDays: f.paymentDays,
    availability: f.availability,
  }

  return {
    name: f.name, businessName: f.businessName, phone: f.phone, email: f.email, baseSuburb: f.baseSuburb,
    areas: f.areas, trades: f.trades, otherTrade: f.otherTrade,
    rates,
    terms,
    capabilities,
    profile,
    ratesNote: f.ratesNote,
    abn: f.abn, gstRegistered: f.gst === '' ? undefined : f.gst === 'yes', licenceNumber: f.licenceNumber,
    hasInsurance: f.insurance === '' ? undefined : f.insurance === 'yes',
    insuranceCover: f.insurance === 'yes' && f.cover ? f.cover : undefined,
    insuranceOther: f.cover === 'OTHER' ? f.coverOther : undefined,
    insurer: f.insurance === 'yes' ? f.insurer : undefined,
    insuranceExpiry: f.insurance === 'yes' ? f.expiry : undefined,
    maxJobsPerWeek: f.jobsPerWeek || undefined,
    responseTime: f.responseTime || undefined,
    agree: f.agree, startedAt, company_website: f.hp,
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

/** A dollar field. `allowPoi` adds a "Price on inspection" toggle (stored as the value 'POI'). */
function PriceField({
  id, label, hint, unit, value, onChange, error, required, allowPoi, placeholder,
}: {
  id: string
  label?: string
  hint?: string
  unit?: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  allowPoi?: boolean
  placeholder?: string
}) {
  const onInspection = allowPoi && value === POI
  return (
    <div data-field-error={error ? 'true' : undefined}>
      {label && (
        <label htmlFor={id} className="block text-[15px] font-medium mb-1" style={{ color: C.ink }}>
          {label}
          {required && <span style={{ color: C.danger }}> *</span>}
        </label>
      )}
      {hint && (
        <p className="text-[13px] mb-1" style={{ color: C.muted }}>
          {hint}
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
            placeholder={onInspection ? 'On inspection' : (placeholder ?? '0')}
            disabled={onInspection}
            value={onInspection ? '' : value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
            className={`${INPUT} pl-8 disabled:bg-gray-100`}
            style={{ borderColor: error ? C.danger : C.line }}
          />
        </div>
        {unit && (
          <span className="text-[14px] w-[72px] shrink-0" style={{ color: C.muted }}>
            {unitShort(unit)}
          </span>
        )}
      </div>
      {allowPoi && (
        <button
          type="button"
          aria-pressed={onInspection}
          onClick={() => onChange(onInspection ? '' : POI)}
          className="mt-2 inline-flex items-center gap-2 rounded-[12px] border px-3 text-[14px] min-h-[44px] cursor-pointer"
          style={{ background: onInspection ? C.soft : '#fff', color: C.ink, borderColor: onInspection ? C.brass : C.line }}
        >
          {onInspection && <Check size={16} className="shrink-0" style={{ color: C.brass }} />}
          Price on inspection
        </button>
      )}
      {error && (
        <p role="alert" className="text-[14px] mt-1" style={{ color: C.danger }}>
          {error}
        </p>
      )}
    </div>
  )
}

function Hint({ error }: { error?: string }) {
  if (!error) return null
  return (
    <p role="alert" className="text-[14px] mt-1.5" style={{ color: C.danger }}>
      {error}
    </p>
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
        if (saved.step && saved.step >= 1 && saved.step <= STEPS.length) setStep(saved.step)
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

  /** Drop every error whose key is one of the prefixes (or nested under one). */
  const clear = useCallback((...prefixes: string[]) => {
    setErrors((p) => {
      const keys = Object.keys(p).filter((e) => prefixes.some((x) => e === x || e.startsWith(`${x}.`)))
      if (!keys.length) return p
      const n = { ...p }
      for (const k of keys) delete n[k]
      return n
    })
  }, [])

  const patch = useCallback(
    (p: Partial<Form>, ...errKeys: string[]) => {
      setF((prev) => ({ ...prev, ...p }))
      if (errKeys.length) clear(...errKeys)
    },
    [clear]
  )

  const setRate = (t: string, p: Partial<TradeRateForm>, errKeys: string[]) => {
    setF((prev) => ({ ...prev, rates: { ...prev.rates, [t]: { ...rateOf(prev, t), ...p } } }))
    clear(...errKeys)
  }

  const setItem = (t: string, key: string, v: string) => {
    setF((prev) => {
      const r = rateOf(prev, t)
      return { ...prev, rates: { ...prev.rates, [t]: { ...r, items: { ...r.items, [key]: v } } } }
    })
    clear(`rates.${t}.items.${key}`)
  }

  const toggleCap = (t: string, key: string) =>
    setF((prev) => ({ ...prev, caps: { ...prev.caps, [t]: toggleIn(prev.caps[t] ?? [], key) } }))

  const toggleList = (k: 'areas' | 'trades', v: string) => patch({ [k]: toggleIn(f[k], v) } as Partial<Form>, k)

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

  const firstBadStep = (errs: Record<string, string>) => STEPS.map((_, i) => i + 1).find((s) => Object.keys(errorsForStep(s, errs)).length)

  const submit = async () => {
    setFormError(null)
    const res = validateJoin(toPayload(f, startedAt.current))
    if (!res.ok) {
      setErrors(res.errors)
      const bad = firstBadStep(res.errors)
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
        const bad = firstBadStep(j.errors)
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

  // Terms choices (mapped to the shape the chips use).
  const billingOpts = BILLING_BLOCKS.map((b) => ({ value: b.value, label: b.label }))
  const markupOpts = [...MATERIALS_MARKUPS.map((m) => ({ value: String(m), label: `Cost + ${m}%` })), { value: 'other', label: 'Other…' }]
  const wasteOpts = WASTE_OPTIONS.map((w) => ({ value: w.key, label: w.label }))

  return (
    <div>
      <div ref={topRef} tabIndex={-1} className="outline-none px-5 sm:px-8 pt-6 pb-2">
        <p className="text-[13px] font-semibold tracking-wide uppercase" style={{ color: C.brass }}>
          Step {step} of {STEPS.length}
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
              <input id="j-name" autoComplete="name" value={f.name} onChange={(e) => patch({ name: e.target.value }, 'name')} className={INPUT} style={bd('name')} />
            </Field>
            <Field label="Business name" id="j-biz" error={err('businessName')}>
              <input id="j-biz" autoComplete="organization" value={f.businessName} onChange={(e) => patch({ businessName: e.target.value }, 'businessName')} className={INPUT} style={bd('businessName')} />
            </Field>
            <Field label="Mobile *" id="j-phone" error={err('phone')}>
              <input id="j-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={f.phone} onChange={(e) => patch({ phone: e.target.value }, 'phone')} className={INPUT} style={bd('phone')} />
            </Field>
            <Field label="Email" id="j-email" error={err('email')}>
              <input id="j-email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(e) => patch({ email: e.target.value }, 'email')} className={INPUT} style={bd('email')} />
            </Field>
            <Field label="Base suburb" id="j-suburb" error={err('baseSuburb')}>
              <input id="j-suburb" autoComplete="address-level2" value={f.baseSuburb} onChange={(e) => patch({ baseSuburb: e.target.value }, 'baseSuburb')} className={INPUT} style={bd('baseSuburb')} />
            </Field>
            <Field label="Areas you cover *" hint="Tick every area you’re happy to travel to." error={err('areas')}>
              <div className="flex flex-col gap-2">
                {AREAS.map((a) => (
                  <Chip key={a.key} on={f.areas.includes(a.key)} onClick={() => toggleList('areas', a.key)}>
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
                  <Chip key={t.key} on={f.trades.includes(t.key)} onClick={() => toggleList('trades', t.key)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Something else?" hint="If your trade isn’t listed, tell us here." id="j-other" error={err('otherTrade')}>
              <input id="j-other" value={f.otherTrade} onChange={(e) => patch({ otherTrade: e.target.value }, 'otherTrade')} className={INPUT} style={bd('otherTrade')} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <section className="rounded-[16px] border px-5 py-6" style={{ background: C.soft, borderColor: C.line }}>
              <h2 className="text-[22px] leading-tight font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Your best rates
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed">
                We send regular small jobs — taps, locks, lights, drains. Give us your sharpest rates (ex GST) and you’ll get steady work without quoting or chasing
                customers.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed font-semibold">These are the rates we’ll book you at.</p>
            </section>

            {f.trades.map((t) => {
              const r = rateOf(f, t)
              return (
                <section key={t} className="rounded-[16px] border p-4 space-y-4" style={{ borderColor: C.line, background: '#fff' }}>
                  <h3 className="text-[19px] font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                    {tradeLabel(t)}
                  </h3>
                  <PriceField
                    id={`r-${t}-callout`}
                    label="Call-out fee"
                    required
                    value={r.callout}
                    onChange={(v) => setRate(t, { callout: v }, [`rates.${t}.callout`])}
                    error={err(`rates.${t}.callout`)}
                  />
                  <div data-field-error={err(`rates.${t}.calloutMinutes`) ? 'true' : undefined}>
                    <p className="text-[15px] font-medium mb-1.5" style={{ color: C.ink }}>
                      Call-out includes the first
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CALLOUT_MINUTES.map((m) => (
                        <Chip key={m.value} on={r.calloutMinutes === m.value} onClick={() => setRate(t, { calloutMinutes: m.value }, [`rates.${t}.calloutMinutes`])}>
                          {m.label}
                        </Chip>
                      ))}
                    </div>
                    <Hint error={err(`rates.${t}.calloutMinutes`)} />
                  </div>
                  <PriceField
                    id={`r-${t}-hourly`}
                    label="Hourly rate after that"
                    required
                    unit="per hour"
                    value={r.hourly}
                    onChange={(v) => setRate(t, { hourly: v }, [`rates.${t}.hourly`])}
                    error={err(`rates.${t}.hourly`)}
                  />
                </section>
              )
            })}

            <section className="rounded-[16px] border p-4 space-y-5" style={{ borderColor: C.line, background: '#fff' }}>
              <h3 className="text-[19px] font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                For your whole business
              </h3>

              <Field label="Bill in blocks of *" error={err('terms.billingIncrement')}>
                <div className="flex flex-wrap gap-2">
                  {billingOpts.map((o) => (
                    <Chip key={o.value} on={f.billing === o.value} onClick={() => patch({ billing: o.value }, 'terms.billingIncrement')}>
                      {o.label}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="Quote / inspection visit *" error={err('terms.quoteFee')}>
                <div className="grid grid-cols-2 gap-2">
                  <Chip on={f.quote === 'free'} onClick={() => patch({ quote: 'free', quoteFee: '' }, 'terms.quoteFee')}>
                    Free
                  </Chip>
                  <Chip on={f.quote === 'fee'} onClick={() => patch({ quote: 'fee' }, 'terms.quoteFee')}>
                    Charge a fee
                  </Chip>
                </div>
                {f.quote === 'fee' && (
                  <div className="mt-3">
                    <PriceField id="j-quote" label="Quote fee" required value={f.quoteFee} onChange={(v) => patch({ quoteFee: v }, 'terms.quoteFee')} error={err('terms.quoteFee')} />
                  </div>
                )}
              </Field>

              <PriceField
                id="j-afterhours"
                label="After-hours & weekend hourly (optional)"
                unit="per hour"
                value={f.afterHours}
                onChange={(v) => patch({ afterHours: v }, 'terms.afterHours')}
                error={err('terms.afterHours')}
              />
              <PriceField
                id="j-emergency"
                label="Emergency call-out, same day or night (optional)"
                value={f.emergency}
                onChange={(v) => patch({ emergency: v }, 'terms.emergencyCallout')}
                error={err('terms.emergencyCallout')}
              />

              <Field label="Materials mark-up *" hint="Added on top of what you pay for parts." error={err('terms.materialsMarkupPct')}>
                <div className="grid grid-cols-2 gap-2">
                  {markupOpts.map((o) => (
                    <Chip key={o.value} on={f.markup === o.value} onClick={() => patch({ markup: o.value as Form['markup'] }, 'terms.materialsMarkupPct')}>
                      {o.label}
                    </Chip>
                  ))}
                </div>
                {f.markup === 'other' && (
                  <div className="relative mt-3">
                    <input
                      id="j-markup-other"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="e.g. 35"
                      value={f.markupOther}
                      onChange={(e) => patch({ markupOther: e.target.value.replace(/[^0-9.]/g, '') }, 'terms.materialsMarkupPct')}
                      className={`${INPUT} pr-10`}
                      style={bd('terms.materialsMarkupPct')}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-700" aria-hidden>
                      %
                    </span>
                  </div>
                )}
              </Field>

              <Field label="Travel — free within (optional)" hint="Beyond that, charge per km." error={err('terms.travelFreeKm')}>
                <div className="grid grid-cols-2 gap-2">
                  {TRAVEL_FREE_KM.map((km) => (
                    <Chip key={km} on={f.travelKm === km} onClick={() => patch({ travelKm: f.travelKm === km ? null : km }, 'terms.travelFreeKm')}>
                      {km} km
                    </Chip>
                  ))}
                </div>
              </Field>
              <PriceField
                id="j-travel-km"
                label="Then $ per km (optional)"
                unit="per km"
                value={f.travelPerKm}
                onChange={(v) => patch({ travelPerKm: v }, 'terms.travelPerKm')}
                error={err('terms.travelPerKm')}
              />

              <Field label="Tip / waste *" error={err('terms.waste')}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {wasteOpts.map((o) => (
                    <Chip key={o.value} on={f.waste === o.value} onClick={() => patch({ waste: o.value as Form['waste'] }, 'terms.waste')}>
                      {o.label}
                    </Chip>
                  ))}
                </div>
                {f.waste === 'PER_LOAD' && (
                  <div className="mt-3">
                    <PriceField id="j-waste-load" label="$ per load" required value={f.wastePerLoad} onChange={(v) => patch({ wastePerLoad: v }, 'terms.wastePerLoad')} error={err('terms.wastePerLoad')} />
                  </div>
                )}
              </Field>
            </section>
          </>
        )}

        {step === 4 && (
          <>
            <p className="text-[16px]" style={{ color: C.muted }}>
              Your everyday jobs, labour only. Leave a job blank if you don’t do it. If the price depends on the job, tick “Price on inspection”.
            </p>

            {f.trades.map((t) => {
              const items: RateItem[] = TRADE_ITEMS[t as TradeKey] ?? []
              const r = rateOf(f, t)
              const caps = capabilitiesFor(t as TradeKey)
              return (
                <section key={t} className="rounded-[16px] border p-4 space-y-4" style={{ borderColor: C.line, background: '#fff' }}>
                  <h3 className="text-[19px] font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>
                    {tradeLabel(t)} — everyday jobs
                  </h3>
                  <p className="text-[14px]" style={{ color: C.muted }}>
                    Labour only, parts extra — leave blank if you don’t do it.
                  </p>
                  {items.map((it) => (
                    <PriceField
                      key={it.key}
                      id={`r-${t}-${it.key}`}
                      label={it.label}
                      unit={it.unit}
                      value={r.items[it.key] ?? ''}
                      onChange={(v) => setItem(t, it.key, v)}
                      error={err(`rates.${t}.items.${it.key}`)}
                      allowPoi
                    />
                  ))}

                  {caps.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[15px] font-semibold mb-2" style={{ color: C.ink }}>
                        Can you…?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {caps.map((c) => (
                          <Chip key={c.key} on={(f.caps[t] ?? []).includes(c.key)} onClick={() => toggleCap(t, c.key)}>
                            {c.label}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )
            })}

            <Field label="Anything else about your pricing?" id="j-ratesnote" hint="Travel zones, materials, anything we should know…" error={err('ratesNote')}>
              <textarea id="j-ratesnote" rows={4} value={f.ratesNote} onChange={(e) => patch({ ratesNote: e.target.value }, 'ratesNote')} className={`${INPUT} py-3`} style={bd('ratesNote')} />
            </Field>
          </>
        )}

        {step === 5 && (
          <>
            <Field label="ABN *" id="j-abn" hint="11 digits. We check it against the ABN rules." error={err('abn')}>
              <input id="j-abn" inputMode="numeric" autoComplete="off" placeholder="12 345 678 901" value={f.abn} onChange={(e) => patch({ abn: formatAbn(e.target.value) }, 'abn')} className={INPUT} style={bd('abn')} />
            </Field>
            <Field label="Registered for GST? *" error={err('gstRegistered')}>
              <YesNo name="Registered for GST" value={f.gst} onChange={(v) => patch({ gst: v }, 'gstRegistered')} />
            </Field>
            <Field
              label={licensedPicked.length ? 'Licence number *' : 'Licence number'}
              id="j-lic"
              hint={licensedPicked.length ? `Needed for ${licensedPicked.map((t) => t.label).join(', ')}.` : 'If you hold a trade licence.'}
              error={err('licenceNumber')}
            >
              <input id="j-lic" autoComplete="off" value={f.licenceNumber} onChange={(e) => patch({ licenceNumber: e.target.value }, 'licenceNumber')} className={INPUT} style={bd('licenceNumber')} />
            </Field>
            <Field label="Public liability insurance? *" error={err('hasInsurance')}>
              <YesNo name="Public liability insurance" value={f.insurance} onChange={(v) => patch({ insurance: v }, 'hasInsurance')} />
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
                      <Chip key={c.key} on={f.cover === c.key} onClick={() => patch({ cover: c.key }, 'insuranceCover')}>
                        {c.label}
                      </Chip>
                    ))}
                  </div>
                </Field>
                {f.cover === 'OTHER' && (
                  <Field label="How much cover? *" id="j-cover-other" error={err('insuranceOther')}>
                    <input id="j-cover-other" value={f.coverOther} onChange={(e) => patch({ coverOther: e.target.value }, 'insuranceOther')} className={INPUT} style={bd('insuranceOther')} />
                  </Field>
                )}
                <Field label="Insurer *" id="j-insurer" error={err('insurer')}>
                  <input id="j-insurer" value={f.insurer} onChange={(e) => patch({ insurer: e.target.value }, 'insurer')} className={INPUT} style={bd('insurer')} />
                </Field>
                <Field label="Policy expiry date *" id="j-expiry" error={err('insuranceExpiry')}>
                  <input id="j-expiry" type="date" min={new Date().toISOString().slice(0, 10)} value={f.expiry} onChange={(e) => patch({ expiry: e.target.value }, 'insuranceExpiry')} className={INPUT} style={bd('insuranceExpiry')} />
                </Field>
              </div>
            )}

            <Field label="How long have you been in the trade? *" error={err('profile.yearsBand')}>
              <div className="grid grid-cols-2 gap-2">
                {YEARS_BANDS.map((y) => (
                  <Chip key={y.key} on={f.years === y.key} onClick={() => patch({ years: y.key }, 'profile.yearsBand')}>
                    {y.label} years
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Team *" error={err('profile.team')}>
              <div className="grid grid-cols-2 gap-2">
                {TEAM_SIZES.map((t) => (
                  <Chip key={t.key} on={f.team === t.key} onClick={() => patch({ team: t.key }, 'profile.team')}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Police check? *" error={err('profile.policeCheck')}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {POLICE_CHECKS.map((p) => (
                  <Chip key={p.key} on={f.police === p.key} onClick={() => patch({ police: p.key }, 'profile.policeCheck')}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Workmanship warranty you give *" error={err('profile.warrantyMonths')}>
              <div className="grid grid-cols-2 gap-2">
                {WARRANTY_MONTHS.map((w) => (
                  <Chip key={w.value} on={f.warranty === w.value} onClick={() => patch({ warranty: w.value }, 'profile.warrantyMonths')}>
                    {w.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Payment terms you’d accept *" hint="Tick every one you’re happy with." error={err('profile.paymentTermsDays')}>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_TERMS_DAYS.map((p) => (
                  <Chip key={p.value} on={f.paymentDays.includes(p.value)} onClick={() => patch({ paymentDays: toggleIn(f.paymentDays, p.value) }, 'profile.paymentTermsDays')}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="When are you available? *" hint="Tick every one that applies." error={err('profile.availability')}>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABILITY.map((a) => (
                  <Chip key={a.key} on={f.availability.includes(a.key)} onClick={() => patch({ availability: toggleIn(f.availability, a.key) }, 'profile.availability')}>
                    {a.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="How many jobs a week can you take? *" error={err('maxJobsPerWeek')}>
              <div className="grid grid-cols-2 gap-2">
                {JOBS_PER_WEEK.map((j) => (
                  <Chip key={j.value} on={f.jobsPerWeek === j.value} onClick={() => patch({ jobsPerWeek: j.value }, 'maxJobsPerWeek')}>
                    {j.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="How quickly can you usually attend? *" error={err('responseTime')}>
              <div className="grid grid-cols-2 gap-2">
                {RESPONSE_TIMES.map((r) => (
                  <Chip key={r.key} on={f.responseTime === r.key} onClick={() => patch({ responseTime: r.key }, 'responseTime')}>
                    {r.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <p className="text-[16px] pt-2" style={{ color: C.muted }}>
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
            <Summary title="Your rates & terms (ex GST)" onEdit={() => goto(3)}>
              {f.trades.map((t) => {
                const r = rateOf(f, t)
                return (
                  <div key={t} className="py-2">
                    <p className="text-[15px] font-semibold">{tradeLabel(t)}</p>
                    <ul className="mt-1 space-y-0.5">
                      <SumLine k={`Call-out${r.calloutMinutes ? ` (incl. first ${r.calloutMinutes} min)` : r.calloutMinutes === 0 ? ' (no time incl.)' : ''}`} v={r.callout ? `$${r.callout}` : ''} />
                      <SumLine k="Hourly after that" v={r.hourly ? `$${r.hourly} /hr` : ''} />
                    </ul>
                  </div>
                )
              })}
              <div className="py-2">
                <p className="text-[15px] font-semibold">Whole business</p>
                <ul className="mt-1 space-y-0.5">
                  <SumLine k="Billed in blocks of" v={f.billing ? `${f.billing} min` : ''} />
                  <SumLine k="Quote / inspection" v={f.quote === 'free' ? 'Free' : f.quote === 'fee' && f.quoteFee ? `$${f.quoteFee}` : ''} />
                  <SumLine k="After-hours hourly" v={f.afterHours ? `$${f.afterHours} /hr` : ''} />
                  <SumLine k="Emergency call-out" v={f.emergency ? `$${f.emergency}` : ''} />
                  <SumLine k="Materials mark-up" v={f.markup === 'other' ? `${f.markupOther}%` : f.markup ? `${f.markup}%` : ''} />
                  <SumLine k="Travel free within" v={f.travelKm ? `${f.travelKm} km${f.travelPerKm ? `, then $${f.travelPerKm}/km` : ''}` : ''} />
                  <SumLine k="Tip / waste" v={f.waste === 'PER_LOAD' ? `$${f.wastePerLoad} per load` : wasteLabel(f.waste)} />
                </ul>
              </div>
            </Summary>
            <Summary title="Everyday jobs & capabilities" onEdit={() => goto(4)}>
              {f.trades.map((t) => {
                const r = rateOf(f, t)
                const items = TRADE_ITEMS[t as TradeKey] ?? []
                const filled = items.filter((it) => (r.items[it.key] ?? '') !== '')
                const caps = capabilitiesFor(t as TradeKey).filter((c) => (f.caps[t] ?? []).includes(c.key))
                return (
                  <div key={t} className="py-2">
                    <p className="text-[15px] font-semibold">{tradeLabel(t)}</p>
                    <ul className="mt-1 space-y-0.5">
                      {filled.map((it) => (
                        <SumLine key={it.key} k={it.label} v={r.items[it.key] === POI ? 'On inspection' : `$${r.items[it.key]} ${unitShort(it.unit)}`} />
                      ))}
                      {caps.length > 0 && <SumLine k="Can do" v={caps.map((c) => c.label).join(', ')} />}
                    </ul>
                  </div>
                )
              })}
              {f.ratesNote && <Row k="Notes" v={f.ratesNote} />}
            </Summary>
            <Summary title="Your business" onEdit={() => goto(5)}>
              <Row k="ABN" v={f.abn} />
              <Row k="GST registered" v={f.gst === 'yes' ? 'Yes' : f.gst === 'no' ? 'No' : ''} />
              <Row k="Licence" v={f.licenceNumber} />
              <Row k="Public liability" v={f.insurance === 'yes' ? `Yes — ${f.cover === 'OTHER' ? f.coverOther : `$${f.cover}`}, ${f.insurer}, expires ${f.expiry}` : f.insurance === 'no' ? 'No' : ''} />
              <Row k="In the trade" v={yearsLabel(f.years)} />
              <Row k="Team" v={f.team ? teamLabel(f.team) : ''} />
              <Row k="Police check" v={f.police ? policeLabel(f.police) : ''} />
              <Row k="Warranty" v={f.warranty !== null ? warrantyLabel(f.warranty) : ''} />
              <Row k="Payment terms" v={f.paymentDays.map((d) => `${d} days`).join(', ')} />
              <Row k="Available" v={f.availability.map(availabilityLabel).join(', ')} />
              <Row k="Jobs a week" v={jobsPerWeekLabel(f.jobsPerWeek)} />
              <Row k="Can attend" v={responseTimeLabel(f.responseTime)} />
            </Summary>

            <div data-field-error={err('agree') ? 'true' : undefined}>
              <label className="flex items-start gap-3 rounded-[14px] border p-4 cursor-pointer" style={{ borderColor: err('agree') ? C.danger : C.line, background: '#fff' }}>
                <input
                  type="checkbox"
                  checked={f.agree}
                  onChange={(e) => patch({ agree: e.target.checked }, 'agree')}
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
          {step < STEPS.length ? (
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

function SumLine({ k, v }: { k: string; v: string }) {
  if (!v) return null
  return (
    <li className="flex justify-between gap-3 text-[14px]">
      <span style={{ color: C.muted }}>{k}</span>
      <span className="tabular-nums text-right shrink-0">{v}</span>
    </li>
  )
}
