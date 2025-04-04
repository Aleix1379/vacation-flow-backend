import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from '../contexts/employee/domain/employee.entity';

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getRequiredEnvVar('DB_HOST'),
  port: parseInt(getRequiredEnvVar('DB_PORT')),
  username: getRequiredEnvVar('DB_USERNAME'),
  password: getRequiredEnvVar('DB_PASSWORD'),
  database: getRequiredEnvVar('DB_NAME'),
  entities: [Employee],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: process.env.NODE_ENV === 'production',
  extra: {
    retryAttempts: 5,
    retryDelay: 3000,
  },
};
