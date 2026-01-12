'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Utensils, Building2, Bed, MapPin, FileText, Home } from 'lucide-react';

const menuLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurant', label: 'Restaurants', icon: Utensils },
  { href: '/business', label: 'Businesses', icon: Building2 },
  { href: '/accommodation', label: 'Accommodations', icon: Bed },
  { href: '/places', label: 'Places', icon: MapPin },
  { href: '/blog', label: 'Blog', icon: FileText },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <nav 
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-lg text-slate-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="py-4">
              {menuLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-6 py-4 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:bg-emerald-50"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100">
              <a
                href="https://livelovelascruces.beehiiv.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
