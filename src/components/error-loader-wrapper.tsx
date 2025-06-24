import { Box } from '@mui/material';
import React from 'react';
import { Loader } from './loader';
import { Error } from './error';

type WrapperComponentProps<T> = {
  isLoading: boolean;
  isError: boolean;

  error: Error | null;
  data: T | undefined;
  children: (data: T) => React.ReactNode;
};

export const ErrorAndLoaderWrapper = <T,>({
  isLoading,
  isError,
  error,
  data,
  children,
}: WrapperComponentProps<T>) => (
  <Box>
    {isLoading ? (
      <Loader sx={{
        minHeight: '40dvh'
      }} />
    ) : isError ? (
      <Error
        sx={{
          minHeight: '40dvh'
        }}
        errorMessage={error?.message}
      />
    ) : (
      data && children(data)
    )}
  </Box>
);