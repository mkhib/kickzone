import { describe, it, expect, beforeEach } from 'vitest';
import { useCheckoutStore } from './customer-checkout-store';

describe('customer-checkout-store', () => {
  beforeEach(() => {
    useCheckoutStore.getState().resetCheckout();
  });

  it('should initialize with default state', () => {
    const state = useCheckoutStore.getState();
    expect(state.isCheckoutDialogOpen).toBe(false);
    expect(state.isAuthDialogOpen).toBe(false);
    expect(state.activeStep).toBe(0);
    expect(state.shippingMethod).toBe('vip');
    expect(state.shippingInfo.customerName).toBe('');
    expect(state.createdOrder).toBeNull();
  });

  it('should update shipping method', () => {
    expect(useCheckoutStore.getState().shippingMethod).toBe('vip');
    useCheckoutStore.getState().setShippingMethod('express');
    expect(useCheckoutStore.getState().shippingMethod).toBe('express');
    useCheckoutStore.getState().setShippingMethod('pickup');
    expect(useCheckoutStore.getState().shippingMethod).toBe('pickup');
  });

  it('should handle dialog controls', () => {
    useCheckoutStore.getState().openCheckoutDialog();
    expect(useCheckoutStore.getState().isCheckoutDialogOpen).toBe(true);

    useCheckoutStore.getState().closeCheckoutDialog();
    expect(useCheckoutStore.getState().isCheckoutDialogOpen).toBe(false);

    useCheckoutStore.getState().openAuthDialog();
    expect(useCheckoutStore.getState().isAuthDialogOpen).toBe(true);

    useCheckoutStore.getState().closeAuthDialog();
    expect(useCheckoutStore.getState().isAuthDialogOpen).toBe(false);
  });

  it('should handle stepper steps', () => {
    useCheckoutStore.getState().nextStep();
    expect(useCheckoutStore.getState().activeStep).toBe(1);

    useCheckoutStore.getState().nextStep();
    expect(useCheckoutStore.getState().activeStep).toBe(2);

    useCheckoutStore.getState().prevStep();
    expect(useCheckoutStore.getState().activeStep).toBe(1);

    useCheckoutStore.getState().setActiveStep(3);
    expect(useCheckoutStore.getState().activeStep).toBe(3);
  });

  it('should update shipping fields and clear field validation error', () => {
    useCheckoutStore.getState().setValidationErrors({
      customerName: 'Name is required',
      customerEmail: 'Email is required',
    });

    useCheckoutStore.getState().updateShippingField('customerName', 'John Doe');
    expect(useCheckoutStore.getState().shippingInfo.customerName).toBe('John Doe');
    expect(useCheckoutStore.getState().validationErrors.customerName).toBeUndefined();
    expect(useCheckoutStore.getState().validationErrors.customerEmail).toBe('Email is required');
  });

  it('should reset checkout state properly', () => {
    useCheckoutStore.getState().openCheckoutDialog();
    useCheckoutStore.getState().setActiveStep(2);
    useCheckoutStore.getState().setIsCreatingOrder(true);

    useCheckoutStore.getState().resetCheckout();

    const state = useCheckoutStore.getState();
    expect(state.isCheckoutDialogOpen).toBe(false);
    expect(state.activeStep).toBe(0);
    expect(state.isCreatingOrder).toBe(false);
  });
});
