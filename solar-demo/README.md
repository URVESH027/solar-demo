# Go Green Solution

Premium solar installations and panel cleaning services that protect your investment for 25 years.

## Features

- **Cinematic Hero** — 3D tilt image with word-by-word headline reveal, parallax particles, and trust strip
- **Problem → Solution** — Visual narrative with side-by-side comparison and gradient connectors
- **6 Service Cards** — Responsive grid with hover spotlight and gold accent borders
- **Bento Grid** — Asymmetric layout with animated stat counters (700+, 98%, 25 Years)
- **Savings Calculator** — Interactive sliders computing ROI with animated result reveal
- **Project Timeline** — 6-step visual progression with alternating layout
- **Portfolio Gallery** — Filterable projects with before/after comparison slider
- **Testimonials** — Auto-scrolling carousel with real customer quotes
- **Google Reviews** — 5-star ratings with verified review cards
- **FAQ Accordion** — Smooth expand/collapse with ARIA support
- **WhatsApp Float** — Floating button with unread notification dot
- **Custom Cursor** — Magnetic button effects on desktop
- **Scroll Animations** — 6 entrance variants with gradient section connectors

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, SSG) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | DM Serif Display + Inter (via `next/font/google`) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/your-org/balaji-solar.git
cd balaji-solar
npm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`. See [Environment Variables](#environment-variables) for the full list.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Quality Checks

```bash
npm run lint        # ESLint
npm run type-check  # TypeScript
npm run build       # Production build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL | `https://balajisolar.in` |
| `NEXT_PUBLIC_PHONE` | Business phone (tel: format) | `+919999999999` |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Phone display text | `+91 99999 99999` |
| `NEXT_PUBLIC_EMAIL` | Business email | `info@balajisolar.in` |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number (no +) | `919999999999` |
| `NEXT_PUBLIC_ADDRESS` | Business address | `Delhi NCR, India` |
| `NEXT_PUBLIC_COMPANY_NAME` | Business name | `Go Green Solution` |
| `NEXT_PUBLIC_FACEBOOK` | Facebook profile URL | — |
| `NEXT_PUBLIC_INSTAGRAM` | Instagram profile URL | — |
| `NEXT_PUBLIC_LINKEDIN` | LinkedIn profile URL | — |
| `NEXT_PUBLIC_YOUTUBE` | YouTube channel URL | — |
| `NEXT_PUBLIC_GOOGLE_MAP` | Google Maps embed URL | — |
| `NEXT_PUBLIC_GOOGLE_REVIEW` | Google Review share URL | — |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD
│   ├── page.tsx                # Homepage (Server Component)
│   ├── loading.tsx             # Loading UI
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # Custom 404
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   └── globals.css             # Design tokens, utilities
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky glassmorphism navbar
│   │   ├── Footer.tsx          # 4-column footer
│   │   ├── ClientShell.tsx     # Client wrapper (loader, cursor)
│   │   ├── SectionReveal.tsx   # Scroll-triggered entrances
│   │   └── SectionConnector.tsx # Gradient transitions
│   ├── sections/
│   │   ├── Hero.tsx            # Cinematic hero section
│   │   ├── HeroContent.tsx     # Word-by-word headline
│   │   ├── HeroImage.tsx       # 3D tilt image
│   │   ├── ProblemSolution.tsx # Before/after narrative
│   │   ├── Services.tsx        # 6 service cards
│   │   ├── WhyChoose.tsx       # Bento grid + stats
│   │   ├── SavingsCalculator.tsx # Interactive ROI
│   │   ├── Timeline.tsx        # 6-step progression
│   │   ├── Projects.tsx        # Filterable portfolio
│   │   ├── BeforeAfter.tsx     # Comparison slider
│   │   ├── Testimonials.tsx    # Auto-scrolling carousel
│   │   ├── GoogleReviews.tsx   # 5-star ratings
│   │   ├── FAQ.tsx             # Accordion
│   │   ├── ContactCTA.tsx      # Contact quick actions
│   │   └── ...                 # Card components
│   └── ui/
│       ├── CTAButton.tsx       # Gold gradient CTA
│       ├── ScrollProgress.tsx  # Scroll indicator
│       ├── ScrollAtmosphere.tsx # Global effects
│       ├── WhatsAppButton.tsx  # Floating WhatsApp
│       ├── CustomCursor.tsx    # Desktop cursor
│       └── PageLoader.tsx      # Page loader
└── lib/
    └── animations.ts           # Framer Motion variants
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com/new](https://vercel.com/new)
3. Configure environment variables in the Vercel dashboard
4. Deploy

The project is configured for zero-config Vercel deployment.

### Other Platforms

This is a standard Next.js project. Any platform supporting Node.js 20+ can host it:

```bash
npm run build
npm start
```

## Performance

- Static Site Generation (SSG) for all pages
- Optimized images with WebP/AVIF format support
- Code splitting and lazy loading
- Hardware-accelerated animations
- Preconnect to external font origins
- Efficient bundle with tree-shaking

## Accessibility

- Semantic HTML throughout all components
- ARIA labels and roles on interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- Color contrast meeting WCAG AA standards
- Focus management for accordions and interactive elements

## SEO

- Dynamic metadata with Open Graph and Twitter cards
- Structured data (JSON-LD): LocalBusiness, Service, FAQPage
- Automatic robots.txt and sitemap.xml generation
- Semantic HTML with proper heading hierarchy
- Mobile-first responsive design

## Security

- HSTS, X-Content-Type-Options, X-Frame-Options headers
- X-XSS-Protection, Referrer-Policy, Permissions-Policy
- `poweredByHeader: false`
- Environment variables for all sensitive data

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

[MIT](LICENSE)
