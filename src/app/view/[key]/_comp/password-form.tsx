import React, { useState } from 'react';
import {
  Box, TextField,
  Button,
  Typography
} from '@mui/material';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import type { Secret } from '@prisma/client';


type FormProps = {
  secretKey: string
  onSuccessCallBack: (data: Secret) => void
}

export const PasswordForm: React.FC<FormProps> = ({ secretKey, onSuccessCallBack }) => {
  const [password, setPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const viewMutation = api.secret.viewSecret.useMutation();

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      viewMutation.mutate(
        {
          key: secretKey,
          password: password ?? undefined
        }, {
        onSuccess: (data) => {
          onSuccessCallBack(data!);
        },
        onError: (error) => {
          toast.error(error.message ?? 'Something went wrong');
        }
      })
    }
  };

  return (
    <Box maxWidth={400}>
      <Typography>This secret is password protected. Please enter the password to view the secret</Typography>
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
        autoComplete="off"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={viewMutation.isPending}
      >
        Submit
      </Button>
    </Box>
  );
};