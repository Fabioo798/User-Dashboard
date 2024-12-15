import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useLogin } from '../service/userService';
import { apiLoginResponse } from '../interfaces';
import { set } from 'react-hook-form';

export const useHandleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = async (data: { email: string; password: string }): Promise<apiLoginResponse> => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response && response.results) {
        dispatch(login(response.results));
        navigate('/dashboard');
      } else {
        console.error('Login failed: Invalid response structure');
      }
      return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Login failed:');
      return { message: 'Login failed', results: "" };
    }
  };

  return handleLogin;
};



