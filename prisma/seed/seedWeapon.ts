import { PrismaClient } from '@prisma/client';
import { weapons, weaponTemplates } from 'prisma/seed/data/weapons';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedWeapon(prisma: PrismaClient) {
  await seedEntity(
    'weaponTemplate',
    weaponTemplates,
    (weapon) => weapon.id,
    (weapon) =>
      prisma.weaponTemplate.findFirst({
        where: {
          id: weapon.id,
        },
      }),
    async (weapon) => await prisma.weaponTemplate.create({ data: weapon }),
    async (weapon) => {
      return await prisma.weaponTemplate.update({
        where: { id: weapon.id },
        data: weapon,
      });
    },
  );

  await seedEntity(
    'weapon',
    weapons,
    (weapon) => weapon.template.connect.id,
    (weapon) =>
      prisma.weapon.findFirst({
        where: {
          id: weapon.template.connect.id,
        },
      }),
    async (weapon) => await prisma.weapon.create({ data: weapon }),
    async (weapon) => {
      return await prisma.weapon.update({
        where: { id: weapon.template.connect.id },
        data: weapon,
      });
    },
  );
}
