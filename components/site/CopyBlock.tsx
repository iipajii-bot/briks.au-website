'use client'

import { useState } from 'react'

/** Copy-to-clipboard button for a fixed piece of text shown on the page. */
export default function CopyBlock({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle')
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('done')
    } catch {
      setState('failed')
    }
    window.setTimeout(() => setState('idle'), 2500)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="font-heading inline-flex min-h-[44px] items-center justify-center rounded-sm border border-[#c0bcb4] bg-white px-5 text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-200 hover:border-[#1a1a1a]"
    >
      <span aria-live="polite">{state === 'done' ? 'Copied' : state === 'failed' ? 'Select the text to copy' : label}</span>
    </button>
  )
}
