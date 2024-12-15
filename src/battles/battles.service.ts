import { X_SIZE, Y_SIZE } from '@/constants';
import { PrismaService } from '@/prisma.service';
import { BattleResponse } from '@/types/battles/battleResponse';
import { MeService } from '@/users/me/me.service';
import { randomFromArray, removeRandomFromArray } from '@/utils/arrayUtils';
import { EnemyTemplate } from '@/utils/battles/enemyTemplate';
import mapBattleResponse from '@/utils/battles/mapBattleResponse';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AttackType, BattleType, Prisma } from '@prisma/client';

@Injectable()
export class BattlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meService: MeService,
  ) {}

  public async findAllBattles(type?: BattleType): Promise<BattleResponse[]> {
    const where = type ? { type } : {};

    const battles = await this.prisma.battle.findMany({
      where,
      select: this.battleSelectFields,
    });

    return battles.map(mapBattleResponse);
  }

  public async createBattle(
    id: number,
    difficultyEnum: string,
    userId: number,
  ) {
    const difficulty =
      difficultyEnum === 'Normal' ? 1 : difficultyEnum === 'Hard' ? 1.2 : 1.4;

    const combatId = await this.prisma.$transaction(async (prisma) => {
      await prisma.combat.deleteMany({
        where: {
          entities: {
            some: {
              character: {
                userId: userId,
              },
            },
          },
        },
      });

      await this.meService.spendEnergy(userId, 3, prisma);

      const battle = await prisma.battle.findFirst({
        where: { id },
        select: {
          level: true,
        },
      });

      const { level } = await prisma.user.findFirst({
        where: { id: userId },
        select: {
          level: true,
        },
      });
      if (battle.level > level) {
        throw new BadRequestException('Your level is too low for this battle');
      }

      const battleOpponents = await prisma.battleOpponent.findMany({
        where: { battleId: id },
        select: {
          enemy: {
            select: {
              id: true,
              gold: true,
              exp: true,
              value: true,
              type: true,
              entity: {
                select: {
                  level: true,
                  hp: true,
                  defense: true,
                  attack: true,
                  speed: true,
                  entityInfo: {
                    select: {
                      entityId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const combat = await prisma.combat.create({
        data: {
          xSize: X_SIZE,
          ySize: Y_SIZE,
          battle: { connect: { id } },
          entities: { create: [] },
        },
      });

      const enemies = await this.getOpponents(
        battleOpponents.map((opponent) => opponent.enemy),
        combat.id,
        difficulty,
        X_SIZE,
        Y_SIZE,
      );

      for (const enemy of enemies) {
        await prisma.combatEnemy.create({
          data: enemy,
        });
      }

      const characters = await prisma.character.findMany({
        where: { userId },
        select: {
          id: true,
          entity: {
            select: {
              hp: true,
              speed: true,
              entityInfo: {
                select: {
                  entityId: true,
                },
              },
            },
          },
          weapon: {
            select: {
              template: {
                select: {
                  type: true,
                },
              },
            },
          },
        },
      });
      const generatePositions = this.generatePositions(0, 0, 2, Y_SIZE);

      for (const character of characters) {
        const { x, y } = removeRandomFromArray(generatePositions);
        await prisma.combatEntity.create({
          data: {
            currentHp: character.entity.hp,
            movement: character.entity.speed,
            specialActions: { create: [] },
            reaction: character.weapon.template.type === AttackType.MELEE,
            x,
            y,
            combat: { connect: { id: combat.id } },
            character: { connect: { id: character.id } },
          },
        });
      }

      return combat.id;
    });

    return { combatId };
  }

  private async getOpponents(
    battleOpponents: EnemyTemplate[],
    combatId: number,
    difficulty: number,
    xSize: number,
    ySize: number,
  ): Promise<Prisma.CombatEnemyCreateInput[]> {
    const enemies: Prisma.CombatEnemyCreateInput[] = [];
    const templates: { modifier: number; template: EnemyTemplate }[] = [];

    const value = 200 * difficulty;
    const difficultyModifier = difficulty - 1;

    while (
      templates.reduce(
        (acc, template) => acc + template.modifier * template.template.value,
        0,
      ) < value
    ) {
      if (enemies.length < 6) {
        const template = randomFromArray(battleOpponents);
        const modifier = this.getModifier(template.value, difficultyModifier);
        templates.push({ modifier, template });
      } else {
        const weakest = Math.min(
          ...templates.map((enemy) => enemy.modifier * enemy.template.value),
        );
        const weakestIndex = templates.findIndex(
          (enemy) => enemy.modifier * enemy.template.value === weakest,
        );

        const template = randomFromArray(battleOpponents);
        const modifier = this.getModifier(
          template.value,
          difficultyModifier,
          weakest,
        );
        templates.splice(weakestIndex, 1, { modifier, template });
      }
    }

    const positions: { x: number; y: number }[] = this.generatePositions(
      xSize - 2,
      0,
      ySize,
      xSize,
    );

    templates.forEach((template) => {
      enemies.push(
        this.createEnemy(
          template.template,
          template.modifier,
          combatId,
          positions,
        ),
      );
    });

    return enemies;
  }

  private getModifier(
    value: number,
    difficultyModifier: number,
    minValue?: number,
  ) {
    if (!minValue) {
      minValue = value;
    }
    const min = 0.5 - (value * 1.5 - minValue) / value;

    return (
      1 + Math.floor(Math.random() * (0.5 - min) + min) + difficultyModifier
    );
  }

  private createEnemy(
    template: EnemyTemplate,
    modifier: number,
    combatId: number,
    positions: { x: number; y: number }[],
  ): Prisma.CombatEnemyCreateInput {
    const hp = this.getStat(template.entity.hp, modifier);
    const { x, y } = removeRandomFromArray(positions);

    const enemy: Prisma.CombatEnemyCreateInput = {
      level:
        template.entity.level + (modifier < 1.25 ? 0 : modifier < 1.5 ? 1 : 2),
      hp,
      defense: this.getStat(template.entity.defense, modifier),
      attack: this.getStat(template.entity.attack, modifier),
      speed: template.entity.speed,

      gold: this.getReward(template.gold, modifier),
      exp: this.getReward(template.exp, modifier),

      combatEntity: {
        create: {
          currentHp: hp,
          movement: template.entity.speed,
          reaction: template.type === AttackType.MELEE,

          x,
          y,

          combat: {
            connect: {
              id: combatId,
            },
          },
        },
      },

      entityInfo: {
        connect: {
          id: template.entity.entityInfo.entityId,
        },
      },
    };

    return enemy;
  }

  private getStat(stat: number, modifier: number) {
    return Math.floor(stat * (modifier + (0.15 - Math.random() * 0.3)));
  }

  private getReward(reward: number, modifier: number) {
    return Math.ceil(reward * (modifier + (0.15 - Math.random() * 0.3)) ** 2);
  }

  private generatePositions(
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number,
  ): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];

    for (let i = xStart; i < xEnd; i++) {
      for (let j = yStart; j < yEnd; j++) {
        positions.push({ x: i, y: j });
      }
    }

    return positions;
  }

  private readonly battleSelectFields = {
    id: true,
    name: true,
    type: true,
    level: true,
    opponents: {
      select: {
        enemy: {
          select: {
            id: true,
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
  };
}
