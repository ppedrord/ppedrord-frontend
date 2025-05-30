module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // Necessário para React 17+ sem importar React
    'plugin:react-hooks/recommended',
    'prettier', // Adiciona configuração do Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } }, // Especifique a versão do React
  plugins: ['react-refresh', 'prettier'], // Adiciona plugin do Prettier
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'warn', // Mostra erros do Prettier como warnings no ESLint
    'react/prop-types': 'off', // Desativa a validação de prop-types se não for usar
  },
};
