'use client'
import { Box, Typography } from '@mui/material';
import React, { use, useState } from 'react'
import { PasswordForm } from './_comp/password-form';
import { api } from '@/trpc/react';
import { ErrorAndLoaderWrapper } from '@/components/error-loader-wrapper';
import type { Secret } from '@prisma/client';

export default function ViewPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params);
  const [data, setData] = useState<Secret | null>(null);
  const isPasswordProtected = key.length === 8;

  const isActiveRes = api.secret.checkIsActive.useQuery({ key });

  return (
    <ErrorAndLoaderWrapper
      isLoading={isActiveRes.isLoading}
      isError={isActiveRes.isError}
      error={{
        name: 'Failed to fetch secret',
        message: isActiveRes.error?.message ?? ''
      }}
      data={isActiveRes.data}
    >
      {(isActive) => {
        if (isPasswordProtected && isActive && !data) {
          return (
            <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <PasswordForm
                secretKey={key}
                onSuccessCallBack={setData}
              />
            </Box>
          )
        }
        return (
          <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h6">
              Secret Message
            </Typography>
            <Typography>
              {data?.content}
            </Typography>
          </Box>
        )
      }}
    </ErrorAndLoaderWrapper>
  )
}
