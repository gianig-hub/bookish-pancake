/**
 * AiAssistStates — reusable UI state components for AI assist features.
 *
 * Renders placeholder, loading, error, and success states.
 * These are intentionally simple and styled with inline classes so they
 * work without a full design system dependency.
 *
 * TODO: Replace with a proper component library / design system when available.
 */

import React from 'react';
import type { AiSuggestionType } from '@ek-marketplace/types';
import { AI_SUGGESTION_ACTIONS, AI_PLACEHOLDER_BANNER } from '@ek-marketplace/config';

// ---------------------------------------------------------------------------
// Placeholder state
// ---------------------------------------------------------------------------

interface AiPlaceholderStateProps {
  type: AiSuggestionType;
}

/**
 * Shown when AI features are present in the UI but the backend is not yet live.
 * Clearly communicates to the user that this is a preview/coming-soon feature.
 */
export function AiPlaceholderState({ type }: AiPlaceholderStateProps) {
  const action = AI_SUGGESTION_ACTIONS[type];
  return (
    <div className="ai-state ai-state--placeholder" role="status" aria-live="polite">
      <span className="ai-state__icon" aria-hidden="true">🤖</span>
      <span className="ai-state__label">{action.label}</span>
      <p className="ai-state__message">{AI_PLACEHOLDER_BANNER}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

interface AiLoadingStateProps {
  type: AiSuggestionType;
}

/** Shown while an AI request is in flight. */
export function AiLoadingState({ type }: AiLoadingStateProps) {
  const action = AI_SUGGESTION_ACTIONS[type];
  return (
    <div className="ai-state ai-state--loading" role="status" aria-live="polite" aria-busy="true">
      <span className="ai-state__spinner" aria-hidden="true">⏳</span>
      <span className="ai-state__label">{action.label}</span>
      <p className="ai-state__message">AI is working on it…</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

interface AiErrorStateProps {
  type: AiSuggestionType;
  message: string;
  onRetry?: () => void;
}

/** Shown when an AI request fails. */
export function AiErrorState({ type, message, onRetry }: AiErrorStateProps) {
  const action = AI_SUGGESTION_ACTIONS[type];
  return (
    <div className="ai-state ai-state--error" role="alert" aria-live="assertive">
      <span className="ai-state__icon" aria-hidden="true">⚠️</span>
      <span className="ai-state__label">{action.label}</span>
      <p className="ai-state__message">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="ai-state__retry-btn"
          onClick={onRetry}
          aria-label={`Retry ${action.label}`}
        >
          Try again
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

interface AiSuccessStateProps {
  type: AiSuggestionType;
  /** Short confirmation message, e.g. "Title applied." */
  confirmationMessage?: string;
  onDismiss?: () => void;
}

/** Shown briefly after a suggestion has been applied. */
export function AiSuccessState({ type, confirmationMessage, onDismiss }: AiSuccessStateProps) {
  const action = AI_SUGGESTION_ACTIONS[type];
  return (
    <div className="ai-state ai-state--success" role="status" aria-live="polite">
      <span className="ai-state__icon" aria-hidden="true">✅</span>
      <span className="ai-state__label">{action.label}</span>
      <p className="ai-state__message">
        {confirmationMessage ?? 'Suggestion applied. You can edit it any time.'}
      </p>
      {onDismiss && (
        <button
          type="button"
          className="ai-state__dismiss-btn"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
