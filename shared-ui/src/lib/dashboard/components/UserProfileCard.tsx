/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, useMediaQuery, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { HighlightedCardProps } from '../interfaces';





const UserProfileCard: React.FC<HighlightedCardProps> = ({ user, onEditProfile, userRefetch }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [editMode, setEditMode] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const [updatedUser, setUpdatedUser] = useState(user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleEdit = (field: 'name' | 'email') => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: 'name' | 'email') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [field]: event.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await onEditProfile(updatedUser);
      if(response.ok){
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      }
    } catch (error) {
      setSnackbarMessage('Failed to update profile.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setEditMode({ name: false, email: false });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <PersonRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          User Information
        </Typography>
        {editMode.name ? (
          <TextField
            value={updatedUser.name}
            onChange={handleChange('name')}
            label="Name"
            fullWidth
            margin="normal"
          />
        ) : (
          <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
            Name: {user.name}
          </Typography>
        )}
        {editMode.email ? (
          <TextField
            value={updatedUser.email}
            onChange={handleChange('email')}
            label="Email"
            fullWidth
            margin="normal"
          />
        ) : (
          <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
            Email: {user.email}
          </Typography>
        )}
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={() => {
            if (editMode.name || editMode.email) {
              handleSave();
            } else {
              handleEdit('name');
              handleEdit('email');
            }
          }}
        >
          {editMode.name || editMode.email ? 'Save' : 'Edit Profile'}
        </Button>
      </CardContent>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default UserProfileCard;