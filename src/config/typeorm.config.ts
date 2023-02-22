import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { CategoryEntity } from '../categories/entities/category.entity';
import { UserEntity } from '../auth/user.entity';
import { IDatabaseConfig } from './config.interface';

const databaseConfig = config.get<IDatabaseConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || databaseConfig.host,
  port: parseInt(process.env.DB_PORT) || databaseConfig.port,
  username: process.env.DB_USERNAME || databaseConfig.username,
  password: process.env.DB_PASSWORD || databaseConfig.password,
  database: process.env.DB_DATABASE || databaseConfig.database,
  entities: [UserEntity, CategoryEntity],
  synchronize: !!process.env.DB_TYPEORM_SYNC || databaseConfig.synchronize,
};
