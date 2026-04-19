import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import type { SearchParams } from '@/types'
import { ListingCard } from '@/features/listings/components/ListingCard'
import { ListingFilters } from '@/features/listings/components/ListingFilters'
import Link from 'next/link'

const PAGE_SIZE = 12

async function getFilterOptions() {
  const [categories, brands, cities] = await Promise.all([
    prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
    prisma.brand.findMany({ orderBy: { name: 'asc' } }),
    prisma.city.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
  ])
  return { categories, brands, cities }
}

async function getListings(searchParams: SearchParams) {
  const q = searchParams.q ?? ''
  const category = searchParams.category ?? ''
  const brand = searchParams.brand ?? ''
  const city = searchParams.city ?? ''
  const condition = searchParams.condition ?? ''
  const sort = searchParams.sort ?? 'latest'
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const minPrice = parseFloat(searchParams.minPrice ?? '0') || undefined
  const maxPrice = parseFloat(searchParams.maxPrice ?? '0') || undefined

  const where: Prisma.ListingWhereInput = {
    status: 'PUBLISHED',
    ...(q && {
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
        { model: { contains: q } },
      ],
    }),
    ...(category && { category: { slug: category } }),
    ...(brand && { brand: { slug: brand } }),
    ...(city && { city: { slug: city } }),
    ...(condition && { condition }),
    ...((minPrice !== undefined || maxPrice !== undefined) && {
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    }),
  }

  const orderBy: Prisma.ListingOrderByWithRelationInput =
    sort === 'oldest'
      ? { createdAt: 'asc' }
      : sort === 'views'
      ? { views: 'desc' }
      : sort === 'price_asc'
      ? { price: 'asc' }
      : sort === 'price_desc'
      ? { price: 'desc' }
      : { createdAt: 'desc' }

  const [total, listings] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      include: {
        category: true,
        brand: true,
        city: true,
        user: { select: { id: true, name: true, email: true } },
        images: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])

  return { listings, total, page, totalPages: Math.ceil(total / PAGE_SIZE) }
}

function buildPageUrl(searchParams: SearchParams, newPage: number): string {
  const params = new URLSearchParams()
  if (searchParams.q) params.set('q', searchParams.q)
  if (searchParams.category) params.set('category', searchParams.category)
  if (searchParams.brand) params.set('brand', searchParams.brand)
  if (searchParams.city) params.set('city', searchParams.city)
  if (searchParams.condition) params.set('condition', searchParams.condition)
  if (searchParams.sort) params.set('sort', searchParams.sort)
  if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice)
  if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
  params.set('page', String(newPage))
  return `/browse?${params.toString()}`
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const [filterOptions, { listings, total, page, totalPages }] = await Promise.all([
    getFilterOptions(),
    getListings(searchParams),
  ])

  const hasFilters =
    searchParams.q ||
    searchParams.category ||
    searchParams.brand ||
    searchParams.city ||
    searchParams.condition

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Listings</h1>
        <p className="text-gray-500 mt-1">
          {total} listing{total !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
            <ListingFilters
              categories={filterOptions.categories}
              brands={filterOptions.brands}
              cities={filterOptions.cities}
              searchParams={searchParams}
            />
          </Suspense>
        </aside>

        {/* Listings grid */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort:
              </label>
              {/* Sort is handled client-side in ListingFilters */}
            </div>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg" />
                ))}
              </div>
            }
          >
            {listings.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-500 mb-6">
                  {hasFilters
                    ? 'Try adjusting your filters or search terms.'
                    : 'There are no listings yet.'}
                </p>
                {hasFilters && (
                  <Link
                    href="/browse"
                    className="inline-block bg-cold-600 text-white px-6 py-2 rounded-lg hover:bg-cold-700 transition-colors"
                  >
                    Clear filters
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </Suspense>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {page > 1 && (
                <Link
                  href={buildPageUrl(searchParams, page - 1)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm"
                >
                  ← Previous
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Link
                    key={pageNum}
                    href={buildPageUrl(searchParams, pageNum)}
                    className={`px-4 py-2 rounded border text-sm ${
                      pageNum === page
                        ? 'bg-cold-600 text-white border-cold-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              })}
              {page < totalPages && (
                <Link
                  href={buildPageUrl(searchParams, page + 1)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
