import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, Snackbar, Alert, useMediaQuery, useTheme, Box } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {  User, UserAdminProfileCardsProps } from '../interfaces';

const UserAdminProfileCards: React.FC<UserAdminProfileCardsProps> = ({ onEditProfile, allUsers, handleRetrieve, handleRemove }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [editMode, setEditMode] = useState<{ [key: number]: { name: boolean; email: boolean } }>({});
  const [updatedUsers, setUpdatedUsers] = useState<{ [key: number]: User }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [errors, setErrors] = useState<{ [key: number]: { name?: string; email?: string } }>({});

  // Use useMemo to memoize the list of users
  const memoizedUsers = useMemo(() => allUsers || [], [allUsers]);

  useEffect(() => {
    handleRetrieve();
  }, [handleRetrieve]);

  const validate = (userId: number) => {
    const user = updatedUsers[userId];
    const newErrors: { name?: string; email?: string } = {};
    if (!user.name) {
      newErrors.name = 'Name cannot be empty';
    }
    if (!user.email) {
      newErrors.email = 'Email cannot be empty';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is not valid';
    }
    setErrors((prev) => ({ ...prev, [userId]: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (userId: number, field: 'name' | 'email') => {
    const user = allUsers.find((u) => u.id === userId);
    if (user) {
      setUpdatedUsers((prev) => ({
        ...prev,
        [userId]: { id: user.id, name: user.name, email: user.email },
      }));
    }
    setEditMode((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: !prev[userId]?.[field] },
    }));
  };

  const handleChange = (userId: number, field: 'name' | 'email') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: event.target.value },
    }));
  };

  const handleSave = async (userId: number) => {
    if (!validate(userId)) {
      return;
    }
    try {
      const updatedUser = updatedUsers[userId];
      const response = await onEditProfile(updatedUser);
      if (response.ok) {
        setSnackbarMessage('Profile updated successfully!');
        setSnackbarSeverity('success');
          await handleRetrieve()
      }
    } catch (error) {
      setSnackbarMessage('Failed to update profile.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setEditMode((prev) => ({
        ...prev,
        [userId]: { name: false, email: false },
      }));
    }
  };

    const handleDeleteUser = async (userId: number) => {
    try {
      await handleRemove(userId);
      setSnackbarMessage('User deleted successfully!');
      setSnackbarSeverity('success');
      await handleRetrieve()
    } catch (error) {
      setSnackbarMessage('Failed to delete user.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {memoizedUsers.map((user: User) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <PersonRoundedIcon />
              <Typography component="h2" variant="subtitle2" gutterBottom sx={{ fontWeight: '600' }}>
                ID: {user.id} {user.role} Information
              </Typography>
              {editMode[user.id]?.name ? (
                <TextField
                  value={updatedUsers[user.id]?.name || user.name}
                  onChange={handleChange(user.id, 'name')}
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={!!errors[user.id]?.name}
                  helperText={errors[user.id]?.name}
                />
              ) : (
                <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                  Name: {user.name}
                </Typography>
              )}
              {editMode[user.id]?.email ? (
                <TextField
                  value={updatedUsers[user.id]?.email || user.email}
                  onChange={handleChange(user.id, 'email')}
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors[user.id]?.email}
                  helperText={errors[user.id]?.email}
                />
              ) : (
                <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                  Email: {user.email}
                </Typography>
              )}
              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    endIcon={<ChevronRightRoundedIcon />}
                    fullWidth={isSmallScreen}
                    onClick={() => {
                      if (editMode[user.id]?.name || editMode[user.id]?.email) {
                        handleSave(user.id);
                      } else {
                        handleEdit(user.id, 'name');
                        handleEdit(user.id, 'email');
                      }
                    }}
                  >
                    {editMode[user.id]?.name || editMode[user.id]?.email ? 'Save' : 'Edit Profile'}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    fullWidth={isSmallScreen}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UserAdminProfileCards;
