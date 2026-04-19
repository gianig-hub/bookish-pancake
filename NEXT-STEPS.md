# Next Steps — EK Marketplace

> Recommended build order after the auth shell is in place.

---

## Step 1 — Connect Web Auth to API (remove in-process stores)

Currently `apps/web` has its own in-memory user and session stores for local development. These should be replaced with calls to `apps/api`.

- Remove `apps/web/src/lib/auth` and `apps/web/src/lib/session`
- Update `/api/auth/login`, `/api/auth/register`, `/api/auth/logout` route handlers to call `apps/api`
- Pass `NEXT_PUBLIC_API_URL` from `.env.local`

---

## Step 2 — Add PostgreSQL + Prisma

Replace all in-memory stores with a real database.

- Add Prisma to `apps/api`
- Create initial schema: `User`, `Session` tables
- Migrate the auth user/session stores
- Add `DATABASE_URL` to `.env.local` and docker-compose

---

## Step 3 — Email Verification & Password Reset

Before going public, users should verify their email.

- Add `EmailVerification` model to schema
- Add POST `/auth/verify-email` and GET `/auth/verify-email/:token` routes
- Wire up a transactional email provider (Resend, Postmark, or SES)
- Add "Forgot password" flow

---

## Step 4 — Public Pages

Build the site pages that don't require login.

- Homepage with category browsing
- Category pages (equipment, services, businesses, wanted)
- Listing detail page
- Business profile page
- Help centre / FAQ

---

## Step 5 — Listing Post Flow

Allow authenticated users to post ads.

- Multi-step post-ad form
- AI-assisted title/description (Phase 3 — add TODO stub now)
- Image upload (S3 or Cloudflare R2)
- Category selection
- Post preview and publish

---

## Step 6 — Business Profiles

Give dealers and businesses a proper dashboard.

- Business profile setup (name, description, contact, location, categories)
- Verified badge logic (admin approval)
- Lead/enquiry inbox

---

## Step 7 — Pricing & Boosts (Phase 3)

After core marketplace is stable:

- Stripe subscriptions
- Listing boost products
- Admin dashboard for subscription management

---

## Notes

- Do not rush to Phase 3 AI features — focus on stable Phase 2 first.
- Keep AI modules isolated in `packages/ai` from day one.
- Every step above should be done as a separate PR.
