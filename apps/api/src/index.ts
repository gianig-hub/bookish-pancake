/**
 * EK Marketplace API — Placeholder
 *
 * TODO: Replace this stub with a full Fastify application including:
 *   - Authentication (JWT + OAuth)
 *   - Listings CRUD
 *   - Business directory
 *   - Wanted ads
 *   - Search and filtering
 *   - File upload for listing photos
 *   - AI-assisted listing creation
 *   - Admin/moderation endpoints
 *   - Stripe webhook handling
 */

import Fastify from "fastify";

const app = Fastify({ logger: true });

// TODO: Add routes here as the API is built out

app.get("/health", async () => {
  return { status: "ok", service: "ek-marketplace-api", version: "0.1.0" };
});

app.get("/", async () => {
  return {
    message: "EK Marketplace API — placeholder. See README.md for planned endpoints.",
    // TODO: Remove this message once real routes are implemented
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`EK Marketplace API running on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
