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
      {
        // Old "all trades" hub was removed earlier
        source: '/services',
        destination: '/services/pre-buy-inspection',
        permanent: false,
      },
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
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.resend.com",
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
