import { NextFunction, Response } from 'express';
import { HTTPError } from '../shared/errors/error.js';
import { Auth } from '../shared/utils/auth.js';
import { RequestPlus, TokenPayload } from '../shared/interfaces/interfaces.js';


export class Interceptors {
  logged(req: RequestPlus, _resp: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HTTPError(
          498,
          'Invalid header',
          'Incorrect value in Auth Header'
        );
      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(498, 'Invalid header', 'Not bearer in auth header');
      const token = authHeader.slice(7);
      const payload = Auth.verifyJWTgettingPayload(token);
      req.info = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  authorized(req: RequestPlus, _res: Response, next: NextFunction): void {
    try {
        if (!req.info) {
          throw new HTTPError(
            498,
            'Token not found',
            'Token not found in authorized interceptor'
          );
        }

        const { role } = req.info as TokenPayload;
        if (role !== 'admin') {
          throw new HTTPError(
            403,
            'Forbidden',
            'You do not have permission to access this resource'
          );
        }

        next();
      } catch (error) {
        next(error);
      }
  }
}
