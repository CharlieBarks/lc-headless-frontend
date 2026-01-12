'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, MapPin, Loader2 } from 'lucide-react';

interface SearchResult {
  id: number;
  slug: string;
  title: string;
  type: string;
  typeLabel: string;
  city?: string;
  category?: string;
  image?: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      setShowMobileSearch(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleResultClick = () => {
    setQuery('');
    setIsOpen(false);
    setShowMobileSearch(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const typeColors: Record<string, string> = {
    restaurant: 'bg-orange-100 text-orange-700',
    business: 'bg-blue-100 text-blue-700',
    accommodation: 'bg-purple-100 text-purple-700',
    places: 'bg-green-100 text-green-700',
  };

  return (
    <>
      <div ref={containerRef} className="relative hidden md:block">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings..."
            aria-label="Search listings"
            className="w-64 lg:w-80 pl-10 pr-10 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Clear search"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <X className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          )}
        </form>

        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
            <div className="p-2">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={`/${result.type}/${result.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {result.image ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={result.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
                      {result.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[result.type] || 'bg-slate-100 text-slate-600'}`}>
                        {result.typeLabel}
                      </span>
                      {result.city && (
                        <span className="text-xs text-slate-500">{result.city}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-100 p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
                className="w-full text-center py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                View all results for "{query}"
              </button>
            </div>
          </div>
        )}

        {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 text-center z-50">
            <p className="text-slate-500">No results found for "{query}"</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMobileSearch(true)}
        className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" aria-hidden="true" />
      </button>

      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setShowMobileSearch(false)}>
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings..."
                aria-label="Search listings"
                autoFocus
                className="w-full pl-12 pr-12 py-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base"
              />
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Close search"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>

            {results.length > 0 && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={`/${result.type}/${result.slug}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {result.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={result.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{result.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[result.type] || 'bg-slate-100 text-slate-600'}`}>
                          {result.typeLabel}
                        </span>
                        {result.city && (
                          <span className="text-xs text-slate-500">{result.city}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.length >= 2 && results.length === 0 && !isLoading && (
              <div className="mt-4 p-6 text-center">
                <p className="text-slate-500">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
