import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    // Matches the pre-flat-config scope, which was `eslint . --ext ts,tsx`.
    { ignores: ['dist', 'build', 'public', 'node_modules', '**/*.user.js'] },
    { files: ['**/*.{ts,tsx}'], ...js.configs.recommended },
    ...tsPlugin.configs['flat/recommended'].map(c => ({ files: ['**/*.{ts,tsx}'], ...c })),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser, ...globals.worker },
            parser: tsParser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // eslint-plugin-react-hooks v7 also ships the React Compiler rule
            // set (configs.flat['recommended-latest']); keep the two classic
            // rules that were enabled before the upgrade.
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/no-explicit-any': 'off',
            // `ban-types` was split up in typescript-eslint v8.
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-wrapper-object-types': 'off',
            'no-async-promise-executor': 'off',
            'no-empty': 'off',
        },
    },
];
