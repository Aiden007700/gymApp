import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { AppController } from './app/app.controller';
import * as fs from 'fs';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

console.log(
  'using envFilePath :',
  `${envFilePath}
To change env file, set NODE_ENV to one of the following: development, production`,
);

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database: 'gymApp',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        ssl: {
          ca: fs.readFileSync(process.env.DB_SSL || configService.get('DB_SSL')),
        },
        url: process.env.DB_URL || configService.get('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
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
