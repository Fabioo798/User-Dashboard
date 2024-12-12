import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.enum('role', ['admin', 'user']).defaultTo('user').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
  })
}

