# Las Cruces Directory

## Overview
A Next.js 16 community directory website for Las Cruces, featuring local businesses, restaurants, accommodations, and places. The app connects to a WordPress API backend and uses Supabase for data storage.

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
