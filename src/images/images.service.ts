import { GoogleService } from '@/google.service';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private googleService: GoogleService,
  ) {}

  public async getImage(id: number) {
    const image = await this.prisma.image.findFirst({
      where: {
        id,
      },
    });

    return await this.googleService.getFile(image.image);
  }
}
