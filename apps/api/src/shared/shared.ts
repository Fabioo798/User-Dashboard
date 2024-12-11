import knex from "knex";
import config from "../server/domain/knexfile";

export const db = knex(config.development);
