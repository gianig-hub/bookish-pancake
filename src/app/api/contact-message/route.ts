import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const contactSchema = z.object({
  listingId: z.string().min(1),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const { listingId, name, email, phone, message } = parsed.data

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true, status: true },
    })

    if (!listing || listing.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        listingId,
        sellerId: listing.userId,
        name,
        email,
        phone: phone ?? null,
        message,
      },
    })

    return NextResponse.json({ message: contactMessage }, { status: 201 })
  } catch (error) {
    console.error('[contact-message]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
