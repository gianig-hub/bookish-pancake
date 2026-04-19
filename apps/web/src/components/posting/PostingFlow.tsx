/**
 * PostingFlow – orchestrates the 8-step listing creation wizard.
 *
 * State is kept local until final submission; a real implementation should
 * persist draft to the API on each step (TODO).
 */

import React, { useState } from 'react';
import { ListingDraft } from '@ek/types';
import { POSTING_STEPS } from '@ek/config';

import StepChoosePurpose from './steps/StepChoosePurpose';
import StepChooseCategory from './steps/StepChooseCategory';
import StepTitleDescription from './steps/StepTitleDescription';
import StepChooseCondition from './steps/StepChooseCondition';
import StepSetPrice from './steps/StepSetPrice';
import StepSetLocation from './steps/StepSetLocation';
import StepUploadPhotos from './steps/StepUploadPhotos';
import StepPreviewSubmit from './steps/StepPreviewSubmit';

const TOTAL_STEPS = POSTING_STEPS.length;

const PostingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<ListingDraft>({});

  const updateDraft = (partial: Partial<ListingDraft>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const stepProps = { draft, updateDraft, onNext: goNext, onBack: goBack };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepChoosePurpose {...stepProps} />;
      case 2: return <StepChooseCategory {...stepProps} />;
      case 3: return <StepTitleDescription {...stepProps} />;
      case 4: return <StepChooseCondition {...stepProps} />;
      case 5: return <StepSetPrice {...stepProps} />;
      case 6: return <StepSetLocation {...stepProps} />;
      case 7: return <StepUploadPhotos {...stepProps} />;
      case 8: return <StepPreviewSubmit {...stepProps} />;
      default: return null;
    }
  };

  const stepLabel = POSTING_STEPS[currentStep - 1]?.label ?? '';

  return (
    <div className="posting-flow">
      <header className="posting-flow__header">
        <p className="posting-flow__progress">
          Step {currentStep} of {TOTAL_STEPS} — {stepLabel}
        </p>
        <div className="posting-flow__progress-bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
          <div
            className="posting-flow__progress-fill"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </header>

      <main className="posting-flow__body">{renderStep()}</main>
    </div>
  );
};

export default PostingFlow;
