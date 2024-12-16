import { PrismaService } from '@/prisma.service';
import { CombatBattlefield } from '@/types/combats/combatBattlefield';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class CombatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCombatById(id: number, userId: number): Promise<CombatBattlefield> {
    const userCombat = await this.prisma.combat.findFirst({
      where: {
        id,
        entities: {
          some: {
            character: {
              userId,
            },
          },
        },
      },
    });
    if (!userCombat) {
      throw new ForbiddenException('You are not in this combat');
    }

    const combat = await this.prisma.combat.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        round: true,
        lastTurn: true,
        xSize: true,
        ySize: true,
        battle: {
          select: {
            name: true,
          },
        },
        entities: {
          select: {
            id: true,
            currentHp: true,
            movement: true,
            action: true,
            specialActions: true,
            reaction: true,
            x: true,
            y: true,
            character: {
              select: {
                id: true,
                class: true,
                entity: {
                  select: {
                    level: true,
                    hp: true,
                    defense: true,
                    attack: true,
                    speed: true,
                    entityInfo: {
                      select: {
                        name: true,
                        imageId: true,
                      },
                    },
                  },
                },
                weapon: {
                  select: {
                    level: true,
                    quality: true,
                    attack: true,
                    template: {
                      select: {
                        name: true,
                        imageId: true,
                        speed: true,
                        attackRange: true,
                        type: true,
                      },
                    },
                  },
                },
                armor: {
                  select: {
                    level: true,
                    quality: true,
                    defense: true,
                    template: {
                      select: {
                        name: true,
                        imageId: true,
                        speed: true,
                      },
                    },
                  },
                },
              },
            },
            enemy: {
              select: {
                id: true,
                level: true,
                hp: true,
                defense: true,
                attack: true,
                speed: true,
                enemy: {
                  select: {
                    type: true,
                    entity: {
                      select: {
                        entityInfo: {
                          select: {
                            name: true,
                            imageId: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      id: combat.id,
      round: combat.round,
      lastTurn: combat.lastTurn,
      xSize: combat.xSize,
      ySize: combat.ySize,
      name: combat.battle.name,
      enemies: combat.entities
        .filter((entity) => entity.character === null)
        .map((entity) => ({
          id: entity.id,
          name: entity.enemy.enemy.entity.entityInfo.name,
          imageId: entity.enemy.enemy.entity.entityInfo.imageId,
          type: entity.enemy.enemy.type,
          level: entity.enemy.level,
          hp: entity.enemy.hp,
          defense: entity.enemy.defense,
          attack: entity.enemy.attack,
          speed: entity.enemy.speed,
          currentHp: entity.currentHp,
          movement: entity.movement,
          action: entity.action,
          specialActions: [],
          reaction: entity.reaction,
          x: entity.x,
          y: entity.y,
        })),
      characters: combat.entities
        .filter((entity) => entity.character !== null)
        .map((entity) => ({
          id: entity.id,
          name: entity.character.entity.entityInfo.name,
          imageId: entity.character.entity.entityInfo.imageId,
          class: entity.character.class,
          level: entity.character.entity.level,
          hp: entity.character.entity.hp,
          defense: entity.character.entity.defense,
          attack: entity.character.entity.attack,
          speed: entity.character.entity.speed,
          currentHp: entity.currentHp,
          movement: entity.movement,
          action: entity.action,
          specialActions: [],
          reaction: entity.reaction,
          x: entity.x,
          y: entity.y,
          weapon: {
            name: entity.character.weapon.template.name,
            imageId: entity.character.weapon.template.imageId,
            quality: entity.character.weapon.quality,
            level: entity.character.weapon.level,
            speed: entity.character.weapon.template.speed,
            attack: entity.character.weapon.attack,
            attackRange: entity.character.weapon.template.attackRange,
            type: entity.character.weapon.template.type,
          },
          armor: {
            name: entity.character.armor.template.name,
            imageId: entity.character.armor.template.imageId,
            quality: entity.character.armor.quality,
            level: entity.character.armor.level,
            speed: entity.character.armor.template.speed,
            defense: entity.character.armor.defense,
          },
        })),
    };
  }
}
