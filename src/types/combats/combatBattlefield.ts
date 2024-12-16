import { Action, AttackType, CharacterClass } from '@prisma/client';

export interface CombatBattlefield {
  id: number;
  round: number;
  lastTurn: Date;
  xSize: number;
  ySize: number;
  name: string;
  enemies: CombatBattlefieldEnemy[];
  characters: CombatBattlefieldCharacter[];
}

export interface CombatBattlefieldEnemy extends CombatBattlefieldEntity {
  type: AttackType;
}

export interface CombatBattlefieldCharacter extends CombatBattlefieldEntity {
  class: CharacterClass;
  weapon: {
    name: string;
    imageId: number;
    quality: number;
    level: number;
    speed: number;
    attack: number;
    attackRange: number;
    type: AttackType;
  };
  armor: {
    name: string;
    imageId: number;
    quality: number;
    level: number;
    speed: number;
    defense: number;
  };
}

export interface CombatBattlefieldEntity {
  id: number;
  name: string;
  imageId: number;

  level: number;
  hp: number;
  defense: number;
  attack: number;
  speed: number;

  currentHp: number;
  movement: number;
  action: Action;
  specialActions: [];
  reaction: boolean;
  x: number;
  y: number;
}
