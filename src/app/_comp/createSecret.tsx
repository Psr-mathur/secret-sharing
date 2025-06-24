/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import {
  Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Typography, Button
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast from 'react-hot-toast';
import dayjs, { type Dayjs } from 'dayjs';
import { api } from '@/trpc/react';

export const SecretForm: React.FC = () => {
  const [accessType, setAccessType] = useState<'public' | 'password'>('public');
  const [expiredAt, setExpiredAt] = useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [formValues, setFormValues] = useState({ content: '', password: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const createMutation = api.secret.create.useMutation();

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formValues.content.trim()) {
      errors.content = 'Content is required';
    }
    if (!expiredAt?.isValid()) {
      errors.expiredAt = 'Please select a valid expiration date';
    }
    if (accessType === 'password' && !formValues.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      createMutation.mutate(
        {
          content: formValues.content,
          password: accessType === 'password' ? formValues.password : undefined,
          expiresAt: expiredAt!.toDate(),
        },
        {
          onSuccess: () => toast.success('Secret created successfully'),
          onError: () => toast.error('Something went wrong'),
        }
      );
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 420, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>Share Content</Typography>

      <TextField
        fullWidth
        label="Content"
        name="content"
        multiline
        rows={4}
        value={formValues.content}
        onChange={(e) => setFormValues(prev => ({ ...prev, content: e.target.value }))}
        margin="normal"
        error={!!formErrors.content}
        helperText={formErrors.content}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Expires At"
          value={expiredAt}
          onChange={(newValue) => setExpiredAt(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              error: !!formErrors.expiredAt,
              helperText: formErrors.expiredAt,
            },
          }}
          disablePast
        />
      </LocalizationProvider>

      <FormControl component="fieldset" margin="normal">
        <FormLabel>Access</FormLabel>
        <RadioGroup
          row
          value={accessType}
          onChange={(e) => setAccessType(e.target.value as 'public' | 'password')}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="password" control={<Radio />} label="Password Protected" />
        </RadioGroup>
      </FormControl>

      {accessType === 'password' && (
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={(e) => setFormValues(prev => ({ ...prev, password: e.target.value }))}
          margin="normal"
          error={!!formErrors.password}
          helperText={formErrors.password}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Share
      </Button>
    </Box>
  );
};