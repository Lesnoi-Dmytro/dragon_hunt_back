import { Prisma, PrismaClient } from '@prisma/client';
import { equipmentBattles, resourcesBattles } from 'prisma/seed/data/battles';
import seedEntity from 'prisma/seed/seedEntity';

export default async function seedBattles(prisma: PrismaClient) {
  await seedEntity(
    'battle',
    [...equipmentBattles.entries(), ...resourcesBattles.entries()],
    (battle) => battle.id,
    (battle) =>
      prisma.battle.findFirst({
        where: {
          id: battle.id,
        },
      }),
    async (battle) => await prisma.battle.create({ data: battle }),
    async (battle) => {
      const { id, ...data } = battle;
      const opponents = data.opponents
        .create as Prisma.BattleOpponentUncheckedCreateWithoutBattleInput[];

      const existingOpponents = await prisma.battleOpponent.findMany({
        where: { battleId: id },
      });

      const deleteOpponents = existingOpponents.filter(
        (opponent) => !opponents.find((o) => o.enemyId === opponent.enemyId),
      );
      await prisma.battleOpponent.deleteMany({
        where: {
          OR: deleteOpponents,
        },
      });

      data.opponents.create = opponents.filter(
        (opponent) =>
          !existingOpponents.find((o) => o.enemyId === opponent.enemyId),
      );

      return await prisma.battle.update({
        where: { id: id },
        data: data,
      });
    },
  );
}
