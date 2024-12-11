import { Controller, Get, Post, Res } from '@nestjs/common';
import { MeService } from './me.service';
import { CurrentUser } from 'src/auth/auth.guard';

@Controller('users/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  public async getMyInfo(@CurrentUser('sub') id: number) {
    return this.meService.getMyInfo(id);
  }

  @Get('/image')
  public async getImage(@CurrentUser('sub') id: number, @Res() res) {
    const image = await this.meService.getUserImage(id);

    if (image.mimeType) {
      res.set({
        'Content-Type': image.mimeType,
      });
    }
    image.file.pipe(res);
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
