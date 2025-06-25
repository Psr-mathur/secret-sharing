import { Box } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Box p={1}>
        {children}
      </Box>
    </Box>
  )
}
