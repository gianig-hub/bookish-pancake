// EK Marketplace — User & Business Types

export type UserRole = 'ADMIN' | 'SELLER' | 'BUYER' | 'INSTALLER' | 'SHOP'
export type AccountStatus = 'active' | 'suspended' | 'pending_verification'
export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'business'

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: AccountStatus
  avatarUrl?: string
  phone?: string
  businessProfile?: BusinessProfile
  subscriptionPlan: SubscriptionPlan
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

// ---------------------------------------------------------------------------
// Business Profile
// ---------------------------------------------------------------------------

export interface BusinessProfile {
  id: string
  userId: string
  businessName: string
  slug: string
  description?: string
  website?: string
  phone?: string
  email?: string
  address?: Address
  categories: string[]
  verified: boolean
  logoUrl?: string
  coverUrl?: string
  createdAt: string
  updatedAt: string
}

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export interface Address {
  line1: string
  line2?: string
  city: string
  county?: string
  postcode: string
  country: 'GB'
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface RegisterInput {
  email: string
  password: string
  name: string
  role?: UserRole
}

export interface LoginInput {
  email: string
  password: string
}
