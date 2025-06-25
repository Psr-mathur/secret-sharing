import { Box, Typography, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SecretMessage({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        background: 'linear-gradient(to bottom right, #0d47a1, #1976d2)',
        color: '#fff',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          🔐 Secret Message
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy'}>
          <IconButton onClick={handleCopy} sx={{ color: '#fff' }}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 2 }} />

      <Typography
        sx={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          textAlign: 'justify',
          whiteSpace: 'pre-wrap',
          maxHeight: '400px',
          overflowY: 'auto',
          pr: 1,
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
}