import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
}

export default async function DashboardListingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const listings = await prisma.listing.findMany({
    where: { userId: session.user.id },
    include: {
      category: true,
      city: true,
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <Link href="/dashboard/listings/create">
          <Button>+ New Listing</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <div className="text-5xl mb-3">📦</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No listings yet</h3>
          <p className="text-gray-500 mb-6">Create your first listing to start selling.</p>
          <Link href="/dashboard/listings/create">
            <Button>Create Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 line-clamp-1">{listing.title}</div>
                    <div className="text-gray-400 text-xs">{listing.city.name}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {listing.category.name}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell font-medium text-cold-600">
                    {listing.priceOnRequest ? 'POA' : formatPrice(listing.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        listing.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : listing.status === 'DRAFT'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {STATUS_LABELS[listing.status] ?? listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {formatDate(listing.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/browse/${listing.slug}`} className="text-xs text-gray-500 hover:text-cold-600">
                        View
                      </Link>
                      <Link href={`/dashboard/listings/${listing.id}/edit`} className="text-xs text-cold-600 hover:underline">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
