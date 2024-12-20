import { useDispatch } from 'react-redux';
import { useFetchAllUsers } from '../service/userService';
import { updateAllUsers } from '../store/authSlice';
import { onRetriEveResponse } from '../interfaces';

export const useHandleRetrieve = () => {
  const dispatch = useDispatch();
  const { data, refetch } = useFetchAllUsers('');

  const handleRetrieve = async (): Promise<onRetriEveResponse> => {
    try {
      const { data } = await refetch();
      if (data.results.length > 0) {
        dispatch(updateAllUsers(data.results));
        return data.results.length
      } else {
        console.error('Retrieve failed: Invalid response structure');
        return data.results.length
      }
    } catch (error) {
      console.error('Retrieve failed:', error);
      return data.results.length
    }
  };

  return handleRetrieve
};
