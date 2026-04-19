/**
 * AI Listing Assistant — missing info analyser placeholder.
 *
 * Detects incomplete or weak fields in a listing draft.
 * No real AI model or OpenAI integration is included.
 *
 * TODO: Enhance with an AI-driven quality score when real backend is available.
 */

import type {
  AiDetectMissingInfoRequest,
  AiDetectMissingInfoResponse,
  AiImproveListingRequest,
  AiImproveListingResponse,
  ListingImprovementResult,
} from '@ek-marketplace/types';
import { AiSuggestionType, MissingListingField } from '@ek-marketplace/types';
import { MISSING_FIELD_TIPS, AI_FALLBACK_MESSAGES } from '@ek-marketplace/config';

/**
 * Detects missing or weak fields in the draft using rule-based checks.
 *
 * This is intentionally a simple heuristic for MVP — no AI call is made.
 * The `isPlaceholder` flag is set to `false` here because this logic is deterministic,
 * but the analysis is shallow and should be replaced by an AI quality-score model.
 *
 * TODO: Replace heuristic checks with AI-driven listing quality scoring.
 */
export async function detectMissingInfo(
  request: AiDetectMissingInfoRequest,
): Promise<AiDetectMissingInfoResponse> {
  const { draft } = request;
  const missing: MissingListingField[] = [];

  if (!draft.title || draft.title.trim().length < 5) {
    missing.push(MissingListingField.Title);
  }
  if (!draft.description || draft.description.trim().length < 20) {
    missing.push(MissingListingField.Description);
  }
  if (!draft.category) {
    missing.push(MissingListingField.Category);
  }
  if (!draft.purpose) {
    missing.push(MissingListingField.Purpose);
  }
  if (!draft.condition) {
    missing.push(MissingListingField.Condition);
  }
  if (draft.priceGbp == null && !draft.negotiable) {
    missing.push(MissingListingField.Price);
  }
  if (!draft.location?.city && !draft.location?.postcode) {
    missing.push(MissingListingField.Location);
  }
  if (!draft.photoUrls || draft.photoUrls.length === 0) {
    missing.push(MissingListingField.Photos);
  }

  const fieldTips = Object.fromEntries(
    missing.map((field) => [field, MISSING_FIELD_TIPS[field]]),
  ) as Partial<Record<MissingListingField, string>>;

  return {
    type: AiSuggestionType.DetectMissingInfo,
    isPlaceholder: false,
    missingFields: missing,
    fieldTips,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Placeholder handler: apply a full "improve my listing" AI pass.
 *
 * Runs the missing-info analysis and returns a combined improvement result.
 * Individual AI suggestion handlers (title, description, category) are
 * deliberately NOT chained here yet — each is invoked independently from
 * the web client to keep the UI responsive and modular.
 *
 * TODO: Orchestrate all improvement sub-tasks and merge results.
 * TODO: Add per-user quota check before running.
 */
export async function improveListing(
  request: AiImproveListingRequest,
): Promise<AiImproveListingResponse> {
  const missingResult = await detectMissingInfo({
    type: AiSuggestionType.DetectMissingInfo,
    draft: request.draft,
    userHint: request.userHint,
  });

  const result: ListingImprovementResult = {
    missingFields: missingResult.missingFields,
    notes: AI_FALLBACK_MESSAGES[AiSuggestionType.ImproveListing],
    // TODO: Populate suggestedTitle, suggestedDescription, suggestedCategory etc.
    //       from individual sub-handlers once real AI is integrated.
  };

  return {
    type: AiSuggestionType.ImproveListing,
    isPlaceholder: true,
    result,
    rationale: AI_FALLBACK_MESSAGES[AiSuggestionType.ImproveListing],
    generatedAt: new Date().toISOString(),
  };
}

export type {
  AiDetectMissingInfoRequest,
  AiDetectMissingInfoResponse,
  AiImproveListingRequest,
  AiImproveListingResponse,
};
