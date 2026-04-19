import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'

const listingSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED']),
  price: z.number().positive().optional(),
  priceOnRequest: z.boolean().optional(),
  categoryId: z.string().min(1),
  brandId: z.string().optional(),
  model: z.string().optional(),
  cityId: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        localPath: z.string().optional(),
        fileName: z.string(),
        mimeType: z.string(),
        fileSize: z.number(),
        alt: z.string().optional(),
        isPrimary: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .optional(),
})

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const listings = await prisma.listing.findMany({
    where: { userId: session.user.id },
    include: {
      category: true,
      brand: true,
      city: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ listings })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = listingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const { images, ...data } = parsed.data
    const slug = generateSlug(data.title)

    const listing = await prisma.listing.create({
      data: {
        ...data,
        slug,
        userId: session.user.id,
        status: data.status ?? 'DRAFT',
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        images: images
          ? {
              create: images.map((img, i) => ({
                ...img,
                isPrimary: img.isPrimary ?? i === 0,
                sortOrder: img.sortOrder ?? i,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        brand: true,
        city: true,
        images: true,
      },
    })

    return NextResponse.json({ listing }, { status: 201 })
  } catch (error) {
    console.error('[listings POST]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
