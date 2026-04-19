/**
 * AiImproveDescription — AI description improvement component.
 *
 * Modular, optional component for the description step of the posting flow.
 * Non-mandatory: the user can write their description without using AI.
 *
 * TODO: Wire up the API call to /api/ai/listing-assist when backend is live.
 */

import React, { useState } from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { AiSuggestionState, AiSuggestionType } from '@ek-marketplace/types';
import {
  AI_LISTING_ASSIST_ENABLED,
  AI_SUGGESTION_FLAGS,
  AI_SUGGESTION_ACTIONS,
  AI_GENERIC_ERROR_MESSAGE,
  AI_FALLBACK_MESSAGES,
  AI_ASSIST_MIN_DESCRIPTION_LENGTH,
} from '@ek-marketplace/config';
import {
  AiLoadingState,
  AiErrorState,
  AiSuccessState,
} from './AiAssistStates';

interface AiImproveDescriptionProps {
  draft: Partial<ListingDraft>;
  /** Called when the user accepts the improved description. */
  onApply: (description: string) => void;
}

export function AiImproveDescription({ draft, onApply }: AiImproveDescriptionProps) {
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const type = AiSuggestionType.ImproveDescription;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) {
    return null;
  }

  const descriptionLength = draft.description?.length ?? 0;
  const isTooShort = descriptionLength < AI_ASSIST_MIN_DESCRIPTION_LENGTH;

  async function handleRequest() {
    setState(AiSuggestionState.Loading);
    setSuggestion(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call to POST /api/ai/listing-assist
      await new Promise((resolve) => setTimeout(resolve, 700));

      const placeholderText = draft.description ?? AI_FALLBACK_MESSAGES[type];
      setSuggestion(placeholderText);
      setState(AiSuggestionState.Success);
    } catch {
      setErrorMessage(AI_GENERIC_ERROR_MESSAGE);
      setState(AiSuggestionState.Error);
    }
  }

  function handleApply() {
    if (suggestion) {
      onApply(suggestion);
      setState(AiSuggestionState.Applied);
    }
  }

  function handleDismiss() {
    setState(AiSuggestionState.Idle);
    setSuggestion(null);
  }

  if (state === AiSuggestionState.Loading) {
    return <AiLoadingState type={type} />;
  }

  if (state === AiSuggestionState.Error) {
    return (
      <AiErrorState
        type={type}
        message={errorMessage}
        onRetry={handleRequest}
      />
    );
  }

  if (state === AiSuggestionState.Success && suggestion) {
    return (
      <div className="ai-improve-description ai-improve-description--success">
        <AiSuccessState
          type={type}
          confirmationMessage="AI suggestion ready. Review it below before applying."
          onDismiss={handleDismiss}
        />
        <pre className="ai-improve-description__preview">{suggestion}</pre>
        <div className="ai-improve-description__actions">
          <button
            type="button"
            className="ai-improve-description__apply-btn"
            onClick={handleApply}
          >
            Use this description
          </button>
          <button
            type="button"
            className="ai-improve-description__retry-btn"
            onClick={handleRequest}
          >
            Try again
          </button>
          <button
            type="button"
            className="ai-improve-description__dismiss-btn"
            onClick={handleDismiss}
          >
            Keep mine
          </button>
        </div>
      </div>
    );
  }

  if (state === AiSuggestionState.Applied) {
    return (
      <AiSuccessState
        type={type}
        confirmationMessage="AI description applied. You can still edit it freely."
        onDismiss={handleDismiss}
      />
    );
  }

  // Idle state
  return (
    <div className="ai-improve-description ai-improve-description--idle">
      <button
        type="button"
        className="ai-improve-description__cta-btn"
        onClick={handleRequest}
        disabled={isTooShort}
        title={
          isTooShort
            ? `Add at least ${AI_ASSIST_MIN_DESCRIPTION_LENGTH} characters before using AI improvement`
            : undefined
        }
        aria-label={action.ctaLabel}
      >
        ✨ {action.ctaLabel}
      </button>
      {isTooShort && (
        <p className="ai-improve-description__hint">
          Add more to your description to unlock AI improvement.
        </p>
      )}
    </div>
  );
}
