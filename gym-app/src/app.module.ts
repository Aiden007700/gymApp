import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

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
        synchronize: true,
        autoLoadEntities: true,
        ssl: {
          ca: configService.get('DB_SSL'),
        },
        url: configService.get('DB_URL'),
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
})
export class AppModule {}
