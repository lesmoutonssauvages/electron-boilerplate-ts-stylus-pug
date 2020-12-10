module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript'
  , moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1'
  }
}
