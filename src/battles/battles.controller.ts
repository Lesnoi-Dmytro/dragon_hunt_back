import { CurrentUser } from '@/auth/auth.guard';
import { BattlesService } from '@/battles/battles.service';
import {
  Body,
  Controller,
  Get,
  Param,
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

  @Post('/:id/start')
  public async startBattle(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() { difficulty }: { difficulty: string },
    @CurrentUser('sub', new ParseIntPipe()) userId: number,
  ) {
    const combat = await this.battlesService.createBattle(
      id,
      difficulty,
      userId,
    );

    return combat;
  }
}
