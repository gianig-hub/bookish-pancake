/**
 * apps/api/src/modules/businesses/businesses.service.ts
 * Business CRUD service — MVP shell with in-memory store.
 *
 * TODO: replace in-memory store with repository/DB queries.
 * TODO: add slug generation, duplicate-name checks, and owner validation.
 */

import type { Business, CreateBusinessDto, UpdateBusinessDto } from './businesses.types';

/** Temporary in-memory store — NOT suitable for production. */
const store = new Map<string, Business>();

function generateId(): string {
  // TODO: use crypto.randomUUID() once Node 19+ is guaranteed, or import uuid
  return `biz_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const BusinessesService = {
  async create(ownerId: string, dto: CreateBusinessDto): Promise<Business> {
    const id = generateId();
    const business: Business = {
      id,
      ownerId,
      slug: toSlug(dto.businessName),
      verificationStatus: 'unverified',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...dto,
    };
    store.set(id, business);
    return business;
  },

  async findById(id: string): Promise<Business | undefined> {
    return store.get(id);
  },

  async findAll(): Promise<Business[]> {
    return Array.from(store.values());
  },

  async update(id: string, dto: UpdateBusinessDto): Promise<Business | undefined> {
    const existing = store.get(id);
    if (!existing) return undefined;
    const updated: Business = { ...existing, ...dto, updatedAt: new Date() };
    store.set(id, updated);
    return updated;
  },

  async remove(id: string): Promise<boolean> {
    return store.delete(id);
  },
};
