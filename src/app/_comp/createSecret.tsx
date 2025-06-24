'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  MenuItem,
  InputAdornment,
  Button
} from '@mui/material';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';

const timeUnits = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];

export const SecretForm: React.FC = () => {
  const [accessType, setAccessType] = useState<'public' | 'password'>('public');
  const [duration, setDuration] = useState('');
  const [unit, setUnit] = useState('hours');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const createMutation = api.secret.create.useMutation();

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      errors.duration = 'Enter a valid duration';
    }
    if (accessType === 'password' && !formValues.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const [formValues, setFormValues] = useState({
    content: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      createMutation.mutate({
        content: formValues.content,
        expiresIn: `${duration} ${unit}`,
        password: formValues.password
      }, {
        onError: (err) => {
          toast.error('Something went wrong');
        }
      });
    }
  };

  return (
    <Box component="form" sx={{ p: 3, maxWidth: 400, borderRadius: 2, boxShadow: 3 }} noValidate>
      <Typography variant="h6" gutterBottom>Share Content</Typography>

      <TextField
        fullWidth
        label="Content"
        name="content"
        multiline
        rows={4}
        value={formValues.content}
        onChange={handleChange}
        margin="normal"
        error={!!formErrors.content}
        helperText={formErrors.content}
      />

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Expires In"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          fullWidth
          error={!!formErrors.duration}
          helperText={formErrors.duration}
          InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }}
        />
        <TextField
          select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          fullWidth
          label="Unit"
        >
          {timeUnits.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Access</FormLabel>
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
          onChange={handleChange}
          margin="normal"
          error={!!formErrors.password}
          helperText={formErrors.password}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Share
      </Button>
    </Box>
  );
};