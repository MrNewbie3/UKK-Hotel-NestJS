import { Module } from '@nestjs/common';
import { TipeKamarService } from './tipe_kamar.service';
import { TipeKamarController } from './tipe_kamar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceModule } from 'src/service/service.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [PrismaModule, ServiceModule, HelperModule],
  controllers: [TipeKamarController],
  providers: [TipeKamarService],
})
export class TipeKamarModule {}
