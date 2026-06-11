import Link from 'next/link'
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { SITE, sitePhone, sitePhoneHref, whatsappHref } from '@/lib/constants'

// Inline brand SVGs — Lucide v2 dropped brand icons.
// Stroke-based to match Lucide aesthetic.
const SocialIcon = ({ name }: { name: 'linkedin' | 'facebook' | 'instagram' | 'youtube' }) => {
  const common = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      )
  }
}

const SOCIAL_LINKS: { url: string; name: 'linkedin' | 'facebook' | 'instagram' | 'youtube'; label: string }[] = [
  { url: SITE.social.linkedin, name: 'linkedin', label: 'LinkedIn' },
  { url: SITE.social.facebook, name: 'facebook', label: 'Facebook' },
  { url: SITE.social.instagram, name: 'instagram', label: 'Instagram' },
  { url: SITE.social.youtube, name: 'youtube', label: 'YouTube' },
]

const serviceLinks = [
  { label: 'General Maintenance', href: '/services#general-maintenance' },
  { label: 'Emergency Repairs', href: '/services#emergency-repairs' },
  { label: 'Preventative Maintenance', href: '/services#preventative-maintenance' },
  { label: 'End of Lease', href: '/services#end-of-lease' },
  { label: 'Plumbing', href: '/services#plumbing' },
  { label: 'Electrical', href: '/services#electrical' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Briks Building Services logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span
                className="text-white font-extrabold text-xl tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
              >
                BRIKS
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Adelaide building services. Maintenance, repairs, renovations. One number, every trade.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-6 h-px bg-[#8a6e3f]" aria-hidden="true" />
              <span className="text-[#8a6e3f] text-xs font-medium tracking-wider uppercase">
                Adelaide · Experienced tradies
              </span>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ url, name, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 hover:text-[#8a6e3f] hover:border-[#8a6e3f]/40 transition-colors"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#8a6e3f] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#8a6e3f] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              {sitePhone() && (
                <li>
                  <a
                    href={sitePhoneHref()}
                    className="flex items-center gap-3 text-white/50 hover:text-[#8a6e3f] text-sm transition-colors"
                  >
                    <Phone size={14} className="text-[#8a6e3f] shrink-0" />
                    {sitePhone()}
                  </a>
                </li>
              )}
              <li>
                <a
                  href="mailto:admin@briks.au"
                  className="flex items-center gap-3 text-white/50 hover:text-[#8a6e3f] text-sm transition-colors"
                >
                  <Mail size={14} className="text-[#8a6e3f] shrink-0" />
                  admin@briks.au
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(
                    "Hi Briks — I'd like a quote on a job in Adelaide."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-[#8a6e3f] text-sm transition-colors"
                >
                  <MessageCircle size={14} className="text-[#8a6e3f] shrink-0" />
                  WhatsApp · {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <MapPin size={14} className="text-[#8a6e3f] shrink-0 mt-0.5" />
                  <span>Adelaide, SA<br />Australia</span>
                </div>
              </li>
              <li className="pt-2">
                <div className="text-white/35 text-xs">
                  <span className="block">Mon – Fri: 8am – 6pm ACST</span>
                  <span className="block text-[#8a6e3f]">Emergency: 24 / 7 via Tapi</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} {SITE.legalName}. ABN {SITE.abn}. Insured + compliant. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">|</span>
            <Link href="/terms" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
