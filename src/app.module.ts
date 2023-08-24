import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { DetailPemesananModule } from './detail_pemesanan/detail_pemesanan.module';
import { KamarModule } from './kamar/kamar.module';
import { TipeKamarModule } from './tipe_kamar/tipe_kamar.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DetailPemesananModule,
    KamarModule,
    PrismaModule,
    TransaksiModule,
    UserModule,
    TipeKamarModule,
    ServiceModule,
    AuthModule,
    HelperModule,
  ],
})
export class AppModule {}
