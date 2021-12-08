module.exports = {
  displayName: 'api',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.e2e-spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
};
