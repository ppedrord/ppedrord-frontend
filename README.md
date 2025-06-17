# ppedrord-frontend

Bem-vindo ao `ppedrord-frontend`! Este é um projeto de portfólio pessoal e uma plataforma para publicação de artigos, documentações e soluções, desenvolvido com o objetivo principal de aprendizado e aplicação das melhores práticas no desenvolvimento web moderno com React, Vite e JavaScript.

## Visão Geral do Projeto

Este projeto visa criar uma aplicação web robusta, escalável e de fácil manutenção, que servirá como:

- Um portfólio pessoal para exibir projetos e habilidades.
- Um blog para publicar artigos técnicos, documentações e outras soluções.

O desenvolvimento está focado em seguir as melhores práticas de mercado, com uma arquitetura modular e uma experiência de usuário agradável.

### Premissas da Aplicação

1. **Responsividade:** A aplicação se adaptará a diferentes tamanhos de tela (desktop, tablet, mobile).
2. **Tematização:** Suporte a temas claro (light) e escuro (dark).
3. **Internacionalização (i18n):** Suporte inicial para os idiomas Inglês (EN-US) e Português (PT-BR).
4. **Escalabilidade:** Arquitetura pensada para suportar crescimento futuro de funcionalidades e conteúdo.
5. **Estilização Moderna:** Adoção de uma abordagem CSS-in-JS disciplinada, utilizando o ecossistema do MUI (Material-UI com Emotion, API `styled()` e prop `sx`).
6. **Modularidade:** Código organizado em módulos e features para facilitar o desenvolvimento, troubleshooting e manutenção.
7. **Backend Serverless:** A aplicação frontend será integrada com um backend construído na AWS, utilizando serviços como API Gateway, AWS Lambda, Amazon DynamoDB e Amazon Cognito.

## Tecnologias Adotadas (Frontend)

- **React (v18+):** Biblioteca JavaScript para construir interfaces de usuário componentizadas.
- **Vite:** Ferramenta de build moderna e rápida para desenvolvimento frontend.
- **JavaScript (ES6+):** Linguagem de programação principal.
- **MUI (Material-UI v5+):** Biblioteca de componentes React que implementa o Material Design, utilizando Emotion para estilização CSS-in-JS.
- **Emotion:** Biblioteca CSS-in-JS utilizada pelo MUI para estilização, através da API `styled()` e da prop `sx`.
- **ESLint:** Ferramenta de linting para análise estática de código e identificação de padrões.
- **Prettier:** Formatador de código para manter um estilo consistente.
- **React Router DOM (v6+):** (Planejado) Para gerenciamento de rotas na Single Page Application.
- **React i18next & i18next:** (Planejado) Para internacionalização da aplicação.
- **Git & GitHub:** Para controle de versão e hospedagem do código.

## Estrutura do Projeto

O projeto adota uma estrutura de pastas organizada e modular, visando a co-localização de arquivos relacionados a features específicas e a clara separação de responsabilidades. As principais pastas dentro de `src/` incluem:

- `assets/`: Ativos estáticos importados (fontes, imagens).
- `components/`: Componentes UI globais reutilizáveis (`common/` e `layout/`).
- `config/`: Configurações da aplicação (rotas, temas, i18n).
- `constants/`: Constantes globais.
- `contexts/`: Contextos React globais.
- `core/`: Lógica central (a ser avaliada para possível fusão com `config/` ou `lib/`).
- `features/`: Módulos principais da aplicação (ex: `articles`, `auth`, `home`).
- `hooks/`: Hooks React customizados globais.
- `lib/`: Bibliotecas externas configuradas ou código utilitário de baixo nível.
- `pages/`: Componentes de página genéricos ou "órfãos".
- `providers/`: Componentes Provedores React.
- `services/`: Serviços globais (ex: cliente API).
- `store/`: Configuração de estado global (se necessário além de Contextos).
- `styles/`: Estilos globais e temas CSS.
- `types/`: Definições de tipos (JSDoc).
- `utils/`: Funções utilitárias genéricas.
- `App.jsx`: Componente raiz da aplicação.
- `main.jsx`: Ponto de entrada da aplicação.

Consulte a seção "Estrutura do Projeto" (a ser detalhada posteriormente ou em um documento `ARCHITECTURE.md`) para mais informações.

## Progresso do Desenvolvimento

### Épico 1: Configuração Inicial do Projeto e Fundações (Concluído)

Este épico estabeleceu a base do projeto frontend.

- **História 1.1: Inicializar o projeto Vite com React e JavaScript**

  - Criação do projeto `ppedrord-frontend` com o template Vite para React (JavaScript).
  - Instalação das dependências iniciais.
  - Limpeza de arquivos de exemplo desnecessários do template.
  - Inicialização do repositório Git e primeiro commit.

- **História 1.2: Definir e implementar a estrutura de pastas do projeto**

  - Criação da estrutura de pastas planejada dentro do diretório `src/` para organizar o código de forma modular e escalável.

- **História 1.3: Configurar ferramentas de qualidade de código (Linting e Formatting)**

  - Instalação e configuração do ESLint com plugins para React, React Hooks e Acessibilidade (jsx-a11y).
  - Instalação e configuração do Prettier para formatação automática de código.
  - Integração entre ESLint e Prettier para um fluxo de trabalho coeso.
  - Adição de scripts `lint`, `lint:fix`, `format` e `format:check` ao `package.json`.
  - Criação dos arquivos `.eslintignore` e `.prettierignore`.

- **História 1.4: Configurar aliases de caminho no Vite**

  - Definição de aliases de caminho no arquivo `vite.config.js` para simplificar as importações (ex: `@/components`).
  - Criação do arquivo `jsconfig.json` para melhorar o suporte do editor de código (VS Code IntelliSense) aos aliases.

- **História 1.5: Instalar e configurar a biblioteca de componentes MUI**
  - Instalação das dependências `@mui/material`, `@emotion/react` e `@emotion/styled`.
  - Instalação da fonte `@fontsource/roboto` e dos ícones `@mui/icons-material`.
  - Importação dos pesos da fonte Roboto no arquivo `src/main.jsx`.
  - Adição do componente `CssBaseline` do MUI ao `src/App.jsx` para aplicar resets de estilo consistentes.

## Como Começar (Getting Started)

1. **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU_USUARIO_GITHUB/ppedrord-frontend.git](https://github.com/SEU_USUARIO_GITHUB/ppedrord-frontend.git)
    cd ppedrord-frontend
    ```

    _(Substitua `SEU_USUARIO_GITHUB` pelo seu nome de usuário ou pela URL correta do repositório)_

2. **Instale as dependências:**

    - Com NPM:

      ```bash
      npm install
      ```

    - Com Yarn:

      ```bash
      yarn
      ```

    - Com PNPM:

      ```bash
      pnpm install
      ```

3. **Execute o servidor de desenvolvimento:**
    - Com NPM:

      ```bash
      npm run dev
      ```

    - Com Yarn:

      ```bash
      yarn dev
      ```

    - Com PNPM:
      `bash
    pnpm dev
    `
      A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## Scripts Disponíveis

No diretório do projeto, você pode executar vários scripts:

- `npm run dev` ou `yarn dev`:
  Inicia o servidor de desenvolvimento Vite.

- `npm run build` ou `yarn build`:
  Compila a aplicação para produção na pasta `dist/`.

- `npm run preview` ou `yarn preview`:
  Serve localmente o build de produção da pasta `dist/`.

- `npm run lint` ou `yarn lint`:
  Verifica o código com ESLint.

- `npm run lint:fix` ou `yarn lint:fix`:
  Tenta corrigir automaticamente os problemas reportados pelo ESLint.

- `npm run format` ou `yarn format`:
  Formata o código usando Prettier.

- `npm run format:check` ou `yarn format:check`:
  Verifica se o código está formatado corretamente com Prettier, sem fazer alterações.
