import Lottie from 'lottie-react';
import failedAnimation from './failed.json';
import styles from './lottie-unauthorized.module.css';

interface LottieUnauthorizedProps {
  width?: number;
  height?: number;
}

export function LottieUnauthorized({
  width = 300,
  height = 300,
}: LottieUnauthorizedProps) {
  return (
    <div className={styles['container']}>
      <Lottie
        animationData={failedAnimation}
        loop={true}
        autoplay={true}
        style={{ width, height }}
      />
    </div>
  );
}

export default LottieUnauthorized;
