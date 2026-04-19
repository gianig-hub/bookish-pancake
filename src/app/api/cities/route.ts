import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const cities = await prisma.city.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
  return NextResponse.json({ cities })
}
