/**
 * AI listing assistant shared types for EK Marketplace.
 * MVP-level — request/response contracts only.
 * No OpenAI or model-level types included here.
 *
 * TODO: Extend these types when a real AI backend is wired up.
 */

import type { ListingCategory, ListingCondition, ListingDraft, ListingPurpose } from './listing';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** The kind of AI suggestion being requested or returned. */
export enum AiSuggestionType {
  GenerateTitle = 'generate_title',
  ImproveDescription = 'improve_description',
  SuggestCategory = 'suggest_category',
  SuggestPurpose = 'suggest_purpose',
  SuggestCondition = 'suggest_condition',
  DetectMissingInfo = 'detect_missing_info',
  ImproveListing = 'improve_listing',
}

/** UI state for an individual AI suggestion. */
export enum AiSuggestionState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
  /** Suggestion was shown but the user dismissed it without applying. */
  Dismissed = 'dismissed',
  /** The user accepted and applied the suggestion. */
  Applied = 'applied',
}

/** Fields in a listing draft that can be flagged as incomplete or weak. */
export enum MissingListingField {
  Title = 'title',
  Description = 'description',
  Category = 'category',
  Purpose = 'purpose',
  Condition = 'condition',
  Price = 'price',
  Location = 'location',
  Photos = 'photos',
}

// ---------------------------------------------------------------------------
// Request types
// ---------------------------------------------------------------------------

/** Base fields included with every AI assist request. */
interface AiListingAssistRequestBase {
  /** The draft listing the user is working on. */
  draft: Partial<ListingDraft>;
  /**
   * Optional free-text hint from the user, e.g. "I want to sell a broken fridge".
   * Used by some suggestion types to improve relevance.
   */
  userHint?: string;
}

/** Request to generate a listing title. */
export interface AiGenerateTitleRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.GenerateTitle;
}

/** Request to improve/rewrite the listing description. */
export interface AiImproveDescriptionRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.ImproveDescription;
}

/** Request to suggest the most relevant category for the draft. */
export interface AiSuggestCategoryRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.SuggestCategory;
}

/** Request to suggest a listing purpose if the user is unsure. */
export interface AiSuggestPurposeRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.SuggestPurpose;
}

/** Request to suggest a condition classification. */
export interface AiSuggestConditionRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.SuggestCondition;
}

/** Request to detect missing or weak fields in the draft. */
export interface AiDetectMissingInfoRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.DetectMissingInfo;
}

/** Request to apply a full "improve my listing" pass across all fields. */
export interface AiImproveListingRequest extends AiListingAssistRequestBase {
  type: AiSuggestionType.ImproveListing;
}

/** Discriminated union of all AI assist request types. */
export type AiListingAssistRequest =
  | AiGenerateTitleRequest
  | AiImproveDescriptionRequest
  | AiSuggestCategoryRequest
  | AiSuggestPurposeRequest
  | AiSuggestConditionRequest
  | AiDetectMissingInfoRequest
  | AiImproveListingRequest;

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

/** Base fields included in every AI assist response. */
interface AiListingAssistResponseBase {
  type: AiSuggestionType;
  /** Whether the AI call actually ran (false when placeholder/mock mode is active). */
  isPlaceholder: boolean;
  /** Human-readable explanation of the suggestion, shown to the user. */
  rationale?: string;
  /** ISO timestamp of when the suggestion was generated. */
  generatedAt: string;
}

/** Response containing a generated title. */
export interface AiGenerateTitleResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.GenerateTitle;
  suggestedTitle: string;
}

/** Response containing an improved description. */
export interface AiImproveDescriptionResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.ImproveDescription;
  suggestedDescription: string;
}

/** Response containing a suggested category. */
export interface AiSuggestCategoryResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.SuggestCategory;
  suggestedCategory: ListingCategory;
  confidence: 'low' | 'medium' | 'high';
}

/** Response containing a suggested listing purpose. */
export interface AiSuggestPurposeResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.SuggestPurpose;
  suggestedPurpose: ListingPurpose;
  confidence: 'low' | 'medium' | 'high';
}

/** Response containing a suggested condition. */
export interface AiSuggestConditionResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.SuggestCondition;
  suggestedCondition: ListingCondition;
}

/** Response listing missing or weak fields. */
export interface AiDetectMissingInfoResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.DetectMissingInfo;
  missingFields: MissingListingField[];
  /** Short human-readable tip per missing field, keyed by MissingListingField value. */
  fieldTips: Partial<Record<MissingListingField, string>>;
}

/**
 * Placeholder type for a full listing improvement result.
 * TODO: Expand when full AI backend is wired up.
 */
export interface ListingImprovementResult {
  suggestedTitle?: string;
  suggestedDescription?: string;
  suggestedCategory?: ListingCategory;
  suggestedPurpose?: ListingPurpose;
  suggestedCondition?: ListingCondition;
  missingFields?: MissingListingField[];
  /** Any additional improvement notes from the AI. */
  notes?: string;
}

/** Response containing a full listing improvement result. */
export interface AiImproveListingResponse extends AiListingAssistResponseBase {
  type: AiSuggestionType.ImproveListing;
  result: ListingImprovementResult;
}

/** Discriminated union of all AI assist response types. */
export type AiListingAssistResponse =
  | AiGenerateTitleResponse
  | AiImproveDescriptionResponse
  | AiSuggestCategoryResponse
  | AiSuggestPurposeResponse
  | AiSuggestConditionResponse
  | AiDetectMissingInfoResponse
  | AiImproveListingResponse;

// ---------------------------------------------------------------------------
// UI state helper
// ---------------------------------------------------------------------------

/**
 * Tracks the current UI state for a specific AI suggestion type.
 * Used in web components to show placeholder / loading / error / success states.
 */
export interface AiAssistUiState {
  type: AiSuggestionType;
  state: AiSuggestionState;
  /** The last successful response, if any. */
  response?: AiListingAssistResponse;
  /** Error message to display when state === 'error'. */
  errorMessage?: string;
}
