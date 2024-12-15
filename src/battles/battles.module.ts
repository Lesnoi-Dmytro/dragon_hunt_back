import { Module } from '@nestjs/common';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';
import { MeService } from '@/users/me/me.service';
import { GoogleService } from '@/google.service';

@Module({
  controllers: [BattlesController],
  providers: [BattlesService, MeService, GoogleService],
})
export class BattlesModule {}
