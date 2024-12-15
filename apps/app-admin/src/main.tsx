import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import userTheme from './theme/userTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={userTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
