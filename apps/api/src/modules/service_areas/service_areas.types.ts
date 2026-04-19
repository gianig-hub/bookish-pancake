/**
 * apps/api/src/modules/service_areas/service_areas.types.ts
 * Server-side types for the service_areas module.
 *
 * TODO: extend with geolocation (lat/lng, radius) once location services are available.
 */

/** A persisted service area linked to a business profile. */
export interface ServiceArea {
  id: string;
  businessProfileId: string;
  label: string;
  slug: string;
  createdAt: Date;
}
