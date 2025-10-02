import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
  // ESLint recommended
  js.configs.recommended,

  // Vue recommended (flat API)
  ...vue.configs['flat/recommended'],

  // TypeScript recommended
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': ts },
    rules: { ...ts.configs.recommended.rules },
  },

  // Prettier
  { plugins: { prettier }, rules: { 'prettier/prettier': 'error' } },

  // Storybook
  {
    files: ['**/*.stories.@(js|jsx|ts|tsx|vue)'],
    plugins: { storybook },
    rules: { ...storybook.configs.recommended.rules },
  },

  // Custom project rules
  {
    rules: {
      'vue/no-v-text-v-html-on-component': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-unknown-html-elements': [
        'error',
        {
          ignoreElements: [/^a-/],
        },
      ],
    },
  },
];
