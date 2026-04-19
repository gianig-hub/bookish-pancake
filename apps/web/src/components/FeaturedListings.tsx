import type { Listing } from "@ek-marketplace/types";

interface Props {
  listings: Listing[];
}

export default function FeaturedListings({ listings }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3">
            {listing.category}
          </span>
          <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            {listing.price != null ? (
              <span className="font-bold text-gray-900">
                {listing.currency ?? "GBP"} {listing.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-gray-400 italic">Price on request</span>
            )}
            {listing.location && (
              <span className="text-gray-400">{listing.location}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
