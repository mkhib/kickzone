import Lottie from 'lottie-react';
import successAnimation from './success.json';
import styles from './lottie-success-check.module.css';

interface LottieSuccessCheckProps {
  width?: number;
  height?: number;
  onComplete?: () => void;
}

export function LottieSuccessCheck({
  width = 64,
  height = 64,
  onComplete,
}: LottieSuccessCheckProps) {
  return (
    <div className={styles['container']}>
      <Lottie
        animationData={successAnimation}
        loop={false}
        autoplay={true}
        style={{ width, height }}
        onComplete={() => {
          if (onComplete) {
            // Keep it visible for 2 seconds after animation completes
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }}
      />
    </div>
  );
}

export default LottieSuccessCheck;
