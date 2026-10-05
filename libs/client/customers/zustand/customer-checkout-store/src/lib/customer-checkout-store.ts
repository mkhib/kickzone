import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShippingInfo {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
}

export interface CreatedOrder {
  id: string;
  orderNumber: string;
}

export interface CheckoutState {
  // Modal visibility
  isCheckoutDialogOpen: boolean;
  isAuthDialogOpen: boolean;

  // Stepper
  activeStep: number;

  // Shipping Form Data
  shippingInfo: Partial<ShippingInfo>;
  validationErrors: Record<string, string | undefined>;

  // Order & Payment
  isCreatingOrder: boolean;
  createdOrder: CreatedOrder | null;
  paymentAuthority: string | null;
}

export interface CheckoutActions {
  // Dialog controls
  openCheckoutDialog: () => void;
  closeCheckoutDialog: () => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;

  // Stepper controls
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Shipping form controls
  setShippingInfo: (
    info:
      | Partial<ShippingInfo>
      | ((prev: Partial<ShippingInfo>) => Partial<ShippingInfo>)
  ) => void;
  updateShippingField: (field: keyof ShippingInfo, value: string) => void;
  setValidationErrors: (errors: Record<string, string | undefined>) => void;
  clearValidationError: (field: string) => void;
  clearAllValidationErrors: () => void;

  // Order & Payment controls
  setIsCreatingOrder: (isCreating: boolean) => void;
  setCreatedOrder: (order: CreatedOrder | null) => void;
  setPaymentAuthority: (authority: string | null) => void;

  // Reset
  resetCheckout: () => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;

const initialShippingInfo: Partial<ShippingInfo> = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  shippingAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  notes: '',
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      // Initial state
      isCheckoutDialogOpen: false,
      isAuthDialogOpen: false,
      activeStep: 0,
      shippingInfo: initialShippingInfo,
      validationErrors: {},
      isCreatingOrder: false,
      createdOrder: null,
      paymentAuthority: null,

      // Dialog controls
      openCheckoutDialog: () => set({ isCheckoutDialogOpen: true }),
      closeCheckoutDialog: () => set({ isCheckoutDialogOpen: false }),
      openAuthDialog: () => set({ isAuthDialogOpen: true }),
      closeAuthDialog: () => set({ isAuthDialogOpen: false }),

      // Stepper controls
      setActiveStep: (step) => set({ activeStep: step }),
      nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
      prevStep: () =>
        set((state) => ({
          activeStep: Math.max(0, state.activeStep - 1),
        })),

      // Shipping form controls
      setShippingInfo: (info) =>
        set((state) => ({
          shippingInfo:
            typeof info === 'function' ? info(state.shippingInfo) : info,
        })),

      updateShippingField: (field, value) =>
        set((state) => {
          const newErrors = { ...state.validationErrors };
          delete newErrors[field];
          return {
            shippingInfo: { ...state.shippingInfo, [field]: value },
            validationErrors: newErrors,
          };
        }),

      setValidationErrors: (errors) => set({ validationErrors: errors }),
      clearValidationError: (field) =>
        set((state) => {
          const newErrors = { ...state.validationErrors };
          delete newErrors[field];
          return { validationErrors: newErrors };
        }),
      clearAllValidationErrors: () => set({ validationErrors: {} }),

      // Order & Payment controls
      setIsCreatingOrder: (isCreating) => set({ isCreatingOrder: isCreating }),
      setCreatedOrder: (order) => set({ createdOrder: order }),
      setPaymentAuthority: (authority) => set({ paymentAuthority: authority }),

      // Reset
      resetCheckout: () =>
        set({
          isCheckoutDialogOpen: false,
          isAuthDialogOpen: false,
          activeStep: 0,
          validationErrors: {},
          isCreatingOrder: false,
          createdOrder: null,
          paymentAuthority: null,
        }),
    }),
    {
      name: 'customer-checkout-storage',
      // Persist only shippingInfo across sessions so user doesn't re-type address
      partialize: (state) => ({
        shippingInfo: state.shippingInfo,
      }),
    }
  )
);

// Selector hooks for components
export const useIsCheckoutDialogOpen = () =>
  useCheckoutStore((state) => state.isCheckoutDialogOpen);
export const useIsAuthDialogOpen = () =>
  useCheckoutStore((state) => state.isAuthDialogOpen);
export const useCheckoutActiveStep = () =>
  useCheckoutStore((state) => state.activeStep);
export const useCheckoutShippingInfo = () =>
  useCheckoutStore((state) => state.shippingInfo);
export const useCheckoutValidationErrors = () =>
  useCheckoutStore((state) => state.validationErrors);
export const useIsCreatingOrder = () =>
  useCheckoutStore((state) => state.isCreatingOrder);
export const useCreatedOrder = () =>
  useCheckoutStore((state) => state.createdOrder);
export const usePaymentAuthority = () =>
  useCheckoutStore((state) => state.paymentAuthority);

// Action hooks
export const useOpenCheckoutDialog = () =>
  useCheckoutStore((state) => state.openCheckoutDialog);
export const useCloseCheckoutDialog = () =>
  useCheckoutStore((state) => state.closeCheckoutDialog);
export const useOpenAuthDialog = () =>
  useCheckoutStore((state) => state.openAuthDialog);
export const useCloseAuthDialog = () =>
  useCheckoutStore((state) => state.closeAuthDialog);
export const useSetCheckoutStep = () =>
  useCheckoutStore((state) => state.setActiveStep);
export const useNextCheckoutStep = () =>
  useCheckoutStore((state) => state.nextStep);
export const usePrevCheckoutStep = () =>
  useCheckoutStore((state) => state.prevStep);
export const useSetShippingInfo = () =>
  useCheckoutStore((state) => state.setShippingInfo);
export const useUpdateShippingField = () =>
  useCheckoutStore((state) => state.updateShippingField);
export const useSetValidationErrors = () =>
  useCheckoutStore((state) => state.setValidationErrors);
export const useClearValidationError = () =>
  useCheckoutStore((state) => state.clearValidationError);
export const useClearAllValidationErrors = () =>
  useCheckoutStore((state) => state.clearAllValidationErrors);
export const useSetIsCreatingOrder = () =>
  useCheckoutStore((state) => state.setIsCreatingOrder);
export const useSetCreatedOrder = () =>
  useCheckoutStore((state) => state.setCreatedOrder);
export const useSetPaymentAuthority = () =>
  useCheckoutStore((state) => state.setPaymentAuthority);
export const useResetCheckout = () =>
  useCheckoutStore((state) => state.resetCheckout);
