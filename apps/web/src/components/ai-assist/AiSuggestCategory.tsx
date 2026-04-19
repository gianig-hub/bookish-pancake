/**
 * AiSuggestCategory — AI category/purpose/condition suggestion component.
 *
 * Provides optional AI-driven suggestions for category, listing purpose,
 * and condition during the posting flow.
 *
 * Each suggestion is independent: the user can accept, retry, or ignore each one.
 *
 * TODO: Wire up API calls to /api/ai/listing-assist when backend is live.
 */

import React, { useState } from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import {
  AiSuggestionState,
  AiSuggestionType,
  ListingCategory,
  ListingCondition,
  ListingPurpose,
} from '@ek-marketplace/types';
import {
  AI_LISTING_ASSIST_ENABLED,
  AI_SUGGESTION_FLAGS,
  AI_SUGGESTION_ACTIONS,
  AI_GENERIC_ERROR_MESSAGE,
  AI_FALLBACK_MESSAGES,
  LISTING_CATEGORIES,
  LISTING_PURPOSES,
  LISTING_CONDITIONS,
} from '@ek-marketplace/config';
import { AiLoadingState, AiErrorState, AiSuccessState } from './AiAssistStates';

// ---------------------------------------------------------------------------
// Category suggestion
// ---------------------------------------------------------------------------

interface AiSuggestCategoryProps {
  draft: Partial<ListingDraft>;
  onApply: (category: ListingCategory) => void;
}

export function AiSuggestCategory({ draft, onApply }: AiSuggestCategoryProps) {
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [suggestion, setSuggestion] = useState<ListingCategory | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const type = AiSuggestionType.SuggestCategory;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) return null;

  async function handleRequest() {
    setState(AiSuggestionState.Loading);
    setSuggestion(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Placeholder: return existing category or first available
      const cat = draft.category ?? ListingCategory.RefrigerationParts;
      setSuggestion(cat);
      setState(AiSuggestionState.Success);
    } catch {
      setErrorMessage(AI_GENERIC_ERROR_MESSAGE);
      setState(AiSuggestionState.Error);
    }
  }

  if (state === AiSuggestionState.Loading) return <AiLoadingState type={type} />;
  if (state === AiSuggestionState.Error)
    return <AiErrorState type={type} message={errorMessage} onRetry={handleRequest} />;

  if (state === AiSuggestionState.Success && suggestion) {
    const label = LISTING_CATEGORIES[suggestion]?.label ?? suggestion;
    return (
      <div className="ai-suggest ai-suggest-category--success">
        <AiSuccessState
          type={type}
          confirmationMessage={`Suggested category: "${label}"`}
          onDismiss={() => setState(AiSuggestionState.Idle)}
        />
        <button type="button" onClick={() => { onApply(suggestion); setState(AiSuggestionState.Applied); }}>
          Use this category
        </button>
      </div>
    );
  }

  if (state === AiSuggestionState.Applied) {
    return (
      <AiSuccessState
        type={type}
        confirmationMessage="Category applied. You can change it any time."
        onDismiss={() => setState(AiSuggestionState.Idle)}
      />
    );
  }

  return (
    <button
      type="button"
      className="ai-suggest__cta-btn"
      onClick={handleRequest}
      aria-label={action.ctaLabel}
    >
      ✨ {action.ctaLabel}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Purpose suggestion
// ---------------------------------------------------------------------------

interface AiSuggestPurposeProps {
  draft: Partial<ListingDraft>;
  onApply: (purpose: ListingPurpose) => void;
}

export function AiSuggestPurpose({ draft, onApply }: AiSuggestPurposeProps) {
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [suggestion, setSuggestion] = useState<ListingPurpose | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const type = AiSuggestionType.SuggestPurpose;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) return null;

  async function handleRequest() {
    setState(AiSuggestionState.Loading);
    setSuggestion(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const purpose = draft.purpose ?? ListingPurpose.ForSale;
      setSuggestion(purpose);
      setState(AiSuggestionState.Success);
    } catch {
      setErrorMessage(AI_GENERIC_ERROR_MESSAGE);
      setState(AiSuggestionState.Error);
    }
  }

  if (state === AiSuggestionState.Loading) return <AiLoadingState type={type} />;
  if (state === AiSuggestionState.Error)
    return <AiErrorState type={type} message={errorMessage} onRetry={handleRequest} />;

  if (state === AiSuggestionState.Success && suggestion) {
    const label = LISTING_PURPOSES[suggestion]?.label ?? suggestion;
    return (
      <div className="ai-suggest ai-suggest-purpose--success">
        <AiSuccessState
          type={type}
          confirmationMessage={`Suggested purpose: "${label}"`}
          onDismiss={() => setState(AiSuggestionState.Idle)}
        />
        <button type="button" onClick={() => { onApply(suggestion); setState(AiSuggestionState.Applied); }}>
          Use this purpose
        </button>
      </div>
    );
  }

  if (state === AiSuggestionState.Applied) {
    return (
      <AiSuccessState
        type={type}
        confirmationMessage="Listing purpose applied."
        onDismiss={() => setState(AiSuggestionState.Idle)}
      />
    );
  }

  return (
    <button
      type="button"
      className="ai-suggest__cta-btn"
      onClick={handleRequest}
      aria-label={action.ctaLabel}
    >
      ✨ {action.ctaLabel}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Condition suggestion
// ---------------------------------------------------------------------------

interface AiSuggestConditionProps {
  draft: Partial<ListingDraft>;
  onApply: (condition: ListingCondition) => void;
}

export function AiSuggestCondition({ draft, onApply }: AiSuggestConditionProps) {
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [suggestion, setSuggestion] = useState<ListingCondition | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const type = AiSuggestionType.SuggestCondition;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) return null;

  async function handleRequest() {
    setState(AiSuggestionState.Loading);
    setSuggestion(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const condition = draft.condition ?? ListingCondition.UsedGood;
      setSuggestion(condition);
      setState(AiSuggestionState.Success);
    } catch {
      setErrorMessage(AI_GENERIC_ERROR_MESSAGE);
      setState(AiSuggestionState.Error);
    }
  }

  if (state === AiSuggestionState.Loading) return <AiLoadingState type={type} />;
  if (state === AiSuggestionState.Error)
    return <AiErrorState type={type} message={errorMessage} onRetry={handleRequest} />;

  if (state === AiSuggestionState.Success && suggestion) {
    const label = LISTING_CONDITIONS[suggestion]?.label ?? suggestion;
    return (
      <div className="ai-suggest ai-suggest-condition--success">
        <AiSuccessState
          type={type}
          confirmationMessage={`Suggested condition: "${label}"`}
          onDismiss={() => setState(AiSuggestionState.Idle)}
        />
        <button type="button" onClick={() => { onApply(suggestion); setState(AiSuggestionState.Applied); }}>
          Use this condition
        </button>
      </div>
    );
  }

  if (state === AiSuggestionState.Applied) {
    return (
      <AiSuccessState
        type={type}
        confirmationMessage="Condition applied."
        onDismiss={() => setState(AiSuggestionState.Idle)}
      />
    );
  }

  return (
    <button
      type="button"
      className="ai-suggest__cta-btn"
      onClick={handleRequest}
      aria-label={action.ctaLabel}
    >
      ✨ {action.ctaLabel}
    </button>
  );
}
