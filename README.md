# ppedrord-frontend

Este repositório contém o frontend do site pessoal de **Pedro Barbosa**. O projeto foi criado com [Vite](https://vitejs.dev/) e utiliza **React 19** para a camada de interface.

O site funciona como uma Single Page Application, trazendo seções de portfólio, artigos técnicos e um guia de deploy, além de uma página de contato.

## Principais funcionalidades

- Navegação SPA com **React Router**
- Alternância de tema claro/escuro via `ThemeContext` e `useDarkMode`
- Páginas de artigos e do guia de deploy com gráficos usando **Chart.js**
- Componentes reutilizáveis organizados em `src/components`
- Estilos isolados em **CSS Modules**

## Estrutura de pastas

```
├─ public/
├─ src/
│  ├─ components/   # componentes e layout
│  ├─ pages/        # páginas da aplicação
│  ├─ hooks/        # hooks personalizados
│  ├─ contexts/     # contextos React (ex.: tema)
│  ├─ assets/       # imagens e ícones
│  └─ style/        # estilos globais
└─ package.json
```

## Comandos

- `npm install` – instala as dependências
- `npm run dev` – executa o servidor de desenvolvimento
- `npm run build` – gera a versão de produção
- `npm run preview` – serve a build gerada
- `npm run lint` – roda o ESLint
- `npm run format` – formata o código com Prettier

## Como rodar localmente

1. Clone este repositório.
2. Execute `npm install` para baixar as dependências.
3. Rode `npm run dev` e acesse [http://localhost:5173](http://localhost:5173) para visualizar o site.

## Deploy

O deploy foi pensado para AWS utilizando um bucket S3 privado e distribuição via API Gateway. O passo a passo completo está documentado em `Guia de Projeto_ React + Vite + AWS.md`.

=======
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
