'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Category } from '../../lib/wordpress';

interface ArchiveFiltersProps {
  categories: Category[];
  type: string;
}

export function ArchiveFilters({ categories, type }: ArchiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    updateFilters(searchTerm, categoryId);
  };

  const updateFilters = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);

    const queryString = params.toString();
    router.push(`/archive/${type}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="mb-12 space-y-6">
      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search listings..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
          />
        </div>
      </form>

      {categories.length > 0 && (
        <div className="flex items-center gap-4">
          <label htmlFor="category-select" className="text-slate-700 font-medium whitespace-nowrap">
            Filter by Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="flex-1 max-w-md px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {(searchTerm || selectedCategory) && (
        <div className="flex items-center gap-4">
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
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              router.push(`/archive/${type}`);
            }}
            className="text-sm text-slate-600 hover:text-emerald-600 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
