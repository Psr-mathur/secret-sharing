import { StatCard } from '@/components/stat-card'
import { Box } from '@mui/material'
import { HourglassDisabled, Key, PendingActions, Visibility } from '@mui/icons-material'
import { api } from '@/trpc/react'
import toast from 'react-hot-toast'

export const Stats = () => {
  const { data: viewedCount } = api.secret.getCounts.useQuery(undefined, {
    throwOnError: () => {
      toast.error('Failed to fetch stats');
      return false;
    }
  });
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      my: 2,
      flexWrap: 'wrap',
    }}>
      <StatCard
        title="Total"
        count={viewedCount?.total ?? 0}
        icon={<Key fontSize='large' />}
      />
      <StatCard
        title="Active"
        count={viewedCount?.active ?? 0}
        icon={<PendingActions fontSize='large' />}
      />
      <StatCard
        title="Expired"
        count={viewedCount?.expired ?? 0}
        icon={<HourglassDisabled fontSize='large' />}
      />
      <StatCard
        title="Viewed"
        count={viewedCount?.viewed ?? 0}
        icon={<Visibility fontSize='large' />}
      />
    </Box>
  )
}
