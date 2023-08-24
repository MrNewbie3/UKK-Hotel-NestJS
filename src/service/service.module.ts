import { Module } from '@nestjs/common';
import { ImageKitService } from './imagekit_service';

@Module({
  exports: [ImageKitService],
  providers: [ImageKitService],
})
export class ServiceModule {}
