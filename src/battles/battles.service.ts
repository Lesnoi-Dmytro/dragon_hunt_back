import { PrismaService } from '@/prisma.service';
import { BattleResponse } from '@/types/battles/battleResponse';
import mapBattleResponse from '@/utils/battles/mapBattleResponse';
import { Injectable } from '@nestjs/common';
import { BattleType } from '@prisma/client';

@Injectable()
export class BattlesService {
  constructor(private prisma: PrismaService) {}

  public async findAllBattles(type?: BattleType): Promise<BattleResponse[]> {
    const where = type ? { type } : {};

    const battles = await this.prisma.battle.findMany({
      where,
      select: this.battleSelectFields,
    });

    return battles.map(mapBattleResponse);
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
