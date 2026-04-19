# KoldMarket — AI Placement Map

Where AI is used, what it does, and why it's there.

---

## Principle

AI is used where it **saves real time**, **reduces friction**, or **improves quality**.

It is **not** used to:
- Generate thin or low-quality content at scale
- Replace human judgement on trust and moderation decisions
- Add complexity without clear user value

---

## AI Touchpoints

### 1. Listing Creation (Seller AI)

**Where**: Post an Ad flow  
**Trigger**: User fills in basic fields (title keyword, category, photos)  
**What AI Does**:
- Suggests a polished listing title
- Writes a structured description (condition, specs, highlights)
- Suggests the correct category and subcategory
- Suggests condition classification (Used, Refurbished, Ex-Display, etc.)

**Model**: OpenAI GPT-4o (or GPT-4o-mini for cost control)  
**Location**: `packages/ai/src/listing-writer.ts`

---

### 2. Marketplace Search (Buyer AI)

**Where**: Homepage search bar, browse pages  
**Trigger**: User types a natural language query  
**What AI Does**:
- Interprets intent (equipment type, condition, location, price range)
- Translates to structured database filters
- Returns ranked results

**Model**: OpenAI GPT-4o-mini (fast, low-cost for search)  
**Location**: `packages/ai/src/search-interpreter.ts`

---

### 3. Service Matching (Buyer AI)

**Where**: Services section — "Find a service"  
**Trigger**: User describes what they need  
**What AI Does**:
- Identifies service type required (installation, repair, maintenance, etc.)
- Matches to businesses in the correct area with relevant services
- Returns a shortlist with explanation

**Model**: OpenAI GPT-4o-mini  
**Location**: `packages/ai/src/service-matcher.ts`

---

### 4. Business Profile Assistant (Business AI)

**Where**: Business registration / profile edit  
**Trigger**: Business fills in basic info (name, services, area)  
**What AI Does**:
- Writes a professional business profile description
- Suggests key selling points to highlight
- Generates a starter FAQ for the business profile

**Model**: OpenAI GPT-4o  
**Location**: `packages/ai/src/business-writer.ts`

---

### 5. Lead Reply Assistant (Business AI)

**Where**: Business inbox / lead management  
**Trigger**: Business receives a buyer enquiry  
**What AI Does**:
- Suggests a polished reply based on the enquiry context
- User edits and sends

**Model**: OpenAI GPT-4o-mini  
**Location**: `packages/ai/src/lead-reply.ts`

---

### 6. Moderation Assistance (Admin AI)

**Where**: Admin panel — listing review queue  
**Trigger**: New listing submitted for review  
**What AI Does**:
- Flags potential spam, duplicate, or misleading content
- Provides a confidence score and reason
- Human admin makes final decision

**Model**: OpenAI GPT-4o-mini  
**Location**: `packages/ai/src/moderation.ts`

---

### 7. Duplicate Detection (Admin AI)

**Where**: Background worker — triggered on new listing submission  
**Trigger**: New listing saved to database  
**What AI Does**:
- Compares listing against recent similar listings
- Flags near-duplicates for review
- Does not auto-reject

**Model**: Embedding-based similarity (OpenAI text-embedding-3-small)  
**Location**: `apps/worker/src/jobs/duplicate-detection.ts`

---

### 8. FAQ / Help Assistant (Buyer AI)

**Where**: Help centre, listing pages, post-ad flow  
**Trigger**: User asks a question  
**What AI Does**:
- Answers common marketplace questions using a knowledge base
- Falls back to "contact support" if not confident

**Model**: OpenAI GPT-4o-mini with retrieval  
**Location**: `packages/ai/src/help-assistant.ts`

---

## AI Safety Rules

| Rule | Detail |
|---|---|
| No auto-publish | AI can draft, humans must review |
| No hallucinated specs | AI must not invent product specs or prices |
| No PII in prompts | Strip names, emails, phone numbers before sending to OpenAI |
| Cost controls | Use GPT-4o-mini where quality allows; GPT-4o only where needed |
| Rate limiting | AI endpoints rate-limited per user to prevent abuse |
| Audit logging | All AI inputs/outputs logged for review (not for training) |

---

## Package Structure

```
packages/ai/
├── src/
│   ├── listing-writer.ts       # Listing title & description generation
│   ├── search-interpreter.ts   # Natural language → search filters
│   ├── service-matcher.ts      # Match buyers to service providers
│   ├── business-writer.ts      # Business profile generation
│   ├── lead-reply.ts           # Lead reply suggestions
│   ├── moderation.ts           # Content moderation assistance
│   ├── help-assistant.ts       # FAQ / help chat
│   ├── client.ts               # OpenAI client wrapper
│   └── index.ts                # Package exports
└── README.md
```

---

## Environment Variables Required

```
OPENAI_API_KEY=
OPENAI_DEFAULT_MODEL=gpt-4o-mini
OPENAI_PREMIUM_MODEL=gpt-4o
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

---

## Cost Estimate (MVP)

| Feature | Model | Est. cost/1k calls |
|---|---|---|
| Listing writer | GPT-4o | ~$0.15 |
| Search interpreter | GPT-4o-mini | ~$0.02 |
| Moderation | GPT-4o-mini | ~$0.02 |
| Embeddings | text-embedding-3-small | ~$0.002 |

At 1,000 listings/month and moderate search volume, total AI costs should remain under £50/month at MVP scale.
