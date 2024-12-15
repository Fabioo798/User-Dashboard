import { useDeleteUser } from '../service/userService';

export const useHandleRemove = () => {
  const deleteUserMutation = useDeleteUser();

  const handleRemove = async (id: number): Promise<void> => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.error('Remove failed:', error);
    }
  };

  return handleRemove;
};
