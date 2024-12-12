import jwt from 'jsonwebtoken';
import knex from "knex";
import config from '../../knexfile.js';
import { Router } from 'express'
import { Request } from 'express';

export interface TokenPayload extends jwt.JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface CustomError extends Error {
  statusCode: number;
  statusMessage: string;
}

export const db = knex(config.development);

export default interface ServerRouter {
  router: Router;
  path: string;
  registerControllers(): void;
}

export interface RequestPlus extends Request {
  info?: TokenPayload;
}
