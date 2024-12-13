import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Box, Button, Typography } from '@mui/material';
import { logout } from '../store/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <Box>
      <Typography variant="h4">User Profile</Typography>
      <Box>
        <Typography variant="body1">ID: {user.id}</Typography>
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Box>
      <Button variant="contained" onClick={() => navigate('/edit')}>
        Edit Profile
      </Button>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserProfile;
