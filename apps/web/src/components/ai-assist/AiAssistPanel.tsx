/**
 * AiAssistPanel — the "Improve my listing" action panel.
 *
 * A collapsible panel that sits inside the posting flow preview/submit step.
 * The user can run a full AI review of their draft and act on the suggestions.
 *
 * This component is optional. The user can submit their listing without ever
 * opening or interacting with it.
 *
 * TODO: Wire up the API call to /api/ai/listing-assist when backend is live.
 */

import React, { useState } from 'react';
import type { ListingDraft, ListingImprovementResult } from '@ek-marketplace/types';
import { AiSuggestionState, AiSuggestionType } from '@ek-marketplace/types';
import {
  AI_LISTING_ASSIST_ENABLED,
  AI_SUGGESTION_FLAGS,
  AI_SUGGESTION_ACTIONS,
  AI_GENERIC_ERROR_MESSAGE,
  AI_PLACEHOLDER_BANNER,
} from '@ek-marketplace/config';
import { AiLoadingState, AiErrorState } from './AiAssistStates';
import { AiDetectMissing } from './AiDetectMissing';

interface AiAssistPanelProps {
  draft: Partial<ListingDraft>;
  /** Called when the user accepts an improvement result. */
  onApplyImprovement: (result: ListingImprovementResult) => void;
}

export function AiAssistPanel({ draft, onApplyImprovement }: AiAssistPanelProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<AiSuggestionState>(AiSuggestionState.Idle);
  const [result, setResult] = useState<ListingImprovementResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const type = AiSuggestionType.ImproveListing;
  const action = AI_SUGGESTION_ACTIONS[type];

  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[type]) {
    return null;
  }

  async function handleImprove() {
    setState(AiSuggestionState.Loading);
    setResult(null);
    setErrorMessage('');

    try {
      // TODO: Replace with real API call to POST /api/ai/listing-assist
      // const response = await fetch('/api/ai/listing-assist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type: AiSuggestionType.ImproveListing, draft }),
      // });
      // const data: AiImproveListingResponse = await response.json();
      // setResult(data.result);

      // Placeholder: simulate async latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Return an empty improvement result (placeholder mode)
      const placeholderResult: ListingImprovementResult = {
        notes: AI_PLACEHOLDER_BANNER,
      };
      setResult(placeholderResult);
      setState(AiSuggestionState.Success);
    } catch {
      setErrorMessage(AI_GENERIC_ERROR_MESSAGE);
      setState(AiSuggestionState.Error);
    }
  }

  function handleApply() {
    if (result) {
      onApplyImprovement(result);
      setState(AiSuggestionState.Applied);
    }
  }

  return (
    <div className="ai-assist-panel">
      <button
        type="button"
        className="ai-assist-panel__toggle-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="ai-assist-panel-content"
      >
        ✨ AI Listing Assistant {open ? '▲' : '▼'}
      </button>

      {open && (
        <div id="ai-assist-panel-content" className="ai-assist-panel__content">
          {/* Always show the live missing-field checker */}
          <AiDetectMissing draft={draft} />

          <hr className="ai-assist-panel__divider" />

          {state === AiSuggestionState.Idle && (
            <div className="ai-assist-panel__idle">
              <p className="ai-assist-panel__description">{action.description}</p>
              <p className="ai-assist-panel__disclaimer" aria-label="AI disclaimer">
                ⚠️ AI suggestions are optional. Always review before applying.
                No content is published automatically.
              </p>
              <button
                type="button"
                className="ai-assist-panel__cta-btn"
                onClick={handleImprove}
                aria-label={action.ctaLabel}
              >
                ✨ {action.ctaLabel}
              </button>
            </div>
          )}

          {state === AiSuggestionState.Loading && <AiLoadingState type={type} />}

          {state === AiSuggestionState.Error && (
            <AiErrorState type={type} message={errorMessage} onRetry={handleImprove} />
          )}

          {state === AiSuggestionState.Success && result && (
            <div className="ai-assist-panel__result">
              {result.notes && (
                <p className="ai-assist-panel__notes">{result.notes}</p>
              )}
              {result.suggestedTitle && (
                <p>
                  <strong>Suggested title:</strong> {result.suggestedTitle}
                </p>
              )}
              {result.suggestedDescription && (
                <p>
                  <strong>Suggested description:</strong> {result.suggestedDescription}
                </p>
              )}
              {result.missingFields && result.missingFields.length > 0 && (
                <p>
                  <strong>Missing fields:</strong>{' '}
                  {result.missingFields.join(', ')}
                </p>
              )}
              <div className="ai-assist-panel__result-actions">
                <button
                  type="button"
                  className="ai-assist-panel__apply-btn"
                  onClick={handleApply}
                >
                  Apply suggestions
                </button>
                <button
                  type="button"
                  className="ai-assist-panel__retry-btn"
                  onClick={handleImprove}
                >
                  Run again
                </button>
                <button
                  type="button"
                  className="ai-assist-panel__dismiss-btn"
                  onClick={() => setState(AiSuggestionState.Idle)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {state === AiSuggestionState.Applied && (
            <div className="ai-assist-panel__applied" role="status">
              <span aria-hidden="true">✅</span> Suggestions applied. Review your listing above
              before submitting.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
