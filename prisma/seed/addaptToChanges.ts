import { PrismaClient } from '@prisma/client';

// Does nothing for now
export default async function addapt(prisma: PrismaClient, lastSeedId: number) {
  return await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      id: lastSeedId,
    },
  });
}
