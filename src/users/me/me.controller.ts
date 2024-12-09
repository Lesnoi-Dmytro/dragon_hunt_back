import { Controller, Get, Post } from '@nestjs/common';
import { MeService } from './me.service';
import { CurrentUser } from 'src/auth/auth.guard';

@Controller('users/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  public async getMyInfo(@CurrentUser('sub') id: number) {
    return this.meService.getMyInfo(id);
  }

  @Get('/energy')
  public async getEnergy(@CurrentUser('sub') id: number) {
    return this.meService.getEnergy(id);
  }

  @Post('/spend')
  public async spendEnergy(@CurrentUser('sub') id: number) {
    return this.meService.spendEnergy(id, 1);
  }
}
