'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

function MobileMenuContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-x-0 top-20 bottom-0 bg-black/50 z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav 
        className="fixed top-20 right-0 w-72 bg-white shadow-2xl z-[9999] overflow-y-auto rounded-bl-xl"
        aria-label="Mobile navigation"
      >

        <div className="py-4">
          {menuLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
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
            href="https://livelovelascruces.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </nav>
    </>,
    document.body
  );
}

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

      <MobileMenuContent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
