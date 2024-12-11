import User from "../domain/user.model";
import UserRepoModel from "../domain/user.repo.model";

export default class UserService {
  constructor(private userRepo: UserRepoModel) {}

  async createUser(user: User): Promise<void> {
    await this.userRepo.create(user);
  }

  async updateUser(user: Partial<User>): Promise<void> {
    await this.userRepo.update(user);
  }

  async findUser(id: number): Promise<User | null> {
    return await this.userRepo.find(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
