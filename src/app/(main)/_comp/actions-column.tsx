import { Box } from '@mui/material'
import React from 'react'
import { EditSecret } from './edit-secret'
import type { Secret } from '@prisma/client';
import { DeleteSecret } from './delete-secret';
export const ActionsColumn = ({ data }: { data: Secret }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <EditSecret data={data} />
      <DeleteSecret secretKey={data.key} />
    </Box>
  )
}
