import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'refrigeration-units' },
      update: {},
      create: { name: 'Refrigeration Units', slug: 'refrigeration-units', description: 'Commercial refrigeration units', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'freezers' },
      update: {},
      create: { name: 'Freezers', slug: 'freezers', description: 'Commercial freezers', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'blast-chillers' },
      update: {},
      create: { name: 'Blast Chillers', slug: 'blast-chillers', description: 'Blast chilling equipment', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'cold-rooms' },
      update: {},
      create: { name: 'Cold Rooms', slug: 'cold-rooms', description: 'Walk-in cold rooms', sortOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: 'display-fridges' },
      update: {},
      create: { name: 'Display Fridges', slug: 'display-fridges', description: 'Display refrigeration units', sortOrder: 5 },
    }),
    prisma.category.upsert({
      where: { slug: 'ice-machines' },
      update: {},
      create: { name: 'Ice Machines', slug: 'ice-machines', description: 'Commercial ice makers', sortOrder: 6 },
    }),
    prisma.category.upsert({
      where: { slug: 'refrigerated-transport' },
      update: {},
      create: { name: 'Refrigerated Transport', slug: 'refrigerated-transport', description: 'Refrigerated vehicles and trailers', sortOrder: 7 },
    }),
    prisma.category.upsert({
      where: { slug: 'parts-accessories' },
      update: {},
      create: { name: 'Parts & Accessories', slug: 'parts-accessories', description: 'Spare parts and accessories', sortOrder: 8 },
    }),
  ])

  // Brands
  const brands = await Promise.all([
    prisma.brand.upsert({ where: { slug: 'williams' }, update: {}, create: { name: 'Williams', slug: 'williams' } }),
    prisma.brand.upsert({ where: { slug: 'foster' }, update: {}, create: { name: 'Foster', slug: 'foster' } }),
    prisma.brand.upsert({ where: { slug: 'gram' }, update: {}, create: { name: 'Gram', slug: 'gram' } }),
    prisma.brand.upsert({ where: { slug: 'true' }, update: {}, create: { name: 'True', slug: 'true' } }),
    prisma.brand.upsert({ where: { slug: 'hoshizaki' }, update: {}, create: { name: 'Hoshizaki', slug: 'hoshizaki' } }),
    prisma.brand.upsert({ where: { slug: 'manitowoc' }, update: {}, create: { name: 'Manitowoc', slug: 'manitowoc' } }),
    prisma.brand.upsert({ where: { slug: 'carrier' }, update: {}, create: { name: 'Carrier', slug: 'carrier' } }),
    prisma.brand.upsert({ where: { slug: 'thermo-king' }, update: {}, create: { name: 'Thermo King', slug: 'thermo-king' } }),
    prisma.brand.upsert({ where: { slug: 'tefcold' }, update: {}, create: { name: 'Tefcold', slug: 'tefcold' } }),
    prisma.brand.upsert({ where: { slug: 'iarp' }, update: {}, create: { name: 'IARP', slug: 'iarp' } }),
  ])

  // Cities
  const cities = await Promise.all([
    prisma.city.upsert({ where: { slug: 'london' }, update: {}, create: { name: 'London', slug: 'london', region: 'Greater London', sortOrder: 1 } }),
    prisma.city.upsert({ where: { slug: 'manchester' }, update: {}, create: { name: 'Manchester', slug: 'manchester', region: 'North West', sortOrder: 2 } }),
    prisma.city.upsert({ where: { slug: 'birmingham' }, update: {}, create: { name: 'Birmingham', slug: 'birmingham', region: 'West Midlands', sortOrder: 3 } }),
    prisma.city.upsert({ where: { slug: 'leeds' }, update: {}, create: { name: 'Leeds', slug: 'leeds', region: 'Yorkshire', sortOrder: 4 } }),
    prisma.city.upsert({ where: { slug: 'glasgow' }, update: {}, create: { name: 'Glasgow', slug: 'glasgow', region: 'Scotland', sortOrder: 5 } }),
    prisma.city.upsert({ where: { slug: 'sheffield' }, update: {}, create: { name: 'Sheffield', slug: 'sheffield', region: 'Yorkshire', sortOrder: 6 } }),
    prisma.city.upsert({ where: { slug: 'bristol' }, update: {}, create: { name: 'Bristol', slug: 'bristol', region: 'South West', sortOrder: 7 } }),
    prisma.city.upsert({ where: { slug: 'liverpool' }, update: {}, create: { name: 'Liverpool', slug: 'liverpool', region: 'North West', sortOrder: 8 } }),
    prisma.city.upsert({ where: { slug: 'edinburgh' }, update: {}, create: { name: 'Edinburgh', slug: 'edinburgh', region: 'Scotland', sortOrder: 9 } }),
    prisma.city.upsert({ where: { slug: 'nottingham' }, update: {}, create: { name: 'Nottingham', slug: 'nottingham', region: 'East Midlands', sortOrder: 10 } }),
  ])

  // Users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ekmarket.com' },
    update: {},
    create: {
      email: 'admin@ekmarket.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const sellerUser = await prisma.user.upsert({
    where: { email: 'seller@ekmarket.com' },
    update: {},
    create: {
      email: 'seller@ekmarket.com',
      password: hashedPassword,
      name: 'Demo Seller',
      role: 'SELLER',
    },
  })

  const buyerUser = await prisma.user.upsert({
    where: { email: 'buyer@ekmarket.com' },
    update: {},
    create: {
      email: 'buyer@ekmarket.com',
      password: hashedPassword,
      name: 'Demo Buyer',
      role: 'BUYER',
    },
  })

  // Sample listings
  const listingData = [
    {
      title: 'Williams GD1 Single Door Upright Fridge',
      slug: 'williams-gd1-single-door-upright-fridge-abc123',
      description: 'Excellent condition Williams GD1 single door upright refrigerator. Purchased new 2 years ago, used in a busy restaurant kitchen. Working perfectly, only selling due to kitchen downsizing. Dimensions: H 1850 x W 600 x D 640mm. Temperature range: 0-8°C. Has all original shelves and door seals in great condition.',
      condition: 'USED',
      price: 850,
      categoryId: categories[0].id,
      brandId: brands[0].id,
      model: 'GD1',
      cityId: cities[0].id,
      status: 'PUBLISHED',
      featured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Foster EP700H Blast Chiller/Freezer',
      slug: 'foster-ep700h-blast-chiller-freezer-def456',
      description: 'Foster EP700H blast chiller and freezer combination unit. 10 tray capacity, suitable for medium to large kitchens. Fully serviced 6 months ago. Comes with all trays and rack. Reason for selling: upgrading to larger unit. In full working order.',
      condition: 'USED',
      price: 2200,
      categoryId: categories[2].id,
      brandId: brands[1].id,
      model: 'EP700H',
      cityId: cities[1].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Hoshizaki IM-65NE-HC Ice Machine',
      slug: 'hoshizaki-im65-ice-machine-ghi789',
      description: 'Hoshizaki IM-65NE-HC modular ice machine. Produces up to 65kg of ice per 24 hours. Recently serviced, all new water filters installed. Excellent condition, 3 years old. Includes storage bin. Ideal for bars, hotels, and restaurants.',
      condition: 'USED',
      price: 1500,
      categoryId: categories[5].id,
      brandId: brands[4].id,
      model: 'IM-65NE-HC',
      cityId: cities[2].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'NEW True TGD-2-S Glass Door Merchandiser',
      slug: 'true-tgd2s-glass-door-merchandiser-jkl012',
      description: 'Brand new True TGD-2-S two-section glass door reach-in merchandiser. Factory sealed, never used. Perfect for convenience stores, delis, and cafes. LED lighting, self-closing doors. Full manufacturers warranty included.',
      condition: 'NEW',
      price: 3500,
      categoryId: categories[4].id,
      brandId: brands[3].id,
      model: 'TGD-2-S',
      cityId: cities[3].id,
      status: 'PUBLISHED',
      featured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Cold Room Panels — 6m x 4m Walk-In Cold Store',
      slug: 'cold-room-panels-6x4-walk-in-mno345',
      description: 'Complete cold room panel set for a 6m x 4m walk-in cold store. 80mm insulated panels, 2.2m height. Includes floor panels, ceiling, walls and insulated door. Refrigeration unit NOT included. Dismantled and available for collection. All panels in good condition with no damage.',
      condition: 'USED',
      priceOnRequest: true,
      categoryId: categories[3].id,
      cityId: cities[4].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Gram Compact KG 410 RG L1 Upright Freezer',
      slug: 'gram-compact-kg410-upright-freezer-pqr678',
      description: 'Gram Compact KG 410 RG L1 stainless steel upright freezer. -18°C to -22°C operation. 358 litre capacity. Used for 18 months in catering environment, in good working order. Minor surface scratches on exterior but nothing that affects function.',
      condition: 'USED',
      price: 650,
      categoryId: categories[1].id,
      brandId: brands[2].id,
      model: 'KG 410 RG',
      cityId: cities[5].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Tefcold FS1380S Double Door Display Fridge',
      slug: 'tefcold-fs1380s-double-door-display-stu901',
      description: 'Tefcold FS1380S upright double door display fridge. Excellent for drinks, dairy and cold food display. 1360 litre capacity, stainless steel interior, LED lighting. Lightly used for 1 year, immaculate condition. Full working order.',
      condition: 'USED',
      price: 1100,
      categoryId: categories[4].id,
      brandId: brands[8].id,
      model: 'FS1380S',
      cityId: cities[6].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Carrier Transicold Refrigeration Unit — Truck Mount',
      slug: 'carrier-transicold-truck-refrigeration-vwx234',
      description: 'Carrier Transicold Supra 550 truck-mounted refrigeration unit. Diesel powered, suitable for 12-15 tonne rigid vehicles. Maintained to full service schedule with all records available. Ready to work immediately. Reason for sale: fleet reduction.',
      condition: 'USED',
      price: 4800,
      categoryId: categories[6].id,
      brandId: brands[6].id,
      model: 'Supra 550',
      cityId: cities[7].id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  ]

  for (const data of listingData) {
    await prisma.listing.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        userId: sellerUser.id,
        views: Math.floor(Math.random() * 200),
      },
    })
  }

  console.log('✅ Seed complete!')
  console.log('Test accounts:')
  console.log('  admin@ekmarket.com / password123 (ADMIN)')
  console.log('  seller@ekmarket.com / password123 (SELLER)')
  console.log('  buyer@ekmarket.com / password123 (BUYER)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
