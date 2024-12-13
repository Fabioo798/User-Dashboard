import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

interface EditProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onSave: (updatedUser: { id: number; name: string; email: string }) => void;
}

interface ProfileFormInputs {
  name: string;
  email: string;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      onSave({ ...data, id: user.id });
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 2000);
    } catch (error) {
      setMessage('Failed to update profile.' + (error as Error).message);
      setMessageType('error');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', { required: 'Name is required' })}
          label="Name"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
        <TextField
          {...register('email', { required: 'Email is required' })}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <Button type="submit" variant="contained" fullWidth>
          Save
        </Button>
      </form>
      {message && (
        <Typography variant="body2" color={messageType === 'success' ? 'green' : 'red'}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default EditProfile;
