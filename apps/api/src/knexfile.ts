import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(process.cwd(), process.env.DATABASE_PATH || 'db/dev.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(process.cwd(), process.env.MIGRATIONS_PATH || 'db/migrations'),
    },
    seeds: {
      directory: path.resolve(process.cwd(), process.env.SEEDS_PATH || 'db/seeds'),
    },
  },
};

export default config;
