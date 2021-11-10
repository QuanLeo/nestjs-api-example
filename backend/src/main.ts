import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //only using white attr in DTO
      transform: true, //auto convert data input -> object DTO bellow
      forbidNonWhitelisted: true, //throw exception if data input # whitelist
      transformOptions: {
        enableImplicitConversion: true, //convert DTO
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TODO example')
    .setDescription('The Todo API example')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = +process.env.BACKEND_PORT;
  await app.listen(port);
}
bootstrap();
