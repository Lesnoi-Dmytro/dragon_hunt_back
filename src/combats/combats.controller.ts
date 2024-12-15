import { CombatsService } from '@/combats/combats.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('combats')
export class CombatsController {
  constructor(private readonly combatsService: CombatsService) {}

  @Get('/:id')
  public getCombatById(@Param('id', new ParseIntPipe()) id: number) {
    return this.combatsService.getCombatById(id);
  }
}
