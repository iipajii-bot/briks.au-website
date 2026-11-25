import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 80, 90],
  },
  async redirects() {
    return [
      {
        source: '/services/home-inspection',
        destination: '/services/pre-buy-inspection',
        permanent: true,
      },
      // /services is a real hub page again (app/services/page.tsx)
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      // Old guide pages (earlier model) replaced by lib/guides.ts entries
      { source: '/guides/what-is-managed-maintenance-partner', destination: '/guides/outsourcing-property-maintenance', permanent: true },
      { source: '/compare/briks-vs-in-house-maintenance-coordinator', destination: '/compare/in-house-vs-outsourced-maintenance', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
    ]
  },
  // ─── Security headers — applied to every response ─────────────────────────
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Clickjacking protection — block iframe embedding
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stop browsers MIME-sniffing the content type
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Limit how much referrer info leaks to other sites
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable powerful browser APIs we don't use
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
          },
          // Force HTTPS for 2 years incl. subdomains; preload-list eligible
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // DNS prefetch — slight perf win, no security cost
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // Content Security Policy
          // - script-src 'unsafe-inline' kept because every page emits inline
          //   JSON-LD <script> tags via dangerouslySetInnerHTML; per-request
          //   nonces would require threading through every page (50+).
          //   All other directives remain strict.
          // - frame-ancestors 'none' = no embedding (also enforced by X-Frame-Options)
          // - form-action 'self' = forms can only post to our own origin
          // - base-uri 'self' = blocks <base> tag tampering
          // - object-src 'none' = no Flash/embeds
          // - upgrade-insecure-requests = auto-upgrade http→https
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 'unsafe-eval' only in `next dev`: React's dev tools need eval(); production never uses it.
              process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
                : "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.resend.com https://ops.briks.au",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
