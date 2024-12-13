import React from 'react';
import { Card, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate } from 'react-router-dom';

interface HighlightedCardProps {
  user: {
    name: string;
    email: string;
  };
}

const HighlightedCard: React.FC<HighlightedCardProps> = ({ user }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit-profile');
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
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Name: {user.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Email: {user.email}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default HighlightedCard;
