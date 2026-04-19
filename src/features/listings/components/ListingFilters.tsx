'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { SearchParams } from '@/types'

interface FilterOption {
  id: string
  name: string
  slug: string
}

interface Props {
  categories: FilterOption[]
  brands: FilterOption[]
  cities: (FilterOption & { region: string })[]
  searchParams: SearchParams
}

const CONDITIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'USED', label: 'Used' },
  { value: 'REFURBISHED', label: 'Refurbished' },
]

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export function ListingFilters({ categories, brands, cities, searchParams }: Props) {
  const router = useRouter()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams()
      if (searchParams.q) params.set('q', searchParams.q)
      if (searchParams.category) params.set('category', searchParams.category)
      if (searchParams.brand) params.set('brand', searchParams.brand)
      if (searchParams.city) params.set('city', searchParams.city)
      if (searchParams.condition) params.set('condition', searchParams.condition)
      if (searchParams.sort) params.set('sort', searchParams.sort)
      if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice)
      if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/browse?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => {
    router.push('/browse')
  }

  const hasFilters =
    searchParams.q ||
    searchParams.category ||
    searchParams.brand ||
    searchParams.city ||
    searchParams.condition

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            updateFilter('q', fd.get('q') as string)
          }}
        >
          <div className="flex gap-2">
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder="Keywords..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
            />
            <button
              type="submit"
              className="bg-cold-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-cold-700"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
        <select
          value={searchParams.sort ?? 'latest'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
        <select
          value={searchParams.category ?? ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
        <select
          value={searchParams.brand ?? ''}
          onChange={(e) => updateFilter('brand', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
        <select
          value={searchParams.city ?? ''}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
        >
          <option value="">All Locations</option>
          {cities.map((city) => (
            <option key={city.id} value={city.slug}>
              {city.name} ({city.region})
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
        <div className="space-y-1">
          {CONDITIONS.map((cond) => (
            <label key={cond.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condition"
                value={cond.value}
                checked={searchParams.condition === cond.value}
                onChange={() => updateFilter('condition', cond.value)}
                className="text-cold-600"
              />
              <span className="text-sm text-gray-700">{cond.label}</span>
            </label>
          ))}
          {searchParams.condition && (
            <button
              onClick={() => updateFilter('condition', '')}
              className="text-xs text-cold-600 hover:underline mt-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}
