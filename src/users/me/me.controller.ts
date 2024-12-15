import { Controller, Get, ParseIntPipe, Res } from '@nestjs/common';
import { MeService } from './me.service';
import { CurrentUser } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('users/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  public async getMyInfo(@CurrentUser('sub', new ParseIntPipe()) id: number) {
    return this.meService.getMyInfo(id);
  }

  @Get('/image')
  public async getImage(
    @CurrentUser('sub', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const image = await this.meService.getUserImage(id);

    if (image.mimeType) {
      res.set({
        'Content-Type': image.mimeType,
      });
    }
    image.file.pipe(res);
  }

  @Get('/energy')
  public async getEnergy(@CurrentUser('sub', new ParseIntPipe()) id: number) {
    return this.meService.getEnergy(id);
  }
}
