/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createUser, CreateUserProps } from '../interfaces';
import { useForm, SubmitHandler } from 'react-hook-form';

const CreateUser: React.FC<CreateUserProps> = ({ handleCreateUser }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<createUser>();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const onSubmit: SubmitHandler<createUser> = async (data) => {
    try {
    const response = await handleCreateUser(data);
    if(response.ok){
    setSnackbarMessage(response.message);
    setSnackbarSeverity(response.ok ? 'success' : 'error');
    setSnackbarOpen(true);
    reset()
    } else {
      setSnackbarMessage(response.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true)
    }
    } catch (error) {
      setSnackbarMessage('Failed to create user');
      setSnackbarSeverity('error');
      setSnackbarOpen(true)
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Create User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', { required: 'Name is required' })}
          label="Name"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
      />
      <TextField
          {...register('password', { required: 'Password is required' })}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            {...register('role', { required: 'Role is required' })}
            label="Role"
            defaultValue=""
            error={!!errors.role}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          {errors.role && <Typography variant="body2" color="error">{errors.role.message}</Typography>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateUser;
