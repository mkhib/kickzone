import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => Promise<boolean>;
}

export function NewsletterSection({ onSubscribe }: NewsletterSectionProps) {
  const { LL } = useI18nContext();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      if (onSubscribe) {
        const success = await onSubscribe(email);
        if (success) {
          setStatus('success');
          setEmail('');
        } else {
          setStatus('error');
          setErrorMessage(LL.home.newsletter.error());
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch {
      setStatus('error');
      setErrorMessage(LL.home.newsletter.error());
    }
  };

  return (
    <Box
      component="section"
      aria-labelledby="newsletter-heading"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, sm: 4, md: 6 },
        maxWidth: 1280,
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        className="rv"
        sx={{
          bgcolor: 'var(--paper)',
          borderRadius: '32px',
          boxShadow: '0 0 0 1px var(--hair), 0 24px 48px -20px rgba(0, 0, 0, 0.08)',
          p: { xs: '32px 24px', sm: '40px 32px', md: '56px 48px' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              mb: 1,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.newsletter.kicker()}
          </Typography>
          <Typography
            id="newsletter-heading"
            component="h2"
            sx={{
              fontSize: { xs: '26px', sm: '32px', md: '36px' },
              fontWeight: 800,
              color: 'var(--ink)',
              mb: 1.5,
              lineHeight: 1.25,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.newsletter.title()}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '15px', md: '16px' },
              color: 'var(--ink-2)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.newsletter.subtitle()}
          </Typography>
        </Box>

        <Box>
          {status === 'success' ? (
            <Box
              role="status"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2.5,
                borderRadius: '20px',
                bgcolor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                color: 'var(--ink)',
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: 'var(--accent)', fontSize: 26 }} />
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.newsletter.success()}
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: '25px',
                    bgcolor: 'var(--page)',
                    border: '1px solid var(--hair)',
                    px: 2,
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    '&:focus-within': {
                      borderColor: 'var(--accent)',
                      boxShadow: '0 0 0 2px var(--focus)',
                    },
                  }}
                >
                  <MailOutlineIcon
                    sx={{
                      color: 'var(--ink-3)',
                      fontSize: 20,
                      mr: 1,
                      flexShrink: 0,
                    }}
                  />
                  <label htmlFor="newsletter-email" style={{ display: 'none' }}>
                    {LL.home.newsletter.emailLabel()}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    dir="ltr"
                    placeholder={LL.home.newsletter.emailPlaceholder()}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--ink)',
                      fontSize: '14.5px',
                      fontFamily: 'inherit',
                    }}
                  />
                </Box>

                <ButtonBase
                  type="submit"
                  disabled={status === 'loading'}
                  sx={{
                    height: 50,
                    px: { xs: 3, sm: 4 },
                    borderRadius: '25px',
                    bgcolor: 'var(--accent)',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    boxShadow: '0 4px 16px rgba(184, 115, 51, 0.25)',
                    transition:
                      'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 22px rgba(184, 115, 51, 0.35)',
                    },
                    '&:disabled': {
                      opacity: 0.6,
                    },
                  }}
                >
                  {status === 'loading' ? (
                    <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                  ) : (
                    LL.home.newsletter.subscribe()
                  )}
                </ButtonBase>
              </Box>

              {status === 'error' && errorMessage && (
                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: '13px',
                    color: '#e53935',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default NewsletterSection;
