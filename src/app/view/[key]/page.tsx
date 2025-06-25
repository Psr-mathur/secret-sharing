'use client'
import { Divider, Paper, Typography } from '@mui/material';
import React, { use, useState } from 'react'
import { PasswordForm } from './_comp/password-form';
import { api } from '@/trpc/react';
import { ErrorAndLoaderWrapper } from '@/components/error-loader-wrapper';
import SecretMessage from './_comp/secret-content';

export default function ViewPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const isPasswordProtected = key.length === 8;
  const [passVerified, setPassVerified] = useState<boolean>(false);

  const dataRes = api.secret.viewSecret.useQuery({ key }, {
    refetchOnWindowFocus: false,
    enabled: isPasswordProtected ? passVerified : true,
  });

  console.log(passVerified, isPasswordProtected, dataRes.data);

  if (isPasswordProtected && !passVerified) {
    return (
      <PasswordForm
        secretKey={key}
        onSuccessCallBack={() => {
          setPassVerified(true);
        }}
      />
    )
  }

  return (
    <ErrorAndLoaderWrapper
      isLoading={dataRes.isLoading}
      isError={dataRes.isError}
      error={{
        name: 'Failed to fetch secret',
        message: dataRes.error?.message ?? ''
      }}
      data={dataRes.data}
    >
      {(data) => {
        return (
          <SecretMessage
            content={data.content}
          />
        )
      }}
    </ErrorAndLoaderWrapper>
  )
}

