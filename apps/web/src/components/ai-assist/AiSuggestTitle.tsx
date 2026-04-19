/**
 * AiSuggestTitle — AI title generation component.
 *
 * Modular, optional component that can be inserted into the posting flow
 * title step. Shows a CTA button and handles loading/error/success states.
 *
 * The AI is NOT mandatory — the user can ignore this component entirely.
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
} from '@ek-marketplace/config';
import {
  AiPlaceholderState,
  AiLoadingState,
  AiErrorState,
  AiSuccessState,
} from './AiAssistStates';

interface AiSuggestTitleProps {
  draft: Partial<ListingDraft>;
  /** Called when the user accepts the AI suggestion. */
  onApply: (title: string) => void;
}

export function AiSuggestTitle({ draft, onApply }: AiSuggestTitleProps) {
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const type = AiSuggestionType.GenerateTitle;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) {
    return null;
  }

  async function handleRequest() {
    setState(AiSuggestionState.Loading);
    setSuggestion(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call to POST /api/ai/listing-assist
      // const response = await fetch('/api/ai/listing-assist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, draft }),
      // });
      // const data: AiGenerateTitleResponse = await response.json();
      // setSuggestion(data.suggestedTitle);

      // Placeholder: simulate async latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      const placeholderTitle = AI_FALLBACK_MESSAGES[type];
      setSuggestion(placeholderTitle);
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
      <div className="ai-suggest-title ai-suggest-title--success">
        <AiSuccessState
          type={type}
          confirmationMessage={`Suggested: "${suggestion}"`}
          onDismiss={handleDismiss}
        />
        <div className="ai-suggest-title__actions">
          <button
            type="button"
            className="ai-suggest-title__apply-btn"
            onClick={handleApply}
            aria-label="Apply suggested title"
          >
            Use this title
          </button>
          <button
            type="button"
            className="ai-suggest-title__retry-btn"
            onClick={handleRequest}
            aria-label="Get another suggestion"
          >
            Try another
          </button>
        </div>
      </div>
    );
  }

  if (state === AiSuggestionState.Applied) {
    return (
      <AiSuccessState
        type={type}
        confirmationMessage="AI title applied. You can edit it in the field above."
        onDismiss={handleDismiss}
      />
    );
  }

  // Idle state — show the CTA
  return (
    <div className="ai-suggest-title ai-suggest-title--idle">
      <AiPlaceholderState type={type} />
      <button
        type="button"
        className="ai-suggest-title__cta-btn"
        onClick={handleRequest}
        disabled={!draft.category && !draft.description}
        aria-label={action.ctaLabel}
      >
        ✨ {action.ctaLabel}
      </button>
    </div>
  );
}
