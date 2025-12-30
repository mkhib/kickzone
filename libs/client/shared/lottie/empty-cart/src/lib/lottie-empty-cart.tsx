import Lottie from 'lottie-react';
import emptyCartAnimation from './empty-cart.json';

interface LottieEmptyCartProps {
  width?: number;
  height?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export function LottieEmptyCart({
  width = 200,
  height = 200,
  loop = true,
  onComplete,
}: LottieEmptyCartProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie
        animationData={emptyCartAnimation}
        loop={loop}
        autoplay
        style={{ width, height }}
        onComplete={() => {
          if (onComplete) {
            onComplete();
          }
        }}
      />
    </div>
  );
}

export default LottieEmptyCart;
