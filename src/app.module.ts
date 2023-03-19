import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './modules/app/app.controller';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { typeOrmAsyncConfig } from './common/config/typeorm.config';
import { NutraceuticalsModule } from './modules/nutraceuticals/nutraceuticals.module';



@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
    ExerciseModule,
    NutraceuticalsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
