import { Knex } from 'knex';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Database path:', path.resolve(__dirname, 'db', 'dev.sqlite3'));

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
