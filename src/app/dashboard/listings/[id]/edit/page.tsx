import { redirect, notFound } from 'next/navigation'
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

export default async function EditListingPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [listing, { categories, brands, cities }] = await Promise.all([
    prisma.listing.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    }),
    getFormData(),
  ])

  if (!listing) notFound()
  if (listing.userId !== session.user.id) redirect('/dashboard/listings')

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Listing</h1>
      <div className="bg-white rounded-xl border p-6">
        <ListingForm
          listingId={listing.id}
          categories={categories}
          brands={brands}
          cities={cities}
          defaultValues={{
            title: listing.title,
            description: listing.description,
            condition: listing.condition as 'NEW' | 'USED' | 'REFURBISHED',
            price: listing.price ?? undefined,
            priceOnRequest: listing.priceOnRequest,
            categoryId: listing.categoryId,
            brandId: listing.brandId ?? undefined,
            model: listing.model ?? undefined,
            cityId: listing.cityId,
            status: listing.status as 'DRAFT' | 'PUBLISHED',
            images: listing.images,
          }}
        />
      </div>
    </div>
  )
}
