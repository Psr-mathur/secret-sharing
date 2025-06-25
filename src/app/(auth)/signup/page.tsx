"use client";
import {
  Box,
  Button,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import { EmergencyShare } from '@mui/icons-material';
import Link from 'next/link';

type TForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validate = (formValues: TForm) => {
  const errors = {} as TForm;
  if (!formValues.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!formValues.email.trim()) {
    errors.email = 'Email is required';
  }
  if (!formValues.password.trim()) {
    errors.password = 'Password is required';
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

export default function SignUpPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const router = useRouter();
  const createUserMutation = api.user.createUser.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return toast.error('Please fix the errors in the form');
    }
    createUserMutation.mutate({
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
    }, {
      onSuccess: () => {
        router.push('/signin');
      },
      onError: (error) => {
        toast.error(error.message ?? 'Something went wrong');
      }
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <EmergencyShare sx={{ fontSize: 96 }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, px: 4, pb: 2 }}>
        <TextField
          fullWidth
          size='small'
          label="Name"
          margin="normal"
          value={formValues.name}
          onChange={e => setFormValues({ ...formValues, name: e.target.value.trimStart() })}
          required
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          fullWidth
          size='small'
          label="Email"
          margin="normal"
          value={formValues.email}
          onChange={e => setFormValues({ ...formValues, email: e.target.value.trimStart() })}
          type="email"
          required
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          fullWidth
          size='small'
          label="Password"
          margin="normal"
          value={formValues.password}
          onChange={e => setFormValues({ ...formValues, password: e.target.value.trimStart() })}
          type="password"
          error={!!formErrors.password}
          helperText={formErrors.password}
          required
        />
        <TextField
          fullWidth
          size='small'
          label="Confirm Password"
          margin="normal"
          value={formValues.confirmPassword}
          onChange={e => setFormValues({ ...formValues, confirmPassword: e.target.value.trimStart() })}
          type="password"
          required
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
        />
        <Button type="submit" variant="contained" fullWidth
          size='small' sx={{ my: 2 }} disabled={createUserMutation.isPending}>
          Sign Up
        </Button>
        <Link href="/signin">Already have an account? Sign in</Link>
      </Box>
    </Box>
  );
}
