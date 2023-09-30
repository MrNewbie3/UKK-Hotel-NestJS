import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    PrismaModule,
    HelperModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
