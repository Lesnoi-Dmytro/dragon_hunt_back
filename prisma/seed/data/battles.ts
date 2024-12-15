import { BattleType, Prisma } from '@prisma/client';
import { enemies } from 'prisma/seed/data/enemies';
import SeedData from 'prisma/seed/types/seedData';

export const equipmentBattles = new Map<
  string,
  SeedData<Prisma.BattleCreateInput>
>([
  [
    'poisonous_pit',
    {
      data: {
        id: 1,
        name: 'Poisonous pit',
        type: BattleType.EQUIPMENT,
        level: 1,
        opponents: {
          create: [
            { enemyId: enemies.get('anaconda').data.id },
            { enemyId: enemies.get('jumping_spider').data.id },
            { enemyId: enemies.get('black_widow').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
  [
    'bandits_camp',
    {
      data: {
        id: 2,
        name: 'Bandits Camp',
        type: BattleType.EQUIPMENT,
        level: 3,
        opponents: {
          create: [
            { enemyId: enemies.get('bandit').data.id },
            { enemyId: enemies.get('bow_bandit').data.id },
            { enemyId: enemies.get('bandit_leader').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
  [
    'rebels_hideout',
    {
      data: {
        id: 3,
        name: 'Rebels hideout',
        type: BattleType.EQUIPMENT,
        level: 5,
        opponents: {
          create: [
            { enemyId: enemies.get('rebel_knight').data.id },
            { enemyId: enemies.get('rebel_general').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
]);

export const resourcesBattles = new Map<
  string,
  SeedData<Prisma.BattleCreateInput>
>([
  [
    'poisonous_pit',
    {
      data: {
        id: 2001,
        name: 'Poisonous pit',
        type: BattleType.RESOURCES,
        level: 1,
        opponents: {
          create: [
            { enemyId: enemies.get('anaconda').data.id },
            { enemyId: enemies.get('jumping_spider').data.id },
            { enemyId: enemies.get('black_widow').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
  [
    'bandits_camp',
    {
      data: {
        id: 2002,
        name: 'Bandits Camp',
        type: BattleType.RESOURCES,
        level: 3,
        opponents: {
          create: [
            { enemyId: enemies.get('bandit').data.id },
            { enemyId: enemies.get('bow_bandit').data.id },
            { enemyId: enemies.get('bandit_leader').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
  [
    'rebels_hideout',
    {
      data: {
        id: 2003,
        name: 'Rebels hideout',
        type: BattleType.RESOURCES,
        level: 5,
        opponents: {
          create: [
            { enemyId: enemies.get('rebel_knight').data.id },
            { enemyId: enemies.get('rebel_general').data.id },
          ],
        },
      },
      seedId: 1,
    },
  ],
]);
