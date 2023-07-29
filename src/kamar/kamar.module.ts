import { Module } from '@nestjs/common';
import { KamarService } from './kamar.service';
import { KamarController } from './kamar.controller';

@Module({
  controllers: [KamarController],
  providers: [KamarService]
})
export class KamarModule {}
