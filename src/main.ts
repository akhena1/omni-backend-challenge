import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PinoLoggerProvider } from './adapters/providers/logger/pinoLoggerProvider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useLogger(new PinoLoggerProvider());

  const config = new DocumentBuilder()
    .setTitle('Omni Backend Challenge')
    .setDescription(
      '- API REST para simular um sistema simples de transações monetárias entre usuários.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.setGlobalPrefix('/api/v1/');

  await app.listen(3000);
}

bootstrap();
