/**
 * Step 8 – Preview & Submit
 *
 * Shows a summary of the draft before final submission.
 * TODO: Wire up to POST /api/listings/draft endpoint.
 */
import React, { useState } from 'react';
import { ListingDraft } from '@ek/types';
import { PURPOSE_LABELS, CATEGORY_LABELS, CONDITION_LABELS } from '@ek/config';
import { StepProps } from '../types';

const formatPrice = (pence?: number): string => {
  if (pence === undefined) return '—';
  if (pence === 0) return 'Free / POA';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100);
};

interface PreviewRowProps {
  label: string;
  value?: string;
}

const PreviewRow: React.FC<PreviewRowProps> = ({ label, value }) => (
  <tr>
    <th scope="row">{label}</th>
    <td>{value ?? <span className="text-muted">—</span>}</td>
  </tr>
);

const StepPreviewSubmit: React.FC<StepProps> = ({ draft, onBack }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // TODO: replace with real API call: POST /api/listings/draft
      await simulateSubmit(draft);
      setSubmitted(true);
    } catch {
      setSubmitError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="step step--success">
        <h2>🎉 Listing Submitted!</h2>
        <p>Your listing has been submitted for review. You will receive a confirmation shortly.</p>
        {/* TODO: redirect to /my-listings */}
      </div>
    );
  }

  return (
    <div className="step step--preview">
      <h2>Preview your listing</h2>
      <p>Review the details below before submitting. You can go back to change anything.</p>

      <table className="preview-table">
        <tbody>
          <PreviewRow label="Purpose" value={draft.purpose ? PURPOSE_LABELS[draft.purpose] : undefined} />
          <PreviewRow label="Category" value={draft.category ? CATEGORY_LABELS[draft.category] : undefined} />
          <PreviewRow label="Title" value={draft.title} />
          <PreviewRow label="Description" value={draft.description} />
          {draft.condition && (
            <PreviewRow label="Condition" value={CONDITION_LABELS[draft.condition]} />
          )}
          <PreviewRow label="Price" value={formatPrice(draft.pricePence)} />
          {draft.negotiable && <PreviewRow label="Negotiable" value="Yes" />}
          <PreviewRow
            label="Location"
            value={draft.location ? [draft.location.city, draft.location.postcode].filter(Boolean).join(', ') : undefined}
          />
          <PreviewRow label="Photos" value="(none uploaded yet)" />
        </tbody>
      </table>

      {submitError && <p className="field-error">{submitError}</p>}

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onBack} disabled={submitting}>← Back</button>
        <button
          type="button"
          className="btn-submit"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Submit Listing'}
        </button>
      </div>

      <p className="field-hint">
        By submitting you agree to our Terms of Service and Listing Guidelines.
        {/* TODO: add links once pages exist */}
      </p>
    </div>
  );
};

/** Placeholder – remove once API integration is complete */
async function simulateSubmit(_draft: ListingDraft): Promise<void> {
  // TODO: replace with: await fetch('/api/listings/draft', { method: 'POST', body: JSON.stringify(_draft) })
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export default StepPreviewSubmit;
