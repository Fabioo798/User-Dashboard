import { useDispatch } from 'react-redux';
import { editProfile, updateUser } from '../store/authSlice';
import { useUpdateProfile } from '../service/userService';

export const useHandleEditProfile = () => {
  const dispatch = useDispatch();
  const updateProfile = useUpdateProfile();

  const handleEditProfile = async (updatedUser: { id: number; name: string; email: string }): Promise<{ ok: boolean; message: string }> => {
    try {
      const response = await updateProfile.mutateAsync(updatedUser);
      dispatch(editProfile(response));
      dispatch(updateUser(updatedUser))
      return { ok: true, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return { ok: false, message: 'Failed to update profile' };
    }
  };

  return handleEditProfile;
};
