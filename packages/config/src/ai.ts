/**
 * AI feature flags and constants for EK Marketplace.
 * MVP-level only — no real AI backend wired up yet.
 *
 * TODO: Replace feature flags with environment-driven config when AI backend is live.
 */

import { AiSuggestionType, MissingListingField } from '@ek-marketplace/types';

// ---------------------------------------------------------------------------
// Feature flags
// ---------------------------------------------------------------------------

/**
 * Master switch for all AI listing assist features.
 * Set to false to disable all AI UI elements without code changes.
 *
 * TODO: Drive this from an environment variable / remote config in production.
 */
export const AI_LISTING_ASSIST_ENABLED = true;

/** Per-suggestion-type feature flags. All default to true (visible in UI) but placeholders. */
export const AI_SUGGESTION_FLAGS: Record<AiSuggestionType, boolean> = {
  [AiSuggestionType.GenerateTitle]: true,
  [AiSuggestionType.ImproveDescription]: true,
  [AiSuggestionType.SuggestCategory]: true,
  [AiSuggestionType.SuggestPurpose]: true,
  [AiSuggestionType.SuggestCondition]: true,
  [AiSuggestionType.DetectMissingInfo]: true,
  [AiSuggestionType.ImproveListing]: true,
};

// ---------------------------------------------------------------------------
// Supported AI suggestion actions
// ---------------------------------------------------------------------------

/** Human-readable labels and descriptions for each AI suggestion action. */
export const AI_SUGGESTION_ACTIONS: Record<
  AiSuggestionType,
  { label: string; description: string; ctaLabel: string }
> = {
  [AiSuggestionType.GenerateTitle]: {
    label: 'Generate Title',
    description: 'Let AI suggest a clear, keyword-rich title for your listing.',
    ctaLabel: 'Suggest a title',
  },
  [AiSuggestionType.ImproveDescription]: {
    label: 'Improve Description',
    description: 'Let AI rewrite or improve your description to be more compelling.',
    ctaLabel: 'Improve my description',
  },
  [AiSuggestionType.SuggestCategory]: {
    label: 'Suggest Category',
    description: 'Not sure which category fits? Let AI choose the best one.',
    ctaLabel: 'Suggest category',
  },
  [AiSuggestionType.SuggestPurpose]: {
    label: 'Suggest Purpose',
    description: 'Let AI identify the right listing purpose from your draft.',
    ctaLabel: 'Help me choose',
  },
  [AiSuggestionType.SuggestCondition]: {
    label: 'Suggest Condition',
    description: 'Let AI suggest the appropriate condition based on your description.',
    ctaLabel: 'Suggest condition',
  },
  [AiSuggestionType.DetectMissingInfo]: {
    label: 'Check for Missing Info',
    description: 'Let AI flag any important details that are missing from your listing.',
    ctaLabel: 'Check my listing',
  },
  [AiSuggestionType.ImproveListing]: {
    label: 'Improve My Listing',
    description: 'Run a full AI review of your draft and get improvement suggestions.',
    ctaLabel: 'Improve my listing',
  },
};

// ---------------------------------------------------------------------------
// MVP usage limits (placeholder)
// ---------------------------------------------------------------------------

/**
 * Maximum number of AI suggestion requests per posting session.
 * This is a soft placeholder — no enforcement logic is implemented yet.
 *
 * TODO: Enforce rate limiting and per-plan quotas when AI backend is live.
 */
export const AI_ASSIST_SESSION_LIMIT = 10;

/**
 * Minimum number of characters in the draft description before AI features activate.
 * Prevents triggering AI on empty or near-empty drafts.
 */
export const AI_ASSIST_MIN_DESCRIPTION_LENGTH = 20;

/**
 * Minimum number of characters in the draft title before AI improvement features activate.
 */
export const AI_ASSIST_MIN_TITLE_LENGTH = 5;

// ---------------------------------------------------------------------------
// Safe fallback messages
// ---------------------------------------------------------------------------

/**
 * Safe fallback messages shown to the user when the AI is unavailable or
 * when placeholder mode is active.
 *
 * IMPORTANT: These must never imply AI is live when only placeholder stubs exist.
 */
export const AI_FALLBACK_MESSAGES: Record<AiSuggestionType, string> = {
  [AiSuggestionType.GenerateTitle]:
    'AI title generation is not available right now. Please write your own title.',
  [AiSuggestionType.ImproveDescription]:
    'AI description improvement is not available right now. Please review your description manually.',
  [AiSuggestionType.SuggestCategory]:
    'AI category suggestion is not available right now. Please choose a category from the list.',
  [AiSuggestionType.SuggestPurpose]:
    'AI purpose suggestion is not available right now. Please choose a listing purpose from the list.',
  [AiSuggestionType.SuggestCondition]:
    'AI condition suggestion is not available right now. Please select the condition that best describes your item.',
  [AiSuggestionType.DetectMissingInfo]:
    'AI listing review is not available right now. Please check your listing manually before submitting.',
  [AiSuggestionType.ImproveListing]:
    'AI listing improvement is not available right now. Please review your listing manually.',
};

/**
 * Generic error message shown when an AI request fails unexpectedly.
 */
export const AI_GENERIC_ERROR_MESSAGE =
  'Something went wrong with the AI assistant. Your listing is not affected — please continue manually.';

/**
 * Placeholder banner message shown when AI features are present in the UI but
 * the backend is not yet wired up.
 *
 * TODO: Remove this once real AI endpoints are live.
 */
export const AI_PLACEHOLDER_BANNER =
  'AI assist features are coming soon. The buttons below are shown as a preview of the posting experience.';

// ---------------------------------------------------------------------------
// Missing field tip copy
// ---------------------------------------------------------------------------

/** Default tip messages for each missing or weak listing field. */
export const MISSING_FIELD_TIPS: Record<MissingListingField, string> = {
  [MissingListingField.Title]: 'Add a clear, descriptive title to help buyers find your listing.',
  [MissingListingField.Description]:
    'Include key details like brand, model, age, and any known issues.',
  [MissingListingField.Category]: 'Choose the most relevant category for your item.',
  [MissingListingField.Purpose]: 'Make sure you have selected a listing purpose.',
  [MissingListingField.Condition]: 'Specify the condition of the item honestly.',
  [MissingListingField.Price]: 'Add a price, or mark it as negotiable or free.',
  [MissingListingField.Location]: 'Adding your location helps local buyers find your listing.',
  [MissingListingField.Photos]: 'Listings with photos get significantly more interest.',
};
