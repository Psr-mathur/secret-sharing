

import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import { SecretForm, type TForm } from './secret-form'
import { Close, Edit } from '@mui/icons-material';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import type { Secret } from '@prisma/client';
import dayjs from 'dayjs';

export const EditSecret = ({ data }: { data: Secret }) => {
  const [open, setOpen] = React.useState(false);
  const editMutation = api.secret.update.useMutation();

  const onSubmit = (formValues: TForm) => {
    editMutation.mutate(
      {
        content: formValues.content,
        password: formValues.password ?? undefined,
        expiresAt: formValues.expiresAt?.toDate(),
        key: data.key,
      },
      {
        onSuccess: () => toast.success('Secret edited successfully'),
        onError: (error) => toast.error(error.message ?? 'Something went wrong'),
      }
    );
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Edit color='primary' />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>
              Edit Secret
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close color='error' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <SecretForm
            data={{
              content: data.content,
              password: data.password,
              expiresAt: data.expiresAt ? dayjs(data.expiresAt) : null,
            }}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
