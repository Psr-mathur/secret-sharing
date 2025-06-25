'use client'
import { ThemeProvider } from '@mui/material'
import React from 'react'
import { getTheme } from './theme'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme = getTheme('#000333')
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
