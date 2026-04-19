/**
 * AI Listing Assistant — title generation placeholder.
 *
 * This module defines the contract for title generation only.
 * No real AI model or OpenAI integration is included.
 *
 * TODO: Wire up a real AI provider (e.g. OpenAI GPT-4o) when ready.
 * TODO: Add rate limiting and per-user quota enforcement.
 */

import type {
  AiGenerateTitleRequest,
  AiGenerateTitleResponse,
  AiSuggestionState,
} from '@ek-marketplace/types';
import { AiSuggestionType } from '@ek-marketplace/types';
import { AI_FALLBACK_MESSAGES } from '@ek-marketplace/config';

/**
 * Placeholder handler: generate a listing title from a draft.
 *
 * In MVP mode this returns a safe fallback response.
 * The `isPlaceholder` flag is set to `true` so the UI can show an appropriate message.
 *
 * TODO: Replace stub body with real AI call.
 */
export async function generateTitle(
  request: AiGenerateTitleRequest,
): Promise<AiGenerateTitleResponse> {
  // TODO: Validate request.draft has enough context to generate a meaningful title.
  // TODO: Call AI provider with a structured prompt built from request.draft + request.userHint.
  // TODO: Parse and sanitise the AI response before returning.

  const placeholderTitle = buildPlaceholderTitle(request);

  return {
    type: AiSuggestionType.GenerateTitle,
    isPlaceholder: true,
    suggestedTitle: placeholderTitle,
    rationale: AI_FALLBACK_MESSAGES[AiSuggestionType.GenerateTitle],
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Builds a simple deterministic placeholder title from the draft.
 * Used only while real AI is not wired up.
 */
function buildPlaceholderTitle(request: AiGenerateTitleRequest): string {
  const { draft, userHint } = request;

  const parts: string[] = [];

  if (draft.condition) {
    parts.push(draft.condition.replace(/_/g, ' '));
  }

  if (draft.category) {
    parts.push(draft.category.replace(/_/g, ' '));
  }

  if (userHint) {
    parts.push(userHint.slice(0, 40));
  }

  return parts.length > 0
    ? parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
    : 'Listing title placeholder';
}

// Re-export relevant types for convenience
export type { AiGenerateTitleRequest, AiGenerateTitleResponse, AiSuggestionState };
