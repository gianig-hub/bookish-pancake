// EK Marketplace — Listing & Marketplace Types

export type ListingType = 'equipment' | 'service' | 'wanted' | 'business'
export type ListingStatus = 'draft' | 'pending' | 'active' | 'sold' | 'expired' | 'removed'
export type Condition = 'new' | 'used-good' | 'used-fair' | 'for-parts'
export type PriceType = 'fixed' | 'negotiable' | 'poa' | 'free'

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------

export interface Category {
  id: string
  slug: string
  label: string
  parentId?: string
  children?: Category[]
}

// ---------------------------------------------------------------------------
// Listing
// ---------------------------------------------------------------------------

export interface Listing {
  id: string
  type: ListingType
  status: ListingStatus
  title: string
  slug: string
  description: string
  categoryId: string
  category?: Category
  condition?: Condition
  price?: number
  priceType: PriceType
  location: string
  region?: string
  images: ListingImage[]
  sellerId: string
  seller?: {
    id: string
    name: string
    businessName?: string
  }
  viewCount: number
  featured: boolean
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface ListingImage {
  id: string
  listingId: string
  url: string
  altText?: string
  isPrimary: boolean
  order: number
}

// ---------------------------------------------------------------------------
// Listing creation/update inputs
// ---------------------------------------------------------------------------

export interface CreateListingInput {
  type: ListingType
  title: string
  description: string
  categoryId: string
  condition?: Condition
  price?: number
  priceType: PriceType
  location: string
  region?: string
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  status?: ListingStatus
}

// ---------------------------------------------------------------------------
// Contact Message
// ---------------------------------------------------------------------------

export interface ContactMessage {
  id: string
  listingId: string
  listing?: Pick<Listing, 'id' | 'title' | 'slug'>
  senderName: string
  senderEmail: string
  senderPhone?: string
  message: string
  read: boolean
  createdAt: string
}

export interface CreateContactMessageInput {
  listingId: string
  senderName: string
  senderEmail: string
  senderPhone?: string
  message: string
}

// ---------------------------------------------------------------------------
// Search & Filters
// ---------------------------------------------------------------------------

export interface ListingFilters {
  type?: ListingType
  categorySlug?: string
  condition?: Condition
  priceMin?: number
  priceMax?: number
  region?: string
  query?: string
}

export interface ListingSearchParams extends ListingFilters {
  page?: number
  perPage?: number
  sortBy?: 'createdAt' | 'price' | 'viewCount'
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedListings {
  listings: Listing[]
  total: number
  page: number
  perPage: number
  totalPages: number
}
