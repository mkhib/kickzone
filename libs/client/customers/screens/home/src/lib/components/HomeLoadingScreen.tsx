import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LottieLoading } from '@kickzone-workspace/lottie-loading';
import { useLanguageContext } from '@kickzone-workspace/shared-i18n';

export interface HomeLoadingScreenProps {
  message?: string;
  brandTitle?: string;
}

export function HomeLoadingScreen({
  message,
  brandTitle = 'SAINTBALA',
}: HomeLoadingScreenProps) {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';

  const displayMessage =
    message ??
    (isEn
      ? 'Preparing collections...'
      : 'در حال آماده‌سازی کلکسیون...');

  const ariaLabel = isEn ? 'Loading site' : 'در حال بارگذاری سایت';

  useEffect(() => {
    // Lock scrolling on document body while the loading screen is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Box
      data-testid="home-loading-screen"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--page, #0b0b0c)',
        color: 'var(--ink, #ffffff)',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      {/* Ambient luxury radial glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 300, sm: 460 },
          height: { xs: 300, sm: 460 },
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201, 167, 116, 0.18) 0%, rgba(201, 167, 116, 0.05) 50%, transparent 72%)',
          pointerEvents: 'none',
          filter: 'blur(36px)',
          animation: 'kz-ambient-pulse 3s infinite ease-in-out',
          '@keyframes kz-ambient-pulse': {
            '0%, 100%': { transform: 'translate(-50%, -50%) scale(0.95)', opacity: 0.75 },
            '50%': { transform: 'translate(-50%, -50%) scale(1.08)', opacity: 1 },
          },
        }}
      />

      {/* Lottie Animation */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <LottieLoading width={230} height={230} />
      </Box>

      {/* Brand Wordmark */}
      <Typography
        component="div"
        sx={{
          fontFamily: 'var(--font-sans)',
          fontSize: { xs: '15px', sm: '17px' },
          fontWeight: 800,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--ink, #ffffff)',
          textAlign: 'center',
          position: 'relative',
          mt: 0.5,
          opacity: 0.95,
        }}
      >
        {brandTitle}
      </Typography>

      {/* Subtitle / Status */}
      <Typography
        component="div"
        sx={{
          fontFamily: 'var(--font-sans)',
          fontSize: { xs: '13px', sm: '14px' },
          fontWeight: 400,
          color: 'var(--ink-3, #8e8e93)',
          textAlign: 'center',
          mt: 1,
          direction: isEn ? 'ltr' : 'rtl',
          animation: 'kz-text-breathe 2s infinite ease-in-out',
          '@keyframes kz-text-breathe': {
            '0%, 100%': { opacity: 0.65 },
            '50%': { opacity: 1 },
          },
        }}
      >
        {displayMessage}
      </Typography>

      {/* Shimmering Progress Accent Line */}
      <Box
        aria-hidden="true"
        sx={{
          width: 140,
          height: '2px',
          borderRadius: '2px',
          bgcolor: 'var(--hair, rgba(255, 255, 255, 0.12))',
          position: 'relative',
          overflow: 'hidden',
          mt: 2.5,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '45%',
            background:
              'linear-gradient(90deg, transparent, var(--accent, #c9a774), transparent)',
            animation: 'kz-line-shimmer 1.8s infinite cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '@keyframes kz-line-shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(260%)' },
          },
        }}
      />
    </Box>
  );
}

export default HomeLoadingScreen;
