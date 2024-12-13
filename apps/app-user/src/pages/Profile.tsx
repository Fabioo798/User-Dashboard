import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Box, Button, TextField, Typography, Alert, IconButton } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { useUpdateProfile } from '../service/userService';

interface ProfileFormInputs {
  id: number;
  name: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const user = useSelector((state: RootState) => state.auth.user);
  const updateProfile = useUpdateProfile();
  const { register, handleSubmit, setValue } = useForm<ProfileFormInputs>();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [editMode, setEditMode] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      await updateProfile.mutateAsync({ ...data, id: userId as number });
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setMessage('Failed to update profile.' + (error as Error).message);
      setMessageType('error');
    }
  };

  const handleEdit = (field: 'name' | 'email') => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    if (!editMode[field]) {
      setValue(field, user?.[field] || '');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Edit Profile</Typography>
      {message && <Alert severity={messageType || 'error'}>{message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          {editMode.name ? (
            <TextField
              {...register('name')}
              label="Name"
              fullWidth
              margin="normal"
              defaultValue={user?.name}
            />
          ) : (
            <Typography variant="body1">{user?.name}</Typography>
          )}
          <IconButton onClick={() => handleEdit('name')}>
            {editMode.name ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={2}>
          {editMode.email ? (
            <TextField
              {...register('email')}
              label="Email"
              fullWidth
              margin="normal"
              defaultValue={user?.email}
            />
          ) : (
            <Typography variant="body1">{user?.email}</Typography>
          )}
          <IconButton onClick={() => handleEdit('email')}>
            {editMode.email ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
