"use client";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { EmergencyShare } from '@mui/icons-material';
import Link from 'next/link';

const validate = (values: { email: string; password: string }) => {
  const errors = {} as { email: string; password: string };
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export default function SignInPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return toast.error('Please fix the errors in the form');
    }
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });
      if (res?.error === null) {
        router.push('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error((error as Error)?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <EmergencyShare sx={{ fontSize: 96 }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, px: 4, pb: 2 }}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          size='small'
          value={formValues.email}
          onChange={e => setFormValues({ ...formValues, email: e.target.value.trimStart() })}
          type="email"
          required
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          size='small'
          value={formValues.password}
          onChange={e => setFormValues({ ...formValues, password: e.target.value })}
          type="password"
          error={!!formErrors.password}
          helperText={formErrors.password}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ my: 2 }} disabled={loading}>
          Sign In
        </Button>
        <Link href="/signup">{`Don't have an account? Sign up`}</Link>
      </Box>
    </Box>
  );
}
