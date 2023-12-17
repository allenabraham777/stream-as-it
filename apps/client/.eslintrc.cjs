module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['build', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^(unused|_)',
                argsIgnorePattern: '^(_|unused|props|...)'
            }
        ],
        'no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^(unused|_)',
                argsIgnorePattern: '^(_|unused|props|...)'
            }
        ],
        '@typescript-eslint/ban-types': 'off',
        semi: ['error', 'always']
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {}
        }
    ]
};
