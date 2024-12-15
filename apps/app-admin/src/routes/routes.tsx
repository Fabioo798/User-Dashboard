/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Dashboard, Login, CreateUser } from '@user-dashboard/shared-ui';
import { useFetchProfile } from '../service/userService';
import { useHandleEditProfile } from '../hooks/editProfileHook';
import { useHandleLogin } from '../hooks/userLoginHook';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import userTheme from '../theme/userTheme';
import { useHandleRemove } from '../hooks/useHandleRemove';
import { useHandleRetrieve } from '../hooks/useHandleRetrive';
import { useHandleCreateUser } from '../hooks/useHandleCreateUser';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const allUsers = useSelector((state: RootState) => state.auth.allUsers);
  const { refetch } = useFetchProfile(user?.id || 0);

  const handleLogout = () => {
    dispatch(logout());
    // Navigate to login page or handle logout logic
  };

  const onCreateUserClick= () => {
    // Function implementation
  }
  const handleEditProfile = useHandleEditProfile();
  const handleRetrieve = useHandleRetrieve();
  const handleLogin = useHandleLogin();
  const handleRemove = useHandleRemove();
  const userRefetch = () => {
    refetch();
  };
  const handleCreateUser = useHandleCreateUser()

  return (
    <ThemeProvider theme={userTheme}>
    <Routes>
      <Route path="/login" element={<>
          <Dashboard
            user={{ id: 0, name: '', email: '', role: 'user' }}
            allUsers={[]}
            onLogout={() => {}}
            onEditProfile={() => Promise.resolve({ ok: true, message: 'Profile updated' })} // Mock implementation
              handleRemove={() => Promise.resolve({ ok: true, message: 'User removed' })} // Mock implementation
              handleRetrieve={() => Promise.resolve({results: []})} // Mock implementation
              handleCreateUser={() => Promise.resolve({ ok: true, message: 'User created' })} // Mock implementation
              userRefetch={() => {}} // Mock implementation
              onCreateUserClick={() => {}} // Mock implementation
          />
          <Login onLogin={handleLogin} />
        </>} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard
              user={{ id: user.id, name: user.name || '', email: user.email || '', role: user.role }}
              allUsers={allUsers}
              onLogout={handleLogout}
              onEditProfile={handleEditProfile}
              userRefetch={userRefetch}
              handleRetrieve={handleRetrieve}
              handleRemove={handleRemove}
              handleCreateUser={handleCreateUser}
              onCreateUserClick={onCreateUserClick}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard/create" element={<CreateUser handleCreateUser={handleCreateUser} />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
