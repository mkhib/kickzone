import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define auth state interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

// Define auth actions interface
export interface AuthActions {
  // Authentication actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  refreshAuthToken: () => Promise<void>;

  // User management actions
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User) => void;
  clearUser: () => void;

  // State management actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Token management
  setTokens: (token: string, refreshToken: string) => void;
  clearTokens: () => void;
}

// Define register data interface
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'CUSTOMER' | 'SELLER';
}

// Define the complete store type
export type AuthStore = AuthState & AuthActions;

// Create the auth store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,
      refreshToken: null,

      // Authentication actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();

          set({
            user: data.user,
            isAuthenticated: true,
            token: data.token,
            refreshToken: data.refreshToken,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          refreshToken: null,
          error: null,
        });
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error('Registration failed');
          }

          const data = await response.json();

          set({
            user: data.user,
            isAuthenticated: true,
            token: data.token,
            refreshToken: data.refreshToken,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
        }
      },

      refreshAuthToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          set({ error: 'No refresh token available' });
          return;
        }

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const data = await response.json();

          set({
            token: data.token,
            refreshToken: data.refreshToken,
            error: null,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Token refresh failed',
            user: null,
            isAuthenticated: false,
            token: null,
            refreshToken: null,
          });
        }
      },

      // User management actions
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // State management actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Token management
      setTokens: (token: string, refreshToken: string) => {
        set({ token, refreshToken });
      },

      clearTokens: () => {
        set({ token: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const register = useAuthStore((state) => state.register);
  const refreshAuthToken = useAuthStore((state) => state.refreshAuthToken);
  const updateUser = useAuthStore((state) => state.updateUser);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const clearError = useAuthStore((state) => state.clearError);
  const setTokens = useAuthStore((state) => state.setTokens);
  const clearTokens = useAuthStore((state) => state.clearTokens);

  return {
    login,
    logout,
    register,
    refreshAuthToken,
    updateUser,
    setUser,
    clearUser,
    setLoading,
    setError,
    clearError,
    setTokens,
    clearTokens,
  };
};
