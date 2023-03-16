import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

//TODO remove hashed password from user entity response
// TODO finisg exercise resource
// TODO document all paths using swagger
// TODO create a postman colection / script
// TODO add logging
// TODO add tests