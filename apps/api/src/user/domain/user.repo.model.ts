import User from "./user.model";

export default interface UserRepoModel {
 create: (user: User) => Promise<void>;
 update: (user: Partial<User>) => Promise<void>;
 find: (id: number) => Promise<User | null>;
 delete: (id: number) => Promise<void>;
 findAll: () => Promise<User[]>;
}
