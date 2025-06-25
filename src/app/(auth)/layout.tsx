'use client'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  // [theme.breakpoints.up('sm')]: {
  //   maxWidth: '450px',
  // },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const AuthPageContainer = styled(Stack)(({ }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  // padding: theme.spacing(2),
  // [theme.breakpoints.up('sm')]: {
  //   padding: theme.spacing(4),
  // },
}));

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useTheme();
  return (
    <Box position={'relative'}>
      <AuthPageContainer direction="column" justifyContent="center" alignItems="center">
        <Card sx={{
          p: 2,
          width: '70vw',
          height: '85vh',
          borderRadius: '20px',
          background: `radial-gradient(circle, rgb(204, 198, 198) 0%, ${theme.palette.primary.main} 100%)`,
        }}>
          <Card variant="outlined" sx={{ p: 0, textAlign: "center", maxWidth: '540px', borderRadius: '20px', overflow: 'hidden' }}>
            <Box
              justifyContent="center"
              component={Paper}
              borderRadius={"20px"}
              py={1}
              width={'100%'}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h5"
                  sx={{ py: 1 }}
                >
                  Secret Share
                </Typography>
              </Box>
            </Box>
            {children}
          </Card>
        </Card>
      </AuthPageContainer>
    </Box>
  );
}