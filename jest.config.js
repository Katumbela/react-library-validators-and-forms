module.exports = {
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.(ts|tsx)'],
};
