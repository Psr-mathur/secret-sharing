import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import { SecretForm, type TForm } from './secret-form'
import { Close } from '@mui/icons-material';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';

export const CreateSecret = () => {
  const [open, setOpen] = React.useState(false);
  const createMutation = api.secret.create.useMutation();
  const apiUtils = api.useUtils();

  const onSubmit = (formValues: TForm) => {
    createMutation.mutate(
      {
        content: formValues.content,
        password: formValues.password ?? undefined,
        expiresAt: formValues.expiresAt?.toDate(),
      },
      {
        onSuccess: () => {
          toast.success('Secret created successfully');
          apiUtils.secret.getAll.invalidate().catch(console.error);
          apiUtils.secret.getCounts.invalidate().catch(console.error);
        },
        onError: () => toast.error('Something went wrong'),
        onSettled: () => setOpen(false),
      }
    );
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ ml: 1 }}>
        Create Secret
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>
              Create New Secret
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close color='error' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <SecretForm
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
