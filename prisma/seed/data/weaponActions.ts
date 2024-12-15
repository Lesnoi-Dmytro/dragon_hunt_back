import { ActionTarget, ActionTrigger, Prisma } from '@prisma/client';
import SeedData from 'prisma/seed/types/seedData';

export const weaponActions = new Map<
  string,
  SeedData<Prisma.WeaponActionCreateInput>
>([
  [
    'strongAttack',
    {
      data: {
        id: 1,
        name: 'Strong Attack',
        description:
          'Make an attack with a full strength. Deal 250% of your damage to a single target.',
        trigger: ActionTrigger.IMIDIATE,
        target: ActionTarget.ENEMY,
        cooldown: 2,
      },
      seedId: 1,
    },
  ],
  [
    'fireball',
    {
      data: {
        id: 2,
        name: 'Fireball',
        description:
          'Preapare a Fireball. Next turn you cast it with a regular attack, dealing 200% of your damage in a radius of 2 tiles.',
        trigger: ActionTrigger.NEXT_TURN,
        target: ActionTarget.FIELD,
        range: 5,
        spread: 2,
      },
      seedId: 1,
    },
  ],
  [
    'preparedShot',
    {
      data: {
        id: 3,
        name: 'Prepared Shot',
        description: 'This turn attack every enemy that will enter your reach.',
        trigger: ActionTrigger.REACTION,
        target: ActionTarget.ENEMY,
        cooldown: 2,
      },
      seedId: 1,
    },
  ],
]);
