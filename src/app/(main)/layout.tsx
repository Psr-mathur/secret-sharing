import { PageHeader } from '@/components/header'
import { VerifiedUser } from '@mui/icons-material'
import AuthWrapper from './_comp/auth-wrapper'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect('/api/auth/signin');
  }

  return (
    <AuthWrapper>
      <PageHeader>
        <PageHeader.Title >
          Secret Share
        </PageHeader.Title>
        <PageHeader.Content>
          <VerifiedUser />
        </PageHeader.Content>
      </PageHeader>
      {children}
    </AuthWrapper>
  )
}
