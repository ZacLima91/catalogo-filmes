import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  

  const config = new DocumentBuilder()
    .setTitle('API_FILMES')
    .setDescription('API responsavel pela gestão de catalogo de filmes')
    .setVersion('1.0.0')
    .addTag('auth')
    .addTag('users')
    .addTag('status')
    .addTag('movies')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
