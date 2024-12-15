import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state } from '../interfaces';
import  { jwtDecode } from 'jwt-decode';

const initialState: state = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('token') ? jwtDecode<{ id: number; name: string; email: string; role: 'admin' | 'user' }>(localStorage.getItem('token')!) : null,
  allUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.user = jwtDecode<{ id: number; name: string; email: string; role: 'admin' | 'user' }>(action.payload);
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    editProfile: (state, action: PayloadAction<Partial<{ id: number; name: string; email: string; role: 'admin' | 'user' }>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateAllUsers: (state, action: PayloadAction<Array<{ id: number; name: string; email: string; role: 'admin' | 'user' }>>) => {
      state.allUsers = action.payload;
    },
    updateUser: (state, action: PayloadAction<{ id: number; name: string; email: string}>) => {
      const index = state.allUsers.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.allUsers[index] = { ...state.allUsers[index], ...action.payload };
      }
    },
  },
});

export const { login, logout, editProfile, updateAllUsers, updateUser } = authSlice.actions;
export default authSlice.reducer;
