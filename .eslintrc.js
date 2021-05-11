module.exports = {
    root: true,
    extends: ['airbnb', 'plugin:prettier/recommended', './.spellchecker.eslintrc.js'],
    env: {
      browser: true,
      node: true,
    },
    globals: {
      Promise: true,
    },
    overrides: [
      {
        files: [
          'jest/setup.js',
          '__tests__/*.js',
          '__mocks__/*.js',
          '*.test.js',
          '*.spec.js',
          'e2e/**/*.js',
          '*e2e-spec.ts',
          '*.spec.ts',
        ],
        env: {
          jest: true,
          jasmine: true,
        },
      },
      {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/recommended-requiring-type-checking',
          'prettier/@typescript-eslint',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 2018,
          sourceType: 'module',
        },
        plugins: ['@typescript-eslint'],
        rules: {
          '@typescript-eslint/unbound-method': 'off',
          '@typescript-eslint/no-use-before-define': 'off',
          'no-unused-vars': 'off', // disable the base rule as it can report incorrect errors
          '@typescript-eslint/no-unused-vars': ['error'],
        },
      },
    ],
    parser: 'babel-eslint',
    plugins: ['babel', 'prettier', 'simple-import-sort'],
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/sort': [
        'warn',
        {
          groups: [
            // Node.js builtins. You could also generate this regex if you use a `.js` config.
            [`^(${require('module').builtinModules.join('|')})(/|$)`],
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|@monorepo)(/.*|$)'],
            // Root imports with babel-plugin-root-import (~/).
            // Parent imports. Put `..` last.
            // Other relative imports. Put same-folder imports and `.` last.
            ['^~/', '^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Side effect imports.
            ['^\\u0000'],
          ],
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'babel/new-cap': 'warn',
      curly: ['error', 'all'],
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'error',
      'no-use-before-define': 'off',
      'one-var': ['error', { uninitialized: 'always', initialized: 'never' }],
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'one-var-declaration-per-line': 'off',
      'prefer-destructuring': ['off', { object: true, array: false }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],
      'spaced-comment': ['error', 'always'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          mjs: 'never',
        },
      ],
    },
    settings: {
      react: {
        version: '16.9.0',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ios.js', '.android.js', '.ts', '.tsx', '.json'],
        },
      },
    },
  }
  