# apps/api — EK Marketplace API

Express + TypeScript REST API for the EK Marketplace.

## Responsibility

- Authentication (register, login, logout, me)
- Listings CRUD (TODO)
- Business profiles (TODO)
- Wanted ads (TODO)
- Role-gated route protection

## Quick Start

```bash
npm install
npm run dev
```

API runs on `http://localhost:4000` by default.

## Routes (current)

| Method | Path                  | Auth     | Role      | Description          |
| ------ | --------------------- | -------- | --------- | -------------------- |
| GET    | /health               | No       | Any       | Health check         |
| POST   | /api/v1/auth/register | No       | Any       | Create account       |
| POST   | /api/v1/auth/login    | No       | Any       | Login                |
| POST   | /api/v1/auth/logout   | Required | Any       | Logout               |
| GET    | /api/v1/auth/me       | Required | Any       | Current user info    |

## Auth

Session IDs are returned on login/register and should be sent as:

```
Authorization: Bearer <sessionId>
```

## TODO

- Connect to PostgreSQL (replace in-memory user/session stores)
- Add Redis for session storage + rate limit store (rate-limit-redis)
- Add Zod request validation
- Add security headers (Helmet.js)
- Add request logging (Pino)
- Add OAuth / social login support
- Add email verification flow
