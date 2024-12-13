import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Dashboard, Login } from '@user-dashboard/shared-ui';
import { useFetchProfile } from '../service/userService';
import { useHandleEditProfile } from '../hooks/editProfileHook';
import { useHandleLogin } from '../hooks/userLoginHook';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { refetch } = useFetchProfile(user?.id || 0);

  const handleLogout = () => {
    dispatch(logout());
    // Navigate to login page or handle logout logic
  };

  const handleEditProfile = useHandleEditProfile();
  const handleLogin = useHandleLogin();

  const userRefetch = () => {
    refetch();
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard
              user={{ id: user.id, name: user.name || '', email: user.email || '' }}
              onLogout={handleLogout}
              onEditProfile={handleEditProfile}
              userRefetch={userRefetch}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
