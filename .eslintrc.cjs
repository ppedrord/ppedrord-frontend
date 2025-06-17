// .eslintrc.cjs

module.exports = {
  env: {
    browser: true, // Variáveis globais do navegador (ex: window, document)
    es2021: true, // Suporte para features do ECMAScript 2021
    node: true, // Variáveis globais do Node.js (ex: module, require) - útil para este arquivo de config
  },
  extends: [
    'eslint:recommended', // Regras recomendadas pelo ESLint
    'plugin:react/recommended', // Regras recomendadas para React
    'plugin:react-hooks/recommended', // Regras recomendadas para React Hooks
    'plugin:jsx-a11y/recommended', // Regras recomendadas para acessibilidade JSX
    'plugin:prettier/recommended', // Integração com Prettier para formatação de código
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Habilita o parsing de JSX
    },
    ecmaVersion: 'latest', // Permite o uso das features mais recentes do ECMAScript
    sourceType: 'module', // Permite o uso de imports ES6
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    // Regras Gerais do ESLint
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Avisa sobre variáveis não usadas, ignorando argumentos que começam com _
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Desabilita console.log em desenvolvimento, avisa em produção
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Desabilita debugger em desenvolvimento, avisa em produção

    // Regras do React
    'react/prop-types': 'off', // Desabilitar se não for usar PropTypes (comum em JS puro ou se for adicionar TypeScript depois)
    'react/react-in-jsx-scope': 'off', // Não é mais necessário com o novo JSX transform do React 17+
    'react/jsx-uses-react': 'off', // Similar ao acima

    // Regras do React Hooks
    'react-hooks/rules-of-hooks': 'error', // Garante que as regras dos Hooks sejam seguidas
    'react-hooks/exhaustive-deps': 'warn', // Avisa sobre dependências ausentes em Hooks como useEffect

    // Regras do Prettier
    'prettier/prettier': 'error', // Garante que o código siga as regras do Prettier

    // Regras de Acessibilidade (jsx-a11y) - ajuste conforme necessário
    // Exemplo: permitir links sem href válido se forem usados com React Router
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        components: ['Link'], // Se você usar <Link> do react-router-dom
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    // Adicione ou ajuste outras regras conforme a necessidade do projeto
    // Ex: 'indent': ['error', 2], // Força indentação de 2 espaços (Prettier cuidará disso)
    // 'quotes': ['error', 'single'], // Força aspas simples (Prettier cuidará disso)
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React instalada
    },
  },
};
