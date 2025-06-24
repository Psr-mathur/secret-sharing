import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, type BoxProps, Typography } from '@mui/material';
import React from 'react';

interface ErrorComponentProps {
  errorMessage?: string;
  sx?: BoxProps['sx'];
}

export const Error: React.FC<ErrorComponentProps> = ({ errorMessage, sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 'inherit',
        width: 'inherit',
        ...sx
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 50, color: 'error.main' }} />
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Oops! Something went wrong.
      </Typography>
      {errorMessage && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

