// Listing-related types

import type { ListingStatus, ListingCondition, Category, Brand, City } from './marketplace';

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: ListingStatus;
  condition: ListingCondition;
  price?: number;
  priceOnRequest: boolean;
  categoryId: string;
  category: Category;
  brandId?: string;
  brand?: Brand;
  model?: string;
  userId: string;
  cityId: string;
  city: City;
  featured: boolean;
  views: number;
  images: ListingImage[];
  publishedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingImage {
  id: string;
  listingId: string;
  url: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface CreateListingInput {
  title: string;
  description: string;
  condition: ListingCondition;
  price?: number;
  priceOnRequest?: boolean;
  categoryId: string;
  brandId?: string;
  model?: string;
  cityId: string;
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  status?: ListingStatus;
}

export interface ContactMessage {
  id: string;
  listingId: string;
  sellerId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export interface SendMessageInput {
  listingId: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
