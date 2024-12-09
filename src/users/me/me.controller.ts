import { Controller, Get } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('users/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  public async getMyInfo() {
    return this.meService.getMyInfo(1);
  }

  @Get('/energy')
  public async getEnergy() {
    return this.meService.getEnergy(1);
  }
}
