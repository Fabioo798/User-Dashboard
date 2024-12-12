import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtsecret: process.env.JWT_SECRET,
  saltrounds: process.env.SALT_ROUNDS
}
