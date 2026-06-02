import type { Metadata } from 'next'
import './globals.css'
import { interTight, inter, bricolage, spaceMono } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import StickyQuoteBar from '@/components/layout/StickyQuoteBar'

const SITE_URL = 'https://briks.au'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Briks Building Services | Adelaide Maintenance, Repairs, Renovations',
    template: '%s | Briks Building Services',
  },
  description:
    'Adelaide building services — maintenance, repairs, handyman, renovations, fit-outs. One local team across plumbing, electrical, carpentry, painting, tiling, roofing. Homeowners, landlords, agencies, businesses. One call. Every trade. Zero hassle.',
  keywords: [
    'Adelaide building services',
    'Adelaide maintenance',
    'Adelaide handyman',
    'Adelaide renovations',
    'kitchen renovation Adelaide',
    'bathroom renovation Adelaide',
    'commercial fit-out Adelaide',
    'emergency repairs Adelaide',
    'property maintenance Adelaide',
    'plumber electrician Adelaide',
    'real estate agency maintenance Adelaide',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Briks Building Services',
    url: SITE_URL,
    title:
      'Briks Building Services | Adelaide Maintenance, Repairs, Renovations',
    description:
      'Adelaide building services — maintenance, repairs, handyman, renovations and fit-outs. One local team. Homeowners, landlords, real estate agencies, businesses.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Briks Building Services — One Call. Every Trade. Zero Hassle.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Briks Building Services | Adelaide Maintenance, Repairs, Renovations',
    description:
      'Adelaide builders, plumbers, electricians, painters and handymen — one local team. Maintenance, repairs, renovations, fit-outs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add when verified:
    // google: '',
    // other: { 'msvalidate.01': '' },
  },
  authors: [{ name: 'Briks Building Services', url: SITE_URL }],
  publisher: 'Briks Building Services Pty Ltd',
  category: 'Building & Construction Services',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-AU"
      className={`${interTight.variable} ${inter.variable} ${bricolage.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#1a1a1a]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#1a1a1a] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <StickyQuoteBar />
      </body>
    </html>
  )
}
