/**
 * apps/api/src/modules/business_profiles/business_profiles.service.ts
 * Business profile CRUD service — MVP shell with in-memory store.
 *
 * TODO: replace in-memory store with DB repository.
 * TODO: enforce one-profile-per-business constraint at DB level.
 * TODO: validate businessId exists in the businesses table.
 */

import type {
  BusinessProfile,
  CreateBusinessProfileDto,
  UpdateBusinessProfileDto,
} from './business_profiles.types';

const store = new Map<string, BusinessProfile>();

function generateId(): string {
  return `bp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const BusinessProfilesService = {
  async create(dto: CreateBusinessProfileDto): Promise<BusinessProfile> {
    const id = generateId();
    const profile: BusinessProfile = {
      id,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...dto,
    };
    store.set(id, profile);
    return profile;
  },

  async findById(id: string): Promise<BusinessProfile | undefined> {
    return store.get(id);
  },

  async findByBusinessId(businessId: string): Promise<BusinessProfile | undefined> {
    return Array.from(store.values()).find((p) => p.businessId === businessId);
  },

  async update(id: string, dto: UpdateBusinessProfileDto): Promise<BusinessProfile | undefined> {
    const existing = store.get(id);
    if (!existing) return undefined;
    const updated: BusinessProfile = { ...existing, ...dto, updatedAt: new Date() };
    store.set(id, updated);
    return updated;
  },

  async publish(id: string): Promise<BusinessProfile | undefined> {
    // TODO: run completion checks before publishing
    return this.update(id, { published: true });
  },

  async unpublish(id: string): Promise<BusinessProfile | undefined> {
    return this.update(id, { published: false });
  },
};
