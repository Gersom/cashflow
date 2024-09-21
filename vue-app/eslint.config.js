import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import globals from 'globals'
import standard from 'eslint-config-standard'
import pluginImport from 'eslint-plugin-import'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'

export default [
  // add more generic rulesets here, such as:
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      vue: pluginVue,
      import: pluginImport,
      n: pluginN,
      promise: pluginPromise
    },
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      ...standard.rules,
      'vue/multi-word-component-names': 'off',
      // Desactiva las reglas de 'n' (node) ya que estamos en un entorno de navegador
      'n/no-callback-literal': 'off',
      'n/no-deprecated-api': 'off',
      'n/no-exports-assign': 'off',
      'n/no-new-require': 'off',
      'n/no-path-concat': 'off',
      'n/process-exit-as-throw': 'off',

      'import/first': 'off',
      'eol-last': 'off'
      // Aquí puedes añadir o sobrescribir más reglas si lo necesitas
    }
  }
]