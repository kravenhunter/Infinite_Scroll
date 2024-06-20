/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@antfu',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['.gitignore', '.prettierignore'],
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'valid-typeof': 'off',
    //"valid-typeof": ["error", { "requireStringLiterals": true }]
    'spaced-comment': 'off',
    'sort-imports': 'off',
    'vue/attributes-order': 0,
    'vue/no-mutating-props': [
      'error',
      {
        shallowOnly: true
      }
    ],
    'import/order': 0,
    'no-restricted-syntax': 'off',
    'antfu/top-level-function': 0
  }
}
