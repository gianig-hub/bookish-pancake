export interface SearchParams {
  q?: string
  category?: string
  brand?: string
  city?: string
  condition?: string
  sort?: string
  page?: string
  minPrice?: string
  maxPrice?: string
}

export interface ListingImage {
  id: string
  url: string
  localPath: string | null
  fileName: string
  mimeType: string
  fileSize: number
  alt: string | null
  isPrimary: boolean
  sortOrder: number
}

export interface ListingWithRelations {
  id: string
  title: string
  slug: string
  description: string
  status: string
  condition: string
  price: number | null
  priceOnRequest: boolean
  model: string | null
  featured: boolean
  views: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  category: { id: string; name: string; slug: string }
  brand: { id: string; name: string; slug: string } | null
  city: { id: string; name: string; slug: string; region: string }
  user: { id: string; name: string | null; email: string }
  images: ListingImage[]
}
