module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.e2e-spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  testRegex: ".+(\.e2e-spec).[jt]sx?$",
  moduleFileExtensions: ['ts', 'js', 'html'],
};
