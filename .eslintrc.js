module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        '@vue/standard',
        '@vue/typescript'
    ],
    rules: {
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'none',
                requireLast: false
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-console': 'off',
        'no-debugger': 'off',
        indent: ['warn', 4, {
            SwitchCase: 1,
            MemberExpression: 1
        }],
        'vue/max-attributes-per-line': ['warn', {
            singleline: 4,
            multiline: {
                max: 1,
                allowFirstLine: true
            }
        }],
        'vue/no-v-html': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1
        }]
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        allowImportExportEverywhere: false,
        codeFrame: false
    }
}
