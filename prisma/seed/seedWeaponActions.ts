import { PrismaClient } from '@prisma/client';
import { weaponActions } from 'prisma/seed/data/weaponActions';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedWeaponActions(prisma: PrismaClient) {
  await seedEntity(
    'weaponAction',
    weaponActions.entries(),
    (weaponAction) => weaponAction.id,
    (weaponAction) =>
      prisma.weaponAction.findFirst({
        where: {
          id: weaponAction.id,
        },
      }),
    async (weaponAction) =>
      await prisma.weaponAction.create({ data: weaponAction }),
    async (weaponAction) => {
      const { id, ...data } = weaponAction;

      return await prisma.weaponAction.update({
        where: { id: id },
        data: data,
      });
    },
  );
}
