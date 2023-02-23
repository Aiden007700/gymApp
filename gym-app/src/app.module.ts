import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { TaskRepository } from './tasks/tasks.reposetory';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "gymAppDb",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmExModule.forCustomRepository([TaskRepository]),
  ],
})
export class AppModule {}

