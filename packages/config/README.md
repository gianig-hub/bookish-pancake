# packages/config — KoldMarket Shared Configuration

Shared configuration files for TypeScript, ESLint, Prettier, and other tools used across the monorepo.

---

## Responsibility

This package provides **baseline tool configuration** that all apps and packages extend:

- TypeScript base config (`tsconfig.base.json`)
- ESLint base config (Node.js rules, React rules, import sorting)
- Prettier config (consistent code formatting)

Centralising these prevents configuration drift across apps — all services enforce the same code style and TypeScript settings.

---

## Usage

### TypeScript

In an app's `tsconfig.json`:
```json
{
  "extends": "@koldmarket/config/tsconfig/base.json"
}
```

### ESLint

In an app's `eslint.config.mjs`:
```javascript
import { baseConfig } from '@koldmarket/config/eslint'
export default baseConfig
```

### Prettier

In an app's `prettier.config.mjs`:
```javascript
export { default } from '@koldmarket/config/prettier'
```

---

## Structure

```
packages/config/
├── src/
│   ├── eslint/
│   │   ├── base.js       # Base ESLint rules (Node.js)
│   │   └── react.js      # React / Next.js ESLint rules
│   ├── tsconfig/
│   │   ├── base.json     # Base TypeScript config
│   │   └── react.json    # React TypeScript config
│   └── prettier.js       # Prettier config
└── README.md
```

---

## Code Style Summary

| Setting | Value |
|---|---|
| Quotes | Single |
| Semicolons | No |
| Line length | 100 chars |
| Indentation | 2 spaces |
| Trailing commas | ES5 |
| TypeScript strict | Yes |
