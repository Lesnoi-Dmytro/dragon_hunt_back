import { CurrentUser } from '@/auth/auth.guard';
import { CombatsService } from '@/combats/combats.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('combats')
export class CombatsController {
  constructor(private readonly combatsService: CombatsService) {}

  @Get('/enemies/:id')
  public getCombatById(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser('sub') userId,
  ) {
    return this.combatsService.getCombatById(id, userId);
  }
}
