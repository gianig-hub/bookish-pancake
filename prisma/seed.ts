import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ─────────────────────────────────────────────
  // Categories
  // ─────────────────────────────────────────────

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'ac-units' },
      update: {},
      create: { name: 'AC Units', slug: 'ac-units' },
    }),
    prisma.category.upsert({
      where: { slug: 'refrigeration' },
      update: {},
      create: { name: 'Refrigeration', slug: 'refrigeration' },
    }),
    prisma.category.upsert({
      where: { slug: 'cold-rooms' },
      update: {},
      create: { name: 'Cold Rooms', slug: 'cold-rooms' },
    }),
    prisma.category.upsert({
      where: { slug: 'freezer-rooms' },
      update: {},
      create: { name: 'Freezer Rooms', slug: 'freezer-rooms' },
    }),
    prisma.category.upsert({
      where: { slug: 'parts' },
      update: {},
      create: { name: 'Parts & Components', slug: 'parts' },
    }),
    prisma.category.upsert({
      where: { slug: 'tools' },
      update: {},
      create: { name: 'Tools & Accessories', slug: 'tools' },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  // ─────────────────────────────────────────────
  // Test Users
  // ─────────────────────────────────────────────

  const passwordHash = await bcrypt.hash('password123', 10);

  const seller = await prisma.user.upsert({
    where: { email: 'seller@test.com' },
    update: {},
    create: {
      email: 'seller@test.com',
      name: 'Test Seller',
      passwordHash,
      role: 'SELLER',
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@test.com' },
    update: {},
    create: {
      email: 'buyer@test.com',
      name: 'Test Buyer',
      passwordHash,
      role: 'BUYER',
    },
  });

  console.log(`Created test users: ${seller.email}, ${buyer.email}`);

  // ─────────────────────────────────────────────
  // Sample Listings
  // ─────────────────────────────────────────────

  const acCategory = categories.find((c) => c.slug === 'ac-units');
  const refCategory = categories.find((c) => c.slug === 'refrigeration');

  if (acCategory && refCategory) {
    await prisma.listing.createMany({
      skipDuplicates: true,
      data: [
        {
          title: 'Daikin 5kW Split AC Unit — Used, Good Condition',
          description:
            'Daikin FTXB50C split AC unit, 5kW cooling capacity. Used for 2 years, works perfectly. Full set of indoor + outdoor units included. Ideal for small commercial or domestic use.',
          price: 450,
          condition: 'USED',
          listingType: 'FOR_SALE',
          status: 'ACTIVE',
          categoryId: acCategory.id,
          userId: seller.id,
        },
        {
          title: 'Mitsubishi Electric 3.5kW Wall Mount — Ex Display',
          description:
            'Mitsubishi Electric MSZ-HR35VF wall-mounted AC. Ex-display unit from a showroom. Never installed. Full manufacturer warranty. Remote control included.',
          price: 380,
          condition: 'EX_DISPLAY',
          listingType: 'FOR_SALE',
          status: 'ACTIVE',
          categoryId: acCategory.id,
          userId: seller.id,
        },
        {
          title: 'Commercial Refrigeration Unit — Wanted',
          description:
            'Looking for a commercial upright refrigeration unit for a small café. Budget £500–£1,000. Must be in working condition. Collection from Birmingham area.',
          condition: 'USED',
          listingType: 'WANTED',
          status: 'ACTIVE',
          categoryId: refCategory.id,
          userId: buyer.id,
        },
      ],
    });

    console.log('Created sample listings');
  }

  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
