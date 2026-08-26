import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') ?? 3000;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,

      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) => 
          Object.values(error.constraints ?? {})
        );

        return new BadRequestException({
          statusCode: 400,
          message: messages,
          error: 'Erro de validação',
        });
      }
    }),
  );

  app.enableCors();

  await app.listen(port);

  console.log(`Auth Service is running on port ${port}`);
}

bootstrap();
