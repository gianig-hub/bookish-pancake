/**
 * /post – Posting flow page
 * Renders the PostingFlow wizard.
 * TODO: require authentication before showing this page.
 */
import React from 'react';
import PostingFlow from '../../components/posting/PostingFlow';

export default function PostPage() {
  return (
    <div className="page page--post">
      <PostingFlow />
    </div>
  );
}
