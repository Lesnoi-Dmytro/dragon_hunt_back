import { AttackType, Prisma } from '@prisma/client';
import { enemyImages } from 'prisma/seed/data/images';
import SeedData from 'prisma/seed/types/seedData';

export const enemies = new Map<string, SeedData<Prisma.EnemyCreateInput>>([
  [
    'anaconda',
    {
      data: {
        id: 1,
        gold: 20,
        exp: 15,
        value: 75,
        entity: {
          create: {
            level: 1,
            hp: 110,
            attack: 35,
            defense: 15,
            speed: 4,
            entityInfo: {
              create: {
                name: 'Anaconda',
                image: { connect: { id: enemyImages.get('anaconda').data.id } },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'jumping_spider',
    {
      data: {
        id: 2,
        gold: 15,
        exp: 10,
        value: 50,
        entity: {
          create: {
            level: 1,
            hp: 50,
            attack: 20,
            defense: 10,
            speed: 6,
            entityInfo: {
              create: {
                name: 'Jumping Spider',
                image: {
                  connect: { id: enemyImages.get('jumping_spider').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'black_widow',
    {
      data: {
        id: 3,
        gold: 35,
        exp: 50,
        value: 90,
        entity: {
          create: {
            level: 2,
            hp: 80,
            attack: 50,
            defense: 20,
            speed: 5,
            entityInfo: {
              create: {
                name: 'Black Widow',
                image: {
                  connect: { id: enemyImages.get('black_widow').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'bandit',
    {
      data: {
        id: 4,
        gold: 200,
        exp: 150,
        value: 50,
        entity: {
          create: {
            level: 3,
            hp: 140,
            attack: 90,
            defense: 50,
            speed: 6,
            entityInfo: {
              create: {
                name: 'Bandit',
                image: {
                  connect: { id: enemyImages.get('bandit').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'bow_bandit',
    {
      data: {
        id: 5,
        gold: 190,
        exp: 160,
        value: 50,
        type: AttackType.RANGED,
        entity: {
          create: {
            level: 3,
            hp: 100,
            attack: 80,
            defense: 30,
            speed: 5,
            entityInfo: {
              create: {
                name: 'Bandit Scout',
                image: {
                  connect: { id: enemyImages.get('bow_bandit').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'bandit_leader',
    {
      data: {
        id: 6,
        gold: 300,
        exp: 230,
        value: 80,
        entity: {
          create: {
            level: 3,
            hp: 210,
            attack: 130,
            defense: 60,
            speed: 6,
            entityInfo: {
              create: {
                name: 'Bandit Leader',
                image: {
                  connect: { id: enemyImages.get('bandit_leader').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'rebel_knight',
    {
      data: {
        id: 7,
        gold: 450,
        exp: 400,
        value: 50,
        entity: {
          create: {
            level: 5,
            hp: 350,
            attack: 160,
            defense: 80,
            speed: 5,
            entityInfo: {
              create: {
                name: 'Rebel Knight',
                image: {
                  connect: { id: enemyImages.get('rebel_knight').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
  [
    'rebel_general',
    {
      data: {
        id: 8,
        gold: 600,
        exp: 500,
        value: 80,
        entity: {
          create: {
            level: 5,
            hp: 500,
            attack: 200,
            defense: 100,
            speed: 5,
            entityInfo: {
              create: {
                name: 'Rebel General',
                image: {
                  connect: { id: enemyImages.get('rebel_general').data.id },
                },
              },
            },
          },
        },
      },
      seedId: 1,
    },
  ],
]);
