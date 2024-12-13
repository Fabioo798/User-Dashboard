import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import HighlightedCard from './HighlightedCard';

interface MainGridProps {
  user: {
  name: string;
  email: string;
  };
}

export default function MainGrid({ user } : MainGridProps) {
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
          <HighlightedCard user={user}/>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 4 }} />
    </Box>
  );
}
