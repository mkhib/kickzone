import React from 'react';
import { colors, typography, radius, animation, spacing } from './design-tokens';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorText?: string;
  className?: string;
  isRtl?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: string;
  autoFocus?: boolean;
  // Additional props
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

const Input = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  errorText = '',
  className = '',
  isRtl = false,
  inputRef,
  autoComplete,
  autoFocus = false,
  inputMode,
}: InputProps) => {
  const getColors = (isDark: boolean) => ({
    border: isInvalid ? (isDark ? '#FF6B6B' : '#FF6B6B') : (isDark ? colors.borderDark : colors.borderLight),
    borderFocus: isDark ? colors.brassLight : colors.brass,
    background: isDark ? 'rgba(30, 30, 28, 0.6)' : 'rgba(255, 255, 255, 0.7)',
    text: isDark ? colors.textPrimaryDark : colors.textPrimaryLight,
    placeholder: isDark ? colors.textMutedDark : colors.textMutedLight,
    label: isDark ? colors.textSecondaryDark : colors.textSecondaryLight,
    error: isDark ? '#FF6B6B' : '#FF6B6B',
  });

  // Since we don't have theme context here, we'll assume light mode for now
  // In a real implementation, this would come from theme context
  const isDark = false;
  const { border, borderFocus, background, text, placeholder: placeholderColor, label: labelColor, error } = getColors(isDark);

  return (
    <div className={className} style={{ marginBottom: spacing.md * 4 }}>
      {label && (
        <Typography
          variant="caption"
          isRtl={isRtl}
          color={labelColor}
          style={{
            marginBottom: spacing.xs * 2,
            fontWeight: typography.fontWeightMedium,
            ...(isRequired && {
              '&::after': {
                content: ' *',
                color: error
              }
            }}
          }}
        >
          {label}
        </Typography>
      )}
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          required={isRequired}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          inputMode={inputMode}
          style={{
            width: '100%',
            padding: `${spacing.sm * 4}px ${spacing.md * 4}px`,
            fontFamily: isRtl ? typography.fontFamilyRtl : typography.fontFamily,
            fontSize: `${typography.fontSizemd}px`,
            fontWeight: typography.fontWeightRegular,
            color: text,
            backgroundColor: background,
            border: `1px solid ${border}`,
            borderRadius: radius.md,
            transition: `border-color ${animation.duration.normal}ms ${animation.easing.easeInOut},
                         background-color ${animation.duration.normal}ms ${animation.easing.easeInOut},
                         box-shadow ${animation.duration.normal}ms ${animation.easing.easeInOut}`,
            '&:focus': {
              outline: 'none',
              borderColor: borderFocus,
              backgroundColor: 'white',
              boxShadow: `0 0 0 3px rgba(${isDark ? '212,199,165' : '143,131,102'}, 0.25)`,
            },
            '&:disabled': {
              backgroundColor: isDark ? 'rgba(40, 40, 38, 0.6)' : 'rgba(240, 240, 240, 0.6)',
              color: isDark ? colors.textMutedDark : colors.textMutedLight,
              cursor: 'not-allowed',
            },
            '&::placeholder': {
              color: placeholderColor,
              opacity: 1,
            },
          }}
        />
        {isInvalid && errorText && (
          <Typography
            variant="caption"
            isRtl={isRtl}
            color={error}
            style={{
              marginTop: spacing.xs * 2,
              fontSize: `${typography.fontSizexs}px`
            }}
          >
            {errorText}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Input;