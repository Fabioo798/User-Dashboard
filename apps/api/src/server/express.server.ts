import express, { Express } from 'express';
import cors from 'cors';
import ServerRouter, { db } from '../shared/interfaces/interfaces.js';
import createDebug from 'debug';
import { errorMiddleware } from '../middlewares/error.middleware.js';

const debug = createDebug('App:ExpressServer');

const routes = [
  { endpoint: 'users/register', method: 'POST' },
  { endpoint: 'users/login', method: 'POST' },
  { endpoint: 'users/admin/login', method: 'POST' },
  { endpoint: '/users/:userId', method: 'GET' },
  { endpoint: '/users', method: 'GET' },
  { endpoint: '/users/:userId', method: 'PUT' },
  { endpoint: '/users/:userId', method: 'DELETE' },
  { endpoint: '/users/search/user', method: 'GET' },
];


export default class ExpressServer {
  app: Express;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }

  config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
  }

  routes(): void {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the API!', routes });
    });

    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  errorHandling(): void {
    this.app.use(errorMiddleware);
  }

  start(PORT = process.env.PORT): void {
    this.app.listen(PORT, () => {
      debug(`Server running on port ${PORT}`);
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
