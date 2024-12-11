import { PrismaClient } from '@prisma/client';

// Does nothing for now
export default async function addapt(prisma: PrismaClient) {
  return await prisma.user.findFirst({
    select: {
      id: true,
    },
  });
}
