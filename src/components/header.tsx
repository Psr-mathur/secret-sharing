import { type BoxProps } from '@mui/system'
import { Box, Card, Typography, type TypographyOwnProps } from '@mui/material'

type PageHeaderProps = {
  children: React.ReactNode
  sx?: BoxProps['sx']
}

type PageHeaderTitleProps = {
  children: React.ReactNode
  sx?: TypographyOwnProps['sx']
}

type PageHeaderContentProps = {
  children: React.ReactNode
  sx?: BoxProps['sx']
}

// Parent Wrapper
export function PageHeader({ children, sx }: PageHeaderProps) {
  return (
    <Card sx={{ mb: 0 }}>
      <Box sx={{ height: '84px', overflow: 'hidden', ...sx }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          <Box sx={{
            px: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

// Title Component (Left-Aligned)
PageHeader.Title = function PageHeaderTitle({ children, sx }: PageHeaderTitleProps) {
  return (
    <Typography fontSize={18} fontWeight={600} sx={sx}>
      {children}
    </Typography>
  )
}

// Content Component (Right-Aligned)
PageHeader.Content = function PageHeaderContent({ children, sx }: PageHeaderContentProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...sx }}>
      {children}
    </Box>
  )
}