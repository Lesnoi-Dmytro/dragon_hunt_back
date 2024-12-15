import { CurrentUser } from '@/auth/auth.guard';
import { BattlesService } from '@/battles/battles.service';
import { CreateBattleRequest } from '@/types/battles/createBattle';
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BattleType } from '@prisma/client';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Get()
  public getAllBattles(@Query('type') type: BattleType) {
    return this.battlesService.findAllBattles(type);
  }

  @Post('/start')
  public async startBattle(
    @Body() body: CreateBattleRequest,
    @CurrentUser('sub', new ParseIntPipe()) userId: number,
  ) {
    const combat = await this.battlesService.createBattle(body, userId);

    return combat;
  }
}
