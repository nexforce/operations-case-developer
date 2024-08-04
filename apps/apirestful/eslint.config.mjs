import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginImport from 'eslint-plugin-import'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise
    }
  },
  {
    ignores: ['coverage/', 'dist/', 'lib/']
  }
]
