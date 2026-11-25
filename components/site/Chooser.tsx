'use client'

/**
 * Segmented chooser that swaps one block of copy (landlord rental count, homeowner job type).
 * Radio-group semantics; the initial choice can come from the personal link.
 */
import Image from 'next/image'
import { useId, useState, type ReactNode } from 'react'

export type ChooserOption = { id: string; label: string; title: string; body: ReactNode; img?: string; alt?: string }

export default function Chooser({ legend, options, initial }: { legend: string; options: ReadonlyArray<ChooserOption>; initial?: string | null }) {
  const uid = useId()
  const [sel, setSel] = useState(initial && options.some((o) => o.id === initial) ? initial : options[0].id)
  const cur = options.find((o) => o.id === sel) ?? options[0]

  return (
    <div>
      <fieldset className="m-0 border-0 p-0">
        <legend className="font-heading mb-3 text-[14px] font-semibold text-[#1a1a1a]">{legend}</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => {
            const id = `${uid}-${o.id}`
            const on = o.id === sel
            return (
              <label
                key={o.id}
                htmlFor={id}
                className={`font-heading inline-flex min-h-[44px] cursor-pointer items-center rounded-sm border px-4 text-[15px] font-semibold transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#8a6e3f] ${
                  on ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#fafaf7]' : 'border-[#c0bcb4] bg-white text-[#1a1a1a] hover:border-[#1a1a1a]'
                }`}
              >
                <input id={id} type="radio" name={uid} value={o.id} checked={on} onChange={() => setSel(o.id)} className="sr-only" />
                {o.label}
              </label>
            )
          })}
        </div>
      </fieldset>
      <div aria-live="polite" className="mt-6 border-t border-[#e2ddd3] pt-6">
        {cur.img ? (
          <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg bg-[#f3efe5]">
            <Image key={cur.img} src={cur.img} alt={cur.alt ?? ''} fill sizes="(min-width: 1024px) 520px, 100vw" className="home-enter object-cover" />
          </div>
        ) : null}
        <p className="font-display text-[24px] font-bold leading-tight text-[#1a1a1a]">{cur.title}</p>
        <div className="mt-3 max-w-[36rem] text-[16px] leading-relaxed text-[#3a3735]">{cur.body}</div>
      </div>
    </div>
  )
}
