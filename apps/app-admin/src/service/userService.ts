// src/services/userService.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLoginResponse } from '../interfaces';
import apiClient from './apiClient';

// Create an axios instance

// Login API call
export const useLogin = () =>
  useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const data = await apiClient.post('/login', credentials);
      const response: useLoginResponse = data.data;
      return response;
    },
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: async (user: { name: string; email: string; password: string }) => {
      const { data } = await apiClient.post('/register', user);
      return data;
    },
  });

export const useFetchProfile = (id: number) =>
  useQuery({
    queryKey: ['profile', id], // Include `id` in the query key
    queryFn: async () => {
      const { data } = await apiClient.get(`/${id}`); // Pass `id` in the URL
      return data;
    },
    enabled: !!id, // Ensure the query only runs if `id` is valid
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: async (profile: { id: number; name: string; email: string }) => {
      const { data } = await apiClient.put(`/${profile.id}`, profile);
      return data;
    },
  });

export const useFetchAllUsers = (token: string) =>
  useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const { data } = await apiClient.get('/',);
      return data;
    },  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete(`/${id}`);
      return response;
    },
  });

