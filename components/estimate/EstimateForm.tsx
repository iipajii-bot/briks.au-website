'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle, Camera, Loader2, X } from 'lucide-react'
import { sitePhone, sitePhoneHref } from '@/lib/constants'

// The estimate is computed and stored by the Briks ops server; this page only collects it.
const OPS_URL = process.env.NEXT_PUBLIC_OPS_URL || 'https://ops.briks.au'

const MAX_PHOTOS = 4
const MAX_PHOTO_BYTES = 8 * 1024 * 1024

type HowSoon = 'EMERGENCY' | 'THIS_WEEK' | 'FLEXIBLE'
const HOW_SOON: { value: HowSoon; label: string }[] = [
  { value: 'EMERGENCY', label: 'Emergency' },
  { value: 'THIS_WEEK', label: 'This week' },
  { value: 'FLEXIBLE', label: 'Flexible' },
]

type Photo = { key: string; blob: Blob | null; preview: string; error?: string }

type Result = { ok: boolean; range: { low: number; high: number } | null; label: string; emergency: boolean; safety?: string }

type Fields = {
  name: string
  phone: string
  email: string
  suburb: string
  address: string
  description: string
  howSoon: HowSoon
  contact: boolean
  marketing: boolean
}

const EMPTY: Fields = {
  name: '',
  phone: '',
  email: '',
  suburb: '',
  address: '',
  description: '',
  howSoon: 'FLEXIBLE',
  contact: false,
  marketing: false,
}

const INPUT =
  'w-full bg-white text-[#1a1a1a] border border-[#c0bcb4] rounded-md px-4 py-3 text-base placeholder:text-[#5a5650] focus:outline-none focus:border-[#8a6e3f] focus:ring-2 focus:ring-[#8a6e3f]/20 min-h-[48px]'
const LABEL = 'block text-[#1a1a1a] text-sm font-medium mb-2'

const money = (n: number) => `$${n.toLocaleString('en-AU')}`

/**
 * Shrinks a photo in the browser to at most 1600px, JPEG 0.8 (the same approach
 * as the tradie job page). The server re-encodes again and strips EXIF. If the
 * browser cannot decode the file (e.g. some HEIC), the original is sent and the
 * server decides.
 */
async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bmp.width * scale)
    canvas.height = Math.round(bmp.height * scale)
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.8))
    if (blob && blob.size < file.size) return blob
  } catch {
    /* unreadable here: send the original */
  }
  return file
}

export default function EstimateForm() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [name, setName] = useState('')
  const photosRef = useRef<Photo[]>([])
  photosRef.current = photos
  const topRef = useRef<HTMLDivElement>(null)

  // Free the preview URLs when the page is left.
  useEffect(() => {
    return () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.preview))
  }, [])

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }))
  const err = (k: string) => errors[k]

  const addFiles = async (list: FileList | null) => {
    if (!list) return
    const room = MAX_PHOTOS - photos.length
    const picked = Array.from(list).slice(0, Math.max(0, room))
    for (const file of picked) {
      const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      if (!file.type.startsWith('image/')) {
        setPhotos((p) => [...p, { key, blob: null, preview: '', error: 'Photos must be images' }])
        continue
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setPhotos((p) => [...p, { key, blob: null, preview: '', error: 'Over 8 MB — pick a smaller photo' }])
        continue
      }
      // Add a placeholder straight away, then fill the preview once shrunk.
      setPhotos((p) => [...p, { key, blob: null, preview: '' }])
      const blob = await shrink(file)
      const preview = URL.createObjectURL(blob)
      setPhotos((p) => p.map((x) => (x.key === key ? { ...x, blob, preview } : x)))
    }
    if (list.length > room) setFormError(`You can add up to ${MAX_PHOTOS} photos.`)
  }

  const removePhoto = (key: string) => {
    setPhotos((p) => {
      const gone = p.find((x) => x.key === key)
      if (gone?.preview) URL.revokeObjectURL(gone.preview)
      return p.filter((x) => x.key !== key)
    })
  }

  const scrollToTop = () => requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: 'start' }))

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!f.name.trim()) e.name = 'Please tell us your name'
    if (!/^(\+?61|0)4\d{8}$/.test(f.phone.replace(/[\s()-]/g, ''))) e.phone = 'Enter an Australian mobile, e.g. 0412 345 678'
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Check the email address'
    if (!f.suburb.trim() && !f.address.trim()) e.suburb = 'Tell us the suburb or address'
    if (f.description.trim().length < 5) e.description = 'Tell us a little about the problem'
    if (!f.contact) e.contact = 'Please tick so we can contact you about this enquiry'
    if (photos.some((p) => p.error)) e.photos = 'Remove the photo that is marked, then try again'
    if (photos.some((p) => !p.blob)) e.photos = 'Still preparing a photo — one moment'
    return e
  }

  const submit = async () => {
    setFormError(null)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      scrollToTop()
      return
    }
    setSending(true)
    try {
      const body = new FormData()
      body.append('name', f.name.trim())
      body.append('phone', f.phone.trim())
      body.append('email', f.email.trim())
      body.append('suburb', f.suburb.trim())
      body.append('address', f.address.trim())
      body.append('description', f.description.trim())
      body.append('howSoon', f.howSoon)
      body.append('contact', f.contact ? 'true' : 'false')
      body.append('marketing', f.marketing ? 'true' : 'false')
      // Honeypot: left empty by people, filled by most bots.
      body.append('company_website', '')
      photos.forEach((p, i) => p.blob && body.append('photo', p.blob, `photo-${i + 1}.jpg`))

      const r = await fetch(`${OPS_URL}/api/estimate`, { method: 'POST', body })
      const j = (await r.json().catch(() => null)) as (Result & { errors?: Record<string, string>; error?: string }) | null
      if (r.ok && j?.ok) {
        setName(f.name.trim().split(' ')[0])
        setResult(j)
        scrollToTop()
      } else if (j?.errors) {
        setErrors(j.errors)
        setFormError('Please check the highlighted answers.')
        scrollToTop()
      } else {
        setFormError(j?.error ?? 'Something went wrong. Please try again in a minute.')
      }
    } catch {
      setFormError('We could not reach the server. Check your signal and try again. Your answers are still here.')
    } finally {
      setSending(false)
    }
  }

  if (result) return <ResultScreen result={result} first={name} topRef={topRef} />

  const busyPhotos = photos.some((p) => !p.blob && !p.error)

  return (
    <div ref={topRef} className="space-y-7">
      {formError && (
        <p role="alert" className="flex items-start gap-2 rounded-md bg-[#fbeee8] px-4 py-3 text-sm text-[#7a2e10]">
          <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden /> {formError}
        </p>
      )}

      {/* Honeypot — people never see or fill this. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" name="company_website" />
        </label>
      </div>

      <div>
        <label htmlFor="est-description" className={LABEL}>
          What&rsquo;s the problem? <span className="text-[#c9571f]">*</span>
        </label>
        <textarea
          id="est-description"
          rows={4}
          value={f.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="e.g. Kitchen sink drains slowly and smells. Happens every week."
          className={`${INPUT} min-h-[120px] resize-y`}
          style={{ borderColor: err('description') ? '#c9571f' : undefined }}
        />
        {err('description') && <FieldError>{err('description')}</FieldError>}
      </div>

      <div>
        <p className={LABEL}>Photos (optional, up to {MAX_PHOTOS})</p>
        <p className="text-sm text-[#5a5650] mb-3">Photos help us price it. Faces and number plates can be cropped out. We remove location data from every photo.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photos.map((p) => (
            <div key={p.key} className="relative aspect-square rounded-md overflow-hidden border border-[#c0bcb4] bg-[#f3efe5] flex items-center justify-center">
              {p.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.preview} alt="Photo to send" className="h-full w-full object-cover" />
              ) : p.error ? (
                <span className="px-2 text-center text-xs text-[#7a2e10]">{p.error}</span>
              ) : (
                <Loader2 size={20} className="animate-spin text-[#5a5650]" aria-label="Preparing photo" />
              )}
              <button
                type="button"
                onClick={() => removePhoto(p.key)}
                aria-label="Remove photo"
                className="absolute top-1.5 right-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="aspect-square rounded-md border border-dashed border-[#8a6e3f] bg-white flex flex-col items-center justify-center gap-1 cursor-pointer text-[#8a6e3f] hover:bg-[#fafaf7] min-h-[44px]">
              <Camera size={22} aria-hidden />
              <span className="text-sm font-medium">Add photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  void addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
            </label>
          )}
        </div>
        {err('photos') && <FieldError>{err('photos')}</FieldError>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="est-suburb" className={LABEL}>
            Suburb <span className="text-[#c9571f]">*</span>
          </label>
          <input id="est-suburb" value={f.suburb} onChange={(e) => set('suburb', e.target.value)} placeholder="e.g. Glenelg" autoComplete="address-level2" className={INPUT} />
          {err('suburb') && <FieldError>{err('suburb')}</FieldError>}
        </div>
        <div>
          <label htmlFor="est-address" className={LABEL}>
            Street address <span className="text-[#5a5650] font-normal">(optional)</span>
          </label>
          <input id="est-address" value={f.address} onChange={(e) => set('address', e.target.value)} placeholder="Only if you have it" autoComplete="street-address" className={INPUT} />
          {err('address') && <FieldError>{err('address')}</FieldError>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="est-name" className={LABEL}>
            Your name <span className="text-[#c9571f]">*</span>
          </label>
          <input id="est-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" className={INPUT} />
          {err('name') && <FieldError>{err('name')}</FieldError>}
        </div>
        <div>
          <label htmlFor="est-phone" className={LABEL}>
            Mobile <span className="text-[#c9571f]">*</span>
          </label>
          <input id="est-phone" type="tel" inputMode="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="0412 345 678" autoComplete="tel" className={INPUT} />
          {err('phone') && <FieldError>{err('phone')}</FieldError>}
        </div>
      </div>

      <div>
        <label htmlFor="est-email" className={LABEL}>
          Email <span className="text-[#5a5650] font-normal">(optional)</span>
        </label>
        <input id="est-email" type="email" inputMode="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" className={INPUT} />
        {err('email') && <FieldError>{err('email')}</FieldError>}
      </div>

      <fieldset>
        <legend className={LABEL}>How soon?</legend>
        <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="How soon">
          {HOW_SOON.map((o) => {
            const on = f.howSoon === o.value
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set('howSoon', o.value)}
                className="rounded-md border text-sm font-semibold min-h-[48px] cursor-pointer transition-colors"
                style={{ background: on ? '#8a6e3f' : '#fff', color: on ? '#fff' : '#1a1a1a', borderColor: on ? '#8a6e3f' : '#c0bcb4' }}
              >
                {o.label}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-sm text-[#5a5650]">For a gas smell, sparks, flooding or fire, call 000 first.</p>
      </fieldset>

      <div className="space-y-4 rounded-md border border-[#c0bcb4] bg-[#fafaf7] p-5">
        <div>
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
            <input type="checkbox" checked={f.contact} onChange={(e) => set('contact', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#8a6e3f]" />
            <span className="text-sm text-[#1a1a1a]">
              Briks can contact me about this enquiry. <span className="text-[#c9571f]">*</span>
            </span>
          </label>
          {err('contact') && <FieldError>{err('contact')}</FieldError>}
        </div>
        <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
          <input type="checkbox" checked={f.marketing} onChange={(e) => set('marketing', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#8a6e3f]" />
          <span className="text-sm text-[#1a1a1a]">
            Send me occasional maintenance reminders. <span className="text-[#5a5650]">Optional. Reply STOP at any time to opt out.</span>
          </span>
        </label>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={submit}
          disabled={sending || busyPhotos}
          className="w-full bg-[#c9571f] hover:bg-[#e26a32] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a1a1a] font-semibold rounded-full px-7 py-3.5 min-h-[52px] inline-flex items-center justify-center gap-2 transition-colors"
          style={{ fontFamily: 'var(--font-inter-tight)' }}
        >
          {sending ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden /> Sending
            </>
          ) : (
            <>
              Get my instant estimate <ArrowRight size={18} aria-hidden />
            </>
          )}
        </button>
        <p className="text-center text-xs text-[#5a5650]">
          Estimates are for guidance only. We use your details to reply to this enquiry. See our{' '}
          <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#8a6e3f]">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm text-[#c9571f]">
      <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden /> {children}
    </p>
  )
}

function ResultScreen({ result, first, topRef }: { result: Result; first: string; topRef: React.RefObject<HTMLDivElement | null> }) {
  const phone = sitePhone()
  const greet = first ? `Thanks, ${first}.` : 'Thanks.'

  if (result.emergency) {
    return (
      <div ref={topRef} className="space-y-5" aria-live="polite">
        <p className="flex items-start gap-2 rounded-md bg-[#fbeee8] px-4 py-4 text-base text-[#7a2e10] font-medium">
          <AlertCircle size={20} className="shrink-0 mt-0.5" aria-hidden /> {result.safety}
        </p>
        <h2 className="font-display text-2xl text-[#1a1a1a]" style={{ fontWeight: 700 }}>
          {greet} We have marked this as urgent.
        </h2>
        <p className="text-[#3a3735] leading-relaxed">
          We will call you as soon as we can. If it is getting worse, call{' '}
          {phone ? <a href={sitePhoneHref()} className="text-[#8a6e3f] underline underline-offset-2">{phone}</a> : 'us'} now.
        </p>
        <p className="text-sm text-[#5a5650]">We do not give a price for urgent jobs online. Your final price is confirmed after we inspect.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#1a1a1a]">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div ref={topRef} className="space-y-5" aria-live="polite">
      <CheckCircle size={44} className="text-[#8a6e3f]" aria-hidden />
      <h2 className="font-display text-2xl text-[#1a1a1a]" style={{ fontWeight: 700 }}>
        {greet}
      </h2>
      {result.range ? (
        <div className="rounded-md border border-[#c0bcb4] bg-white p-5 space-y-3">
          <p className="text-[#1a1a1a] text-lg leading-relaxed">
            Typical cost for {result.label} in Adelaide: <strong>{money(result.range.low)}–{money(result.range.high)}</strong> incl. GST.
          </p>
          <p className="text-sm text-[#5a5650] leading-relaxed">
            This is an estimate only. Your final price is confirmed after we inspect.
          </p>
        </div>
      ) : (
        <p className="text-[#3a3735] text-lg leading-relaxed">We&rsquo;ll text you within a few minutes.</p>
      )}
      <p className="text-sm text-[#5a5650]">
        {result.range ? 'We will text you to arrange a time to look.' : 'Urgent? Call '}
        {!result.range && (phone ? <a href={sitePhoneHref()} className="text-[#8a6e3f] underline underline-offset-2">{phone}</a> : 'us')}
        {!result.range && '.'}
      </p>
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#1a1a1a]">
        Back to home
      </Link>
    </div>
  )
}
