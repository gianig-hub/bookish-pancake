# @ek/types

Shared TypeScript types and contracts for the EK Marketplace monorepo.

## Contents

- `auth.ts` — User roles, session, login/register input shapes

## Usage

Import directly from the package:

```ts
import type { User, UserRole, Session } from '@ek/types';
```

## Roles

| Role             | Access                          |
| ---------------- | ------------------------------- |
| `buyer`          | Browse, save, message           |
| `private_seller` | Post personal ads               |
| `trader`         | Post trade ads, limited profile |
| `dealer`         | Full business listing           |
| `business`       | Business dashboard              |
| `admin`          | Full platform access            |

## TODO

- Add listing, category, and lead types
- Add API response envelope types
- Add pagination and error types
