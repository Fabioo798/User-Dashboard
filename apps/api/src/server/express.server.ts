import express, { Express } from 'express';
import cors from 'cors';
import ServerRouter, { db } from '../shared/interfaces/interfaces.js';
import createDebug from 'debug';

const debug = createDebug('App:ExpressServer');

export default class ExpressServer {
  app: Express;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
  }

  routes(): void {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the API!' });
    });

    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  start(port: number): void {
    // SQLite does not need a persistent connection like MongoDB
    this.app.listen(port, () => {
      debug(`Server running on port ${port}`);
    });

    // Test the Knex connection (optional)
    db.raw('SELECT 1')
      .then(() => {
        debug('Database connection successful');
      })
      .catch((error) => {
        debug('Database connection failed', error);
        process.exit(1); // Exit if the database connection fails
      });
  }
}
