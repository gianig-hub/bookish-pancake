/**
 * apps/api/src/modules/service_areas/service_areas.service.ts
 * Service area CRUD — MVP shell with in-memory store.
 *
 * TODO: replace with DB repository.
 * TODO: validate slugs against the canonical SERVICE_AREA_OPTIONS list.
 */

import type { ServiceArea } from './service_areas.types';

const store = new Map<string, ServiceArea>();

function generateId(): string {
  return `sa_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const ServiceAreasService = {
  async findByProfileId(businessProfileId: string): Promise<ServiceArea[]> {
    return Array.from(store.values()).filter(
      (a) => a.businessProfileId === businessProfileId,
    );
  },

  async set(
    businessProfileId: string,
    areas: Array<{ label: string; slug: string }>,
  ): Promise<ServiceArea[]> {
    // Replace all existing areas for this profile
    for (const [id, area] of store.entries()) {
      if (area.businessProfileId === businessProfileId) {
        store.delete(id);
      }
    }

    const created = areas.map((area) => {
      const id = generateId();
      const record: ServiceArea = {
        id,
        businessProfileId,
        label: area.label,
        slug: area.slug,
        createdAt: new Date(),
      };
      store.set(id, record);
      return record;
    });

    return created;
  },
};
