import React from 'react';
import { Box, Typography } from '@mui/material';

const SelectContent = () => {
  return (
    <Box
      sx={{
        maxHeight: 56,
        width: 215,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        pl: 1,
        p: '8px',
        backgroundColor: 'grey.200',
        borderRadius: 1,
      }}
    >
      <Typography variant="h6">User's Dashboard</Typography>
    </Box>
  );
};

export default SelectContent;
