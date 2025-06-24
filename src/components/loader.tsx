import Box, { type BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader: React.FC<{ sx?: BoxProps['sx'] }> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'inherit',
        width: 'inherit',
        ...sx
      }}
    >
      <CircularProgress />
    </Box>
  );
};

