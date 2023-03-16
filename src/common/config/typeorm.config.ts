import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv'
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { init1678978661834 } from '../../../migrations/1678978661834-init';


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    host: process.env.DB_URL || configService.get('DB_URL'),
    username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
    password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
    database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
  }),
};


// local non async config for typeorm to be used with migrations

config({ path: `${__dirname}/../envs/development.env` });
 
export default new DataSource({
  type: 'postgres',
  synchronize: false,
  host: process.env.DB_URL,
  entities: [Task, User],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [init1678978661834],
});