import { Module } from '@nestjs/common';
import { PortoService } from './porto.service';
import { PortoController } from './porto.controller';

@Module({
  controllers: [PortoController],
  providers: [PortoService]
})
export class PortoModule {}
