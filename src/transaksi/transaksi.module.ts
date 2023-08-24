import { Module } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { TransaksiController } from './transaksi.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [PrismaModule, HelperModule],
  controllers: [TransaksiController],
  providers: [TransaksiService],
})
export class TransaksiModule {}
