'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  )
}

