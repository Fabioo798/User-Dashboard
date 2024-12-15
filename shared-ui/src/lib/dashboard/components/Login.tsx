import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, useMediaQuery, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import AppTheme from '../../shared-theme/AppTheme';
import { onLoginResponse } from '../interfaces';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin: (data: LoginFormInputs) => Promise<onLoginResponse>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
   try {
      const response: onLoginResponse = await onLogin(data);
      if (response.message === 'Login successful!') {
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(response.message || 'Login failed.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage(`Login failed. ${(error as Error).message || error}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };




  const handleCloseSnackbar = () => {
  setSnackbarOpen(false);
};

return (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)',
      zIndex: 9999,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        width: isSmallScreen ? '90%' : '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  </Box>
);
}

export default Login
