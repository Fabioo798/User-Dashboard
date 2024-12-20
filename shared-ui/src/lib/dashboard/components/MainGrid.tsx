import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import UserProfileCard from './UserProfileCard';
import { MainGridProps } from '../interfaces';
import { Divider } from '@mui/material';
import UserAdminProfileCards from './usersAdminProfilesCards';
import CreateUser from './CreateUser';



export default function MainGrid({ user, allUsers, onEditProfile, userRefetch, handleRemove, handleRetrieve, handleCreateUser, showCreateUser} : MainGridProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={0}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {user.role === 'admin' ? (
          showCreateUser ? (
            <CreateUser handleCreateUser={handleCreateUser} />
          ) : (
            <UserAdminProfileCards user={user} allUsers={allUsers} onEditProfile={onEditProfile} userRefetch={userRefetch} handleRemove={handleRemove} handleRetrieve={handleRetrieve} />
          )
        ) : (
          <Grid item xs={12} sm={6} lg={3}>
            <UserProfileCard user={user} onEditProfile={onEditProfile} userRefetch={userRefetch} />
          </Grid>
        )}
      </Grid>
      </Grid>
      <Divider sx={{ mt:59 }} />
      <Copyright sx={{ mt: 6 }} />
    </Box>
  );
}
