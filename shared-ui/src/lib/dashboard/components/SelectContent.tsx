import React from 'react';
import { Box, Typography } from '@mui/material';
import { SelectContentProps } from '../interfaces';

const SelectContent: React.FC<SelectContentProps> = ({ user }) => {
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
      <Typography variant="h6">{user.role === 'admin' ? "Admin's Dashboard" : "User's DashBoard"} </Typography>
    </Box>
  );
};

export default SelectContent;
