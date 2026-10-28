export default {
  displayName: 'seller-orders-screen',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../../coverage/libs/client/sellers/screens/seller-orders',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};