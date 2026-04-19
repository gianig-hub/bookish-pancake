/**
 * Step 7 – Upload Photos
 *
 * TODO: Implement real photo upload with cloud storage (S3/Cloudflare R2).
 * This is a placeholder UI only – no files are uploaded.
 */
import React from 'react';
import { POSTING_LIMITS } from '@ek/config';
import { StepProps } from '../types';

const StepUploadPhotos: React.FC<StepProps> = ({ onNext, onBack }) => {
  return (
    <div className="step step--photos">
      <h2>Add Photos</h2>

      <div className="photo-upload-placeholder">
        {/* TODO: Replace with a real drag-and-drop file uploader */}
        <div className="photo-upload-placeholder__inner">
          <span>📷</span>
          <p>Photo upload coming soon</p>
          <p className="field-hint">Up to {POSTING_LIMITS.MAX_PHOTOS} photos per listing.</p>
        </div>
      </div>

      <p className="field-hint">
        Good photos significantly increase enquiries. Aim for at least 3 clear images.
        {/* TODO: AI photo quality hint post-MVP */}
      </p>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onBack}>← Back</button>
        <button type="button" className="btn-next" onClick={onNext}>
          Continue (skip for now) →
        </button>
      </div>
    </div>
  );
};

export default StepUploadPhotos;
