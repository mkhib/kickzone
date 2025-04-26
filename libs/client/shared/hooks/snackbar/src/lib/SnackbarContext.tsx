import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { AlertColor } from '@mui/material/Alert';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  progress: number;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    options?: { severity?: AlertColor; duration?: number }
  ) => void;
  handleClose: () => void;
  state: SnackbarState;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const DEFAULT_DURATION = 6000; // 6 seconds

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbarContext must be used within a SnackbarProvider'
    );
  }
  return context;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    progress: 100,
  });

  const progressTimerRef = useRef<number>(null);
  const closeTimerRef = useRef<number>(null);

  const clearTimers = useCallback(() => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
    clearTimers();
  }, [clearTimers]);

  const showSnackbar = useCallback(
    (
      message: string,
      options?: { severity?: AlertColor; duration?: number }
    ) => {
      const duration = options?.duration ?? DEFAULT_DURATION;
      const severity = options?.severity ?? 'info';

      clearTimers();

      setState({
        open: true,
        message,
        severity,
        progress: 100,
      });

      // Set up progress timer
      const startTime = Date.now();
      const updateInterval = 10; // Update every 10ms for smooth progress

      progressTimerRef.current = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = 100 - (elapsedTime / duration) * 100;

        if (progress <= 0) {
          clearTimers();
          handleClose();
        } else {
          setState((prev) => ({ ...prev, progress }));
        }
      }, updateInterval);

      // Set up close timer as backup
      closeTimerRef.current = window.setTimeout(handleClose, duration);
    },
    [clearTimers, handleClose]
  );

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, handleClose, state }}>
      {children}
    </SnackbarContext.Provider>
  );
};
