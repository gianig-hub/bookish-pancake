# EK Marketplace

The UK's specialist marketplace for air conditioning, refrigeration, cold rooms, and related equipment & services.

Built as a modern TurboRepo monorepo using **pnpm**, **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## Monorepo Structure

```
bookish-pancake/
├── apps/
│   └── web/          # Next.js 14 frontend (app router, TypeScript, Tailwind)
├── packages/
│   └── types/        # Shared TypeScript types
├── package.json      # Root manifest — TurboRepo scripts
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

## Requirements

- **Ubuntu 24.04** (or any modern Linux/macOS)
- **Node.js** 20 LTS or newer
- **pnpm** 10+

---

## Install on Ubuntu 24.04

```bash
# 1. Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install pnpm
npm install -g pnpm

# 3. Clone the repository
git clone https://github.com/gianig-hub/bookish-pancake.git ek-marketplace
cd ek-marketplace

# 4. Install all workspace dependencies
pnpm install
```

---

## Run in Development

```bash
pnpm dev
```

This starts the Next.js dev server at **http://localhost:3000**.

> If running on a remote server, open port 3000 in your firewall, or use an SSH tunnel:
> ```bash
> ssh -L 3000:localhost:3000 user@your.server.ip
> ```

---

## Available Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/marketplace` | Equipment marketplace listings |
| `/services` | Service directory |
| `/businesses` | Business & dealer directory |
| `/help` | Help centre / FAQ |
| `/about` | About the platform |
| `/contact` | Contact form |
| `/account` | User account area |

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm start` | Start all apps in production mode |
| `pnpm lint` | Lint all apps and packages |

---

## Package Manager

This project uses **pnpm** exclusively. Do not use npm or yarn — doing so will add conflicting lockfiles and break TurboRepo.

```bash
# Always use:
pnpm install
pnpm dev
pnpm build
```

---

## Tech Stack

- [TurboRepo](https://turbo.build/) — monorepo build system
- [Next.js 14](https://nextjs.org/) — React framework (app router)
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [pnpm](https://pnpm.io/) — fast, disk-efficient package manager

---

## Roadmap

- [ ] Equipment listing pages and search
- [ ] Service category pages and quote flow
- [ ] Business directory and profiles
- [ ] User authentication (register/login)
- [ ] Post an ad flow
- [ ] Subscription and payment integration
- [ ] Backend API (`apps/api`)
- [ ] AI-assisted listing creation and search
- [ ] Admin moderation dashboard

---

## Status

**Planning / early scaffold phase.** All routes are placeholders — see TODO comments in each page for where real logic needs to be added.
