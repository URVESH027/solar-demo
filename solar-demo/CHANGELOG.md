# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-28

### Added

- Hero section with cinematic scroll animations and 3D tilt effects
- Problem-Solution section with before/after comparison
- Services section with 6 service cards in a responsive grid
- Why Choose Us bento grid layout with animated stat counters
- Savings Calculator with interactive sliders
- Project Timeline with 6-step visual progression
- Project Portfolio with filterable gallery and before/after comparison
- Testimonials carousel with real customer quotes
- Google Reviews section with 5-star ratings
- FAQ accordion with smooth expand/collapse animations
- Contact CTA with phone/email/WhatsApp quick actions
- WhatsApp floating button with unread notification dot
- Custom cursor with magnetic button effects
- Page loader with animated branding
- Section reveal animations with 6 variants
- Gradient transitions between sections
- Global scroll atmosphere effects

### Infrastructure

- Next.js 16 with App Router and TypeScript strict mode
- Tailwind CSS v4 with design token system
- Framer Motion for all animations
- Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, etc.)
- Image optimization with WebP/AVIF format support
- PWA manifest for installability
- SEO metadata and structured data (JSON-LD)
- Environment variables for all business data
- CI/CD workflow with GitHub Actions
- ESLint + TypeScript type checking in CI

### Accessibility

- Semantic HTML throughout all components
- ARIA labels and roles on interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- Color contrast meeting WCAG AA standards
- Focus management for accordion and modals

### Performance

- Static site generation (SSG)
- Optimized bundle with code splitting
- Lazy loading for images and below-the-fold content
- Preconnect to external font origins
- Efficient animation with hardware-accelerated transforms
