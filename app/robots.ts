import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

/**
 * robots.txt — tuned for maximum SEO + AEO ranking surface.
 *
 * Strategy:
 *  1. Allow all major search engines (Google, Bing, DuckDuckGo, Brave, Yandex, Mojeek)
 *  2. Allow every AI search/retrieval bot — citation in AI answers > training paranoia
 *  3. Allow social-preview bots (WhatsApp, Twitter/X, Facebook, LinkedIn) — Briks
 *     promotes via WhatsApp, so unfurl rendering must work
 *  4. Block training-only scrapers that give no citation back (CCBot, Bytespider,
 *     Omgili, Diffbot) — no upside
 *  5. Disallow noisy admin/api paths so crawl budget concentrates on real content
 *  6. Sitemap + host declared
 *
 * Notes for the Next.js metadata format:
 *  - `userAgent: '*'` rule listed first as the catch-all baseline
 *  - Specific bots after, each with explicit allow or disallow
 *  - `disallow` paths apply to the wildcard rule (admin/api etc)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Catch-all baseline: allow indexing, deny crawl-burn endpoints
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/preview/',
          '/draft/',
          '/*.json$',
          '/*?*utm_',
          '/*?*ref=',
          '/*?*fbclid=',
          '/*?*gclid=',
        ],
      },

      // -------- Search engines (organic SEO) --------
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-News', allow: '/' },
      { userAgent: 'Googlebot-Video', allow: '/' },
      { userAgent: 'AdsBot-Google', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'msnbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' }, // Yahoo
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'MojeekBot', allow: '/' },
      { userAgent: 'Qwantbot', allow: '/' },
      { userAgent: 'Exabot', allow: '/' },

      // -------- AI search / answer engines (AEO citation) --------
      // OpenAI
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Anthropic
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // Google AI Overviews + Gemini
      { userAgent: 'Google-Extended', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      // Apple Intelligence
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // Meta AI
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },
      // Amazon (Alexa, Rufus)
      { userAgent: 'Amazonbot', allow: '/' },
      // Brave Search
      { userAgent: 'Bravebot', allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'cohere-training-data-crawler', allow: '/' },
      // Mistral
      { userAgent: 'MistralAI-User', allow: '/' },
      // DuckDuckGo AI Assist
      { userAgent: 'DuckAssistBot', allow: '/' },
      // You.com
      { userAgent: 'YouBot', allow: '/' },
      // Phind
      { userAgent: 'PhindBot', allow: '/' },
      // Andi
      { userAgent: 'AndiBot', allow: '/' },
      // Kagi
      { userAgent: 'Kagibot', allow: '/' },
      // Komprehend
      { userAgent: 'KomprehendBot', allow: '/' },

      // -------- Social preview / unfurl bots --------
      // Required so WhatsApp / Slack / SMS link previews render the OG card
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' }, // X
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'Pinterestbot', allow: '/' },
      { userAgent: 'Slackbot', allow: '/' },
      { userAgent: 'Slackbot-LinkExpanding', allow: '/' },
      { userAgent: 'TelegramBot', allow: '/' },
      { userAgent: 'Discordbot', allow: '/' },
      { userAgent: 'redditbot', allow: '/' },

      // -------- SEO + monitoring tools (allow — cheap insight) --------
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SemrushBot', allow: '/' },
      { userAgent: 'rogerbot', allow: '/' }, // Moz
      { userAgent: 'dotbot', allow: '/' }, // Moz
      { userAgent: 'MJ12bot', allow: '/' }, // Majestic

      // -------- Training-only scrapers w/ no citation upside — BLOCK --------
      // These hoover content for model training but give nothing back.
      // Listed individually so each gets a clear Disallow line.
      { userAgent: 'CCBot', disallow: '/' }, // Common Crawl
      { userAgent: 'Bytespider', disallow: '/' }, // ByteDance
      { userAgent: 'Diffbot', disallow: '/' },
      { userAgent: 'FacebookBot', disallow: '/' }, // legacy training crawler
      { userAgent: 'Omgilibot', disallow: '/' },
      { userAgent: 'Omgili', disallow: '/' },
      { userAgent: 'magpie-crawler', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' }, // Huawei — minimal upside
      { userAgent: 'YouBot-Image', disallow: '/' },
      { userAgent: 'ImagesiftBot', disallow: '/' },
      { userAgent: 'TurnitinBot', disallow: '/' },
      { userAgent: 'serpstatbot', disallow: '/' }, // SEO scraper
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'SeekportBot', disallow: '/' },
      { userAgent: 'ZoomBot', disallow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
