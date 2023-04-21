module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'prefer-destructuring': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-loop-func': 'off',

    // remove this rule after migrate to import statement for all files
    '@typescript-eslint/no-var-requires': 'off',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
