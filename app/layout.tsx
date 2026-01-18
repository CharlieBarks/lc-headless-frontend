import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Link from 'next/link';
import { MapPin, Building2, Facebook, Instagram } from 'lucide-react';
import { GlobalSearch } from './components/GlobalSearch';
import { ExploreDropdown } from './components/ExploreDropdown';
import { MobileMenu } from './components/MobileMenu';
import { NewsletterSection } from './components/NewsletterSection';
import { generateWebsiteSchema, JsonLdScript } from '../lib/seo';

export const metadata: Metadata = {
  title: {
    default: 'Las Cruces Directory - Local Businesses, Restaurants & Services',
    template: '%s | Las Cruces Directory',
  },
  description: 'Discover the best local businesses, restaurants, accommodations, and places in Las Cruces. Your complete guide to everything Las Cruces has to offer.',
  keywords: ['Las Cruces', 'New Mexico', 'local businesses', 'restaurants', 'accommodations', 'directory', 'places'],
  authors: [{ name: 'Las Cruces Directory' }],
  creator: 'Las Cruces Directory',
  publisher: 'Las Cruces Directory',
  metadataBase: new URL('https://lascrucesdirectory.com'),
  openGraph: {
    title: 'Las Cruces Directory',
    description: 'Discover the best local businesses, restaurants, accommodations, and places in Las Cruces.',
    url: 'https://lascrucesdirectory.com',
    siteName: 'Las Cruces Directory',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Cruces Directory',
    description: 'Discover the best local businesses, restaurants, accommodations, and places in Las Cruces.',
    site: '@lascrucesbizdir',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V8G0RVBK49"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V8G0RVBK49');
          `}
        </Script>
      </head>
      <body>
        <JsonLdScript data={websiteSchema} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
        >
          Skip to main content
        </a>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
          <nav aria-label="Main navigation" className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                    <MapPin className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Las Cruces
                    </span>
                    <span className="text-sm text-slate-500 font-medium -mt-1">Directory</span>
                  </div>
                </Link>

                <div className="hidden md:flex items-center space-x-6" role="menubar">
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <ExploreDropdown />
                  <Link
                    href="/blog"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
                  >
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>

                <div className="flex items-center space-x-3">
                  <GlobalSearch />
                  <a
                    href="https://livelovelascruces.com/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-105 font-medium text-sm"
                  >
                    Subscribe
                  </a>
                  <MobileMenu />
                </div>
              </div>
            </div>
          </nav>

          <main id="main-content">{children}</main>

          <NewsletterSection />

          <footer aria-label="Site footer" className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Las Cruces</div>
                      <div className="text-sm text-slate-400">Directory</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your complete guide to local businesses, restaurants, and places in Las Cruces.
                  </p>
                  <div className="flex space-x-3 pt-2">
                    <a
                      href="https://www.facebook.com/lascrucesdirectory"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Facebook"
                      className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.instagram.com/lascrucesdirectory"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Instagram"
                      className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Explore</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/restaurant" className="text-slate-400 hover:text-white transition-colors">
                        Restaurants
                      </Link>
                    </li>
                    <li>
                      <Link href="/business" className="text-slate-400 hover:text-white transition-colors">
                        Businesses
                      </Link>
                    </li>
                    <li>
                      <Link href="/accommodation" className="text-slate-400 hover:text-white transition-colors">
                        Accommodations
                      </Link>
                    </li>
                    <li>
                      <Link href="/places" className="text-slate-400 hover:text-white transition-colors">
                        Places
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us" className="text-slate-400 hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Connect</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/contact-us" className="text-slate-400 hover:text-white transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <a 
                        href="mailto:support@lascrucesdirectory.com?subject=New Business Listing Request" 
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        Add Your Business
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-800 mt-12 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
                  <p>&copy; {new Date().getFullYear()} Las Cruces Directory. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                    <Link href="https://lascrucesdirectory.com/sitemap.xml" className="hover:text-white transition-colors">
                      Sitemap
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
