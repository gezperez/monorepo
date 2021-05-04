const path = require('path')

module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    'no-useless-constructor': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve(__dirname, './src')],
          ['@mr/common', path.resolve(__dirname, '../common/src')],
        ],
        extensions: ['.js', '.ts', '.tsx', '.d.ts', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: 'packages/bff-mobile/tsconfig.json',
      },
    },
  ],
}
