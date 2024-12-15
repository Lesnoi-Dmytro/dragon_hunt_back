import { CharacterClass, Prisma } from '@prisma/client';

const initialCharacters: Prisma.CharacterCreateInput[] = [
  {
    user: {
      connect: {
        id: 1,
      },
    },
    class: CharacterClass.WARRIOR,
    entity: {
      create: {
        level: 1,
        hp: 100,
        defense: 15,
        attack: 30,
        speed: 7,
        entityInfo: {
          create: {
            name: 'Ironfist',
            imageId: 1,
          },
        },
      },
    },
    weapon: {
      connect: {
        id: 1,
      },
    },
    armor: {
      connect: {
        id: 1,
      },
    },
  },
  {
    user: {
      connect: {
        id: 1,
      },
    },
    class: CharacterClass.MAGE,
    entity: {
      create: {
        level: 1,
        hp: 60,
        defense: 5,
        attack: 40,
        speed: 4,
        entityInfo: {
          create: {
            name: 'Starbinder',
            imageId: 2,
          },
        },
      },
    },
    weapon: {
      connect: {
        id: 2,
      },
    },
    armor: {
      connect: {
        id: 2,
      },
    },
  },
  {
    user: {
      connect: {
        id: 1,
      },
    },
    class: CharacterClass.ROGUE,
    entity: {
      create: {
        level: 1,
        hp: 60,
        defense: 5,
        attack: 30,
        speed: 5,
        entityInfo: {
          create: {
            name: 'Nightshade',
            imageId: 3,
          },
        },
      },
    },
    weapon: {
      connect: {
        id: 3,
      },
    },
    armor: {
      connect: {
        id: 3,
      },
    },
  },
];

export default initialCharacters;
