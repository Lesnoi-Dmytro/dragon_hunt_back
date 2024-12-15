import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { GoogleService } from '@/google.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, GoogleService],
})
export class ImagesModule {}
