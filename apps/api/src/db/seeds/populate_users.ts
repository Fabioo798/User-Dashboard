import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
      { id: 1, email: 'admin@example.com', password: 'hashedpassword1', name: 'Admin User', role: 'admin' },
      { id: 2, email: 'user1@example.com', password: 'hashedpassword2', name: 'User One', role: 'user' },
      { id: 3, email: 'user2@example.com', password: 'hashedpassword3', name: 'User Two', role: 'user' },
  ]);
};
