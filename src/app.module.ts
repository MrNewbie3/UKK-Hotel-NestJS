import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { MailModule } from './mail/mail.module';
import { CasualModule } from './casual/casual.module';
import { DudiModule } from './dudi/dudi.module';
import { NotificationModule } from './notification/notification.module';
import { PortoModule } from './porto/porto.module';
import { RatingModule } from './rating/rating.module';
import { SiswaModule } from './siswa/siswa.module';
import { CompetenceModule } from './competence/competence.module';
import { UserCasualModule } from './user_casual/user_casual.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    ServiceModule,
    AuthModule,
    HelperModule,
    MailModule,
    CasualModule,
    DudiModule,
    NotificationModule,
    PortoModule,
    RatingModule,
    SiswaModule,
    CompetenceModule,
    UserCasualModule,
  ],
})
export class AppModule {}
