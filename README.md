# EK Marketplace

AI-first UK vertical marketplace for AC, refrigeration and cold room equipment.

## Repository Structure

```
.
├── apps/
│   └── web/          # Next.js frontend (EK Marketplace UI)
├── packages/
│   ├── ui/           # Shared UI components
│   └── config/       # Shared TypeScript / tooling config
├── package.json      # Root workspace package
├── pnpm-workspace.yaml
└── turbo.json        # TurboRepo pipeline config
```

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all workspace dependencies
pnpm install

# Start the development server
pnpm dev
```

The web app will be available at **http://localhost:3000**.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm clean` | Remove all build outputs and node_modules |

## Browse Files

View all files and folders for this branch on GitHub:  
<https://github.com/gianig-hub/bookish-pancake/tree/phase-2-implementation>

---

For full project context and vision see [ek_github_summary_README.md](./ek_github_summary_README.md).
