import dotenv from 'dotenv';

dotenv.config();

export const configVariables = {
  jwt_secret: process.env.JWT_SECRET,
  salt_rounds: process.env.SALT_ROUNDS,
  db_path: process.env.DATABASE_PATH,
  seeds_path: process.env.SEEDS_PATH,
  migration_path: process.env.MIGRATION_PATH,
  port: process.env.PORT,
}
