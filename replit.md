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
