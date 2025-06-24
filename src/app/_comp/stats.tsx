import { StatCard } from '@/components/stat-card'
import { Box } from '@mui/material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export const Stats = () => {
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
        title="Secrets"
        count={0}
        icon={<VerifiedUserIcon />}
      />
      <StatCard
        title="Secrets"
        count={0}
        icon={<VerifiedUserIcon />}
      />
      <StatCard
        title="Secrets"
        count={0}
        icon={<VerifiedUserIcon />}
      />
    </Box>
  )
}
