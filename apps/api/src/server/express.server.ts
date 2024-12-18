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

const allowedOrigins = [
  'https://admins-dashboard2.netlify.app',
  'https://users-dashboard2.netlify.app',
  'http://localhost:4500',
  'http://localhost:4200'
];

const corsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) {
    console.log('Request Origin:', origin); // Log the origin of the request
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


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
    this.app.use(cors(corsOptions)); // Use the CORS options
    this.app.use((req, res, next) => {
      console.log(`CORS headers set for origin: ${req.headers.origin}`);
      next();
    });
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

  start(PORT = parseInt(process.env.PORT || '4800', 10)): void {
    this.app.listen(PORT, '0.0.0.0', () => {
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
