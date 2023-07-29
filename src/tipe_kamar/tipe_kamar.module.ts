import { Module } from '@nestjs/common';
import { TipeKamarService } from './tipe_kamar.service';
import { TipeKamarController } from './tipe_kamar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TipeKamarController],
  providers: [TipeKamarService],
})
export class TipeKamarModule {}
