import { CharacterClass, Prisma } from '@prisma/client';
import { armorImages } from 'prisma/seed/data/images';
import SeedData from 'prisma/seed/types/seedData';

export const armorTemplates = new Map<
  string,
  SeedData<Prisma.ArmorTemplateCreateInput>
>([
  [
    'heavy_armor',
    {
      data: {
        id: 1,
        name: 'Heavy Armor',
        character: CharacterClass.WARRIOR,
        defense: 10,
        speed: -1,
        defenseGrows: 1,
        image: { connect: { id: armorImages.get('armor').data.id } },
      },
      seedId: 1,
    },
  ],
  [
    'leather_armor',
    {
      data: {
        id: 2,
        name: 'Leather Armor',
        character: CharacterClass.ROGUE,
        defense: 5,
        speed: 0,
        defenseGrows: 1,
        image: { connect: { id: armorImages.get('armor').data.id } },
      },
      seedId: 1,
    },
  ],
  [
    'mage_robe',
    {
      data: {
        id: 3,
        name: 'Mage Robe',
        character: CharacterClass.WARRIOR,
        defense: 0,
        speed: 1,
        defenseGrows: 1,
        image: { connect: { id: armorImages.get('armor').data.id } },
      },
      seedId: 1,
    },
  ],
]);

export const armors = new Map<string, SeedData<Prisma.ArmorCreateInput>>([
  [
    'heavy_armor',
    {
      data: {
        level: 1,
        quality: 1,
        defense: armorTemplates.get('heavy_armor').data.defense,
        template: {
          connect: { id: armorTemplates.get('heavy_armor').data.id },
        },
      },
      seedId: 1,
    },
  ],
  [
    'leather_armor',
    {
      data: {
        level: 1,
        quality: 1,
        defense: armorTemplates.get('leather_armor').data.defense,
        template: {
          connect: { id: armorTemplates.get('leather_armor').data.id },
        },
      },
      seedId: 1,
    },
  ],
  [
    'mage_robe',
    {
      data: {
        level: 1,
        quality: 1,
        defense: armorTemplates.get('mage_robe').data.defense,
        template: {
          connect: { id: armorTemplates.get('mage_robe').data.id },
        },
      },
      seedId: 1,
    },
  ],
]);
