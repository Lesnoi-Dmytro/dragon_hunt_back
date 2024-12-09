import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { MeModule } from './me/me.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [MeModule],
})
export class UsersModule {}
