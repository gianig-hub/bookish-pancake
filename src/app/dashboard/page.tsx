import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [listingCount, messageCount] = await Promise.all([
    prisma.listing.count({ where: { userId: session.user.id } }),
    prisma.contactMessage.count({ where: { sellerId: session.user.id, read: false } }),
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, {session.user.name ?? session.user.email}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <div className="text-3xl font-bold text-cold-600">{listingCount}</div>
          <div className="text-sm text-gray-500 mt-1">My Listings</div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="text-3xl font-bold text-amber-500">{messageCount}</div>
          <div className="text-sm text-gray-500 mt-1">Unread Messages</div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="text-3xl font-bold text-green-500">Free</div>
          <div className="text-sm text-gray-500 mt-1">Your Plan</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/listings">
          <Button variant="outline">View My Listings</Button>
        </Link>
        <Link href="/dashboard/listings/create">
          <Button>Create New Listing</Button>
        </Link>
      </div>
    </div>
  )
}
