import { db } from "../../shared/interfaces/interfaces.js";
import User from "../domain/user.model.js";
import UserRepoModel from "../domain/user.repo.model.js";

export default class UserKnexRepository implements UserRepoModel {

  async create(user: User): Promise<void> {
    await db('users').insert(user.toDatabase())
  }

  async update(user: Partial<User>): Promise<void> {
    if(!user.id){
      throw new Error('User id is required')
    }
    await db('users').where('id', user.id).update({
      ...user,
      id: undefined
    })
  }

  async find(id: number): Promise<User | null> {

    const user = await db('users').where({ id }).first()
    if(!user){
      throw new Error('User not found')
    }
    return new User(user.id, user.name, user.email, user.password)
  }

  async delete(id: number): Promise<void> {
    const result = await db('users').where({ id }).del();
    if(result === 0){
      throw new Error(`User with id ${id} not found`)
    }
  }

  async findAll(): Promise<User[]> {
    const users = await db('users').select('*');
    return users.map(user => new User(user.id, user.name, user.email, user.password))
  }

  async search(query: { key: string; value: unknown }): Promise<User[]> {
    const users = await db('users').where(query.key, query.value);
    return users.map(user => new User(user.id, user.name, user.email, user.password, user.role))
  }
}
