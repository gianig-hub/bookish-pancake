# EK Marketplace

A modern marketplace for buying, selling, and discovering equipment, services, and businesses.

Built as a **TurboRepo monorepo** using **pnpm**, **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

---

## Repository Structure

```
bookish-pancake/
├── apps/
│   └── web/              # Next.js 15 frontend (TypeScript + Tailwind)
├── packages/
│   └── types/            # Shared TypeScript types
├── package.json          # Root workspace package
├── pnpm-workspace.yaml   # pnpm workspace config
├── turbo.json            # TurboRepo pipeline config
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 9 — install with `npm install -g pnpm`

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

# 2. Install all dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:3000**.

---

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start all apps in development mode   |
| `pnpm build`    | Build all apps and packages          |
| `pnpm lint`     | Lint all apps and packages           |
| `pnpm type-check` | Type-check all apps and packages   |
| `pnpm clean`    | Remove all build outputs and caches  |

---

## Apps

### `apps/web`

The main Next.js 15 frontend with TypeScript and Tailwind CSS.

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## Packages

### `packages/types`

Shared TypeScript types used across the monorepo (listings, users, businesses, plans).

---

## Tech Stack

- **Monorepo:** TurboRepo + pnpm workspaces
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Shared:** TypeScript types package

---

## License

GPL-2.0 — see [LICENSE](./LICENSE) for details.
