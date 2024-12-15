import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { BattlesModule } from './battles/battles.module';
import { ImagesModule } from './images/images.module';
import { CombatsModule } from './combats/combats.module';

@Global()
@Module({
  imports: [AuthModule, UsersModule, BattlesModule, ImagesModule, CombatsModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
