# packages/ai — AI Service Layer

## Responsibility

This package is the **isolated AI service layer** for EK Marketplace.

All AI calls in the platform route through this package — never directly from `apps/api` or `apps/web`.

It provides:
- A prompt library (versioned, structured prompts)
- Model routing (choose provider and model per task type)
- AI tool wrappers (thin interfaces for OpenAI, Anthropic, etc.)
- Evaluation cases (test prompts with expected outputs)
- Guardrails (output validation, content safety checks)

---

## Why AI Is Modular Here

AI features must be:

1. **Swappable**: If OpenAI raises prices or has an outage, we switch to Anthropic or a local model without touching business logic.
2. **Toggleable**: Every AI feature is behind a feature flag (`AI_ENABLED`, `AI_MODERATION_ENABLED`). If AI is off, the product still works.
3. **Testable**: Prompts and model calls can be tested independently without running the full API.
4. **Auditable**: All AI calls and outputs are logged for review, debugging, and safety.
5. **Graceful**: If an AI call fails, the feature degrades to a non-AI fallback — it does not break the user experience.

---

## Folder Structure (Planned)

```
packages/ai/
├── src/
│   ├── prompts/              # Versioned prompt templates
│   │   ├── listing/          # Listing title/description generation
│   │   ├── moderation/       # Spam and content moderation
│   │   ├── search/           # Query understanding and ranking
│   │   └── business/         # Business profile and FAQ generation
│   ├── providers/            # Model provider wrappers
│   │   ├── openai.ts         # OpenAI API client wrapper
│   │   └── anthropic.ts      # Anthropic API client wrapper (TODO)
│   ├── router.ts             # Routes tasks to the correct provider/model
│   ├── guardrails.ts         # Output validation and safety checks
│   ├── logger.ts             # Logs AI inputs/outputs for auditing
│   └── index.ts              # Public exports
├── evals/                    # Evaluation test cases (prompt → expected output)
├── tsconfig.json
└── package.json
```

---

## AI Modules (Planned)

| Module | Task | Phase |
|---|---|---|
| `listing.generateTitle` | Generate a listing title from structured fields | Phase 3 |
| `listing.generateDescription` | Write a listing description from inputs | Phase 3 |
| `listing.suggestCategory` | Suggest the best category for a listing | Phase 3 |
| `listing.detectMissingInfo` | Flag missing fields before publication | Phase 2 (rule-based first) |
| `moderation.scoreSpam` | Score a listing for spam probability | Phase 2 |
| `moderation.detectDuplicate` | Flag potential duplicate listings | Phase 3 |
| `search.understandQuery` | Parse natural-language search into structured filters | Phase 3 |
| `business.writeProfile` | Generate a business description from inputs | Phase 3 |
| `business.draftLeadReply` | Draft a reply to an incoming lead | Phase 3 |
| `support.triageRequest` | Categorise and route a support request | Phase 3 |

---

## Usage (Example)

```typescript
// TODO: Implement this interface
import { generateListingDescription } from '@ek/ai';

const result = await generateListingDescription({
  category: 'refrigeration',
  condition: 'used',
  make: 'True',
  model: 'T-49',
  location: 'London',
});

if (result.ok) {
  console.log(result.description);
} else {
  // Graceful fallback — show empty description field
  console.log('AI unavailable, showing empty field');
}
```

---

## Guardrails

All AI outputs are validated before being returned:

- Output length limits enforced
- Prohibited content patterns checked
- Confidence threshold checked (low-confidence outputs are not surfaced)
- All outputs logged with input hash for auditing

---

## TODO

- [ ] Set up package with TypeScript
- [ ] Create OpenAI provider wrapper
- [ ] Create first prompt: `listing.detectMissingInfo` (rule-based)
- [ ] Create AI router with feature flag check
- [ ] Add basic logging for AI calls
- [ ] Write first evaluation cases
