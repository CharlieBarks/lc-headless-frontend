# Las Cruces Directory

## Overview
A Next.js 16 community directory website for Las Cruces, featuring local businesses, restaurants, accommodations, and places. The app connects to a WordPress API backend and uses Supabase for data storage.

## Caching Strategy
- **ISR (Incremental Static Regeneration)**: All pages use `revalidate = 3600` (1 hour cache)
- **React cache()**: Cached functions in `lib/wordpress.ts` deduplicate API calls within render cycles
- **Next.js fetch caching**: All WordPress API calls use `next: { revalidate: 3600 }` for automatic deduplication

## Image Optimization
- **Next.js Image**: All images use the optimized `<Image>` component for automatic resizing, lazy loading, and modern formats (WebP)
- **Image Proxy**: WordPress images route through `/api/image-proxy` to handle CORS; configured in `next.config.js` via `localPatterns`
- **Remote Patterns**: WordPress (`dir.lascrucesdirectory.com`) and Pexels domains are whitelisted for remote image optimization

## SEO Implementation
- **RankMath Integration**: SEO metadata (title, description, OG, Twitter) is fetched from WordPress pages with RankMath
- **Next.js Metadata API**: All pages use `generateMetadata()` with proper titles, descriptions, OG tags, and Twitter cards
- **JSON-LD Structured Data**:
  - WebSite schema on all pages (global in layout)
  - Article schema on blog posts with headline, author, datePublished
  - LocalBusiness/Restaurant/LodgingBusiness schema on listings with address, geo, ratings
  - BreadcrumbList schema for navigation context
- **SEO Functions** (`lib/seo.ts`): Cached functions for fetching RankMath data and generating schema markup

## Security Headers
All pages include these security headers (configured in `next.config.js`):
- `Strict-Transport-Security` - Forces HTTPS with 2-year max-age
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection` - Legacy XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer data
- `Permissions-Policy` - Disables camera, microphone, geolocation

## Accessibility
- **Semantic HTML**: Proper use of `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>` elements
- **ARIA Labels**: Navigation, breadcrumbs, interactive elements, and icon-only buttons have descriptive ARIA labels
- **Focus States**: All interactive elements (links, buttons, cards) have visible focus indicators for keyboard navigation
- **Screen Reader Support**: Decorative icons marked with `aria-hidden="true"`, meaningful alt text on images
- **Keyboard Navigation**: Image gallery supports arrow keys, all interactive elements are focusable

## Search Functionality
- **Global Search**: Header search bar with autocomplete suggestions across all listing types
- **Search API**: `/api/search` endpoint queries restaurants, businesses, accommodations, and places simultaneously
- **Results Diversity**: Autocomplete returns a balanced mix from all listing categories
- **Search Results Page**: `/search` page displays grouped results by category with SEO metadata
- **Mobile Support**: Responsive search with full-screen mobile overlay

## Project Structure
- `app/` - Next.js App Router pages and components
  - `[type]/` - Dynamic routes for listing types (restaurants, businesses, etc.)
  - `blog/` - Blog pages
  - `api/` - API routes (image proxy, WordPress proxy)
  - `components/` - Shared React components
- `lib/` - Utility functions (WordPress API, SEO helpers)
- `public/` - Static assets

## Development
Run the development server:
```bash
npm run dev
```
The app runs on port 5000 at http://0.0.0.0:5000

## Environment Variables
The app uses these environment variables (configured in next.config.js):
- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress API endpoint
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Tech Stack
- Next.js 16 with Turbopack
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- WordPress API integration

## Deployment
Configured for autoscale deployment:
- Build: `npm run build`
- Start: `npm run start` (runs on port 5000)
