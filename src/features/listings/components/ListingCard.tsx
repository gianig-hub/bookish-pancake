import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ListingImage {
  id: string
  url: string
  isPrimary: boolean
  alt: string | null
  sortOrder: number
}

interface ListingCardProps {
  listing: {
    id: string
    title: string
    slug: string
    condition: string
    price: number | null
    priceOnRequest: boolean
    featured: boolean
    views: number
    category: { name: string }
    brand: { name: string } | null
    city: { name: string; region: string }
    images: ListingImage[]
  }
}

const conditionLabel: Record<string, string> = {
  NEW: 'New',
  USED: 'Used',
  REFURBISHED: 'Refurbished',
}

const conditionColor: Record<string, string> = {
  NEW: 'bg-green-100 text-green-800',
  USED: 'bg-yellow-100 text-yellow-800',
  REFURBISHED: 'bg-blue-100 text-blue-800',
}

export function ListingCard({ listing }: ListingCardProps) {
  const primaryImage =
    listing.images.find((img) => img.isPrimary) ?? listing.images[0]

  return (
    <Link
      href={`/browse/${listing.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-cold-300 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-video bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-4xl">
            📦
          </div>
        )}
        {listing.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="featured">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-cold-600 transition-colors">
            {listing.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              conditionColor[listing.condition] ?? 'bg-gray-100 text-gray-600'
            }`}
          >
            {conditionLabel[listing.condition] ?? listing.condition}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {listing.category.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-cold-600">
            {listing.priceOnRequest ? 'POA' : formatPrice(listing.price)}
          </div>
          <div className="text-xs text-gray-400">
            {listing.city.name}
          </div>
        </div>

        {listing.brand && (
          <div className="text-xs text-gray-400 mt-1">{listing.brand.name}</div>
        )}
      </div>
    </Link>
  )
}
