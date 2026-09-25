# Customer Payment Library

ZarinPal payment gateway for **Farsi (`fa`) checkout**. English checkout places a pending order and uses the “we will contact you for payment” path instead.

Official docs: [Connect to gateway](https://www.zarinpal.com/docs/paymentGateway/connectToGateway.html) · Live MCP: `https://www.zarinpal.com/docs/mcp`

## Features

- Payment request (`request.json`) and verification (`verify.json`) via Nest GraphQL
- Gateway redirect (`StartPay/{authority}`)
- Callback handling (`Status=OK` → verify; `Status=NOK` → cancel pending order)
- Sandbox / production URL switching on the server

## Setup

### Server environment (required for live payments)

```bash
# Nest API — merchant ID from ZarinPal panel (36-char UUID)
ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional. Defaults to sandbox unless NODE_ENV=production.
# Set explicitly to 'false' for production charges.
ZARINPAL_SANDBOX=true
```

### Client environment (optional fallback only)

```bash
# Used only if GraphQL getZarinPalGatewayUrl fails
VITE_ZARINPAL_SANDBOX=true
```

Merchant ID is **not** needed in Vite env; the API holds the secret.

### Getting Your Merchant ID

1. Sign up at [ZarinPal](https://www.zarinpal.com)
2. Open the merchant panel
3. Copy the 36-character merchant ID
4. For sandbox, any UUID is accepted (authorities start with `S`)

## Usage

### Farsi checkout (automatic)

Shopping cart checkout when `currentLocale === 'fa'`:

1. Create PENDING order(s)
2. Convert USD → IRR (stored as Toman / تومان)
3. `requestZarinPalPayment` with `currency: 'IRT'`
4. Redirect to `StartPay/{authority}`
5. Callback verifies and confirms order (stock decrease)

### English checkout

Creates a PENDING order, clears the cart, and shows `checkout.demoCheckout` (“We will contact you soon for the payment info.”). No ZarinPal redirect.

### Using the Payment Hook

```tsx
import { useZarinPalPayment } from '@kickzone-workspace/customer-payment';

function CheckoutComponent() {
  const { requestPayment, redirectToGateway, isRequesting, error } =
    useZarinPalPayment({
      onSuccess: (refId) => console.log('Payment successful! Ref ID:', refId),
      onError: (error) => console.error('Payment error:', error),
    });

  const handlePayment = async () => {
    // Amount in Toman when currency is IRT
    const amountInToman = 10000;

    const authority = await requestPayment({
      amount: amountInToman,
      callback_url: 'https://yoursite.com/payment-callback',
      description: 'Payment for order #12345',
      currency: 'IRT',
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

Route: `/payment-callback?orderId=<order-id>` (ZarinPal adds `Authority` + `Status`).

- `Status=OK` → verify → confirm order + clear cart
- `Status=NOK` → cancel pending order (no verify)

## Currency

Kickzone stores Iranian amounts under code `IRR` with symbol تومان and rates in **Toman**. ZarinPal requests use `currency: 'IRT'` with that Toman amount (no ÷10).

See [ZarinPal currency docs](https://www.zarinpal.com/docs/paymentGateway/moreFeatures/currency.html).

## API endpoints (v4)

| Mode | Request / Verify | StartPay |
|------|------------------|----------|
| Production | `https://payment.zarinpal.com/pg/v4/payment/{request\|verify}.json` | `https://payment.zarinpal.com/pg/StartPay/{authority}` |
| Sandbox | `https://sandbox.zarinpal.com/pg/v4/payment/{request\|verify}.json` | `https://sandbox.zarinpal.com/pg/StartPay/{authority}` |

Success codes: `100` (verified), `101` (already verified).

## Notes

- Amounts for Kickzone are Toman (`IRT`), not Rial
- Callback URL must be publicly reachable
- Verify once per successful payment; `101` on repeat verify is normal
