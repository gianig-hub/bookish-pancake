import Link from 'next/link'
import { prisma } from '@/lib/db'
import { ListingCard } from '@/features/listings/components/ListingCard'

async function getFeaturedListings() {
  return prisma.listing.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: {
      category: true,
      brand: true,
      city: true,
      user: { select: { id: true, name: true, email: true } },
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  })
}

async function getRecentListings() {
  return prisma.listing.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      category: true,
      brand: true,
      city: true,
      user: { select: { id: true, name: true, email: true } },
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 8,
  })
}

export default async function HomePage() {
  const [featured, recent] = await Promise.all([
    getFeaturedListings(),
    getRecentListings(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-cold-900 via-cold-700 to-cold-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Everything Kold Market
          </h1>
          <p className="text-xl text-cold-100 mb-8 max-w-2xl mx-auto">
            Buy and sell cold storage equipment — refrigeration units, freezers, blast chillers,
            cold rooms &amp; more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-white text-cold-700 font-semibold px-8 py-3 rounded-lg hover:bg-cold-50 transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              href="/dashboard/listings/create"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-cold-700 transition-colors"
            >
              Sell Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-cold-600">{recent.length}+</div>
              <div className="text-sm text-gray-500 mt-1">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cold-600">UK</div>
              <div className="text-sm text-gray-500 mt-1">Wide Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cold-600">Free</div>
              <div className="text-sm text-gray-500 mt-1">To List</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
            <Link href="/browse?featured=true" className="text-cold-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Listings</h2>
          <Link href="/browse" className="text-cold-600 hover:underline text-sm font-medium">
            Browse all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No listings yet.</p>
            <Link href="/dashboard/listings/create" className="mt-4 inline-block text-cold-600 hover:underline">
              Be the first to list something!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
