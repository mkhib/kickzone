export default {
  displayName: 'customers-cart-hook',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../../coverage/libs/client/customers/hooks/cart',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};