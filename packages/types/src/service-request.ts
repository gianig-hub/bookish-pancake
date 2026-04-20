/**
 * Service Request Types — EK Marketplace MVP
 * Covers: categories, urgency, status, draft, and lead types
 * TODO: Extend with full validation, DB-backed fields, and AI-assist fields when ready
 */

// ─── Service Request Category ─────────────────────────────────────────────────

export type ServiceRequestCategory =
  | 'air_conditioning'
  | 'refrigeration'
  | 'cold_rooms'
  | 'freezer_rooms'
  | 'maintenance_contracts'
  | 'emergency_repair'
  | 'design_upgrades';

// ─── Service Urgency ──────────────────────────────────────────────────────────

export type ServiceUrgency = 'low' | 'normal' | 'urgent' | 'emergency';

// ─── Service Request Status ───────────────────────────────────────────────────

export type ServiceRequestStatus =
  | 'new'
  | 'viewed'
  | 'contacted'
  | 'closed'
  | 'archived';

// ─── Service Request Draft ────────────────────────────────────────────────────

/**
 * Represents a service request being composed by a requester (buyer/user).
 * All fields are optional at draft stage; validation happens on submit.
 * TODO: Add location/postcode field when geo-search is ready
 * TODO: Add photo/attachment support when file storage is wired up
 * TODO: Add AI-suggestion fields (suggestedCategory, aiTitle) when AI assist is live
 */
export interface ServiceRequestDraft {
  /** Unique draft ID — generated client-side or server-assigned on save */
  id?: string;

  /** The main category of the service being requested */
  category?: ServiceRequestCategory;

  /** Brief title/summary of the request */
  title?: string;

  /** Full description of what the requester needs */
  description?: string;

  /** How quickly the requester needs the service */
  urgency?: ServiceUrgency;

  /** Preferred contact method — placeholder, TODO: connect to messaging */
  preferredContact?: 'phone' | 'email' | 'message';

  /** Requester's name — may be prefilled from account */
  contactName?: string;

  /** Requester's phone number */
  contactPhone?: string;

  /** Requester's email address */
  contactEmail?: string;

  /** General location/area for the service */
  location?: string;

  /** Postcode for matching — TODO: validate and geo-index */
  postcode?: string;

  /** Approximate budget — optional, free-text for MVP */
  budgetHint?: string;

  /** Whether the requester wants to be anonymous to businesses */
  anonymous?: boolean;

  /** ISO timestamp when the draft was last modified */
  updatedAt?: string;
}

// ─── Submitted Service Request ────────────────────────────────────────────────

/**
 * A fully submitted service request stored in the system.
 * Extends the draft with server-assigned fields.
 * TODO: Replace string IDs with proper UUID/DB references
 */
export interface ServiceRequest extends Required<Pick<ServiceRequestDraft, 'category' | 'title' | 'description' | 'urgency'>> {
  id: string;
  requesterId: string;

  /** Fields from draft that remain optional even on submission */
  preferredContact?: ServiceRequestDraft['preferredContact'];
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  location?: string;
  postcode?: string;
  budgetHint?: string;
  anonymous?: boolean;

  status: ServiceRequestStatus;

  /** ISO timestamps */
  createdAt: string;
  updatedAt: string;
}
