import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
        {url}
      </Typography>
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <IconButton size="small" onClick={handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}