import js from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts'
    ]
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    plugins: {
      vue
    },
    rules: {
      ...vue.configs['vue3-essential'].rules,
      'vue/multi-word-component-names': 'off',
      'no-console': 'off',
      'no-debugger': 'warn'
    }
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'warn'
    }
  },
  {
    files: ['db/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['electron/**/*.{js,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        console: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['src/test/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
] 