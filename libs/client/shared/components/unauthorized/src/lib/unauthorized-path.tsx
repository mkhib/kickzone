import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LottieUnauthorized } from '@kickzone-workspace/lottie-unauthorized';
import styles from './unauthorized-path.module.css';

interface UnauthorizedPathProps {
  appName: string;
  loginPath: string;
  showAnimation?: boolean;
  animationWidth?: number;
  animationHeight?: number;
}

export function UnauthorizedPath({
  appName,
  loginPath,
  showAnimation = true,
  animationWidth = 300,
  animationHeight = 300,
}: UnauthorizedPathProps) {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate(loginPath);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            width: '100%',
          }}
        >
          {showAnimation && (
            <Box sx={{ mb: 3 }}>
              <LottieUnauthorized
                width={animationWidth}
                height={animationHeight}
              />
            </Box>
          )}

          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 2,
              textAlign: 'center',
              color: 'error.main',
              fontWeight: 'bold',
            }}
          >
            Access Denied
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            You don't have permission to access this page in {appName}.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            Please contact your administrator if you believe this is an error.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToLogin}
              sx={{ flex: 1 }}
            >
              Go to Login
            </Button>
            <Button variant="outlined" onClick={handleGoBack} sx={{ flex: 1 }}>
              Go Back
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default UnauthorizedPath;
