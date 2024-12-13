import { createSlice } from '@reduxjs/toolkit';
import { state } from '../interfaces';
import { jwtDecode } from 'jwt-decode';


const initialState: state = { token: null, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode<{ id: number; name: string, email: string }>(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    editProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, editProfile } = authSlice.actions;
export default authSlice.reducer;
