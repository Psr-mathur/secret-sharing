import React, { useState } from 'react';
import {
  Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Button,
  type ButtonProps
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';

export type TForm = {
  content: string;
  password?: string | null;
  expiresAt: Dayjs | null;
}

type FormProps = {
  data?: TForm;
  onSubmit: (formValues: TForm) => void;
  submitBtnProps?: ButtonProps;
}

export const SecretForm: React.FC<FormProps> = ({ data, onSubmit, submitBtnProps }) => {
  const [accessType, setAccessType] = useState<'public' | 'password'>(data?.password ? 'password' : 'public');
  const [formValues, setFormValues] = useState<TForm>(data ?? {
    content: '',
    password: '',
    expiresAt: dayjs().add(1, 'day')
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formValues.content.trim()) {
      errors.content = 'Content is required';
    }
    if (!formValues?.expiresAt?.isValid()) {
      errors.expiresAt = 'Please select a valid expiration date';
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
      onSubmit(formValues);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 420, borderRadius: 2, boxShadow: 0 }}>
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
          value={formValues.expiresAt}
          onChange={(newValue) => setFormValues(prev => ({ ...prev, expiresAt: newValue }))}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              error: !!formErrors.expiresAt,
              helperText: formErrors.expiresAt,
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
          onChange={(e) => {
            setAccessType(e.target.value as 'public' | 'password');
            setFormValues(prev => ({ ...prev, password: undefined }));
          }}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="password" control={<Radio />} label="Password Protected" />
        </RadioGroup>
      </FormControl>


      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formValues.password ?? undefined}
        onChange={(e) => setFormValues(prev => ({ ...prev, password: e.target.value }))}
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
        disabled={accessType !== 'password'}
        autoComplete="off"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        {...submitBtnProps}
      >
        {data ? 'Update' : 'Share'}
      </Button>
    </Box>
  );
};