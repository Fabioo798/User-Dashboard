import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useLogin } from '../service/userService';
import { apiLoginResponse } from '../interfaces';
import { useCallback } from 'react';

export const useHandleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = useCallback(async (data: { email: string; password: string }): Promise<apiLoginResponse> => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response && response.results) {
        dispatch(login(response.results));
        navigate('/dashboard');
      } else {
        console.error('Login failed: Invalid response structure');
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      return { message: 'Login failed', results: "" };
    }
  }, [dispatch, navigate, loginMutation]);

  return handleLogin;
};
