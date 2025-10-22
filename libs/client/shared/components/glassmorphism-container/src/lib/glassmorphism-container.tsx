import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

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
  return (
    <Box sx={{ p: { xs: 1, md: 2 }, ...wrapperSx }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          p: { xs: 2, md: 4 },
          ...(fullHeight && { minHeight: '80vh' }),
          ...containerSx,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default GlassmorphismContainer;
