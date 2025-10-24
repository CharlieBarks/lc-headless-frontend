'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import type { Category } from '../../lib/wordpress';

interface ArchiveFiltersProps {
  categories: Category[];
  type: string;
}

export function ArchiveFilters({ categories, type }: ArchiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showCategories, setShowCategories] = useState(false);
  const selectedCategory = searchParams.get('category') || '';

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(`/${type}?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory === categoryId.toString()) {
      params.delete('category');
    } else {
      params.set('category', categoryId.toString());
    }
    router.push(`/${type}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    router.push(`/${type}`);
  };

  return (
    <div className="mb-12 space-y-6">
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search listings..."
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
        />
      </div>

      {categories.length > 0 && (
        <div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center gap-2 text-slate-700 font-medium hover:text-emerald-600 transition-colors mb-4"
          >
            <span>Filter by Category</span>
            {showCategories ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showCategories && (
            <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id.toString())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id.toString()
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-slate-600">Active filters:</span>
          {searchTerm && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Search: {searchTerm}
            </span>
          )}
          {selectedCategory && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {categories.find(c => c.id.toString() === selectedCategory)?.name}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-slate-600 hover:text-emerald-600 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
