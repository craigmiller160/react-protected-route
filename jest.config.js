module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [
      '<rootDir>/src'
  ],
  testMatch: [
      '<rootDir>/test/**/*.test.{ts,tsx}'
  ]
};
