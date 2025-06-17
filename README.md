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

