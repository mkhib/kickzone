declare module '*.json' {
  const value: unknown;
  export default value;
}

// Extend ImportMeta interface for Vite environment variables
// This allows libraries to use import.meta.env without needing vite/client in their tsconfig
interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT?: string;
  readonly PROD?: boolean;
  readonly DEV?: boolean;
  readonly MODE?: string;
  readonly BASE_URL?: string;
  readonly SSR?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
