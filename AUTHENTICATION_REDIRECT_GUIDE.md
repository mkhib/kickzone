# Authentication Error Handling and Redirect - FIXED IMPLEMENTATION

This implementation provides automatic authentication error handling and redirect functionality for all three client applications (Admins, Customers, and Sellers).

## ✅ PROBLEM SOLVED

Instead of showing "Error loading products: Not authenticated" messages, users will now be automatically redirected to the login screen when authentication errors occur.

## How It Works

### 1. Apollo Error Link Integration

Each GraphQL client now includes an Apollo error link that intercepts GraphQL and network errors. When it detects authentication-related errors, it triggers a callback function that handles the redirect.

**Detected Error Patterns:**

- GraphQL errors with message containing "not authenticated" or "unauthorized"
- GraphQL errors with `UNAUTHENTICATED` or `FORBIDDEN` error codes
- Network errors with 401 or 403 status codes
- Network errors with authentication-related messages

### 2. Authentication Error Handler

Each Apollo provider includes a `handleAuthError` function that:

- Clears stored authentication data from localStorage
- Redirects users to the appropriate login screen using React Router
- Logs the authentication error for debugging

### 3. Apollo Client Integration

Each application (Admins, Customers, Sellers) now has:

- A new Apollo client factory function that accepts an error handler callback
- An Apollo provider that uses the error handling client
- Automatic integration with the existing GraphQL providers

## Implementation Details

### Sellers Application

- **Error Handler**: Redirects to `/login` (sellers)
- **Data Cleanup**: Clears `seller_user`, `admin_user`, `customer_user` from localStorage
- **Client Factory**: `createSellersApolloClient(onAuthError)`

### Customers Application

- **Error Handler**: Redirects to `/login` (customers)
- **Data Cleanup**: Clears `seller_user`, `admin_user`, `customer_user` from localStorage
- **Client Factory**: `createCustomersApolloClient(onAuthError)`

### Admins Application

- **Error Handler**: Redirects to `/login` (admins)
- **Data Cleanup**: Clears `seller_user`, `admin_user`, `customer_user` from localStorage
- **Client Factory**: `createAdminsApolloClient(onAuthError)`

## Usage

The authentication error handling is automatically enabled when using the updated GraphQL providers:

```tsx
// Sellers app
<SellersGraphQLProvider>
  <SellersAuthProvider>
    <App />
  </SellersAuthProvider>
</SellersGraphQLProvider>

// Customers app
<CustomersGraphQLProvider>
  <CustomersAuthProvider>
    <App />
  </CustomersAuthProvider>
</CustomersGraphQLProvider>

// Admins app
<AdminsGraphQLProvider>
  <AdminsAuthProvider>
    <App />
  </AdminsAuthProvider>
</AdminsGraphQLProvider>
```

## Error Flow

1. User makes a GraphQL request
2. Server returns "Not authenticated" error
3. Apollo error link intercepts the error
4. Error handler clears localStorage and redirects to login
5. User is automatically taken to the login screen

## Benefits

- **Automatic**: No need to manually handle authentication errors in components
- **Consistent**: Same behavior across all three applications
- **User-friendly**: Users are automatically redirected instead of seeing error messages
- **Secure**: Clears stored authentication data when errors occur
- **Maintainable**: Centralized error handling logic in each Apollo provider

## Testing

To test the authentication redirect functionality:

1. Log in to any application
2. Clear your authentication cookies/tokens
3. Try to perform any authenticated action
4. You should be automatically redirected to the login screen

The error handling works for all GraphQL operations including queries, mutations, and subscriptions.

## Technical Notes

- Uses Apollo Client's `onError` link for error interception
- Implements React Router's `useNavigate` for proper navigation
- Clears all authentication data to prevent stale state
- Uses `replace: true` to prevent back button issues
- Maintains backward compatibility with existing clients

## Files Modified

- `libs/client/sellers/graphql/src/lib/client.ts` - Added error handling
- `libs/client/customers/graphql/src/lib/client.ts` - Added error handling
- `libs/client/admins/graphql/src/lib/client.ts` - Added error handling
- `libs/client/sellers/graphql/src/lib/SellersApolloProvider.tsx` - Added redirect logic
- `libs/client/customers/graphql/src/lib/CustomersApolloProvider.tsx` - Added redirect logic
- `libs/client/admins/graphql/src/lib/AdminsApolloProvider.tsx` - Added redirect logic
- Updated all GraphQL providers to use the new Apollo providers with error handling
