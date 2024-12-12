import User from "./user.model.js";

export default interface UserRepoModel {
 create: (user: User) => Promise<void>;
 update: (user: Partial<User>) => Promise<void>;
 find: (id: number) => Promise<User | null>;
 delete: (id: number) => Promise<void>;
 findAll: () => Promise<User[]>;
 search: (query: { key: string; value: unknown }) => Promise<User[]>;
}
