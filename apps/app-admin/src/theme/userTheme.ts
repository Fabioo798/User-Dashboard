import { createTheme } from '@mui/material/styles';

const userTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#ffebcd', // Cream
      contrastText: '#000000', // Black text
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffebcd', // Cream background for paper components
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#ffffff', // White text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1976d2', // Blue
    },
    h2: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      color: '#1976d2', // Blue
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '1rem',
      color: '#000000', // Black
    },
    body2: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '0.875rem',
      color: '#000000', // Black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1976d2', // Blue
        },
      },
    },
  },
});

export default userTheme;
