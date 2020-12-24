// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
  ],
  testEnvironment: 'node',
  verbose: true,
  transform: { '^.+\\.js?$': 'babel-jest' },
  transformIgnorePatterns: ['/node_modules/'],
};
