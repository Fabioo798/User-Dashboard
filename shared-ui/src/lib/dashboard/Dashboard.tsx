import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
import MainGrid from './components/MainGrid';
import { Outlet } from 'react-router-dom';
import { DashboardProps } from './interfaces';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));


const Dashboard: React.FC<DashboardProps> = ({ user, allUsers, onLogout, onEditProfile, handleRemove, handleRetrieve, handleCreateUser }) => {
  function userRefetch(): void {
    throw new Error('Function not implemented.');
  }

  const [showCreateUser, setShowCreateUser] = useState(false);

  const onCreateUserClick = () => {
    setShowCreateUser(true);
  };

  const onHomeClick = () => {
    setShowCreateUser(false);
  };

  return (
    <ThemeProvider theme={AppTheme}>
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
       <SideMenu user={user} onLogout={onLogout} onCreateUserClick={onCreateUserClick} onHomeClick={onHomeClick}/>
       <AppNavbar user={user} onLogout={onLogout} onEditProfile={onEditProfile} onCreateUserClick={onCreateUserClick} onHomeClick={onHomeClick}/>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header showCreateUser={showCreateUser}/>
            <MainGrid user={user} showCreateUser={showCreateUser} allUsers={allUsers} onEditProfile={onEditProfile} userRefetch={userRefetch} handleRemove={handleRemove} handleRetrieve={handleRetrieve} handleCreateUser={handleCreateUser}/>
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
    </ThemeProvider>
  );
}

export default Dashboard;

