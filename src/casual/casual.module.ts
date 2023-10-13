import { Module } from '@nestjs/common';
import { CasualService } from './casual.service';
import { CasualController } from './casual.controller';

@Module({
  controllers: [CasualController],
  providers: [CasualService]
})
export class CasualModule {}
