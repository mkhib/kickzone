import { create } from 'zustand';

// Define modal state interface
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  onClose?: () => void;
}

// Define loading state interface
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// Define theme state interface
export interface ThemeState {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

// Define UI state interface
export interface UIState {
  // Modal state
  modal: ModalState;

  // Loading state
  loading: LoadingState;

  // Theme state
  theme: ThemeState;

  // Sidebar state
  sidebarOpen: boolean;

  // Mobile menu state
  mobileMenuOpen: boolean;

  // Toast notifications
  toasts: ToastNotification[];
}

// Define toast notification interface
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Define UI actions interface
export interface UIActions {
  // Modal actions
  openModal: (config: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;

  // Loading actions
  setLoading: (loading: boolean, message?: string) => void;

  // Theme actions
  setTheme: (theme: Partial<ThemeState>) => void;
  toggleTheme: () => void;

  // Sidebar actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Mobile menu actions
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Toast actions
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Reset actions
  resetUI: () => void;
}

// Define the complete store type
export type UIStore = UIState & UIActions;

// Default theme configuration
const defaultTheme: ThemeState = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
};

// Create the UI store
export const useUIStore = create<UIStore>((set, get) => ({
  // Initial state
  modal: {
    isOpen: false,
  },
  loading: {
    isLoading: false,
  },
  theme: defaultTheme,
  sidebarOpen: false,
  mobileMenuOpen: false,
  toasts: [],

  // Modal actions
  openModal: (config) => {
    set({
      modal: {
        isOpen: true,
        ...config,
      },
    });
  },

  closeModal: () => {
    set((state) => ({
      modal: {
        ...state.modal,
        isOpen: false,
      },
    }));
  },

  // Loading actions
  setLoading: (isLoading, message) => {
    set({
      loading: {
        isLoading,
        message,
      },
    });
  },

  // Theme actions
  setTheme: (theme) => {
    set((state) => ({
      theme: {
        ...state.theme,
        ...theme,
      },
    }));
  },

  toggleTheme: () => {
    set((state) => ({
      theme: {
        ...state.theme,
        mode: state.theme.mode === 'light' ? 'dark' : 'light',
      },
    }));
  },

  // Sidebar actions
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  // Mobile menu actions
  toggleMobileMenu: () => {
    set((state) => ({
      mobileMenuOpen: !state.mobileMenuOpen,
    }));
  },

  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open });
  },

  // Toast actions
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastNotification = {
      id,
      duration: 5000,
      ...toast,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  // Reset actions
  resetUI: () => {
    set({
      modal: { isOpen: false },
      loading: { isLoading: false },
      theme: defaultTheme,
      sidebarOpen: false,
      mobileMenuOpen: false,
      toasts: [],
    });
  },
}));

// Selector hooks for better performance
export const useModal = () => useUIStore((state) => state.modal);
export const useLoading = () => useUIStore((state) => state.loading);
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebar = () => useUIStore((state) => state.sidebarOpen);
export const useMobileMenu = () => useUIStore((state) => state.mobileMenuOpen);
export const useToasts = () => useUIStore((state) => state.toasts);

export const useUIActions = () => {
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const setLoading = useUIStore((state) => state.setLoading);
  const setTheme = useUIStore((state) => state.setTheme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const addToast = useUIStore((state) => state.addToast);
  const removeToast = useUIStore((state) => state.removeToast);
  const clearToasts = useUIStore((state) => state.clearToasts);
  const resetUI = useUIStore((state) => state.resetUI);

  return {
    openModal,
    closeModal,
    setLoading,
    setTheme,
    toggleTheme,
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    addToast,
    removeToast,
    clearToasts,
    resetUI,
  };
};
