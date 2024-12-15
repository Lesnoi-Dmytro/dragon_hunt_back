import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CombatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCombatById(id: number) {
    return await this.prisma.combat.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        round: true,
        lastTurn: true,
        size: true,
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
                gold: true,
                exp: true,
                entityInfo: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
