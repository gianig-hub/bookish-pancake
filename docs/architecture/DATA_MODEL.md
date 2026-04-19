# EK Marketplace — Data Model

> **Status**: Template / Planning stage. Full schema implemented in Phase 1.

---

## Core Entities

### User
```
User {
  id            String    PK, CUID
  email         String    unique
  name          String
  role          UserRole  ADMIN | SELLER | BUYER | INSTALLER | SHOP
  status        String    active | suspended | pending_verification
  emailVerified Boolean
  passwordHash  String?   null for OAuth users
  phone         String?
  avatarUrl     String?
  createdAt     DateTime
  updatedAt     DateTime
}
```

### Listing
```
Listing {
  id            String        PK, CUID
  type          ListingType   equipment | service | wanted | business
  status        ListingStatus draft | pending | active | sold | expired | removed
  title         String
  slug          String        unique
  description   String        text
  categoryId    String        FK → Category
  condition     String?       new | used-good | used-fair | for-parts
  price         Decimal?
  priceType     String        fixed | negotiable | poa | free
  location      String
  region        String?
  viewCount     Int           default 0
  featured      Boolean       default false
  expiresAt     DateTime?
  sellerId      String        FK → User
  createdAt     DateTime
  updatedAt     DateTime
}
```

### Category
```
Category {
  id        String  PK, CUID
  slug      String  unique
  label     String
  parentId  String? FK → Category (self-relation)
}
```

### ListingImage
```
ListingImage {
  id        String  PK, CUID
  listingId String  FK → Listing
  url       String
  altText   String?
  isPrimary Boolean default false
  order     Int     default 0
}
```

### ContactMessage
```
ContactMessage {
  id          String  PK, CUID
  listingId   String  FK → Listing
  sellerId    String  FK → User (denormalised for quick lookup)
  senderName  String
  senderEmail String
  senderPhone String?
  message     String  text
  read        Boolean default false
  createdAt   DateTime
}
```

### BusinessProfile
```
BusinessProfile {
  id           String  PK, CUID
  userId       String  unique FK → User
  businessName String
  slug         String  unique
  description  String?
  website      String?
  phone        String?
  email        String?
  address      Json?
  verified     Boolean default false
  logoUrl      String?
  coverUrl     String?
  createdAt    DateTime
  updatedAt    DateTime
}
```

---

## Relationships

```
User          ─── Listing          (1:many, FK sellerId)
User          ─── BusinessProfile  (1:1)
Listing       ─── ListingImage     (1:many)
Listing       ─── ContactMessage   (1:many)
Category      ─── Category         (self, 1:many parent/children)
Category      ─── Listing          (1:many)
```

---

## Notes

- Use Prisma for schema management and migrations
- Add indexes on: `Listing.status`, `Listing.type`, `Listing.categoryId`, `Listing.region`, `Listing.expiresAt`, `Listing.sellerId`
- Consider full-text search index on `Listing.title` + `Listing.description` (PostgreSQL `tsvector`)
- All IDs use CUID (not auto-increment) for distributed safety
