import { Box } from '@mui/material'
import React from 'react'
import { EditSecret } from './edit-secret'
import type { Secret } from '@prisma/client';
export const ActionsColumn = ({ data }: { data: Secret }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <EditSecret data={data} />
    </Box>
  )
}
