import type { Knex } from 'knex';
import * as path from 'path';

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'db', 'dev.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'db', 'seeds'),
    },
  }
};

export default config;
