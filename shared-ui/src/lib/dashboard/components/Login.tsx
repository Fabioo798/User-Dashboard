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
    <AppTheme >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ width: isSmallScreen ? '100%' : '400px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email', { required: 'Email is required',
                   pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                } })}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}

              />
              <TextField
                {...register('password', { required: 'Password is required'
                //   ,minLength: {
                //   value: 8,
                //   message: 'Password must be at least 8 characters long'
                // },
                // pattern: {
                //   value: /^(?=.*[0-9]).*$/,
                //   message: 'Password must contain at least one number'
                // }
                 })}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </AppTheme>
  );
};

export default Login;
