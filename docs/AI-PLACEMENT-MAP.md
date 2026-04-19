# EK Marketplace — AI Placement Map

> Where AI fits in the product — and what stays human.
> Phase 3+ only. Do not build AI features in Phase 1 or 2.

---

## Core Principle

**Use AI where it adds genuine value. Not everywhere. Not as a gimmick.**

Every AI feature must:
1. Solve a real user problem
2. Be faster or better than a human alternative
3. Have a graceful non-AI fallback
4. Not create thin, low-quality content

---

## AI Feature Map by Phase

### Phase 1 — No AI

The MVP has no AI features. Focus on getting the marketplace working correctly first.

---

### Phase 2 — Light Automation

Small automation tasks that reduce manual work without AI-generated content.

| Feature | What It Does | Where |
|---------|-------------|-------|
| Smart categorisation | Suggest category based on title keywords | Post listing form |
| Duplicate alert | Warn seller if similar listing exists | Post listing flow |

These are **rules-based**, not AI. No external API calls.

---

### Phase 3 — Seller AI Tools

AI that helps sellers create better listings, faster.

| Feature | Input | Output | Model |
|---------|-------|--------|-------|
| **Title generator** | Brand, model, condition, category | SEO-optimised title | GPT-4o-mini |
| **Description writer** | Spec details, condition, notes | Full listing description | GPT-4o-mini |
| **Category suggest** | Title + short description | Category + subcategory | GPT-4o-mini |
| **Condition suggest** | Description | Condition label | Rule-based first, AI fallback |

**Principles:**
- Seller reviews and edits before publishing — AI suggests, human decides
- No auto-publish of AI-generated content
- Rate limited (5 AI generations per listing per user)

---

### Phase 3 — Buyer AI Tools

AI that improves discovery and finding what buyers need.

| Feature | Input | Output | Model |
|---------|-------|--------|-------|
| **Natural language search** | "commercial fridge under £500 in Manchester" | Filtered listing results | Embeddings + pgvector |
| **Service matcher** | "need AC servicing in Leeds" | Relevant service businesses | Embeddings + location filter |
| **Comparison assist** | Two listing IDs | Side-by-side spec comparison | GPT-4o-mini |

**Principles:**
- Falls back to keyword search if AI unavailable
- Never shows AI-generated results as if they're human listings

---

### Phase 3 — Admin/Moderation AI

AI that helps keep the marketplace clean and safe.

| Feature | What It Does | Action |
|---------|-------------|--------|
| **Spam detection** | Score listing for spam signals | Flag for human review |
| **Duplicate detection** | Compare new listing to existing | Alert seller + flag |
| **Risk scoring** | Score user/listing for fraud risk | Raise alert (human reviews) |
| **Support triage** | Classify inbound support queries | Route to correct team |

**Principles:**
- AI flags, human acts — no auto-removal of listings
- All decisions logged and auditable
- Regular accuracy review

---

## What AI Will Never Do in This Product

- ❌ Auto-publish listings without human review
- ❌ Generate fake reviews or testimonials
- ❌ Make pricing or valuation recommendations (liability risk)
- ❌ Replace human moderation decisions
- ❌ Impersonate users or businesses
- ❌ Create SEO content that doesn't reflect real data

---

## Technical Architecture (Phase 3)

```
packages/ai/
├── src/
│   ├── listing.ts        # Listing generation helpers
│   ├── search.ts         # Semantic search helpers
│   └── moderation.ts     # Spam/moderation helpers
```

All AI functions:
- Accept typed inputs (from `packages/types`)
- Return typed outputs
- Log to database for auditing
- Have a non-AI fallback

### Model Selection

| Use Case | Model | Reason |
|----------|-------|--------|
| Listing generation | `gpt-4o-mini` | Low cost, sufficient quality |
| Semantic search | `text-embedding-3-small` | Fast, cheap, good quality |
| Moderation scoring | `gpt-4o-mini` | Low cost |
| Complex reasoning | `gpt-4o` | Reserved for admin tools only |

---

## Cost Controls

- All AI features are **opt-in** for users (not default)
- Rate limit: 10 AI requests per user per hour
- Never stream AI content to unauth users
- Log all AI API costs by feature/user
- Set hard spend limits on OpenAI dashboard

---

## Rollout Plan

| Phase | Feature | When |
|-------|---------|------|
| 3.0 | Title + description generator | Month 4 |
| 3.0 | Category suggestion | Month 4 |
| 3.1 | Spam/duplicate detection | Month 5 |
| 3.2 | Semantic search | Month 5–6 |
| 3.3 | Service matching | Month 6 |
| 4.0 | Natural language buyer search | Post-MVP scale |
