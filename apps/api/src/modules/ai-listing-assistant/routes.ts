/**
 * AI Listing Assistant — API route handlers (placeholder).
 *
 * These route handlers define the request/response contract for the AI assist API.
 * They are intentionally framework-agnostic — adapt to Express/Fastify/Hono as needed.
 *
 * All handlers are placeholders and return `isPlaceholder: true` until a real
 * AI provider is wired up.
 *
 * TODO: Add authentication middleware to all routes.
 * TODO: Add rate-limiting middleware per user / per session.
 * TODO: Validate request bodies with a schema library (e.g. Zod).
 */

import type { AiListingAssistRequest, AiListingAssistResponse } from '@ek-marketplace/types';
import { AiSuggestionType } from '@ek-marketplace/types';
import { generateTitle } from './title-generator';
import { improveDescription } from './description-improver';
import { suggestCategory, suggestPurpose } from './category-suggester';
import { detectMissingInfo, improveListing } from './missing-info-analyzer';

/**
 * Central dispatcher: routes an AI assist request to the correct handler.
 *
 * Usage (pseudo-code):
 *   POST /api/ai/listing-assist
 *   Body: AiListingAssistRequest
 *   Response: AiListingAssistResponse
 */
export async function handleAiListingAssist(
  request: AiListingAssistRequest,
): Promise<AiListingAssistResponse> {
  switch (request.type) {
    case AiSuggestionType.GenerateTitle:
      return generateTitle(request);

    case AiSuggestionType.ImproveDescription:
      return improveDescription(request);

    case AiSuggestionType.SuggestCategory:
      return suggestCategory(request);

    case AiSuggestionType.SuggestPurpose:
      return suggestPurpose(request);

    case AiSuggestionType.SuggestCondition:
      // TODO: Implement suggestCondition handler.
      return {
        type: AiSuggestionType.SuggestCondition,
        isPlaceholder: true,
        suggestedCondition: 'used_good' as never,
        rationale: 'Condition suggestion is not yet implemented.',
        generatedAt: new Date().toISOString(),
      };

    case AiSuggestionType.DetectMissingInfo:
      return detectMissingInfo(request);

    case AiSuggestionType.ImproveListing:
      return improveListing(request);

    default: {
      // TypeScript exhaustiveness guard — should never reach here.
      const _exhaustive: never = request;
      throw new Error(`Unknown AiSuggestionType: ${JSON.stringify(_exhaustive)}`);
    }
  }
}
