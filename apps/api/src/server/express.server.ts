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
    this.app.listen(port, () => {
      debug(`Server running on port ${port}`);
    });

    db.raw('SELECT 1')
      .then(() => {
        console.log('Database connection successful');
        debug('Database connection successful');
      })
      .catch((error) => {
        console.error('Database connection failed', error);
        debug('Database connection failed', error);
        process.exit(1);
      });
  }
}
