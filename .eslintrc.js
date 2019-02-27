module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2016
  },
  rules: {
    'no-unused-vars': 'warn',
    'comma-dangle': 0
  }
};
