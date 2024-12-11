import { Prisma } from '@prisma/client';

// export async function seedEnemies(prisma: PrismaClient) {
//   for (const enemy of enemies) {
//     const existingEnemy = await prisma.enemy.findFirst({
//       where: {
//         id: enemy.id,
//       },
//     });

//     if (!existingEnemy) {
//       await prisma.enemy.create({
//         data: {
//           ...enemy,
//         },
//       });
//     }
// }

export const enemies: Prisma.EnemyCreateInput[] = [
  {
    id: 1,
    gold: 15,
    exp: 10,
    value: 10,
    entityInfo: {
      create: {
        name: 'Goblin',
        image: {
          create: {
            id: 1001,
            image: '/enemies/goblin.svg',
          },
        },
        entity: {
          create: {
            level: 1,
            hp: 100,
            attack: 10,
            defence: 10,
            speed: 10,
          },
        },
      },
    },
  },
];
