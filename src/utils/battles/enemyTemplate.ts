import { AttackType } from '@prisma/client';

export interface EnemyTemplate {
  id: number;
  gold: number;
  exp: number;
  value: number;
  type: AttackType;
  entity: {
    level: number;
    hp: number;
    defense: number;
    attack: number;
    speed: number;
    entityInfo: {
      entityId: number;
    };
  };
}
