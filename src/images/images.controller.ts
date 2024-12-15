import { ImagesService } from '@/images/images.service';
import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('/:id')
  public async getImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const image = await this.imagesService.getImage(id);

    if (image.mimeType) {
      res.set({
        'Content-Type': image.mimeType,
      });
    }
    image.file.pipe(res);
  }
}
