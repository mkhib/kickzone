export * from './lib/Provider';
export * from './lib/queries';
export * from './lib/mutations';
export * from './lib/customer-profile.queries';

// Explicitly export shipping query for easier imports
export { CALCULATE_SHIPPING_COST_QUERY } from './lib/queries';
