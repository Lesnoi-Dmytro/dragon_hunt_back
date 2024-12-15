import { PrismaClient } from '@prisma/client';
import { armors, armorTemplates } from 'prisma/seed/data/armors';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedArmor(
  prisma: PrismaClient,
  lastSeedId: number,
) {
  await seedEntity(
    'armorTemplate',
    armorTemplates,
    (armor) => armor.id,
    (armor) =>
      prisma.armorTemplate.findFirst({
        where: {
          id: armor.id,
        },
      }),
    async (armor) => await prisma.armorTemplate.create({ data: armor }),
    async (armor) => {
      return await prisma.armorTemplate.update({
        where: { id: armor.id },
        data: armor,
      });
    },
    lastSeedId,
  );

  await seedEntity(
    'armor',
    armors,
    (armor) => armor.template.connect.id,
    (armor) =>
      prisma.armor.findFirst({
        where: {
          id: armor.template.connect.id,
        },
      }),
    async (armor) => await prisma.armor.create({ data: armor }),
    async (armor) => {
      return await prisma.armor.update({
        where: { id: armor.template.connect.id },
        data: armor,
      });
    },
    lastSeedId,
  );
}
