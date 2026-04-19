// packages/ai — EK Marketplace AI services
//
// All AI functionality is isolated here.
// Apps and workers interact with AI exclusively through this package's interfaces.
// This makes it easy to swap providers, disable AI features, or mock in tests.
//
// See src/README.md for AI feature guidelines.

// --- Service interfaces (to be implemented) ---

export interface ListingAIService {
  /** Generate a listing title from minimal input */
  generateTitle(input: ListingTitleInput): Promise<string>;
  /** Generate a listing description from minimal input */
  generateDescription(input: ListingDescriptionInput): Promise<string>;
  /** Suggest a category slug for a listing */
  suggestCategory(input: { title: string; description?: string }): Promise<string>;
}

export interface ModerationAIService {
  /** Assess whether a listing is likely spam or policy-violating */
  moderateListing(input: ModerationInput): Promise<ModerationResult>;
}

export interface SearchAIService {
  /** Parse a natural-language query into structured search filters */
  parseSearchQuery(query: string): Promise<ParsedSearchQuery>;
}

// --- Input / output types ---

export interface ListingTitleInput {
  brand?: string;
  model?: string;
  category: string;
  condition: string;
  price?: number;
}

export interface ListingDescriptionInput {
  title: string;
  brand?: string;
  model?: string;
  category: string;
  condition: string;
  price?: number;
  sellerNotes?: string;
}

export interface ModerationInput {
  title: string;
  description: string;
  sellerEmail?: string;
}

export interface ModerationResult {
  approved: boolean;
  flags: string[];
  confidence: number;
}

export interface ParsedSearchQuery {
  keywords?: string;
  categorySlug?: string;
  brandSlug?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  citySlug?: string;
}

// --- Feature flags ---
// Set AI_ENABLED=false to disable all AI features without code changes
export const AI_ENABLED = process.env.AI_ENABLED !== 'false';

// TODO: Implement ListingAIServiceImpl using OpenAI SDK
// TODO: Implement ModerationAIServiceImpl
// TODO: Implement SearchAIServiceImpl
