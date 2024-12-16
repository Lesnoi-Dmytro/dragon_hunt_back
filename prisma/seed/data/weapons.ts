import { CharacterClass, Prisma, AttackType } from '@prisma/client';
import { weaponImages } from 'prisma/seed/data/images';
import { weaponActions } from 'prisma/seed/data/weaponActions';
import SeedData from 'prisma/seed/types/seedData';

export const weaponTemplates = new Map<
  string,
  SeedData<Prisma.WeaponTemplateCreateInput>
>([
  [
    'mastercrafted_sword',
    {
      data: {
        id: 1,
        name: 'Mastercrafted Sword',
        type: AttackType.MELEE,
        character: CharacterClass.WARRIOR,
        attack: 25,
        speed: 1,
        attackRange: 1,
        attackGrows: 1,
        action: { connect: { id: weaponActions.get('strongAttack').data.id } },
        image: { connect: { id: weaponImages.get('sword').data.id } },
      },
      seedId: 1,
    },
  ],
  [
    'ruby_stuff',
    {
      data: {
        id: 2,
        name: 'Ruby Staff',
        type: AttackType.RANGED,
        character: CharacterClass.MAGE,
        attack: 30,
        speed: -1,
        attackRange: 6,
        attackGrows: 1,
        action: { connect: { id: weaponActions.get('fireball').data.id } },
        image: { connect: { id: weaponImages.get('staff').data.id } },
      },
      seedId: 1,
    },
  ],
  [
    'carved_oak_bow',
    {
      data: {
        id: 3,
        name: 'Carved Oak Bow',
        type: AttackType.RANGED,
        character: CharacterClass.ROGUE,
        attack: 20,
        speed: 0,
        attackRange: 7,
        attackGrows: 1,
        action: { connect: { id: weaponActions.get('preparedShot').data.id } },
        image: { connect: { id: weaponImages.get('bow').data.id } },
      },
      seedId: 1,
    },
  ],
]);

export const weapons = new Map<string, SeedData<Prisma.WeaponCreateInput>>([
  [
    'mastercrafted_sword',
    {
      data: {
        level: 1,
        quality: 1,
        attack: weaponTemplates.get('mastercrafted_sword').data.attack,
        template: {
          connect: { id: weaponTemplates.get('mastercrafted_sword').data.id },
        },
      },
      seedId: 1,
    },
  ],
  [
    'ruby_stuff',
    {
      data: {
        level: 1,
        quality: 1,
        attack: weaponTemplates.get('ruby_stuff').data.attack,
        template: {
          connect: { id: weaponTemplates.get('ruby_stuff').data.id },
        },
      },
      seedId: 1,
    },
  ],
  [
    'carved_oak_bow',
    {
      data: {
        level: 1,
        quality: 1,
        attack: weaponTemplates.get('carved_oak_bow').data.attack,
        template: {
          connect: { id: weaponTemplates.get('carved_oak_bow').data.id },
        },
      },
      seedId: 1,
    },
  ],
]);
