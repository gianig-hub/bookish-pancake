# EK Marketplace

> The UK specialist marketplace for air conditioning, refrigeration, cold rooms & freezer rooms.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18 — [nodejs.org](https://nodejs.org)
- **pnpm** ≥ 8 — install with `npm install -g pnpm`
- **Git**

### 1. Clone the repo

```bash
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

The web app will be available at **http://localhost:3000**.

---

## 📦 Monorepo Structure

This is a [TurboRepo](https://turbo.build/repo) + [pnpm](https://pnpm.io) workspace monorepo.

```
bookish-pancake/
├── apps/
│   └── web/          # Next.js 15 frontend (EK Marketplace UI)
├── packages/
│   └── ui/           # Shared React component library
├── package.json      # Root workspace (turbo scripts)
├── pnpm-workspace.yaml
├── turbo.json
└── .npmrc
```

### Apps

| App | Description | Port |
|-----|-------------|------|
| `apps/web` | Next.js 15 marketplace frontend | 3000 |

### Packages

| Package | Description |
|---------|-------------|
| `packages/ui` | Shared UI components |

---

## 🛠 Available Commands

Run from the **repo root**:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm start` | Start built apps in production mode |
| `pnpm lint` | Lint all apps and packages |

---

## 🏗 Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org) + React 19 + TypeScript
- **Monorepo:** [TurboRepo](https://turbo.build/repo) + [pnpm workspaces](https://pnpm.io/workspaces)
- **Styling:** CSS (expandable to Tailwind CSS)

---

## 📋 Project Vision

See [ek_github_summary_README.md](./ek_github_summary_README.md) for the full project vision, marketplace structure, and roadmap.

---

## 📄 License

See [LICENSE](./LICENSE).
