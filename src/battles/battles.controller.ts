import { BattlesService } from '@/battles/battles.service';
import { Controller, Get, Query } from '@nestjs/common';
import { BattleType } from '@prisma/client';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Get()
  public getAllBattles(@Query('type') type: BattleType) {
    return this.battlesService.findAllBattles(type);
  }
}
