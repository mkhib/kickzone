import React from 'react';
import { glassmorphism } from './design-tokens';

interface GlassmorphismProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
  elevation?: keyof typeof glassmorphism['light'] extends never ? string : 'light' | 'dark';
  p?: number | string; // padding
  px?: number | string; // horizontal padding
  py?: number | string; // vertical padding
  pt?: number | string; // top padding
  pr?: number | string; // right padding
  pb?: number | string; // bottom padding
  pl?: number | string; // left padding
  m?: number | string; // margin
  mx?: number | string; // horizontal margin
  my?: number | string; // vertical margin
  mt?: number | string; // top margin
  mr?: number | string; // right margin
  mb?: number | string; // bottom margin
  ml?: number | string; // left margin
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  borderRadius?: string;
}

export const Glassmorphism = ({
  children,
  className = '',
  isDark = false,
  elevation = isDark ? 'dark' : 'light',
  // Spacing props (default to no spacing)
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  // Size props
  width,
  height,
  maxWidth,
  maxHeight,
  borderRadius = '28px',
  ...props
}: GlassmorphismProps) => {
  const glassProps = glassmorphism[elevation];

  // Convert spacing numbers to px values (assuming 4px base unit)
  const toPx = (value: number | string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value * 4}px`;
    return value; // Already a string
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inherit',
        width: toPx(width),
        height: toPx(height),
        maxWidth: toPx(maxWidth),
        maxHeight: toPx(maxHeight),
        borderRadius,
        background: glassProps.background,
        backgroundImage: glassProps.backgroundImage,
        border: glassProps.border,
        backdropFilter: glassProps.backdropFilter,
        WebkitBackdropFilter: glassProps.WebkitBackdropFilter,
        boxShadow: glassProps.boxShadow,
        padding: toPx(p),
        paddingLeft: toPx(pl) ?? toPx(px),
        paddingRight: toPx(pr) ?? toPx(px),
        paddingTop: toPx(pt) ?? toPx(py),
        paddingBottom: toPx(pb) ?? toPx(py),
        margin: toPx(m),
        marginLeft: toPx(ml) ?? toPx(mx),
        marginRight: toPx(mr) ?? toPx(mx),
        marginTop: toPx(mt) ?? toPx(my),
        marginBottom: toPx(mb) ?? toPx(my),
        ...props
      }}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;