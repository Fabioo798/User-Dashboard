import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Dashboard } from '@user-dashboard/shared-ui';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import UserProfile from '../pages/userProfile';
const AppRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    // Navigate to login page or handle logout logic
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page or handle edit profile logic
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={user ? <Dashboard user={{ name: user.name || '', email: user.email || '' }} onLogout={handleLogout} onEditProfile={handleEditProfile} /> : <Login />}
      >
        <Route index element={<UserProfile />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="edit" element={<Profile />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
