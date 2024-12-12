import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword1", // Use bcrypt-hashed passwords
      role: "admin",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: "User One",
      email: "user1@example.com",
      password: "hashedpassword2",
      role: "user",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      name: "User Two",
      email: "user2@example.com",
      password: "hashedpassword3",
      role: "user",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
