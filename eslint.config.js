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
    }
};

module.exports = config;
