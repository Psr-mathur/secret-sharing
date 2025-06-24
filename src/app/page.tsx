'use client';
import { Stats } from './_comp/stats';
import { SecretForm } from './_comp/createSecret';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';

export default function Home() {
  const { data: secrets } = api.secret.getAll.useQuery(undefined, {
    throwOnError: () => {
      toast.error('Failed to fetch secrets');
      return false;
    }
  });

  return (
    <>
      <Stats />
      {secrets?.map((secret) => (
        <div key={secret.id}>{secret.content}</div>
      ))}
      <SecretForm />
    </>
  );
}
