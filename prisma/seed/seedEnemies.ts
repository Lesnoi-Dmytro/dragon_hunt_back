import { PrismaClient } from '@prisma/client';
import { enemies } from 'prisma/seed/data/enemies';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedEnemies(
  prisma: PrismaClient,
  lastSeedId: number,
) {
  await seedEntity(
    'enemy',
    enemies.entries(),
    (enemy) => enemy.id,
    async (enemy) =>
      await prisma.enemy.findFirst({
        where: {
          id: enemy.id,
        },
        select: {
          id: true,
        },
      }),
    (enemy) => prisma.enemy.create({ data: enemy }),
    async (enemy) => {
      const { id, ...data } = enemy;
      const entity = data.entity.create;

      const entityData = await prisma.entity.findFirst({
        where: {
          enemy: { id },
        },
        select: {
          id: true,
        },
      });

      await prisma.entityInfo.update({
        where: {
          entityId: entityData.id,
        },
        data: entity.entityInfo.create,
      });
      delete entity.entityInfo;

      await prisma.entity.update({
        where: { id: entityData.id },
        data: entity,
      });
      delete data.entity;

      return prisma.enemy.update({
        where: { id },
        data: data,
      });
    },
    lastSeedId,
  );
}
