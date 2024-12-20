import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

dotenv.config();

const databasePath = path.resolve(process.env.DATABASE_PATH || '/app/db/dev.sqlite3');
const migrationsPath = path.resolve(process.env.MIGRATIONS_PATH || '/app/db/migrations');
const seedsPath = path.resolve(process.env.SEEDS_PATH || '/app/db/seeds');

console.log("DATABASE PATH:", databasePath);
console.log("MIGRATIONS PATH:", migrationsPath);
console.log("SEEDS PATH:", seedsPath);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databasePath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsPath,
    },
    seeds: {
      directory: seedsPath,
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: databasePath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsPath,
    },
    seeds: {
      directory: seedsPath,
    },
  },
};

export default config;
