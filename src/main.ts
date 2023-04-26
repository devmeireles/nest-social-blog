import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as config from 'config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { IServerConfig } from './config/config.interface';

async function bootstrap() {
  const serverConfig = config.get<IServerConfig>('server');

  const app = await NestFactory.create(AppModule);

  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Nest Social Blog')
    .setDescription('Nest Social Blog client API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
