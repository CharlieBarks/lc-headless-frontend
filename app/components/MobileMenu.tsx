'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const menuRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-x-0 top-20 bottom-0 bg-black/50 z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav 
        ref={menuRef}
        id="mobile-menu"
        className="fixed top-20 right-0 w-72 bg-white shadow-2xl z-[9999] overflow-y-auto rounded-bl-xl"
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >

        <div className="py-4">
          {menuLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                ref={index === 0 ? firstLinkRef : undefined}
                className="flex items-center gap-3 px-6 py-4 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
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
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      <MobileMenuContent isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
