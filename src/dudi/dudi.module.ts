import { Module } from '@nestjs/common';
import { DudiService } from './dudi.service';
import { DudiController } from './dudi.controller';

@Module({
  controllers: [DudiController],
  providers: [DudiService]
})
export class DudiModule {}
