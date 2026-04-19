// EK Marketplace — Shared Configuration
// Exports application-wide configuration and constants.

export * from './constants'

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

// ---------------------------------------------------------------------------
// App metadata
// ---------------------------------------------------------------------------

export const APP_CONFIG = {
  name: 'EK Marketplace',
  tagline: 'The UK marketplace for cooling & refrigeration',
  url: process.env.APP_URL || 'https://ekmarketplace.co.uk',
  apiUrl: process.env.API_URL || 'http://localhost:4000',
  supportEmail: 'support@ekmarketplace.co.uk',
  country: 'GB',
  currency: 'GBP',
  locale: 'en-GB',
} as const
