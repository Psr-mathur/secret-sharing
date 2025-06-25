import { PageHeader } from '@/components/header'
import AuthWrapper from './_comp/auth-wrapper'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import SignOutBtn from './_comp/signout-button';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect('/signin');
  }

  return (
    <AuthWrapper>
      <Box p={1}>
        <PageHeader>
          <PageHeader.Title >
            Secret Share
          </PageHeader.Title>
          <PageHeader.Content>
            <Typography variant="body1">
              {session.user.name}
            </Typography>
            <SignOutBtn />
          </PageHeader.Content>
        </PageHeader>
        {children}
      </Box>
    </AuthWrapper>
  )
}
