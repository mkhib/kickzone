import React from 'react';
import { colors, typography, radius, animation, spacing } from './design-tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  isRtl?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
  // Additional props
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  onClick,
  className = '',
  isRtl = false,
  iconLeft,
  iconRight,
  block = false,
  type = 'button',
}: ButtonProps) => {
  // Size configurations
  const sizeConfig: Record<string, { px: number; py: number; fontSize: number; gap: number }> = {
    sm: { px: 2, py: 1, fontSize: typography.fontSizesm, gap: 1 },
    md: { px: 3, py: 1.5, fontSize: typography.fontSizemd, gap: 2 },
    lg: { px: 4, py: 2, fontSize: typography.fontSizelg, gap: 3 },
  };

  const config = sizeConfig[size];

  // Base styles
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: config.gap * 4, // Convert to px
    fontWeight: typography.fontWeightSemiBold,
    fontSize: `${config.fontSize}px`,
    borderRadius: radius.pill,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: `background-color ${animation.duration.normal}ms ${animation.easing.easeInOut},
                 color ${animation.duration.normal}ms ${animation.easing.easeInOut},
                 box-shadow ${animation.duration.normal}ms ${animation.easing.easeInOut},
                 transform ${animation.duration.faster}ms ${animation.easing.easeOut}`,
    userSelect: 'none',
    textDecoration: 'none',
    fontFamily: isRtl ? typography.fontFamilyRtl : typography.fontFamily,
  };

  // Variant styles
  const getVariantStyles = (isDark: boolean) => {
    const getColor = (light: string, dark: string) => isDark ? dark : light;

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getColor(colors.brassLight, colors.brass),
          color: getColor('#121210', '#faf9f7'),
          boxShadow: getColor(
            '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
            '0 4px 12px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
          ),
          '&:hover': {
            backgroundColor: getColor(colors.goldLight, colors.brassLight),
            color: getColor('#121210', '#ffffff'),
            boxShadow: getColor(
              '0 6px 16px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
              '0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.3)'
            ),
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: getColor(
              '0 2px 4px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
              '0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
            ),
          },
        };

      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: getColor(colors.textSecondaryLight, colors.textSecondaryDark),
          border: `1px solid ${getColor(colors.borderLight, colors.borderDark)}`,
          '&:hover': {
            backgroundColor: getColor(colors.hoverOverlayLight, colors.hoverOverlayDark),
            color: getColor(colors.textPrimaryLight, colors.textPrimaryDark),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };

      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: getColor(colors.brassLight, colors.brass),
          border: `1px solid ${getColor(colors.brassLight, colors.brass)}`,
          '&:hover': {
            backgroundColor: getColor(colors.hoverOverlayLight, colors.hoverOverlayDark),
            color: getColor(colors.textPrimaryLight, colors.textPrimaryDark),
            borderColor: getColor(colors.brassLight, colors.brass),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };

      case 'ghost':
      default:
        return {
          backgroundColor: 'transparent',
          color: getColor(colors.textSecondaryLight, colors.textSecondaryDark),
          '&:hover': {
            backgroundColor: getColor(colors.hoverOverlayLight, colors.hoverOverlayDark),
            color: getColor(colors.textPrimaryLight, colors.textPrimaryDark),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
    }
  };

  // Handle disabled state
  const disabledStyle = {
    opacity: 0.65,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  };

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled || isLoading}
      onClick={isDisabled || isLoading ? undefined : onClick}
      style={{
        ...baseStyle,
        ...getVariantStyles(false), // Default to light, will be overridden by context if needed
        paddingLeft: `${config.px * 4}px`,
        paddingRight: `${config.px * 4}px`,
        paddingTop: `${config.py * 4}px`,
        paddingBottom: `${config.py * 4}px`,
        ...(isDisabled && disabledStyle),
        ...(block && { width: '100%' }),
        ...(isLoading && {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: radius.pill,
          },
        }),
      }}
    >
      {isLoading && (
        <span className="loading-overlay" aria-hidden="true">
          {/* Loading spinner would go here */}
        </span>
      )}
      {iconLeft && <span className="icon-left">{iconLeft}</span>}
      <span className="button-content">{children}</span>
      {iconRight && <span className="icon-right">{iconRight}</span>}
    </button>
  );
};

export default Button;