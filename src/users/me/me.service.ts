import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnergyInfo, MyInfo } from 'src/types/users/MyInfo';
import { getUserExp, getUserTotalExp } from 'src/utils/users/userExp';
import {
  generateRecoverDate as generateRecoverAt,
  getUserEnergy,
  MAX_ENERGY,
} from 'src/utils/users/userEnergy';
import { getUserExpNeeded, getUserLevel } from 'src/utils/users/userLevel';
import { User } from '@prisma/client';

@Injectable()
export class MeService {
  constructor(private readonly prisma: PrismaService) {}

  public async getMyInfo(id: number): Promise<MyInfo> {
    const user = await this.prisma.user.findFirst({
      select: {
        energy: true,
        recoverAt: true,
        gold: true,
        characters: {
          select: {
            exp: true,
          },
        },
      },
      where: {
        id,
      },
    });

    const totalExp = getUserTotalExp(user.characters);
    const level = getUserLevel(totalExp);
    const exp = getUserExp(totalExp, level);
    const expNeeded = getUserExpNeeded(level);
    const energyInfo = await this.getUserEnergy(
      id,
      user.energy,
      user.recoverAt,
    );

    return {
      level,
      exp,
      expNeeded,
      ...energyInfo,
      gold: user.gold,
      unreadMails: 0,
    };
  }

  public async getEnergy(id: number): Promise<EnergyInfo> {
    const user = await this.prisma.user.findFirst({
      select: {
        energy: true,
        recoverAt: true,
      },
      where: {
        id,
      },
    });

    return this.getUserEnergy(id, user.energy, user.recoverAt);
  }

  public async spendEnergy(userId: number, spentEnergy: number) {
    const user = await this.prisma.user.findFirst({
      select: {
        energy: true,
      },
      where: {
        id: userId,
      },
    });

    if (user.energy < spentEnergy) {
      throw new BadRequestException('Not enough energy');
    }

    const data: Partial<User> = { energy: user.energy - spentEnergy };
    if (spentEnergy > 0 && user.energy === MAX_ENERGY) {
      data.recoverAt = generateRecoverAt();
    }

    await this.prisma.user.update({
      data,
      where: {
        id: userId,
      },
    });
  }

  private async getUserEnergy(
    id: number,
    energy: number,
    recoverAt: Date,
  ): Promise<EnergyInfo> {
    const energyInfo = getUserEnergy(energy, recoverAt);

    if (energyInfo.energy !== energy) {
      await this.prisma.user.update({
        data: {
          ...energyInfo,
        },
        where: {
          id,
        },
      });
    }

    return energyInfo;
  }
}
