import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ListingForm } from '@/features/listings/components/ListingForm'

async function getFormData() {
  const [categories, brands, cities] = await Promise.all([
    prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
    prisma.brand.findMany({ orderBy: { name: 'asc' } }),
    prisma.city.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
  ])
  return { categories, brands, cities }
}

export default async function CreateListingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const { categories, brands, cities } = await getFormData()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Listing</h1>
      <div className="bg-white rounded-xl border p-6">
        <ListingForm categories={categories} brands={brands} cities={cities} />
      </div>
    </div>
  )
}
