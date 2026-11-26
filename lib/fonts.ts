import localFont from 'next/font/local'

// Fonts are self-hosted (app/fonts/*.woff2, latin subset from Google Fonts, SIL Open Font Licence)
// so builds never download them. Fetching from Google at build time made Vercel builds fail at random.

export const interTight = localFont({
  src: '../app/fonts/inter-tight-var.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
  weight: '100 900',
})

export const inter = localFont({
  src: '../app/fonts/inter-var.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

// Variable font with opsz, wdth and wght axes
export const bricolage = localFont({
  src: '../app/fonts/bricolage-grotesque-var.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '200 800',
})

export const spaceMono = localFont({
  src: [
    { path: '../app/fonts/space-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/space-mono-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

// Back-compat export name used elsewhere (was Fraunces)
export const fraunces = bricolage
