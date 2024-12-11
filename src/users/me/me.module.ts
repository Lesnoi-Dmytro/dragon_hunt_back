import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { GoogleService } from 'src/google.service';

@Module({
  controllers: [MeController],
  providers: [MeService, GoogleService],
})
export class MeModule {}
