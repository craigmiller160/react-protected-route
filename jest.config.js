module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    modulePaths: [
        '<rootDir>/src'
    ],
    testMatch: [
        '<rootDir>/test/**/*.test.{ts,tsx}'
    ]
};
