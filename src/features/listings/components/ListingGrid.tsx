import { ListingCard } from './ListingCard'

interface ListingGridProps {
  listings: Parameters<typeof ListingCard>[0]['listing'][]
  emptyMessage?: string
}

export function ListingGrid({ listings, emptyMessage = 'No listings found.' }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
