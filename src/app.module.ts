import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { DetailPemesananModule } from './detail_pemesanan/detail_pemesanan.module';
import { KamarModule } from './kamar/kamar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TransaksiModule,
    PrismaModule,
    DetailPemesananModule,
    KamarModule,
  ],
})
export class AppModule {}
