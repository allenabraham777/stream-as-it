module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true
    },
    ignorePatterns: ['.eslintrc.js'],
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
        semi: ['error', 'always']
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {}
        }
    ]
};
