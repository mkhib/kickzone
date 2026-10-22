import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface BadgeSvgProps extends BoxProps {
  size?: number;
}

/**
 * Shetab Network (شبکه شتاب) Certified Electronic Payment Mark
 */
export const ShetabBadgeSvg: React.FC<BadgeSvgProps> = ({ size = 36, sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{ width: size, height: size, flexShrink: 0, ...sx }}
    {...props}
  >
    <rect width="48" height="48" rx="12" fill="#0E2742" />
    {/* Geometric Bank Card Base */}
    <rect x="8" y="14" width="32" height="21" rx="4" fill="url(#shetabGrad)" />
    <path d="M8 20H40" stroke="#0E2742" strokeWidth="2.5" />
    <circle cx="16" cy="27" r="3" fill="#F8B133" />
    <circle cx="21" cy="27" r="3" fill="#E23E3E" fillOpacity="0.85" />
    {/* Microchip */}
    <rect x="29" y="24" width="6" height="5" rx="1" fill="#FFD700" stroke="#C9A774" strokeWidth="0.5" />
    <defs>
      <linearGradient id="shetabGrad" x1="8" y1="14" x2="40" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
  </Box>
);

/**
 * Shaparak Network (شبکه شاپرک) Central Bank Certified Gateway Mark
 */
export const ShaparakBadgeSvg: React.FC<BadgeSvgProps> = ({ size = 36, sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{ width: size, height: size, flexShrink: 0, ...sx }}
    {...props}
  >
    <rect width="48" height="48" rx="12" fill="#18181B" />
    {/* Butterfly Wing / Shaparak Emblem */}
    <path
      d="M24 10C24 10 20 16 14 16C8 16 8 23 13 25C18 27 24 35 24 38C24 35 30 27 35 25C40 23 40 16 34 16C28 16 24 10 24 10Z"
      fill="url(#shaparakGrad)"
    />
    <path
      d="M24 16C24 16 21 21 17 21C13 21 13 25 17 26C21 27 24 32 24 34C24 32 27 27 31 26C35 25 35 21 31 21C27 21 24 16 24 16Z"
      fill="#FFFFFF"
      fillOpacity="0.85"
    />
    <circle cx="24" cy="24" r="2.5" fill="#EAB308" />
    <defs>
      <linearGradient id="shaparakGrad" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </Box>
);

/**
 * ZarinPal Gateway (زرین‌پال) Official Payment Partner Mark
 */
export const ZarinpalBadgeSvg: React.FC<BadgeSvgProps> = ({ size = 36, sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{ width: size, height: size, flexShrink: 0, ...sx }}
    {...props}
  >
    <rect width="48" height="48" rx="12" fill="#1A1824" />
    {/* ZarinPal Signature Shield & Coin Iconography */}
    <path
      d="M24 8L36 14V23C36 30.5 30.9 37.4 24 40C17.1 37.4 12 30.5 12 23V14L24 8Z"
      fill="url(#zpShieldGrad)"
    />
    {/* Zarinpal Geometric "Z" Arrow Curve */}
    <path
      d="M21 17H29L19 30H27M24 23.5H26.5"
      stroke="#1A1824"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="zpShieldGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
  </Box>
);

/**
 * 256-Bit SSL Security (رمزنگاری امن ۲۵۶ بیتی)
 */
export const SslBadgeSvg: React.FC<BadgeSvgProps> = ({ size = 36, sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{ width: size, height: size, flexShrink: 0, ...sx }}
    {...props}
  >
    <rect width="48" height="48" rx="12" fill="#0C1E18" />
    {/* Shield Base */}
    <path
      d="M24 9L35 14V23.5C35 30.8 30.3 37.4 24 40C17.7 37.4 13 30.8 13 23.5V14L24 9Z"
      fill="url(#sslShieldGrad)"
    />
    {/* Padlock Icon */}
    <path
      d="M20 22V19C20 16.79 21.79 15 24 15C26.21 15 28 16.79 28 19V22H29C29.55 22 30 22.45 30 23V30C30 30.55 29.55 31 29 31H19C18.45 31 18 30.55 18 30V23C18 22.45 18.45 22 19 22H20ZM22 22H26V19C26 17.9 25.1 17 24 17C22.9 17 22 17.9 22 19V22Z"
      fill="#0C1E18"
    />
    <circle cx="24" cy="26" r="1.5" fill="#10B981" />
    <defs>
      <linearGradient id="sslShieldGrad" x1="13" y1="9" x2="35" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </Box>
);
