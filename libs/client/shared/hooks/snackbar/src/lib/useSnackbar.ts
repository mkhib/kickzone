import { useSnackbarContext } from './SnackbarContext';

export const useSnackbar = () => {
  const { showSnackbar, handleClose, state } = useSnackbarContext();

  return {
    showSnackbar,
    handleClose,
    open: state.open,
    message: state.message,
    severity: state.severity,
    progress: state.progress,
  };
};
