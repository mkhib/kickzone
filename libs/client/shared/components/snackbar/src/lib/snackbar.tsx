import React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export interface SnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  progress: number;
  onClose: () => void;
}

const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  color: theme.palette.mode === 'dark' ? '#ffffff' : undefined,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(20, 20, 24, 0.92)'
      : theme.palette.background.paper,
  '& .MuiAlert-message': {
    width: '100%',
  },
}));

export function Snackbar({
  open,
  message,
  severity,
  progress,
  onClose,
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={onClose}
    >
      <StyledAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          {message}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              marginTop: 1,
              backgroundColor: (theme) =>
                severity === 'error'
                  ? theme.palette.error.light
                  : severity === 'warning'
                  ? theme.palette.warning.light
                  : severity === 'success'
                  ? theme.palette.success.light
                  : theme.palette.info.light,
              '& .MuiLinearProgress-bar': {
                backgroundColor: (theme) =>
                  severity === 'error'
                    ? theme.palette.error.main
                    : severity === 'warning'
                    ? theme.palette.warning.main
                    : severity === 'success'
                    ? theme.palette.success.main
                    : theme.palette.info.main,
              },
            }}
          />
        </Box>
      </StyledAlert>
    </MuiSnackbar>
  );
}

export default Snackbar;
