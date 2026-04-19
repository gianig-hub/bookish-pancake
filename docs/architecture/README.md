# Architecture Documentation

This folder contains architecture notes, diagrams, and decision records for EK Marketplace.

## Contents

- `SYSTEM-OVERVIEW.md` — High-level system architecture *(TODO)*
- `DATABASE-SCHEMA.md` — Database model overview *(TODO — do not create prematurely)*
- `API-DESIGN.md` — API conventions and endpoint structure *(TODO)*
- `ADR/` — Architecture Decision Records *(TODO)*

## Purpose

Architecture documentation captures **how the system is built** and the reasoning behind key decisions.

## Architecture Decision Records (ADRs)

When a significant architectural decision is made (e.g., "we chose BullMQ over SQS for job queues"), create an ADR file:

```
docs/architecture/ADR/
  001-use-bullmq-for-job-queues.md
  002-use-prisma-for-database-access.md
  ...
```

ADRs use this format:

```markdown
# ADR-001: Use BullMQ for Job Queues

## Status: Accepted

## Context
...

## Decision
...

## Consequences
...
```

## Style

- Keep diagrams simple (Mermaid or ASCII are fine for now)
- Record decisions when they are made — not retrospectively
- Link to ADRs from code where the decision has non-obvious implications
