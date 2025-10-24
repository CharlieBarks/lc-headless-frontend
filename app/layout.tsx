import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { MapPin, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Las Cruces Directory - Local Businesses, Restaurants & Services',
  description: 'Discover the best local businesses, restaurants, accommodations, and places in Las Cruces. Your complete guide to everything Las Cruces has to offer.',
  openGraph: {
    title: 'Las Cruces Directory',
    description: 'Discover the best local businesses, restaurants, accommodations, and places in Las Cruces.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
          <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Las Cruces
                    </span>
                    <span className="text-sm text-slate-500 font-medium -mt-1">Directory</span>
                  </div>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/archive/restaurant"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    Restaurants
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/archive/business"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    Businesses
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/archive/accommodation"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    Accommodations
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/archive/places"
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    Places
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/blog"
                    className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                  >
                    Blog
                  </Link>
                  <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-105 font-medium">
                    Add Listing
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main>{children}</main>

          <footer className="bg-slate-900 text-white mt-32">
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
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Explore</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/archive/restaurant" className="text-slate-400 hover:text-white transition-colors">
                        Restaurants
                      </Link>
                    </li>
                    <li>
                      <Link href="/archive/business" className="text-slate-400 hover:text-white transition-colors">
                        Businesses
                      </Link>
                    </li>
                    <li>
                      <Link href="/archive/accommodation" className="text-slate-400 hover:text-white transition-colors">
                        Accommodations
                      </Link>
                    </li>
                    <li>
                      <Link href="/archive/places" className="text-slate-400 hover:text-white transition-colors">
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
                      <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Connect</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Stay updated with the latest listings and local news.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Las Cruces Directory. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
