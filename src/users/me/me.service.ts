import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnergyInfoResponse, MyInfo } from 'src/types/users/MyInfo';
import { getUserEnergy } from 'src/utils/users/userEnergy';
import { getUserExpNeeded } from 'src/utils/users/userLevel';
import { User } from '@prisma/client';
import { GoogleService } from 'src/google.service';
import { MAX_ENERGY } from 'src/constants';

@Injectable()
export class MeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleService: GoogleService,
  ) {}

  public async getMyInfo(id: number): Promise<MyInfo> {
    const user = await this.prisma.user.findFirst({
      select: {
        energy: true,
        recoverStart: true,
        level: true,
        exp: true,
        gold: true,
      },
      where: {
        id,
      },
    });

    const expNeeded = getUserExpNeeded(user.level);
    const energyInfo = await this.getUserEnergy(
      id,
      user.energy,
      user.recoverStart,
    );

    return {
      level: user.level,
      exp: user.exp,
      expNeeded,
      ...energyInfo,
      gold: user.gold,
      unreadMails: 0,
    };
  }

  public async getUserImage(id: number) {
    const user = await this.prisma.user.findFirst({
      select: {
        image: true,
      },
      where: {
        id,
      },
    });

    if (!user.image) {
      return null;
    } else {
      return await this.googleService.getFile(user.image);
    }
  }

  public async getEnergy(id: number): Promise<EnergyInfoResponse> {
    const user = await this.prisma.user.findFirst({
      select: {
        energy: true,
        recoverStart: true,
      },
      where: {
        id,
      },
    });

    return this.getUserEnergy(id, user.energy, user.recoverStart);
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
      data.recoverStart = new Date();
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
  ): Promise<EnergyInfoResponse> {
    const energyInfo = getUserEnergy(energy, recoverAt);

    if (energyInfo.energy !== energy) {
      await this.prisma.user.update({
        data: {
          energy: energyInfo.energy,
          recoverStart: energyInfo.recoverStart,
        },
        where: {
          id,
        },
      });
    }

    return { energy: energyInfo.energy, recoverAt: energyInfo.recoverAt };
  }
}
