import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConfig } from './index'
const { MYSQL } = getConfig()
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: MYSQL.host,
  port: MYSQL.port,
  username: MYSQL.username,
  password: MYSQL.password,
  database: MYSQL.database,
  synchronize: MYSQL.synchronize,
  logging: MYSQL.logging,
  entities: MYSQL.entities,
  autoLoadEntities: true,
  // 其他选项...
};