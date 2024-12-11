import { EntityImage, PrismaClient } from '@prisma/client';

export async function seedImages(prisma: PrismaClient) {
  await prisma.$executeRaw`
    DO $$
    DECLARE current_value INT;
    BEGIN
      SELECT last_value INTO current_value FROM "Battle_id_seq";

      IF current_value < 2000 THEN
        ALTER SEQUENCE "Battle_id_seq" RESTART WITH 2000;
      END IF;
    END $$;
  `;

  for (const image of images) {
    const existingImage = await prisma.entityImage.findFirst({
      where: {
        id: image.id,
      },
    });

    if (!existingImage) {
      await prisma.entityImage.create({
        data: {
          ...image,
        },
      });
    }
  }
}

const images: EntityImage[] = [
  {
    id: 1,
    image: '/characters/warrior.svg',
  },
  {
    id: 2,
    image: '/characters/mage.svg',
  },
  {
    id: 3,
    image: '1_yRkXHtnocYl6y0XlHi_WYPz1MBBunhX',
  },
];
