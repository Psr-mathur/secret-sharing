'use client'
import { ExitToApp } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutBtn() {
  return (
    <IconButton onClick={() => signOut()}>
      <ExitToApp />
    </IconButton>
  )
}