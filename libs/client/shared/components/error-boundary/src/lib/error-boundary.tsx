import React, { Component, ErrorInfo, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export interface ErrorBoundaryFallbackProps {
  error: Error | null;
  resetError: () => void;
  homePath?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  homePath?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  handleReturnToStorefront = () => {
    this.resetError();
    const target = this.props.homePath || '/';
    if (typeof window !== 'undefined') {
      window.location.assign(target);
    }
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.resetError,
          homePath: this.props.homePath,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      const homeTarget = this.props.homePath || '/';

      return (
        <Box
          data-testid="saintbala-error-boundary-fallback"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#000000',
            color: '#f5f5f7',
            px: 2,
            py: 6,
          }}
        >
          <Container maxWidth="sm">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5 },
                bgcolor: '#0b0b0c',
                border: '1px solid rgba(201, 167, 116, 0.25)',
                borderRadius: '16px',
                boxShadow:
                  '0 24px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
              }}
            >
              {/* Brand wordmark */}
              <Typography
                component="div"
                sx={{
                  fontFamily: '"Manrope", sans-serif',
                  letterSpacing: '0.28em',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c9a774',
                  textTransform: 'uppercase',
                  mb: 3,
                }}
              >
                <bdi>SAINTBALA</bdi>
              </Typography>

              {/* Status & Title */}
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  fontSize: { xs: '1.4rem', sm: '1.75rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Service Temporarily Unavailable
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  color: '#d2d2d7',
                  mb: 4,
                  lineHeight: 1.7,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                An unexpected interruption occurred while loading this view. You
                can refresh the current state or return directly to the main
                storefront.
              </Typography>

              {/* Recovery Actions */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
                <Button
                  data-testid="return-to-storefront-btn"
                  variant="contained"
                  onClick={this.handleReturnToStorefront}
                  href={homeTarget}
                  sx={{
                    minHeight: '44px',
                    bgcolor: '#c9a774',
                    color: '#000000',
                    fontWeight: 700,
                    px: 3.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '0.92rem',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 14px rgba(201, 167, 116, 0.3)',
                    '&:hover': {
                      bgcolor: '#d8bc8c',
                      boxShadow: '0 6px 20px rgba(201, 167, 116, 0.45)',
                    },
                  }}
                >
                  Return to Storefront
                </Button>

                <Button
                  data-testid="try-again-btn"
                  variant="outlined"
                  onClick={this.resetError}
                  sx={{
                    minHeight: '44px',
                    borderColor: 'rgba(201, 167, 116, 0.4)',
                    color: '#f5f5f7',
                    fontWeight: 600,
                    px: 3,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '0.92rem',
                    '&:hover': {
                      borderColor: '#c9a774',
                      bgcolor: 'rgba(201, 167, 116, 0.08)',
                    },
                  }}
                >
                  Try Again
                </Button>
              </Box>

              {process.env.NODE_ENV !== 'production' &&
                this.state.error?.message && (
                  <Box
                    sx={{
                      mt: 4,
                      p: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'left',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      color: '#a8a8ae',
                      overflowX: 'auto',
                    }}
                  >
                    {this.state.error.message}
                  </Box>
                )}
            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
