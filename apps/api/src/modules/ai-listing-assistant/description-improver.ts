/**
 * AI Listing Assistant — description improvement placeholder.
 *
 * This module defines the contract for description improvement only.
 * No real AI model or OpenAI integration is included.
 *
 * TODO: Wire up a real AI provider when ready.
 * TODO: Add content safety checks on the improved text before returning it.
 */

import type { AiImproveDescriptionRequest, AiImproveDescriptionResponse } from '@ek-marketplace/types';
import { AiSuggestionType } from '@ek-marketplace/types';
import { AI_FALLBACK_MESSAGES, AI_ASSIST_MIN_DESCRIPTION_LENGTH } from '@ek-marketplace/config';

/**
 * Placeholder handler: improve/rewrite the listing description.
 *
 * Returns the original description unchanged with `isPlaceholder: true`.
 *
 * TODO: Replace stub body with real AI call.
 * TODO: Add prompt engineering to preserve factual claims while improving clarity.
 */
export async function improveDescription(
  request: AiImproveDescriptionRequest,
): Promise<AiImproveDescriptionResponse> {
  const { draft } = request;

  // Guard: require a minimum description length before attempting improvement.
  const description = draft.description ?? '';
  if (description.length < AI_ASSIST_MIN_DESCRIPTION_LENGTH) {
    return {
      type: AiSuggestionType.ImproveDescription,
      isPlaceholder: true,
      suggestedDescription: description,
      rationale:
        'Your description is too short for AI improvement. Add more detail about your item first.',
      generatedAt: new Date().toISOString(),
    };
  }

  // TODO: Build a structured prompt from draft context.
  // TODO: Call AI provider and parse the response.
  // TODO: Run a content safety check on suggestedDescription.

  return {
    type: AiSuggestionType.ImproveDescription,
    isPlaceholder: true,
    // Return original unchanged until real AI is wired up.
    suggestedDescription: description,
    rationale: AI_FALLBACK_MESSAGES[AiSuggestionType.ImproveDescription],
    generatedAt: new Date().toISOString(),
  };
}

export type { AiImproveDescriptionRequest, AiImproveDescriptionResponse };
