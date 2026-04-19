/**
 * PostingFlow — main entry point for the multi-step listing creation flow.
 *
 * Renders each step sequentially and injects optional AI assist components
 * at the appropriate points.
 *
 * AI assistance is modular and optional: the user can complete the entire
 * posting flow without interacting with any AI components.
 *
 * TODO: Add form validation before allowing step progression.
 * TODO: Add draft auto-save to localStorage or API.
 * TODO: Add photo upload in the photos step.
 * TODO: Wire submit to the real listings API.
 */

import React from 'react';
import { usePostingFlow, POSTING_STEPS, STEP_LABELS } from '../../hooks/usePostingFlow';
import { StepPurpose } from './StepPurpose';
import { StepCategory } from './StepCategory';
import { StepDetails } from './StepDetails';
import { StepCondition } from './StepCondition';
import { StepPreview } from './StepPreview';

/**
 * Simple step indicator showing progress through the posting flow.
 */
function StepIndicator({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="posting-flow__step-indicator" aria-label={`Step ${currentIndex + 1} of ${total}`}>
      {POSTING_STEPS.map((step, idx) => (
        <div
          key={step}
          className={[
            'posting-flow__step-pip',
            idx < currentIndex ? 'posting-flow__step-pip--done' : '',
            idx === currentIndex ? 'posting-flow__step-pip--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-current={idx === currentIndex ? 'step' : undefined}
          title={STEP_LABELS[step]}
        />
      ))}
      <span className="posting-flow__step-label">
        {STEP_LABELS[POSTING_STEPS[currentIndex]]}
      </span>
    </div>
  );
}

/**
 * Navigation buttons shared across all steps.
 */
function StepNavigation({
  isFirst,
  isLast,
  onBack,
  onNext,
  onSubmit,
}: {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="posting-flow__navigation">
      {!isFirst && (
        <button type="button" className="posting-flow__back-btn" onClick={onBack}>
          ← Back
        </button>
      )}
      {!isLast && (
        <button type="button" className="posting-flow__next-btn" onClick={onNext}>
          Next →
        </button>
      )}
      {isLast && (
        <button type="button" className="posting-flow__submit-btn" onClick={onSubmit}>
          Submit Listing
        </button>
      )}
    </div>
  );
}

export function PostingFlow() {
  const {
    draft,
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    updateDraft,
    applyAiImprovement,
    goNext,
    goBack,
  } = usePostingFlow();

  function handleSubmit() {
    // TODO: Validate draft completeness before submitting.
    // TODO: POST to /api/listings/draft or /api/listings/submit.
    // TODO: Show success page or redirect to listing detail.
    alert('Listing submission is not yet implemented. Draft: ' + JSON.stringify(draft, null, 2));
  }

  return (
    <div className="posting-flow">
      <h1 className="posting-flow__title">Post a Listing</h1>

      <StepIndicator currentIndex={currentStepIndex} total={totalSteps} />

      <div className="posting-flow__step-content">
        {currentStep === 'purpose' && (
          <StepPurpose
            draft={draft}
            onUpdate={updateDraft}
          />
        )}

        {currentStep === 'category' && (
          <StepCategory
            draft={draft}
            onUpdate={updateDraft}
          />
        )}

        {currentStep === 'details' && (
          <StepDetails
            draft={draft}
            onUpdate={updateDraft}
          />
        )}

        {currentStep === 'condition' && (
          <StepCondition
            draft={draft}
            onUpdate={updateDraft}
          />
        )}

        {currentStep === 'price' && (
          <div className="posting-flow__step">
            <h2>Set Your Price</h2>
            <label htmlFor="price">Price (£)</label>
            <input
              id="price"
              type="number"
              min={0}
              value={draft.priceGbp ?? ''}
              onChange={(e) =>
                updateDraft({ priceGbp: e.target.value ? Number(e.target.value) : undefined })
              }
              placeholder="e.g. 250"
            />
            <label>
              <input
                type="checkbox"
                checked={draft.negotiable ?? false}
                onChange={(e) => updateDraft({ negotiable: e.target.checked })}
              />
              {' '}Negotiable
            </label>
          </div>
        )}

        {currentStep === 'location' && (
          <div className="posting-flow__step">
            <h2>Location</h2>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={draft.location?.city ?? ''}
              onChange={(e) =>
                updateDraft({ location: { ...draft.location, city: e.target.value } })
              }
              placeholder="e.g. Manchester"
            />
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              type="text"
              value={draft.location?.postcode ?? ''}
              onChange={(e) =>
                updateDraft({ location: { ...draft.location, postcode: e.target.value } })
              }
              placeholder="e.g. M1 1AA"
            />
          </div>
        )}

        {currentStep === 'photos' && (
          <div className="posting-flow__step">
            <h2>Add Photos</h2>
            <p className="posting-flow__placeholder-note">
              {/* TODO: Implement photo upload. */}
              Photo upload is not yet available. You can add photos after your listing is created.
            </p>
          </div>
        )}

        {currentStep === 'preview' && (
          <StepPreview
            draft={draft}
            onApplyAiImprovement={applyAiImprovement}
          />
        )}
      </div>

      <StepNavigation
        isFirst={isFirstStep}
        isLast={isLastStep}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
