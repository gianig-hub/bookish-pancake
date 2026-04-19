'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'

export interface UploadedImage {
  url: string
  localPath?: string
  fileName: string
  mimeType: string
  fileSize: number
  alt?: string
  isPrimary: boolean
  sortOrder: number
}

interface Props {
  value: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 5

export function ImageUploader({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback(
    async (files: File[]) => {
      setError('')
      const remaining = MAX_FILES - value.length
      if (remaining <= 0) {
        setError('Maximum 5 images allowed')
        return
      }

      const toUpload = files.slice(0, remaining)
      for (const file of toUpload) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError(`${file.name}: only JPG, PNG, WebP, GIF allowed`)
          return
        }
        if (file.size > MAX_SIZE) {
          setError(`${file.name}: file size must be under 5MB`)
          return
        }
      }

      setUploading(true)
      try {
        const formData = new FormData()
        toUpload.forEach((f) => formData.append('files', f))

        const res = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const json = await res.json()
          setError(json.error ?? 'Upload failed')
          return
        }

        const json = await res.json()
        const uploaded: UploadedImage[] = json.files.map(
          (f: Omit<UploadedImage, 'isPrimary' | 'sortOrder'>, i: number) => ({
            ...f,
            isPrimary: value.length === 0 && i === 0,
            sortOrder: value.length + i,
          })
        )

        onChange([...value, ...uploaded])
      } catch {
        setError('Upload failed. Please try again.')
      } finally {
        setUploading(false)
      }
    },
    [value, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const files = Array.from(e.dataTransfer.files)
      processFiles(files)
    },
    [processFiles]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    processFiles(files)
    e.target.value = ''
  }

  const setPrimary = (index: number) => {
    onChange(value.map((img, i) => ({ ...img, isPrimary: i === index })))
  }

  const removeImage = (index: number) => {
    const next = value.filter((_, i) => i !== index)
    const hasPrimary = next.some((img) => img.isPrimary)
    if (!hasPrimary && next.length > 0) {
      next[0].isPrimary = true
    }
    onChange(next.map((img, i) => ({ ...img, sortOrder: i })))
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-cold-500 bg-cold-50'
            : 'border-gray-300 hover:border-cold-400 hover:bg-gray-50'
        } ${value.length >= MAX_FILES ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.gif"
          className="hidden"
          onChange={handleFileInput}
          disabled={value.length >= MAX_FILES}
        />
        <div className="text-4xl mb-2">📸</div>
        {uploading ? (
          <p className="text-cold-600 font-medium">Uploading...</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              Drag & drop images here or click to browse
            </p>
            <p className="text-gray-400 text-sm mt-1">
              JPG, PNG, WebP, GIF — max 5MB each — up to {MAX_FILES} images
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {value.length}/{MAX_FILES} uploaded
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {value.map((img, index) => (
            <div
              key={img.url}
              className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                img.isPrimary ? 'border-cold-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={img.url}
                  alt={img.fileName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-1 flex gap-1">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className="flex-1 text-xs bg-cold-50 text-cold-600 hover:bg-cold-100 rounded px-1 py-0.5 truncate"
                    title="Set as primary"
                  >
                    Set primary
                  </button>
                )}
                {img.isPrimary && (
                  <span className="flex-1 text-xs bg-cold-500 text-white rounded px-1 py-0.5 text-center">
                    Primary
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-xs bg-red-50 text-red-500 hover:bg-red-100 rounded px-1 py-0.5"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
