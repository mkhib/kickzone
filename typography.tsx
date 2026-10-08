import React from 'react';
import { typography } from './design-tokens';

interface TypographyProps {
  variant: keyof typeof typographyVariants;
  children: React.ReactNode;
  className?: string;
  isRtl?: boolean;
  color?: string;
  inline?: boolean;
  noWrap?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  // Additional style overrides
  fontWeight?: number;
  fontSize?: string | number;
  lineHeight?: number | string;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

const typographyVariants = {
  // Display
  display1: {
    fontWeight: typography.fontWeightExtraBold,
    fontSize: typography.fontSize5xl,
    lineHeight: typography.lineHeightTight,
    letterSpacing: typography.letterSpacingTight,
  },
  display2: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSize4xl,
    lineHeight: typography.lineHeightTight,
    letterSpacing: typography.letterSpacingTight,
  },
  // Headings
  h1: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSize3xl,
    lineHeight: typography.lineHeightTight,
    letterSpacing: typography.letterSpacingTight,
  },
  h2: {
    fontWeight: typography.fontWeightSemiBold,
    fontSize: typography.fontSize2xl,
    lineHeight: typography.lineHeightTight,
    letterSpacing: typography.letterSpacingTight,
  },
  h3: {
    fontWeight: typography.fontWeightSemiBold,
    fontSize: typography.fontSizexl,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  h4: {
    fontWeight: typography.fontWeightMedium,
    fontSize: typography.fontSizelg,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  h5: {
    fontWeight: typography.fontWeightMedium,
    fontSize: typography.fontSizemd,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  h6: {
    fontWeight: typography.fontWeightMedium,
    fontSize: typography.fontSizesm,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  // Body
  body1: {
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizemd,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  body2: {
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizesm,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  // Caption
  caption: {
    fontWeight: typography.fontWeightLight,
    fontSize: typography.fontSizexs,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingNormal,
  },
  // Overline
  overline: {
    fontWeight: typography.fontWeightLight,
    fontSize: typography.fontSizexs,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: typography.letterSpacingUppercase,
    textTransform: 'uppercase',
  },
};

export const Typography = ({
  variant,
  children,
  className = '',
  isRtl = false,
  color,
  inline = false,
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  textAlign,
}: TypographyProps) => {
  const baseStyle = typographyVariants[variant];
  const finalFontWeight = fontWeight ?? baseStyle.fontWeight;
  const finalFontSize = fontSize ?? (typeof baseStyle.fontSize === 'number' ? baseStyle.fontSize : baseStyle.fontSize);
  const finalLineHeight = lineHeight ?? baseStyle.lineHeight;
  const finalLetterSpacing = letterSpacing ?? baseStyle.letterSpacing;
  const finalTextAlign = textAlign ?? 'inherit';

  const Component = paragraph ? 'p' : inline ? 'span' : undefined;

  return (
    <Component
      className={className}
      style={{
        display: inline ? 'inline' : 'block',
        fontFamily: isRtl ? typography.fontFamilyRtl : typography.fontFamily,
        fontWeight: finalFontWeight,
        fontSize: typeof finalFontSize === 'number' ? `${finalFontSize}px` : finalFontSize,
        lineHeight: finalLineHeight,
        letterSpacing: finalLetterSpacing,
        color: color,
        textAlign: finalTextAlign,
        whiteSpace: noWrap ? 'nowrap' : 'normal',
        marginBottom: gutterBottom ? '0.5rem' : 0,
        ...(typeof finalFontSize === 'number' && { fontSize: `${finalFontSize}px` }),
      }}
    >
      {children}
    </Component>
  );
};

export default Typography;