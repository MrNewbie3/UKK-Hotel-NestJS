import { Module } from '@nestjs/common';
import { DetailPemesananService } from './detail_pemesanan.service';
import { DetailPemesananController } from './detail_pemesanan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DetailPemesananController],
  providers: [DetailPemesananService],
})
export class DetailPemesananModule {}
