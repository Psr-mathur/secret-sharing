import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { api } from '@/trpc/react';
import { Close, Delete } from '@mui/icons-material';
import toast from 'react-hot-toast';

export function DeleteSecret({ secretKey }: { secretKey: string }) {
  const [open, setOpen] = useState(false);
  const deleteMutation = api.secret.delete.useMutation();
  const apiUtils = api.useUtils();

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Delete color='error' />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>
              Delete Secret
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close color='error' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this secret?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteMutation.mutate({ key: secretKey }, {
                onSuccess: () => {
                  toast.success('Secret deleted successfully');
                  apiUtils.secret.getAll.invalidate().catch(console.error);
                  apiUtils.secret.getCounts.invalidate().catch(console.error);
                },
                onError: (error) => toast.error(error.message ?? 'Something went wrong'),
                onSettled: () => setOpen(false),
              });
              setOpen(false);
            }}
            variant="contained"
            color="error"
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
