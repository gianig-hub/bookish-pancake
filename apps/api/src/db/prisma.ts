/**
 * EK Marketplace — DB Placeholder
 * ---------------------------------
 * ASSUMPTION: Prisma will be used as the ORM.
 *
 * TODO: Run `npx prisma init` and define schema once DB structure is agreed.
 * TODO: Replace this placeholder with actual PrismaClient singleton.
 *
 * The Prisma client should be a singleton to avoid connection pool exhaustion.
 */

// TODO: Uncomment and implement once Prisma is installed and schema is created.
//
// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient({
//   log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
// });
//
// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

export const prisma = null; // Placeholder — remove when Prisma is set up
