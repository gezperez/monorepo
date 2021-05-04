const path = require('path');

module.exports = {
  extends: ['@react-native-community', '../../.eslintrc.js'],
  globals: {
    __DEV__: true,
  },
  plugins: ['react', 'react-native'],
  rules: {
    'global-require': 'off',
    'import/export': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/destructuring-assignment': ['off', 'always'],
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-wrap-multilines': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve(__dirname, './src')],
          ['@bds/common', path.resolve(__dirname, '../common/src')],
        ],
        extensions: [
          '.js',
          '.ios.js',
          '.android.js',
          '.ts',
          '.ios.ts',
          '.android.ts',
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
          '.json',
        ],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: 'packages/mobile/tsconfig.json',
      },
    },
  ],
};
