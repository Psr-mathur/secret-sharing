import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';

interface StatCardProps {
  title: string;
  count: number | string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, count, icon = <InsertChartIcon /> }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%', minWidth: 220, maxWidth: 300 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              {count}
            </Typography>
          </Box>
          <Box color="primary.main" display="flex" alignItems="center">
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
