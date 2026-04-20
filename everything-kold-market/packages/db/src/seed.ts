import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding EK Marketplace database...');

  // --- Categories ---
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'ac-units' },
      update: {},
      create: { name: 'Air Conditioning Units', slug: 'ac-units', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'refrigeration' },
      update: {},
      create: { name: 'Refrigeration Equipment', slug: 'refrigeration', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'cold-rooms' },
      update: {},
      create: { name: 'Cold Rooms & Freezer Rooms', slug: 'cold-rooms', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'parts' },
      update: {},
      create: { name: 'Parts & Components', slug: 'parts', sortOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: 'services' },
      update: {},
      create: { name: 'Installation & Services', slug: 'services', sortOrder: 5 },
    }),
  ]);

  // --- Brands ---
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'daikin' },
      update: {},
      create: { name: 'Daikin', slug: 'daikin' },
    }),
    prisma.brand.upsert({
      where: { slug: 'lg' },
      update: {},
      create: { name: 'LG', slug: 'lg' },
    }),
    prisma.brand.upsert({
      where: { slug: 'mitsubishi' },
      update: {},
      create: { name: 'Mitsubishi Electric', slug: 'mitsubishi' },
    }),
    prisma.brand.upsert({
      where: { slug: 'fujitsu' },
      update: {},
      create: { name: 'Fujitsu', slug: 'fujitsu' },
    }),
    prisma.brand.upsert({
      where: { slug: 'carrier' },
      update: {},
      create: { name: 'Carrier', slug: 'carrier' },
    }),
    prisma.brand.upsert({
      where: { slug: 'samsung' },
      update: {},
      create: { name: 'Samsung', slug: 'samsung' },
    }),
  ]);

  // --- Cities ---
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { slug: 'london' },
      update: {},
      create: { name: 'London', slug: 'london', region: 'Greater London', sortOrder: 1 },
    }),
    prisma.city.upsert({
      where: { slug: 'manchester' },
      update: {},
      create: {
        name: 'Manchester',
        slug: 'manchester',
        region: 'Greater Manchester',
        sortOrder: 2,
      },
    }),
    prisma.city.upsert({
      where: { slug: 'birmingham' },
      update: {},
      create: { name: 'Birmingham', slug: 'birmingham', region: 'West Midlands', sortOrder: 3 },
    }),
    prisma.city.upsert({
      where: { slug: 'leeds' },
      update: {},
      create: {
        name: 'Leeds',
        slug: 'leeds',
        region: 'Yorkshire and the Humber',
        sortOrder: 4,
      },
    }),
    prisma.city.upsert({
      where: { slug: 'glasgow' },
      update: {},
      create: { name: 'Glasgow', slug: 'glasgow', region: 'Scotland', sortOrder: 5 },
    }),
    prisma.city.upsert({
      where: { slug: 'edinburgh' },
      update: {},
      create: { name: 'Edinburgh', slug: 'edinburgh', region: 'Scotland', sortOrder: 6 },
    }),
    prisma.city.upsert({
      where: { slug: 'bristol' },
      update: {},
      create: { name: 'Bristol', slug: 'bristol', region: 'South West England', sortOrder: 7 },
    }),
  ]);

  // --- Demo users ---
  const adminPassword = await bcrypt.hash('admin123', 10);
  const sellerPassword = await bcrypt.hash('seller123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ekmarketplace.co.uk' },
    update: {},
    create: {
      email: 'admin@ekmarketplace.co.uk',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
      profile: {
        create: { verified: true, cityId: cities[0].id },
      },
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      email: 'seller@example.com',
      password: sellerPassword,
      name: 'John Smith',
      role: 'SELLER',
      profile: {
        create: {
          businessName: 'Cool Systems Ltd',
          phone: '+44 7700 900123',
          verified: true,
          cityId: cities[0].id,
        },
      },
    },
  });

  // --- Demo listings ---
  await prisma.listing.upsert({
    where: { slug: 'daikin-25kw-wall-mount-demo' },
    update: {},
    create: {
      title: 'Daikin 2.5kW Wall-Mounted AC Unit — Like New',
      slug: 'daikin-25kw-wall-mount-demo',
      description:
        'High-quality Daikin wall-mounted air conditioning unit in excellent condition. Recently serviced. Includes remote, installation manual, and mounting brackets. Ideal for bedrooms or small offices.',
      status: 'PUBLISHED',
      condition: 'USED',
      price: 299.99,
      priceOnRequest: false,
      categoryId: categories[0].id,
      brandId: brands[0].id,
      model: 'FTXS25K',
      userId: seller.id,
      cityId: cities[0].id,
      featured: true,
      publishedAt: new Date(),
    },
  });

  await prisma.listing.upsert({
    where: { slug: 'lg-commercial-refrigeration-new-stock' },
    update: {},
    create: {
      title: 'LG Commercial Refrigeration Unit — New Stock',
      slug: 'lg-commercial-refrigeration-new-stock',
      description:
        'Brand-new LG commercial refrigeration unit, still in original packaging. Industrial grade with full UK warranty. Contact us for bulk pricing on multiple units.',
      status: 'PUBLISHED',
      condition: 'NEW',
      price: 799.0,
      priceOnRequest: false,
      categoryId: categories[1].id,
      brandId: brands[1].id,
      userId: seller.id,
      cityId: cities[1].id,
      featured: false,
      publishedAt: new Date(),
    },
  });

  console.log(`✅ Seeded:
  - ${categories.length} categories
  - ${brands.length} brands
  - ${cities.length} cities
  - Admin user: ${admin.email}
  - Seller user: ${seller.email}
  - 2 demo listings
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
