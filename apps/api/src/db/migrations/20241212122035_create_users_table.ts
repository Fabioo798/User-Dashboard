import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Auto-increment ID
    table.string("name").notNullable(); // User's name
    table.string("email").unique().notNullable(); // User's email
    table.string("password").notNullable(); // Hashed password
    table.enum("role", ["admin", "user"]).defaultTo("user").notNullable(); // Role
    table.timestamps(true, true); // created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
