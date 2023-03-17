import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './common/config/swagger.config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConfig));
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

// TODO finisg exercise resource
// TODO test exercise resource
// TODO create a postman colection / script
// TODO add logging
// TODO add tests