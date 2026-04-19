import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().min(20).max(5000).optional(),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED']).optional(),
  price: z.number().positive().nullable().optional(),
  priceOnRequest: z.boolean().optional(),
  categoryId: z.string().min(1).optional(),
  brandId: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
  cityId: z.string().min(1).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      brand: true,
      city: true,
      user: { select: { id: true, name: true, email: true } },
      images: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!listing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // increment views
  await prisma.listing.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  })

  return NextResponse.json({ listing })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const listing = await prisma.listing.findUnique({ where: { id: params.id } })
  if (!listing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (listing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const updated = await prisma.listing.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        publishedAt:
          parsed.data.status === 'PUBLISHED' && !listing.publishedAt
            ? new Date()
            : undefined,
      },
      include: {
        category: true,
        brand: true,
        city: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    })

    return NextResponse.json({ listing: updated })
  } catch (error) {
    console.error('[listings PUT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const listing = await prisma.listing.findUnique({ where: { id: params.id } })
  if (!listing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (listing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.listing.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
