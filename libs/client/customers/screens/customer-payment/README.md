# Customer Payment Library

This library provides ZarinPal payment gateway integration for customer orders.

## Features

- Payment request initiation
- Payment verification
- Payment callback handling
- Error handling and user feedback
- Support for sandbox mode

## Setup

### Environment Variables

Add the following environment variables to your `.env` file:

```bash
# Required: ZarinPal Merchant ID (36-character UUID)
VITE_ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional: Enable sandbox mode for testing
VITE_ZARINPAL_SANDBOX=true
```

### Getting Your Merchant ID

1. Sign up at [ZarinPal](https://www.zarinpal.com)
2. Go to your merchant panel
3. Copy your 36-character merchant ID

## Usage

### Using the Payment Hook

```tsx
import { useZarinPalPayment } from '@kickzone-workspace/customer-payment';

function CheckoutComponent() {
  const { requestPayment, redirectToGateway, isRequesting, error } = useZarinPalPayment({
    onSuccess: (refId) => {
      console.log('Payment successful! Ref ID:', refId);
    },
    onError: (error) => {
      console.error('Payment error:', error);
    },
  });

  const handlePayment = async () => {
    // Convert amount to Toman (IRT)
    const amountInToman = 10000; // Example: 10,000 Toman

    const authority = await requestPayment({
      amount: amountInToman,
      callback_url: 'https://yoursite.com/payment-callback',
      description: 'Payment for order #12345',
      currency: 'IRT', // Toman
      metadata: {
        mobile: '09121234567',
        email: 'customer@example.com',
        order_id: 'order-123',
      },
    });

    if (authority) {
      redirectToGateway(authority);
    }
  };

  return (
    <button onClick={handlePayment} disabled={isRequesting}>
      {isRequesting ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

### Payment Callback Screen

The payment callback screen is automatically integrated into the router. It handles:

- Payment verification
- Success/error states
- User feedback
- Navigation to order confirmation

The callback URL should be: `/payment-callback?orderId=<order-id>`

## Payment Flow

1. **Order Creation**: Customer places order
2. **Payment Request**: System requests payment from ZarinPal
3. **Gateway Redirect**: Customer is redirected to ZarinPal payment gateway
4. **Payment Processing**: Customer completes payment on ZarinPal
5. **Callback**: ZarinPal redirects back to your site with payment status
6. **Verification**: System verifies payment with ZarinPal
7. **Order Confirmation**: Customer sees order confirmation

## Currency Conversion

The payment system automatically converts USD (base currency) to Toman (IRT) for ZarinPal payments using the exchange rate from your currency system.

## Error Handling

The library handles various error scenarios:

- Invalid merchant ID
- Network errors
- ZarinPal API errors
- Payment cancellation
- Verification failures

All errors are displayed to the user with appropriate messages in Persian.

## Sandbox Mode

For testing, enable sandbox mode:

```bash
VITE_ZARINPAL_SANDBOX=true
```

In sandbox mode, use ZarinPal's test credentials. Note: The sandbox URL may need to be updated in the code based on ZarinPal's current sandbox environment.

## API Reference

### `useZarinPalPayment(options?)`

React hook for payment operations.

**Options:**

- `onSuccess?: (refId: number) => void` - Called when payment is verified
- `onError?: (error: string) => void` - Called on payment errors

**Returns:**

- `isRequesting: boolean` - True when requesting payment
- `isVerifying: boolean` - True when verifying payment
- `error: string | null` - Current error message
- `requestPayment(request)` - Request payment from ZarinPal
- `verifyPayment(request)` - Verify payment with ZarinPal
- `redirectToGateway(authority)` - Redirect to payment gateway
- `clearError()` - Clear current error

### `requestZarinPalPayment(request)`

Direct function to request payment (used internally by the hook).

### `verifyZarinPalPayment(request)`

Direct function to verify payment (used internally by the hook).

## Notes

- All amounts should be in Toman (IRT), not Rial
- The callback URL must be publicly accessible
- Payment verification should only happen once per transaction
- Code 101 from verification means payment was already verified (this is normal)
