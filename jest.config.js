module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  // testMatch: ['!**/src/**/*.spec.[jt]s?(x)'],
  // testMatch: ['**/src/**/*.spec.[jt]s?(x), **/__tests__/*.[jt]s?(x)'],
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
};
