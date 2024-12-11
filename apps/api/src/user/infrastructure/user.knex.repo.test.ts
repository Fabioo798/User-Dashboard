import User from '../domain/user.model';
import { db } from '../../shared/shared';
import UserKnexRepository from './user.knex.repo';

jest.mock('../../shared/shared', () => {
  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    del: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
  };
  return {
    db: jest.fn(() => mockDb),
  };
});


describe('UserKnexRepository', () => {
  let userRepo: UserKnexRepository;
  const mockDb = db() as any;

  beforeEach(() => {
    userRepo = new UserKnexRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe('create', () => {
    it('should insert a user into the database', async () => {
      const user = new User(1, 'John Doe', 'john@example.com', 'password123');

      await userRepo.create(user);

      expect(mockDb.insert).toHaveBeenCalledWith(user.toDatabase());
    });
  });

  describe('update', () => {
    it('should update a user in the database', async () => {
      const userUpdates = { id: 1, name: 'John Updated' };

      await userRepo.update(userUpdates);

      expect(mockDb.where).toHaveBeenCalledWith('id', userUpdates.id);
      expect(mockDb.update).toHaveBeenCalledWith({
        ...userUpdates,
        id: undefined,
      });
    });
  });

  describe('find', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' };
      mockDb.first.mockResolvedValueOnce(user);

      const result = await userRepo.find(1);

      expect(mockDb.where).toHaveBeenCalledWith({ id: 1 });
      expect(mockDb.first).toHaveBeenCalled();
      expect(result).toEqual(new User(user.id, user.name, user.email, user.password));
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      mockDb.del.mockResolvedValueOnce(1);

      await userRepo.delete(1);

      expect(mockDb.where).toHaveBeenCalledWith({ id: 1 });
      expect(mockDb.del).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
      ];
      mockDb.select.mockResolvedValueOnce(users);

      const result = await userRepo.findAll();

      expect(mockDb.select).toHaveBeenCalledWith('*');
      expect(result).toEqual(users.map(user => new User(user.id, user.name, user.email, user.password)));
    });
  });
});
