import { createUser } from '../interfaces';
import { useCreateUser } from '../service/userService';

export const useHandleCreateUser = () => {
  const createUser = useCreateUser();

  const handleCreateUser = async (newUser: createUser): Promise<{ ok: boolean; message: string }> => {
    try {
      await createUser.mutateAsync(newUser);
      return { ok: true, message: 'User created successfully' };
    } catch (error) {
      console.error('Failed to create user:', error);
      return { ok: false, message: 'Failed to create user' };
    }
  };

  return handleCreateUser;
};
