import type { Knex } from "knex";
import { Auth } from "../../shared/utils/auth";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword1 = await Auth.hash("password1");
  const hashedPassword2 = await Auth.hash("password2");
  const hashedPassword3 = await Auth.hash("password3");

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword1, // Use bcrypt-hashed passwords
      role: "admin",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: "User One",
      email: "user1@example.com",
      password: hashedPassword2,
      role: "user",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      name: "User Two",
      email: "user2@example.com",
      password: hashedPassword3,
      role: "user",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
