import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { envi } from './config/envi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'verbose', 'error', 'log'],
  });
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hotel API Documentation')
    .setDescription(
      'Official API Documentation For UKK Hotels by Arthur Andy a.k.a. Atharafi',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envi.PORT, () => {
    console.log('Listening on port ' + envi.PORT);
  });
}
bootstrap();
