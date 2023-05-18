import { BadRequestException, ValidationError } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserInputError } from 'apollo-server-errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors), // TODO: Use graphql errors instead
      forbidUnknownValues: true,
    }),
  );
  await app.listen(6868);
}
bootstrap();
