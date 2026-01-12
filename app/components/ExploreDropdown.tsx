'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Utensils, Building2, Bed, MapPin } from 'lucide-react';

const exploreLinks = [
  { href: '/restaurant', label: 'Restaurants', icon: Utensils, description: 'Local dining spots' },
  { href: '/business', label: 'Businesses', icon: Building2, description: 'Local services & shops' },
  { href: '/accommodation', label: 'Accommodations', icon: Bed, description: 'Hotels & lodging' },
  { href: '/places', label: 'Places', icon: MapPin, description: 'Attractions & landmarks' },
];

export function ExploreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 text-slate-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Explore
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2">
            {exploreLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group focus:outline-none focus-visible:bg-emerald-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {link.label}
                    </div>
                    <div className="text-xs text-slate-500">{link.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
