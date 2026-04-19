# EK Marketplace

> The UK's niche marketplace for cooling equipment, AC services, refrigeration trade listings, and business directory.

## Repository Structure

```
bookish-pancake/
├── apps/
│   └── web/              # Next.js 15 frontend (runs on port 3000)
├── packages/
│   ├── ui/               # Shared React UI components
│   └── config/           # Shared TypeScript config
├── package.json          # Root workspace (turbo scripts)
├── pnpm-workspace.yaml   # pnpm workspace definition
└── turbo.json            # TurboRepo pipeline config
```

---

## Fresh Ubuntu 24.04 Setup Guide

> Complete setup from scratch on a fresh Ubuntu 24.04 server (root or sudo user, SSH access).

### 1 — Update system and install core dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

### 2 — Install Node.js LTS (v20)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # expected: v20.x.x
npm --version    # expected: 10.x.x
```

### 3 — Install pnpm

```bash
npm install -g pnpm
pnpm --version   # expected: 9.x.x or 10.x.x
```

### 4 — Clone the repository

**Via SSH** (requires SSH key registered on GitHub):

```bash
git clone git@github.com:gianig-hub/bookish-pancake.git ek-marketplace
cd ek-marketplace
```

**Via HTTPS** (no SSH key required):

```bash
git clone https://github.com/gianig-hub/bookish-pancake.git ek-marketplace
cd ek-marketplace
```

### 5 — Install all workspace dependencies

```bash
pnpm install
```

Expected output:

```
Packages: +XXX
Progress: resolved XXX, reused XXX, downloaded XXX, added XXX
Done in Xs
```

### 6 — Start the development server

```bash
pnpm dev
```

Expected TurboRepo output:

```
• Running dev
• Remote caching disabled

 web:dev: ▶ next dev
 web:dev:   ▸ Local:    http://localhost:3000
 web:dev:   ▸ Network:  http://0.0.0.0:3000
 web:dev:   ✓ Ready in 2.1s
```

### 7 — Open in your browser

- **Local:** <http://localhost:3000>
- **Remote server:** Open port 3000 in your firewall/security group, then visit `http://<your-server-ip>:3000`
- **SSH tunnel (no firewall change needed):**
  ```bash
  ssh -L 3000:localhost:3000 root@<your-server-ip>
  ```
  Then open <http://localhost:3000> in your local browser.

---

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, search, categories, how it works |
| `/marketplace` | Equipment listings (placeholder) |
| `/services` | Service directory (placeholder) |
| `/businesses` | Business directory (placeholder) |
| `/wanted` | Wanted ads (placeholder) |
| `/pricing` | Subscription plans (placeholder) |
| `/post-ad` | Post a listing (placeholder) |
| `/login` | Sign in (placeholder) |

---

## Available Scripts

Run from the **repo root**:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm start` | Start all apps in production mode (requires build first) |
| `pnpm lint` | Lint all workspaces |
| `pnpm type-check` | TypeScript type-check all workspaces |
| `pnpm clean` | Remove build artifacts |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | [TurboRepo](https://turbo.build/) + [pnpm workspaces](https://pnpm.io/workspaces) |
| Frontend | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | CSS Modules (zero dependencies) |
| Node.js | v20 LTS |
| Package manager | pnpm v9+ |

---

## Troubleshooting

### `ERR_PNPM_NO_PKG_MANIFEST` — No package.json found

Make sure you are inside the project root:

```bash
cd ek-marketplace
ls package.json   # should exist
```

### Port 3000 already in use

```bash
lsof -i :3000
kill <PID>
pnpm dev
```

### TurboRepo loop error (`looks like it invokes turbo`)

This happens if the root `package.json` `dev` script is accidentally set to `turbo run dev` **and** a workspace app also calls `turbo run dev`. This repo is correctly configured:
- **Root** `package.json` → `"dev": "turbo run dev"` ✅
- **`apps/web`** `package.json` → `"dev": "next dev"` ✅

### `pnpm install` fails with network errors

```bash
# Try with a different registry mirror
pnpm install --registry https://registry.npmjs.org
```

---

## Project Roadmap

See [`ek_github_summary_README.md`](./ek_github_summary_README.md) for the full product vision, MVP scope, and tech direction.

---

## License

GPL-3.0 — see [LICENSE](./LICENSE)
