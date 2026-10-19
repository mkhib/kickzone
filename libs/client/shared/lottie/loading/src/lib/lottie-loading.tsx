import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';
import styles from './lottie-loading.module.css';

export interface LottieLoadingProps {
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function LottieLoading({
  width = 220,
  height = 220,
  loop = true,
  autoplay = true,
  className,
  style,
}: LottieLoadingProps) {
  return (
    <div
      className={`${styles.container} ${className || ''}`.trim()}
      style={style}
      data-testid="lottie-loading"
    >
      <Lottie
        animationData={loadingAnimation}
        loop={loop}
        autoplay={autoplay}
        style={{ width, height }}
      />
    </div>
  );
}

export default LottieLoading;
