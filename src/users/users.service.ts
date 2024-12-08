import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  public async getAllUsers(
    page: number = 1,
    limit: number = 10,
    email?: string,
    name?: string,
  ) {
    const where: Prisma.UserWhereInput = {};
    if (name) {
      where.name = { contains: name };
    } else if (email) {
      where.email = { contains: email };
    }

    return await this.prismaService.user.findMany({
      select: { password: false },
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  public async getUsersByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async getUsersByName(name: string) {
    return await this.prismaService.user.findFirst({
      where: {
        name,
      },
    });
  }
}
