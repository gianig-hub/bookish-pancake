# EK Marketplace — API Overview

**Base URL**: `/api/v1`  
**Format**: JSON  
**Auth**: Bearer token (JWT via NextAuth)

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get session token |
| POST | `/auth/logout` | End session |
| GET | `/auth/me` | Get current authenticated user |

---

## Listings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/listings` | — | Browse/search listings |
| POST | `/listings` | ✅ | Create a listing |
| GET | `/listings/:id` | — | Get listing by ID |
| PATCH | `/listings/:id` | ✅ Owner/Admin | Update listing |
| DELETE | `/listings/:id` | ✅ Owner/Admin | Delete listing |
| PATCH | `/listings/:id/status` | ✅ Owner/Admin | Change status |

### Query Parameters (GET /listings)

| Param | Type | Description |
|-------|------|-------------|
| `query` | string | Keyword search |
| `type` | string | equipment \| service \| wanted |
| `category` | string | Category slug |
| `condition` | string | Item condition |
| `region` | string | UK region |
| `priceMin` | number | Minimum price |
| `priceMax` | number | Maximum price |
| `page` | number | Page number (default: 1) |
| `perPage` | number | Results per page (default: 20) |
| `sortBy` | string | createdAt \| price \| viewCount |
| `sortOrder` | string | asc \| desc |

---

## Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/categories` | — | List all categories |
| GET | `/categories/:slug` | — | Get category with children |

---

## Contact Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/messages` | — | Send a contact message |
| GET | `/messages` | ✅ Seller | Get messages received |
| PATCH | `/messages/:id/read` | ✅ Seller | Mark message as read |

---

## Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/me` | ✅ | Get own profile |
| PATCH | `/users/me` | ✅ | Update own profile |
| GET | `/users/me/listings` | ✅ | Get own listings |

---

## Media / Uploads

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/upload/image` | ✅ | Upload listing image |
| DELETE | `/upload/image/:id` | ✅ Owner | Delete image |

---

## Standard Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  }
}
```

### Error
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "title": ["Title is required"],
    "price": ["Price must be a positive number"]
  }
}
```

---

## Rate Limits

- Standard: 100 requests per minute per IP
- Upload: 10 requests per minute per authenticated user
