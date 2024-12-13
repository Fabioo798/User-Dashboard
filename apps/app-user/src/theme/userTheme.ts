// src/theme/userTheme.ts
import { createTheme } from '@mui/material/styles';

const userTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default userTheme;
