# AI Placement Map for EK Marketplace

> **Where AI helps without replacing trust**

This document is the **authoritative reference** for:
1. Where AI appears in the product (by user type and page)
2. What each AI feature does (specific, not vague)
3. What AI will NEVER do (explicit guardrails)
4. Which features are MVP vs Phase 3+
5. Why AI must be modular and isolated (not scattered)

---

## Section 1: Overview & Philosophy

### Core Principles

- **AI is a tool, not a decision-maker** — AI suggests, humans decide
- **Users are always in control** — every AI suggestion can be overridden
- **Trust > convenience** — never sacrifice trust for speed or automation
- **Transparency about AI decisions** — always show why AI made a suggestion
- **No black boxes** — every AI feature is auditable and explainable

---

## Section 2: What AI Does NOT Do (Hard Guardrails)

| Decision | Why Manual Only | Impact if Wrong |
|----------|-----------------|-----------------|
| Account verification | Trust requirement | Scammers gain credibility |
| Payment processing | Financial liability | Money loss |
| Dispute resolution | Requires context | Customer loses confidence |
| Account suspension | Legal/safety decision | False positives hurt users |
| Refund approvals >£100 | Business decision | Revenue leakage |
| Business registration | Regulatory requirement | Legal liability |
| Service quality assessment | Requires domain expertise | Misleads customers |

---

## Section 3: Public AI (Customer/Buyer View)

**Context**: Unauthenticated users and logged-in buyers browsing

### Homepage AI Features

#### Smart Search Box
- **What it does**: Autocomplete with typo correction
- **Example**: User types "refigerator" → suggests "refrigerator"
- **MVP**: Yes (Phase 2/3)
- **Later**: Natural language queries ("cold rooms for restaurants")
- **Why**: Reduces friction, improves discovery
- **Failure mode**: If autocomplete is wrong, user can still search manually

#### Trending & Recommendations
- **What it does**: Show trending categories based on searches + user browsing
- **Example**: "Popular in London this week: Commercial AC Units"
- **MVP**: Trending only (Phase 2) | Personalized recommendations (Phase 3)
- **Data used**: Search volume, clicks, location
- **Transparency**: "Based on what's popular"
- **No personalization in MVP** (privacy-first)

---

### Marketplace Browse Pages AI

#### Smart Filters
- **What it does**: Understand user intent and suggest relevant filters
- **Example**: User searches "Daikin" → suggest "Location: 50km radius", "Price: £500-£2000"
- **MVP**: Standard filters (Phase 2) | Smart suggestions (Phase 3)
- **Why**: Reduces clicks to find what user wants
- **Failure mode**: User can override suggestions

#### Search Ranking
- **What it does**: Sort listings by relevance (not just date)
- **Factors**: Match quality, seller rating, recent activity, price reasonableness
- **MVP**: Relevance only (Phase 2) | Personalized ranking (Phase 3)
- **Transparency**: Show "Why this result?" explanation
- **No hidden manipulation**: Algorithm is auditable

#### Similar Listings
- **What it does**: "People also looked at..." suggestions
- **Example**: Viewing Daikin AC → suggest similar brands (Mitsubishi, LG)
- **MVP**: No (Phase 3+)
- **Data**: Category, brand, price range, location
- **Why**: Help buyers compare options

---

### Service Pages AI

#### Service Matching
- **What it does**: Suggest relevant service providers based on service request
- **Example**: Customer wants "Boiler repair in Glasgow" → show installers within 30km
- **MVP**: Location-based (Phase 2) | Quality-based (Phase 3)
- **Transparency**: "We matched based on: location, reviews, availability"
- **No manipulation**: Never show unqualified providers

#### Review Highlighting
- **What it does**: Highlight most helpful reviews
- **Example**: Show reviews mentioning "reliability", "punctual", "professional"
- **MVP**: Date sort (Phase 2) | Helpful sort (Phase 3)
- **Why**: Help buyers make decisions quickly
- **Failure mode**: Manual review if AI seems biased

---

### Wanted Ads Pages AI

#### Matching Engine
- **What it does**: Notify businesses when customer request matches their offerings
- **Example**: Business sells "AC Units" → notify when customer wants "AC Unit"
- **MVP**: Exact keyword match (Phase 2) | Smart matching (Phase 3)
- **Why**: Connect supply with demand
- **Opt-in**: Businesses can disable notifications

#### Request Clarity Check
- **What it does**: Suggest missing info to improve quote responses
- **Example**: "You didn't specify budget. Adding price range gets 3x more quotes."
- **MVP**: No (Phase 3+)
- **Why**: Help customers get better responses
- **Non-intrusive**: Appears as helper tip, not requirement

---

### FAQ/Help Center AI

#### Smart FAQ Suggestions
- **What it does**: Show relevant FAQ when user browsing
- **Example**: Viewing "Installation Services" → suggest FAQ "How to verify installer?"
- **MVP**: Manual categorization (Phase 2) | AI suggestions (Phase 3)
- **Why**: Reduce support inquiries

#### Content Gap Detection
- **What it does**: Identify missing FAQ topics based on support tickets
- **Example**: 50+ "How to ship AC unit?" questions → suggest new FAQ
- **MVP**: No (Phase 4)
- **Why**: Keep documentation current
- **Action**: Admin reviews and approves before publishing

---

## Section 4: Seller AI (Small Business/Installer/Supplier View)

**Context**: Users posting equipment, services, or wanted ads

### Post Ad Flow AI

#### Category Suggestion
- **What it does**: Suggest 3 categories based on title and description
- **Example**: Title "Daikin AC Wall Unit" → suggest ["Air Conditioning Units", "Used Equipment", "Commercial AC"]
- **MVP**: Yes (Phase 2/3 border)
- **User control**: Can override, not forced
- **Why**: Reduce categorization errors
- **Accuracy**: Trained on existing listings

#### Title Assistant
- **What it does**: Suggest improvements to listing title
- **Example**: "ac unit" → "Daikin Wall-Mounted 12,000 BTU AC Unit (Used, 3 Years)"
- **MVP**: Yes (Phase 3)
- **Why**: Better titles = more clicks
- **User workflow**: Suggestion shown, user can accept/edit
- **Tone**: Professional but not pushy

#### Description Writer
- **What it does**: Generate polished description from bullet points
- **Example**:
  - User inputs: "12000 BTU, works great, 3 years old, slight noise"
  - AI writes: "Professional-grade Daikin wall-mounted AC unit. Capacity: 12,000 BTU. Condition: Excellent with minimal cosmetic wear. Age: 3 years, well-maintained. Note: Slight operational noise (normal for this model). Ready for immediate installation."
- **MVP**: Yes (Phase 3)
- **Why**: Many sellers struggle with descriptions
- **User control**: Can edit all AI-generated text
- **Style guide**: AI trained on best-performing listings

#### Pricing Recommendation
- **What it does**: Suggest price based on market data
- **Example**: "Similar Daikin 12K BTU units: £450-£650. Your condition/age suggests £520."
- **MVP**: No (Phase 3/4)
- **Why**: Help sellers price competitively
- **Transparency**: Show comparable listings
- **User control**: Can override recommendation

#### Missing Info Detection
- **What it does**: Warn if critical info is missing
- **Example**: "AC unit posting usually includes: dimensions, installation year, warranty status. You haven't mentioned warranty - add it for 40% more inquiries."
- **MVP**: No (Phase 3)
- **Why**: Complete listings get more engagement
- **Non-intrusive**: Warning shown, not forced

---

### Edit Ad Flow AI

#### Quality Check
- **What it does**: Suggest improvements when editing
- **Example**: "Your listing had 2 clicks last week. Adding more photos could increase views by 3x."
- **MVP**: No (Phase 3+)
- **Why**: Help sellers optimize

#### Duplicate Detection
- **What it does**: Warn if similar listing already exists from same seller
- **Example**: "You already have a 'Daikin AC Unit' listing posted 2 weeks ago. Update that instead?"
- **MVP**: Yes (Phase 3)
- **Why**: Avoid spam, consolidate inventory
- **User control**: Can create new or update old

---

### Content Moderation Pre-Check

#### Policy Compliance Check
- **What it does**: Flag potential policy violations before posting
- **Example**: Listing contains phone number → "Our system removes contact info. Use our messaging system instead."
- **MVP**: Yes (Phase 2/3)
- **Why**: Reduce rejections, protect user data
- **Transparency**: Tell user exactly what's wrong

---

## Section 5: Business AI (Shop/Installer/Dealer View)

**Context**: Business profiles, service management, customer interaction

### Business Profile Writer

#### Profile Optimization Assistant
- **What it does**: Suggest improvements to business description
- **Example**: "2-line description" → AI suggests: "You mention installation but not warranty. Adding 'Warranty: 5-year' could attract enterprise customers."
- **MVP**: No (Phase 3+)
- **Why**: Help businesses stand out

#### FAQ Generation
- **What it does**: Generate FAQ from business description + past inquiries
- **Example**: "Your top 5 support questions: installation cost, warranty, response time, service area, availability. Generate FAQ?"
- **MVP**: No (Phase 4)
- **Why**: Reduce repetitive inquiries
- **User control**: Approve before publishing

---

### Lead Reply Drafting

#### Reply Template Suggestions
- **What it does**: Suggest professional reply templates
- **Example**:
  - Customer asks "How much for AC installation?"
  - Suggest: "Hi [Name], Thanks for your interest! Installation costs vary by unit type and location. Common range: £800-£1500. Can you share more details? 1) What's your current setup? 2) What size AC do you need? 3) Your postcode? I'll send a personalized quote."
- **MVP**: No (Phase 3)
- **Why**: Help businesses respond faster and professionally
- **User control**: Edit before sending

#### Lead Prioritization
- **What it does**: Rank inquiries by quality/seriousness
- **Example**: "High priority: Inquiry includes budget (£2000), location (London), specific model. Medium priority: Just asking about availability."
- **MVP**: No (Phase 3+)
- **Why**: Help busy businesses focus on real deals
- **Transparency**: Show why each is ranked

---

### Review Reply Drafting

#### Reply Suggestions
- **What it does**: Suggest professional reply to reviews
- **Example**:
  - Review: "Great service but slow response time"
  - AI suggests: "Thank you for the feedback! We appreciate you mentioning the response time. We've now set up a dedicated inquiry team to respond within 24 hours. We'd love another chance to impress!"
- **MVP**: No (Phase 4)
- **Why**: Help businesses respond thoughtfully

---

## Section 6: Admin AI (Moderator/Admin View)

**Context**: Platform moderation, safety, content quality

### Moderation Assistant

#### Listing Risk Scoring
- **What it does**: Score each new listing 0-100 for risk level
  - 0-20: Safe (green)
  - 21-50: Review (yellow)
  - 51-100: Urgent (red)
- **Scoring factors**:
  - Spam keywords ("guaranteed profit", "easy money")
  - Seller flags (new account, no photos, multiple listings/hour)
  - Pricing anomalies (99% below market, 99% above market)
  - Contact info exposed (phone number, email)
  - Scam patterns (urgency language, vague details)
- **MVP**: Basic rules (Phase 2) | AI scoring (Phase 3)
- **Why**: Prioritize moderation work
- **Use**:
  - Green (0-20): Auto-approve
  - Yellow (21-50): Human review
  - Red (51-100): Auto-flag, human decides

#### Spam Detection
- **What it does**: Detect spam listings
- **Examples**:
  - "BUY CRYPTO NOW!!!" on AC listing
  - Same listing posted 50 times/day from different accounts
  - Listing text is AI-generated gibberish
- **MVP**: Keyword filtering (Phase 2) | AI detection (Phase 3)
- **Auto-action**: Flag for review (never auto-delete without human check)

#### Suspicious Behavior Alerts
- **What it does**: Flag account patterns that suggest fraud
- **Examples**:
  - New seller posts 100 items in 1 hour
  - Seller changes phone number 3 times in 24 hours
  - Seller posts from 10 different IP addresses same hour
  - Seller posts "services" but has no reviews
- **MVP**: No (Phase 3+)
- **Why**: Early fraud detection
- **Action**: Hold account for human review

---

### Duplicate Listing Detection

#### Cross-Post Detection
- **What it does**: Find same item posted by different sellers
- **Example**: Same AC unit photo, same serial number, listed by 3 sellers
- **MVP**: Photo matching (Phase 3) | Description matching (Phase 3+)
- **Why**: Detect dropshipping, inventory theft
- **Use**: Alert about duplicates, let admin decide

#### Self-Duplicate Detection
- **What it does**: Find same item posted multiple times by same seller
- **Example**: "Daikin AC Unit" posted by seller 4 times with slight variations
- **MVP**: Exact title match (Phase 2) | Fuzzy match (Phase 3)
- **Use**: Warn seller to consolidate

---

### Support Triage

#### Ticket Classification
- **What it does**: Auto-categorize support tickets
- **Examples**:
  - "How do I post a listing?" → Category: Help Center
  - "Seller won't respond" → Category: Dispute
  - "I found a scam" → Category: Safety Alert
  - "App crashed" → Category: Bug Report
- **MVP**: No (Phase 3+)
- **Why**: Route tickets to right team

#### Priority Assignment
- **What it does**: Mark tickets as urgent/normal/low
- **Examples**:
  - URGENT: "My account was hacked"
  - NORMAL: "How do I post?"
  - LOW: "Can I change my profile photo color?"
- **MVP**: No (Phase 4)
- **Why**: Help support team focus

---

### Content Gap Suggestions

#### FAQ Topic Suggestions
- **What it does**: Identify missing FAQ based on support tickets
- **Example**: 50 tickets asking "How do I verify an installer?" → Suggest FAQ
- **MVP**: No (Phase 4)
- **Why**: Reduce support load

#### Policy Clarification Needs
- **What it does**: Identify policies that confuse users
- **Example**: 30 tickets misunderstanding refund policy → Suggest clarification
- **MVP**: No (Phase 4)
- **Why**: Improve communication

---

## Section 7: What Should NEVER Be Automated

### Absolute Manual-Only Decisions

| Decision | Why | Risk |
|----------|-----|------|
| **Account Verification** | Requires proof of identity | Scammers get credibility |
| **Payment Processing** | Financial liability | Money loss, chargebacks |
| **Dispute Resolution** | Requires context and fairness | Users lose trust |
| **Account Suspension** | Legal and safety implications | False positives harm innocent users |
| **Refund Approvals >£100** | Business decision with liability | Revenue loss, fraud risk |
| **Business Registration Approval** | Regulatory requirement | Legal liability |
| **Service Quality Assessment** | Requires domain expertise | Misleads customers |
| **Pricing Fraud Decisions** | Requires context | May harm legitimate edge cases |
| **Content Removal** (except spam) | Free speech / property rights | False positives cause problems |
| **Review Removal** | Potential for manipulation | Hides legitimate complaints |
| **Feature Approvals** (paid) | Business decision | Revenue/fraud implications |

### Examples of What NOT to Automate

- ❌ Auto-approve business verification
- ❌ Auto-process refunds
- ❌ Auto-suspend accounts
- ❌ Auto-delete listings (can auto-flag)
- ❌ Auto-remove reviews
- ❌ Auto-approve paid features
- ❌ Auto-calculate insurance premiums
- ❌ Auto-rate service quality

### Examples of What IS OK to Automate

- ✅ Auto-flag suspicious listings (for human review)
- ✅ Auto-suggest improvements (for user to accept)
- ✅ Auto-detect duplicates (for admin decision)
- ✅ Auto-categorize support tickets (for routing)
- ✅ Auto-notify relevant parties (no decision)
- ✅ Auto-calculate suggested prices (for user override)
- ✅ Auto-welcome new users (template)

---

## Section 8: MVP AI vs. Future AI

### MVP Phase (Phase 2-3): Essential, Low-Risk Features

#### Seller AI
- Title suggestions (improves listing quality)
- Category suggestions (reduces categorization errors)
- Duplicate detection warning (prevents spam)
- Description improvement suggestions (helps sellers)

#### Public AI
- Search autocomplete with typo correction (UX improvement)
- Smart filtering (helps discovery)
- Search ranking by relevance (improves experience)

#### Admin AI
- Basic spam detection (keyword filtering + rules)
- Listing risk scoring (simple rules-based)
- Duplicate detection (basic image/title matching)

**Why these first**: Low risk, high user benefit, low cost

---

### Phase 3+ Features: Higher Complexity, More Data Needed

#### Seller AI
- Pricing recommendations (needs market data)
- Missing info detection (needs training data)
- Quality optimization suggestions (needs performance data)

#### Business AI
- Lead prioritization (needs historical conversion data)
- Reply templates (needs training on best responses)
- Profile optimization (needs performance data)

#### Public AI
- Personalized recommendations (needs privacy-respectful tracking)
- Natural language search (needs NLP models)

#### Admin AI
- Advanced fraud detection (needs pattern history)
- Suspicious behavior alerts (needs account history)

**Why later**: Need data, higher complexity, more careful evaluation

---

### Never AI Features

**Never use AI for**:
- Final approval decisions (always human)
- Removing content (can suggest, not decide)
- Suspending accounts (can flag, not decide)
- Processing payments (security/liability)
- Resolving disputes (fairness/context)

---

## Section 9: Why AI Must Be Modular

### The Problem: Scattered AI

❌ **Bad**: AI logic embedded everywhere
- AI code in API endpoints
- AI decisions in business logic
- Feature flags spread across codebase
- Logging scattered
- No audit trail
- Hard to disable
- Hard to test

**Result**: Brittle, unmaintainable, hard to improve

---

### The Solution: Modular AI

✅ **Good**: AI in isolated packages

```
packages/ai/
├── services/
│   ├── search-ranking.ts       (Ranking algorithm)
│   ├── spam-detection.ts       (Spam classifier)
│   ├── category-suggestion.ts  (Category classification)
│   ├── duplicate-detection.ts  (Duplicate finder)
│   └── ...
├── types.ts                    (Shared interfaces)
├── logger.ts                   (Unified logging)
└── README.md                   (Documentation)
```

### Benefits

1. **Easy to Test**: Mock AI services in tests
2. **Easy to Disable**: Feature flags at service level
3. **Easy to Improve**: Update algorithm without touching endpoints
4. **Easy to Audit**: All AI decisions logged in one place
5. **Easy to Migrate**: Switch providers (OpenAI → Anthropic, etc)
6. **Easy to Monitor**: Central observability
7. **Easy to Explain**: Service is source of truth for each AI feature

### Implementation Pattern

```typescript
// ✅ Modular approach
const result = await aiServices.searchRanking.score(listings);
const flagged = await aiServices.spamDetection.check(listing);

// Every call logged with:
// - Input data
// - Output
// - Confidence score
// - Timestamp
// - User ID
// - Audit trail for compliance
```

---

## Section 10: Transparency & User Control

### Principle: Users Know AI Is Operating

**Show AI Decisions**:
- "Suggestions based on 50+ similar listings"
- "Ranked by relevance, recent activity, and seller rating"
- "This was auto-flagged as possible spam - human review pending"

**Let Users Override**:
- Accept or reject AI suggestions
- Disable personalization
- Request manual review

**Provide Recourse**:
- "Why did this happen?" explanations
- Appeal process for AI decisions
- Human review available

---

## Section 11: Implementation Checklist

For any new AI feature:

- [ ] Defined in this document
- [ ] Marked as MVP or Phase 3+
- [ ] User benefit clearly stated
- [ ] Failure mode documented
- [ ] Transparency shown to user
- [ ] User can override / disable
- [ ] Logged for audit trail
- [ ] Tested with 50+ examples
- [ ] Monitored for accuracy
- [ ] Has human review fallback

---

## Section 12: Future AI Possibilities (Not Committed)

- Natural language search ("I need an AC unit for a restaurant")
- Generative product photos
- Predictive pricing trends
- Marketplace matching (buyers to sellers)
- Chatbot for FAQ
- Automated FAQ generation
- Market segmentation insights
- Demand forecasting
- Inventory optimization suggestions

> **Note**: These require more data and careful ethical consideration before implementation.
