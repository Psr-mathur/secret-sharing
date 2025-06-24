'use client'
import { PageHeader } from '@/components/header'
import { VerifiedUser } from '@mui/icons-material'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      const authUrl = new URL('/api/auth/signin', window.location.origin);
      router.push(authUrl.toString());
    }
  }, [router, session, status]);
  return (
    <>
      <PageHeader>
        <PageHeader.Title >
          Secret Share
        </PageHeader.Title>
        <PageHeader.Content>
          <VerifiedUser />
        </PageHeader.Content>
      </PageHeader>
      {children}
    </>
  )
}
