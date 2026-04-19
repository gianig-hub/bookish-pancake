import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

const PAGE_SIZE = 12

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const brand = searchParams.get('brand') ?? ''
  const city = searchParams.get('city') ?? ''
  const condition = searchParams.get('condition') ?? ''
  const sort = searchParams.get('sort') ?? 'latest'
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const minPrice = parseFloat(searchParams.get('minPrice') ?? '0') || undefined
  const maxPrice = parseFloat(searchParams.get('maxPrice') ?? '0') || undefined

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

  return NextResponse.json({
    listings,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  })
}
