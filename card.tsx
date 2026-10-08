import React from 'react';
import { colors, typography, radius, animation, spacing, glassmorphism } from './design-tokens';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
  elevation?: keyof typeof glassmorphism['light'] extends never ? string : 'light' | 'dark';
  padding?: number | string; // in spacing units
  borderRadius?: string;
  hasShadow?: boolean;
  hoverLift?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  className = '',
  isDark = false,
  elevation = isDark ? 'dark' : 'light',
  padding,
  borderRadius = radius.lg,
  hasShadow = true,
  hoverLift = false,
  clickable = false,
  onClick,
}: CardProps) => {
  const glassProps = glassmorphism[elevation];

  // Convert padding from spacing units to px
  const paddingPx = padding !== undefined ? `${padding * 4}px` : `${spacing.md * 4}px`;

  // Base styles
  const baseStyle = {
    position: 'relative',
    borderRadius,
    background: glassProps.background,
    backgroundImage: glassProps.backgroundImage,
    border: glassProps.border,
    backdropFilter: glassProps.backdropFilter,
    WebkitBackdropFilter: glassProps.WebkitBackdropFilter,
    boxShadow: hasShadow ? glassProps.boxShadow : 'none',
    padding: paddingPx,
    transition: `transform ${animation.duration.faster}ms ${animation.easing.easeOut},
                 box-shadow ${animation.duration.normal}ms ${animation.easing.easeInOut}`,
    cursor: clickable ? 'pointer' : 'default',
  };

  // Hover effects
  const hoverStyle = hoverLift || clickable ? {
    transform: 'translateY(-2px)',
    boxHover: hasShadow ?
      isDark ?
        '0 28px 70px -12px rgba(0, 0, 0, 0.7), inset 0 1px 2px 0 rgba(255, 255, 255, 0.15)' :
        '0 28px 70px -12px rgba(26, 26, 25, 0.3), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2)' :
      glassProps.boxShadow
  } : {};

  // Active/pressed state
  const activeStyle = clickable ? {
    transform: 'translateY(0)',
  } : {};

  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        ...(clickable && hoverLift && hoverStyle),
        ...(clickable && activeStyle),
      }}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default Card;