# EK Marketplace — AI Moderation Strategy

How AI is used to moderate listings and users on the platform.

---

## Overview

Content moderation is one of the most important uses of AI on the platform.
The goal is to catch spam, scam listings, and inappropriate content before they reach buyers.

**Approach**: Async AI scoring + manual admin review queue

---

## Moderation Flow

```
Listing submitted
       │
       ▼
Save to DB (status: "pending")
       │
       ▼
Queue moderation job (async)
       │
       ▼
Worker processes: AI scoring
       │
   ┌───┴───────────────────────────┐
   │ Score 0–30                    │ Score 31–70              │ Score 71–100
   ▼ (clean)                       ▼ (review)                 ▼ (high risk)
Auto-approve                 Add to admin queue          Hold + flag admin
(status: "active")           (status: "pending")         (status: "pending")
```

---

## AI Scoring Criteria

The AI moderation prompt evaluates:

| Signal | Description |
|--------|-------------|
| Spam | Repetitive text, keyword stuffing |
| Contact info in description | Phone/email in listing body (against rules) |
| Pricing fraud | Unrealistically low/high prices |
| Offensive content | Inappropriate language |
| Irrelevant category | Description doesn't match category |
| Missing substance | Empty or near-empty description |

---

## Admin Moderation Queue

The admin panel shows:
- Listings awaiting review (pending)
- AI score and reason flags
- One-click approve / reject / request edit

---

## Future Improvements (Phase 3+)

- Image moderation (detect inappropriate photos)
- Duplicate detection (embedding similarity)
- User risk scoring (repeat offenders)
- Pattern-based fraud detection (phone number matching known scams)

---

## False Positive Policy

AI moderation is **advisory**, not final.

- Humans always make the final call
- Sellers can appeal rejected listings
- AI scores are not shown to sellers (to prevent gaming)
- Admin can override AI scores at any time
