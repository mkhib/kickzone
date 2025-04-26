import { renderHook } from '@testing-library/react-hooks';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { useSnackbar } from './useSnackbar';

describe('useSnackbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSnackbar());
    expect(result.current).toEqual({
      open: false,
      message: '',
      severity: 'info',
      progress: 100,
      showSnackbar: expect.any(Function),
      handleClose: expect.any(Function),
    });
  });

  it('should show snackbar with message', () => {
    const { result } = renderHook(() => useSnackbar());
    result.current.showSnackbar('Test message');
    expect(result.current).toEqual({
      open: true,
      message: 'Test message',
      severity: 'info',
      progress: 100,
      showSnackbar: expect.any(Function),
      handleClose: expect.any(Function),
    });
  });

  it('should close snackbar after duration', () => {
    const { result } = renderHook(() => useSnackbar());
    result.current.showSnackbar('Test message', { duration: 1000 });

    vi.advanceTimersByTime(1000);

    expect(result.current.open).toBeFalsy();
  });

  it('should update progress over time', () => {
    const { result } = renderHook(() => useSnackbar());
    result.current.showSnackbar('Test message', { duration: 1000 });

    vi.advanceTimersByTime(500);

    expect(result.current.progress).toBeLessThan(100);
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it('should handle manual close', () => {
    const { result } = renderHook(() => useSnackbar());
    result.current.showSnackbar('Test message');
    result.current.handleClose();
    expect(result.current.open).toBeFalsy();
  });

  it('should clear timers on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { result, unmount } = renderHook(() => useSnackbar());
    result.current.showSnackbar('Test message');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
