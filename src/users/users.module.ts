import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MeModule } from './me/me.module';
import { GoogleService } from 'src/google.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GoogleService],
  imports: [MeModule],
})
export class UsersModule {}
