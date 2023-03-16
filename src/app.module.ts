import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { AppController } from './app/app.controller';
import { ExerciseModule } from './exercise/exercise.module';
import * as fs from 'fs';
import { typeOrmAsyncConfig } from './common/config/typeorm.config';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

console.log(process.env.NODE_ENV);
console.log(
  'using envFilePath :',
  `${envFilePath}
To change env file, set NODE_ENV to one of the following: development, production`,
);


@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
    ExerciseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
