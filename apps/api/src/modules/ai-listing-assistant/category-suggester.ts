/**
 * AI Listing Assistant — category suggestion placeholder.
 *
 * This module defines the contract for category and purpose suggestion.
 * No real AI model or OpenAI integration is included.
 *
 * TODO: Wire up a real AI provider when ready.
 * TODO: Consider a lightweight classifier trained on EK category taxonomy.
 */

import type {
  AiSuggestCategoryRequest,
  AiSuggestCategoryResponse,
  AiSuggestPurposeRequest,
  AiSuggestPurposeResponse,
} from '@ek-marketplace/types';
import { AiSuggestionType, ListingCategory, ListingPurpose } from '@ek-marketplace/types';
import { AI_FALLBACK_MESSAGES } from '@ek-marketplace/config';

/**
 * Placeholder handler: suggest the most relevant category for a draft listing.
 *
 * Returns a default category with `isPlaceholder: true` and low confidence.
 *
 * TODO: Replace stub body with real AI call or a keyword-based classifier.
 */
export async function suggestCategory(
  request: AiSuggestCategoryRequest,
): Promise<AiSuggestCategoryResponse> {
  // TODO: Analyse draft.title + draft.description to infer best-fit category.
  // TODO: Return top-N candidates with confidence scores.

  return {
    type: AiSuggestionType.SuggestCategory,
    isPlaceholder: true,
    suggestedCategory: ListingCategory.RefrigerationParts, // Placeholder default
    confidence: 'low',
    rationale: AI_FALLBACK_MESSAGES[AiSuggestionType.SuggestCategory],
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Placeholder handler: suggest the appropriate listing purpose for a draft.
 *
 * Returns a default purpose with `isPlaceholder: true` and low confidence.
 *
 * TODO: Replace stub body with real AI call.
 */
export async function suggestPurpose(
  request: AiSuggestPurposeRequest,
): Promise<AiSuggestPurposeResponse> {
  // TODO: Analyse draft text + userHint to infer listing intent.

  return {
    type: AiSuggestionType.SuggestPurpose,
    isPlaceholder: true,
    suggestedPurpose: ListingPurpose.ForSale, // Placeholder default
    confidence: 'low',
    rationale: AI_FALLBACK_MESSAGES[AiSuggestionType.SuggestPurpose],
    generatedAt: new Date().toISOString(),
  };
}

export type {
  AiSuggestCategoryRequest,
  AiSuggestCategoryResponse,
  AiSuggestPurposeRequest,
  AiSuggestPurposeResponse,
};
