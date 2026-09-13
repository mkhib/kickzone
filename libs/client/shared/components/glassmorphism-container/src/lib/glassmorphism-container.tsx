import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export interface GlassmorphismContainerProps {
  children: React.ReactNode;
  /**
   * Additional sx props for the outer Box wrapper (controls margin/padding around the container)
   */
  wrapperSx?: SxProps<Theme>;
  /**
   * Additional sx props for the inner Paper component (controls the glassmorphism container itself)
   */
  containerSx?: SxProps<Theme>;
  /**
   * If true, adds minHeight: '80vh' to the container
   */
  fullHeight?: boolean;
}

export function GlassmorphismContainer({
  children,
  wrapperSx,
  containerSx,
  fullHeight = false,
}: GlassmorphismContainerProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, ...wrapperSx }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '24px',
          // Gradient border effect using padding trick
          padding: '1px',
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            backgroundColor: isDark
              ? 'rgba(24, 24, 22, 0.92) !important'
              : 'rgba(250, 249, 247, 0.92) !important',
            backgroundImage: 'none !important',
            border: isDark
              ? '1px solid rgba(240, 239, 235, 0.08) !important'
              : '1px solid rgba(26, 26, 25, 0.08) !important',
            backdropFilter: isDark ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isDark ? 'blur(12px)' : 'none',
            borderRadius: '23px', // Slightly smaller to account for border
            // Multiple layered inner shadows for glassy edge highlights
            boxShadow: 'none !important',
            p: { xs: 2, md: 4 },
            ...(fullHeight && { minHeight: '80vh' }),
            ...containerSx,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
}

export default GlassmorphismContainer;
