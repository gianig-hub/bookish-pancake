// EK Marketplace — AI Services Package
// Modular AI utilities and service interfaces.
// All AI calls must go through this package — never call OpenAI directly from apps.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ListingAssistInput {
  title?: string
  description?: string
  category?: string
  condition?: string
  price?: number
}

export interface ListingAssistOutput {
  title: string
  description: string
  suggestedCategory?: string
  tags?: string[]
}

export interface ModerationInput {
  listingId: string
  title: string
  description: string
}

export interface ModerationOutput {
  score: number        // 0–100 (0 = clean, 100 = likely spam/scam)
  flagged: boolean
  reasons?: string[]
}

export interface SearchQueryInput {
  query: string
  filters?: Record<string, string>
}

export interface SearchQueryOutput {
  intent: string
  keywords: string[]
  suggestedFilters?: Record<string, string>
  expandedQuery?: string
}

// ---------------------------------------------------------------------------
// Service interfaces (implementations added in Phase 2)
// ---------------------------------------------------------------------------

// TODO: Implement listing assistant
export async function assistListingCreation(
  _input: ListingAssistInput
): Promise<ListingAssistOutput> {
  // TODO: Call OpenAI GPT to generate/improve listing content
  throw new Error('AI listing assistant not yet implemented')
}

// TODO: Implement moderation
export async function moderateListing(
  _input: ModerationInput
): Promise<ModerationOutput> {
  // TODO: Call OpenAI to score listing for spam/scam
  throw new Error('AI moderation not yet implemented')
}

// TODO: Implement search enhancement
export async function enhanceSearchQuery(
  _input: SearchQueryInput
): Promise<SearchQueryOutput> {
  // TODO: Parse natural language query to structured filters
  throw new Error('AI search enhancement not yet implemented')
}
