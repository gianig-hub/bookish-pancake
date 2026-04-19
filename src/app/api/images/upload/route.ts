import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE ?? '5242880', 10)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    if (files.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 files allowed' }, { status: 400 })
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const uploaded = []

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} not allowed` },
          { status: 400 }
        )
      }

      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 5MB limit` },
          { status: 400 }
        )
      }

      const ext = file.name.split('.').pop() ?? 'jpg'
      const fileName = `${uuidv4()}.${ext}`
      const filePath = join(uploadDir, fileName)
      const bytes = await file.arrayBuffer()
      await writeFile(filePath, Buffer.from(bytes))

      uploaded.push({
        url: `/uploads/${fileName}`,
        localPath: filePath,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      })
    }

    return NextResponse.json({ files: uploaded }, { status: 201 })
  } catch (error) {
    console.error('[image-upload]', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
