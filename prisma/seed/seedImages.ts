import { PrismaClient } from '@prisma/client';
import {
  armorImages,
  characterImages,
  enemyImages,
  weaponImages,
} from 'prisma/seed/data/images';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedImages(
  prisma: PrismaClient,
  lastSeedId: number,
) {
  await seedEntity(
    'image',
    [
      ...characterImages.entries(),
      ...weaponImages.entries(),
      ...armorImages.entries(),
      ...enemyImages.entries(),
    ],
    (image) => image.id,
    (image) =>
      prisma.image.findFirst({
        where: {
          id: image.id,
        },
      }),
    async (image) => await prisma.image.create({ data: image }),
    async (image) => {
      const { id, ...data } = image;

      return await prisma.image.update({
        where: { id: id },
        data: data,
      });
    },
    lastSeedId,
  );
}
