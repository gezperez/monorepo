const path = require('path')

module.exports = {
  extends: ['../../.eslintrc.js'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', path.resolve(__dirname, './')]],
        extensions: ['.js', '.ts', '.tsx', '.d.ts', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: 'packages/common/tsconfig.json',
      },
    },
  ],
}
