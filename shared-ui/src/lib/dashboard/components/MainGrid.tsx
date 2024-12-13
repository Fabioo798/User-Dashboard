import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import UserProfileCard from './UserProfileCard';
import { MainGridProps } from '../interfaces';
import { Divider } from '@mui/material';



export default function MainGrid({ user, onEditProfile, userRefetch } : MainGridProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <UserProfileCard user={user} onEditProfile={onEditProfile} userRefetch={userRefetch} />
        </Grid>
      </Grid>
      <Divider sx={{ mt:59 }} />
      <Copyright sx={{ mt: 6 }} />
    </Box>
  );
}
