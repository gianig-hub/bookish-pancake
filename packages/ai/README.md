# packages/ai — AI Service Layer

Shared AI integration module for Kold Market. Provides functions for search ranking, listing assistance, moderation, and recommendations. Used by `apps/api` and `apps/worker`.

> **Phase**: Disabled in Phase 1 via feature flags. Active from Phase 2+ onward.

---

## Responsibility

- Wraps AI provider calls (OpenAI by default) behind a clean interface
- Provides reusable functions importable by API and worker
- Designed to be provider-swappable (OpenAI → Anthropic or others)
- Controlled by feature flags in `packages/config` so it can be safely disabled

---

## Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Type safety |
| OpenAI SDK | Default AI provider |
| `packages/config` | Feature flags to enable/disable AI |
| `packages/types` | Shared input/output types |

---

## Key Exports

```typescript
// Search ranking
rankListings(query: string, listings: Listing[]): Promise<Listing[]>

// Listing assistance (Phase 2+)
generateListingTitle(input: ListingDraft): Promise<string>
generateListingDescription(input: ListingDraft): Promise<string>
suggestCategory(input: ListingDraft): Promise<string>

// Moderation (Phase 3+)
moderateListing(listing: Listing): Promise<ModerationResult>
detectSpam(content: string): Promise<SpamResult>

// Recommendations (Phase 3+)
getSimilarListings(listing: Listing): Promise<Listing[]>
```

---

## Feature Flags

All AI features are controlled by flags in `packages/config`:

```typescript
AI_ENABLED=false          // Master switch (off in Phase 1)
AI_LISTING_ASSIST=false   // Listing generation (Phase 2+)
AI_MODERATION=false       // Auto-moderation (Phase 3+)
AI_SEARCH_RANKING=false   // Semantic search ranking (Phase 3+)
```

---

## Dependencies

- Requires `packages/types` for input/output type definitions
- Requires `packages/config` for feature flag access
- Requires `OPENAI_API_KEY` in environment (Phase 2+)
- Does **not** depend on any app — apps import from this package

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/config](../config/README.md)
- [apps/worker](../../apps/worker/README.md)
