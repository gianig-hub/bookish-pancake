# EK Marketplace — TurboRepo Monorepo

A modern pnpm-based [TurboRepo](https://turbo.build/) monorepo for the EK Marketplace MVP — UK niche marketplace for cooling equipment, AC/refrigeration services, and trade listings.

---

## 📦 Repository Structure

```
ek-marketplace/
├── apps/
│   └── web/          # Next.js 15 frontend (App Router)
│       └── app/
│           ├── page.tsx          # Home  →  /
│           ├── marketplace/      # Marketplace  →  /marketplace
│           ├── services/         # Services  →  /services
│           └── contact/          # Contact  →  /contact
├── packages/
│   └── ui/           # Shared UI component stub
├── package.json      # Root — TurboRepo scripts
├── pnpm-workspace.yaml
├── turbo.json
└── .gitignore
```

---

## 🚀 Quick Start (Clone → Install → Dev)

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| pnpm | ≥ 9 |

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

### 1. Clone the repository

```bash
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

This runs `turbo run dev` which starts all apps. The web app will be available at:

```
http://localhost:3000
```

---

## ✅ Smoke Test Criteria

After running `pnpm install && pnpm dev`, verify the following:

| Check | Expected |
|-------|----------|
| `pnpm install` exits with code 0 | ✅ No errors |
| `pnpm dev` starts without errors | ✅ TurboRepo starts `apps/web` |
| `http://localhost:3000` responds | ✅ Home page loads |
| `http://localhost:3000/marketplace` responds | ✅ Marketplace placeholder |
| `http://localhost:3000/services` responds | ✅ Services placeholder |
| `http://localhost:3000/contact` responds | ✅ Contact placeholder |
| No `package-lock.json` / `yarn.lock` present | ✅ Only `pnpm-lock.yaml` |
| TurboRepo does **not** loop | ✅ Root scripts orchestrate, apps have their own `dev` scripts |

---

## 🛠️ Available Scripts

Run from the repository root:

```bash
pnpm dev      # Start all apps in development mode
pnpm build    # Build all apps
pnpm start    # Start all apps in production mode (after build)
pnpm lint     # Lint all apps and packages
```

---

## 📁 Apps & Packages

### `apps/web`
Next.js 15 (App Router) frontend. Placeholder pages at `/`, `/marketplace`, `/services`, `/contact`.

### `packages/ui`
Shared UI component library stub. Components will be extracted here as the project grows.

---

## 🔑 Key Configuration Notes

- **Only `pnpm-lock.yaml` is committed** — no `package-lock.json` or `yarn.lock`.
- **Root `package.json` scripts** call `turbo run <task>` — they do **not** recurse.
- **App-level scripts** (`apps/web/package.json`) call the real commands (e.g., `next dev`).
- **`turbo.json`** defines task pipelines and output caching.

---

## 📜 License

GPL-2.0 — see [LICENSE](./LICENSE) for details.
