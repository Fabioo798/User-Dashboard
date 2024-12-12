import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import { TokenPayload } from '../interfaces/interfaces.js';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);


export class Auth {
  static createJWT(payload: TokenPayload) {
    return jwt.sign(payload, config.jwtsecret as string, {expiresIn: '1h'});
  }

  static verifyJWTgettingPayload(token: string): TokenPayload {
    try {
      const result = jwt.verify(token, config.jwtsecret as string);
      if (typeof result === 'string') throw new Error(result);
      return result as TokenPayload;
    }catch (error) {
      throw new Error('Token verification failed: ' + error.message);
    }
  }

  static async hash(value: string) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(value, salt);
    } catch (error) {
      throw new Error('Hashing failed: ' + error.message);
    }
  }

  static async compare(value: string, hash: string) {
    try {
      return await bcrypt.compare(value, hash);
    } catch (error) {
      throw new Error('Comparison failed: ' + error.message);
    }
  }
}
