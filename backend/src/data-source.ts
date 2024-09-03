import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Menu } from './entities/Menu';
import { MenuOption } from './entities/MenuOption';
import { MenuResponses } from './entities/MenuResponses';
import { User } from './entities/User';

// Configuração do DataSource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,  // Use migrações para produção
  logging: false,
  entities: [Menu, MenuOption, MenuResponses, User],
  migrations: [],
  subscribers: [],
});
