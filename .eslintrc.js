module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
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
  },
  plugins: ['babel', 'prettier'],
};
