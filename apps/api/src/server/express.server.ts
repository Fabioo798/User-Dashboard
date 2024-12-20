import express, { Express } from 'express';
import cors from 'cors';
import ServerRouter, { db } from '../shared/interfaces/interfaces.js';
import createDebug from 'debug';
import { errorMiddleware } from '../middlewares/error.middleware.js';
import * as dotenv from 'dotenv';
import { Auth } from '../shared/utils/auth.js';

dotenv.config();

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
  PORT = process.env.PORT || 4000;

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

  async start(PORT = parseInt(process.env.PORT)): Promise<void> {
  console.log(PORT)
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      debug(`Server running on port ${PORT}`);
    });

    await this.checkDatabase();
  }


  async checkDatabase() {
      const hasUsersTable = await db.schema.hasTable('users');
      if (!hasUsersTable) {
        console.log('No users table found, creating table and initial user...');
        await this.createUsersTable();
      } else {
        console.log('Database connection successful');
        debug('Database connection successful');
      }
    }

  async createUsersTable() {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').notNullable();
      table.timestamps(true, true);
    });
    console.log('Users table created, creating initial user...');
    await this.createInitialUser();
    debug('Users table created');
  }


  async createInitialUser() {
    const hashedPassword = await Auth.hash('password1');
    await db('users').insert({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });
    console.log('Initial user created');
    debug('Initial user created');
  }
}
