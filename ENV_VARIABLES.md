# Environment Variables Guide

This document describes all environment variables used in the Kickzone project.

## API Server (`apps/kickzone-api`)

### `API_PORT`

- **Description**: Port on which the NestJS API server runs
- **Default**: `3000`
- **Note**: The React apps and nginx config expect port `4000` by default. Set this to `4000` or update the client configurations.

### `ALLOWED_ORIGINS`

- **Description**: Additional CORS origins (comma-separated list)
- **Default**: None (production subdomains are already included)
- **Example**: `https://example.com,https://another-domain.com`
- **Note**: Development origins (localhost:4300, 4400, 4500) and production subdomains are automatically included.

### `LIBRE_TRANSLATE_URL`

- **Description**: URL for the LibreTranslate API instance
- **Default**: `https://libretranslate.com/translate` (public instance)
- **Example**: `http://localhost:5000/translate` (self-hosted)

### `LIBRE_TRANSLATE_API_KEY`

- **Description**: API key for LibreTranslate (optional, only needed for public instance rate limits)
- **Default**: None

### `ZARINPAL_MERCHANT_ID`

- **Description**: ZarinPal merchant ID (36-character UUID) used by the Nest payment service
- **Required**: Yes for production Farsi payments
- **Example**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Note**: Get this from your ZarinPal merchant panel. Sandbox accepts any UUID.
- **Docs**: [ZarinPal gateway](https://www.zarinpal.com/docs/paymentGateway/connectToGateway.html) · MCP `https://www.zarinpal.com/docs/mcp`

### `ZARINPAL_SANDBOX`

- **Description**: Force ZarinPal sandbox (`true`) or production (`false`)
- **Default**: Sandbox when `NODE_ENV` is not `production`; production otherwise unless set to `false`
- **Values**: `true` or `false`

## Client Applications (React Apps)

### `VITE_GRAPHQL_ENDPOINT`

- **Description**: Override the GraphQL endpoint URL
- **Default**:
  - Production: `/graphql` (relative path, proxied by nginx)
  - Development: `https://localhost:4000/graphql`
- **Usage**: Only set this if you need a custom endpoint
- **Note**: Must be prefixed with `VITE_` to be accessible in client-side code

### `VITE_ZARINPAL_SANDBOX`

- **Description**: Client fallback for StartPay URL if GraphQL `getZarinPalGatewayUrl` fails
- **Default**: sandbox when unset
- **Values**: `true` or `false`
- **Note**: Real merchant ID and sandbox mode are configured on the **server** (`ZARINPAL_*`). Farsi locale uses ZarinPal; English uses contact-for-payment.

## Environment File Location

Create a `.env` file in the **root directory** of the workspace (same level as `package.json`).

Example `.env` file:

```bash
# API Configuration
API_PORT=4000

# Optional: Override GraphQL endpoint for client apps
# VITE_GRAPHQL_ENDPOINT=/graphql

# Optional: Additional CORS origins
# ALLOWED_ORIGINS=https://example.com

# Optional: LibreTranslate configuration
# LIBRE_TRANSLATE_URL=http://localhost:5000/translate
# LIBRE_TRANSLATE_API_KEY=your_key_here

# ZarinPal Payment Gateway (server — Farsi checkout)
ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# Optional: force sandbox (defaults to sandbox outside production)
# ZARINPAL_SANDBOX=true
# Optional client fallback for StartPay URL only
# VITE_ZARINPAL_SANDBOX=true
```

## Vite Environment Variables

For Vite-based React apps, environment variables must be prefixed with `VITE_` to be accessible in the browser. These are embedded at build time.

To use environment variables in your code:

```typescript
// ✅ Works (VITE_ prefix)
const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

// ❌ Won't work (no VITE_ prefix)
const port = import.meta.env.API_PORT; // undefined in browser
```

## Production vs Development

The applications automatically detect the environment:

- **Development**: Uses `import.meta.env.DEV` (true in dev mode)
- **Production**: Uses `import.meta.env.PROD` (true in production builds)

The GraphQL clients automatically switch between:

- Development: `https://localhost:4000/graphql`
- Production: `/graphql` (relative path, works with any subdomain)
