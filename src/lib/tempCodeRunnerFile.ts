export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });