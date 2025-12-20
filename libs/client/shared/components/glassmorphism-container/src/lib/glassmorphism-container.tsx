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
      <Box
        sx={{
          position: 'relative',
          borderRadius: '24px',
          // Gradient border effect using padding trick
          padding: '1px',
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.4) 100%)',
          // Outer glow for edge definition
          boxShadow: [
            '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            '0 0 0 1px rgba(255, 255, 255, 0.2)',
            '0 0 30px rgba(255, 255, 255, 0.08)',
          ],
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            borderRadius: '23px', // Slightly smaller to account for border
            // Multiple layered inner shadows for glassy edge highlights
            boxShadow: [
              // Top edge highlight (light reflection)
              'inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)',
              // Bottom edge shadow (depth)
              'inset 0 -1px 2px 0 rgba(255, 255, 255, 0.3)',
              // Left edge highlight
              'inset 1px 0 2px 0 rgba(255, 255, 255, 0.5)',
              // Right edge shadow
              'inset -1px 0 2px 0 rgba(255, 255, 255, 0.4)',
              // Overall inner glow
              'inset 0 0 20px rgba(255, 255, 255, 0.1)',
            ],
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
