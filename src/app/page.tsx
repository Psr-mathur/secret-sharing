'use client';
import { Stats } from './_comp/stats';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import { SecretTable } from './_comp/table';
import { ErrorAndLoaderWrapper } from '@/components/error-loader-wrapper';
import { Button, Tooltip } from '@mui/material';
import { CreateSecret } from './_comp/create-secret';

export default function Home() {
  const { data: secrets, isLoading, isError, error } = api.secret.getAll.useQuery(undefined, {
    throwOnError: () => {
      toast.error('Failed to fetch secrets');
      return false;
    }
  });

  return (
    <>
      <Stats />
      <ErrorAndLoaderWrapper
        isLoading={isLoading}
        isError={isError}
        error={{
          name: 'Failed to fetch secrets',
          message: error?.message ?? ''
        }}
        data={secrets}
      >
        {(secrets) => (
          <SecretTable
            data={secrets}
            options={{
              customToolbar: () => (
                <Tooltip title="Create New Secret">
                  <CreateSecret />
                </Tooltip>
              ),
            }}
          />
        )}
      </ErrorAndLoaderWrapper>
    </>
  );
}
