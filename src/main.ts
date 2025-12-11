import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API documentation for User CRUD service')
    .setVersion('1.0')
    .addTag('users')
    .build();

  // swagger confgis:
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // ------------------------------------------------------

  // create pip line for filter and interceptor for responses:
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // ------------------------------------------------------

  // request and response loggger:
  app.useGlobalInterceptors(new LoggingInterceptor());
  // ------------------------------------------------------

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`server is run on port ${process.env.PORT}`);
}
bootstrap();
