module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'curly': ['error', 'all'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-len': ['error', { code: 120 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-undef': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'linebreak-style': 0, //for windows
    'comma-dangle': 0,
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-alert': 0,
  },
};
