import { createTheme } from '@mui/material';

// const lightTheme = {};

// const darkTheme = {};
const createThemeFromMode = (mode = 'LIGHT') =>
  createTheme({
    palette: {
      background: mode === 'LIGHT' ? '#fff' : '#0000',
    },
  });

export { createThemeFromMode };
