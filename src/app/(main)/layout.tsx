import { PageHeader } from '@/components/header'
import { VerifiedUser } from '@mui/icons-material'
import AuthWrapper from './_comp/auth-wrapper'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect('/api/auth/signin');
  }

  return (
    <AuthWrapper>
      <Box p={1}>
        <PageHeader>
          <PageHeader.Title >
            Secret Share
          </PageHeader.Title>
          <PageHeader.Content>
            <VerifiedUser />
          </PageHeader.Content>
        </PageHeader>
        {children}
      </Box>
    </AuthWrapper>
  )
}
