const config = {
    extends: [
        'airbnb-typescript'
    ],
    plugins: [
        'react-hooks'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/indent': 0,
        'react/jsx-curly-spacing': ['error', { when: 'always' }],
        'react/jsx-props-no-spreading': 0,
        'comma-dangle': ['error', 'never'],
        'react/forbid-prop-types': 0
    }
};

module.exports = config;
