import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
