-- ==============================================================================
-- KoldMarket — PostgreSQL Initialisation Script
-- ==============================================================================
-- This script runs once when the PostgreSQL container is first created.
-- For ongoing migrations, use a proper migration tool (Drizzle or Prisma).
--
-- This file sets up:
--   1. Extensions required by the application
--   2. A placeholder to confirm the database is ready
-- ==============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable trigram-based text search (useful for listing search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable case-insensitive text type (useful for emails)
CREATE EXTENSION IF NOT EXISTS citext;

-- Confirm setup
DO $$
BEGIN
    RAISE NOTICE 'KoldMarket database extensions initialised.';
END $$;

-- ==============================================================================
-- Note: Full schema (users, listings, categories, etc.) will be created
-- by the application migration tool (e.g. Drizzle ORM or Prisma).
-- See apps/api/src/db/migrations/ once implemented.
-- ==============================================================================
