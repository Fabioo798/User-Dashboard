import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '../store/authSlice';
import { useLogin } from '../service/userService';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      console.log("Login response:", response);
      if (response && response.results) {
        dispatch(login(response.results));
        navigate('/profile');
      } else {
        console.error('Login failed: Invalid response structure');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', { required: 'Email is required' })}
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
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
