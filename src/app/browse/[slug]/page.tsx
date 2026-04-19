import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ContactSellerModal } from '@/features/listings/components/ContactSellerModal'

interface Props {
  params: { slug: string }
}

async function getListing(slug: string) {
  return prisma.listing.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true,
      city: true,
      user: { select: { id: true, name: true, email: true } },
      images: { orderBy: { sortOrder: 'asc' } },
    },
  })
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await getListing(params.slug)

  if (!listing || listing.status !== 'PUBLISHED') {
    notFound()
  }

  // increment views
  await prisma.listing.update({
    where: { id: listing.id },
    data: { views: { increment: 1 } },
  })

  const primaryImage = listing.images.find((img) => img.isPrimary) ?? listing.images[0]

  const conditionLabel: Record<string, string> = {
    NEW: 'New',
    USED: 'Used',
    REFURBISHED: 'Refurbished',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt ?? listing.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-5xl">
                📦
              </div>
            )}
          </div>
          {listing.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {listing.images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-cold-500 cursor-pointer"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="category">{listing.category.name}</Badge>
            <Badge variant="condition">{conditionLabel[listing.condition] ?? listing.condition}</Badge>
            {listing.featured && <Badge variant="featured">Featured</Badge>}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>

          <div className="text-3xl font-bold text-cold-600 mb-4">
            {listing.priceOnRequest ? 'Price on Request' : formatPrice(listing.price)}
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6">
            {listing.brand && (
              <>
                <dt className="text-gray-500">Brand</dt>
                <dd className="font-medium">{listing.brand.name}</dd>
              </>
            )}
            {listing.model && (
              <>
                <dt className="text-gray-500">Model</dt>
                <dd className="font-medium">{listing.model}</dd>
              </>
            )}
            <dt className="text-gray-500">Location</dt>
            <dd className="font-medium">
              {listing.city.name}, {listing.city.region}
            </dd>
            <dt className="text-gray-500">Views</dt>
            <dd className="font-medium">{listing.views}</dd>
            <dt className="text-gray-500">Listed</dt>
            <dd className="font-medium">
              {formatDate(listing.publishedAt ?? listing.createdAt)}
            </dd>
          </dl>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-1">Seller</h3>
            <p className="text-gray-600">{listing.user.name ?? 'Anonymous'}</p>
          </div>

          <ContactSellerModal listingId={listing.id} listingTitle={listing.title} />
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {listing.description}
        </div>
      </div>
    </div>
  )
}
