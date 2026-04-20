# Local Setup Guide

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node |
| Docker | 24+ | [docker.com](https://docker.com) |
| Docker Compose | v2 | Bundled with Docker Desktop |
| Git | any | [git-scm.com](https://git-scm.com) |

## 1. Clone the Repository

```bash
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake/everything-kold-market
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:
- `DATABASE_URL` — keep the default for local Docker setup
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `REDIS_URL` — keep the default for local Docker setup

## 4. Start Infrastructure Services

```bash
# Start PostgreSQL and Redis
docker-compose up -d db redis
```

Wait for services to be healthy:
```bash
docker-compose ps
```

## 5. Run Database Migrations

```bash
npm run db:migrate
```

## 6. Seed the Database (Optional)

```bash
npm run db:seed
```

This creates demo categories, brands, cities, and two test users:
- Admin: `admin@ekmarketplace.co.uk` / `admin123`
- Seller: `seller@example.com` / `seller123`

## 7. Start All Apps

```bash
npm run dev
```

| App | URL |
|---|---|
| Web (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:4000 |
| API health | http://localhost:4000/health |

## Full Docker Stack

To run everything in Docker (including web, api, worker):

```bash
docker-compose up
```

## Useful Commands

```bash
npm run db:studio    # Open Prisma Studio (database browser)
npm run build        # Build all packages
npm run lint         # Lint all code
npm run typecheck    # TypeScript check
```

## Troubleshooting

**Port already in use:**
```bash
lsof -i :3000   # Find what's using port 3000
lsof -i :4000   # Find what's using port 4000
```

**Database connection failed:**
- Ensure Docker is running: `docker-compose ps`
- Check logs: `docker-compose logs db`

**Prisma generate errors:**
```bash
npm run db:generate
```
