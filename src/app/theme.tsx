import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    sidebar: string;
  }
}

export const getTheme = (primaryColor: string) => {

  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      error: {
        main: '#d32f2f',
      },
      secondary: {
        main: '#9c27b0',
      },
      info: {
        main: '#2196f3',
      },
      warning: {
        main: '#ff9800',
      },
      success: {
        main: '#4caf50',
      },
      background: {
        sidebar: primaryColor
      },
      text: {
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });
};
