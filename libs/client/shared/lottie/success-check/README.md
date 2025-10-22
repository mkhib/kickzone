# lottie-success-check

A reusable Lottie animation component for displaying a success check mark animation in the KickZone workspace.

## Overview

This library provides a success check animation that plays once when displayed and automatically hides itself after 2 seconds. The animation features a green checkmark with a circular border that animates smoothly.

## Features

- **Animated success checkmark** with circle animation
- **Auto-plays** when component mounts
- **Auto-hides** 2 seconds after animation completes
- **Position absolute** to avoid affecting layout/height of parent container
- **Customizable size** via width/height props
- **Callback support** when animation sequence completes

## Component

### LottieSuccessCheck

Main success check animation component.

**Props:**

- `width?: number` - Width of the animation in pixels (default: 64)
- `height?: number` - Height of the animation in pixels (default: 64)
- `onComplete?: () => void` - Callback fired 2 seconds after animation finishes

## Usage

```tsx
import { LottieSuccessCheck } from '@kickzone-workspace/lottie-success-check';
import { useState } from 'react';

function MyComponent() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    // Do something...
    setShowSuccess(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showSuccess && <LottieSuccessCheck width={100} height={100} onComplete={() => setShowSuccess(false)} />}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## Animation Details

- **Duration**: ~1.5 seconds
- **Display Time**: Animation duration + 2 seconds = ~3.5 seconds total
- **Loop**: No (plays once)
- **Color**: Green (#1EC075)

## Usage in Language Settings

This component is currently used in all language settings screens (Admins, Sellers, Customers) to provide visual feedback when a language preference is saved successfully.

## Running unit tests

Run `nx test lottie-success-check` to execute the unit tests via [Vitest](https://vitest.dev/).
