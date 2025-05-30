# Guia de Projeto: React + Vite + AWS

Este guia detalha os passos para criar, configurar e implantar um site estático usando React 18, Vite, e serviços AWS como S3 e API Gateway, conforme solicitado no briefing.

## 1. Comando de Criação do Projeto Vite

Para iniciar seu projeto React 18 com Vite (usando JavaScript), execute o seguinte comando no seu terminal. Ele criará a estrutura básica do projeto no diretório `ppedrord-frontend`:

```bash
npm create vite@latest ppedrord-frontend --template react
```

Após a criação, navegue até o diretório do projeto:

```bash
cd ppedrord-frontend
```

Em seguida, instale as dependências iniciais:

```bash
npm install
```

**Configuração Adicional (ESLint + Prettier):**

Para garantir a qualidade e a consistência do código, vamos configurar o ESLint (geralmente já vem com uma configuração básica no template Vite) e o Prettier.

Instale as dependências de desenvolvimento:

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
```

Crie os arquivos de configuração na raiz do projeto:

**`.eslintrc.cjs`** (ou `.eslintrc.json` / `.js`)

```javascript
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
```

**`.prettierrc.json`**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

**`.prettierignore`**

```
dist
node_modules
package-lock.json
```

Adicione scripts ao seu `package.json` para facilitar a verificação e formatação:

```json
{
  "scripts": {
    // ... outros scripts
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write ."
  }
}
```

Agora você pode rodar `npm run lint` para verificar o código e `npm run format` para formatá-lo automaticamente.

## 2. Estrutura de Pastas Sugerida

Uma estrutura de pastas bem organizada é crucial para a manutenibilidade e escalabilidade do projeto. Aqui está uma sugestão comum e eficaz para projetos React:

```
ppedrord-frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Workflow de CI/CD
├── .vscode/                # Configurações do VS Code (opcional)
│   └── settings.json
├── public/
│   ├── logo-black.svg      # Logo preta (ou PNG)
│   └── logo-white.svg      # Logo branca (ou PNG)
│   └── vite.svg            # Ícone padrão do Vite (pode remover)
│   └── index.html          # Template HTML principal
├── src/
│   ├── assets/             # Arquivos estáticos (imagens, fontes, etc.)
│   │   └── images/
│   │       └── hero-image.jpg
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── common/         # Componentes genéricos (Button, Input, etc.)
│   │   │   └── Button.jsx
│   │   ├── layout/         # Componentes de estrutura (Header, Footer, Sidebar)
│   │   │   └── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/       # Componentes de seções da página (Hero, About, Portfolio)
│   │       └── Hero.jsx
│   │       └── AboutSection.jsx
│   │       └── PortfolioSection.jsx
│   │       └── ContactSection.jsx
│   ├── contexts/           # Context API para gerenciamento de estado global (ex: tema)
│   │   └── ThemeContext.jsx
│   ├── hooks/              # Hooks customizados
│   │   └── useDarkMode.js
│   ├── pages/              # Componentes que representam páginas inteiras (se SPA com rotas)
│   │   └── HomePage.jsx
│   ├── services/           # Lógica de comunicação com APIs (se necessário)
│   ├── styles/             # Arquivos de estilos globais ou configurações de temas
│   │   ├── global.css
│   │   └── theme.css       # Variáveis CSS para temas (light/dark)
│   ├── utils/              # Funções utilitárias genéricas
│   └── App.jsx             # Componente raiz da aplicação
│   └── main.jsx            # Ponto de entrada da aplicação
├── .eslintrc.cjs           # Configuração do ESLint
├── .gitignore              # Arquivos ignorados pelo Git
├── .prettierrc.json        # Configuração do Prettier
├── .prettierignore         # Arquivos ignorados pelo Prettier
├── package.json            # Metadados e dependências do projeto
├── package-lock.json       # Lockfile das dependências
└── vite.config.js          # Configuração do Vite
```

**Explicação das Pastas Principais:**

- **`.github/workflows`**: Contém os arquivos YAML para as GitHub Actions (CI/CD).
- **`public/`**: Arquivos estáticos que são copiados diretamente para a raiz do diretório de build (`dist/`). Ideal para `index.html`, favicons, e logos que precisam ser referenciados diretamente.
- **`src/`**: Coração do seu código-fonte.
  - **`assets/`**: Imagens, fontes, e outros recursos que serão processados pelo Vite (importados nos componentes).
  - **`components/`**: Onde vivem seus componentes React. A subdivisão em `common`, `layout`, e `sections` ajuda a organizar por tipo e reutilização.
  - **`contexts/`**: Para gerenciar estado global, como o tema (dark/light mode), usando a Context API do React.
  - **`hooks/`**: Hooks customizados para encapsular lógica reutilizável (ex: manipulação do dark mode).
  - **`pages/`**: Se seu site crescer para múltiplas páginas (Single Page Application com roteamento), cada componente de página ficaria aqui.
  - **`services/`**: Lógica para interagir com APIs externas (não estritamente necessário para um site puramente estático, mas útil se houver formulários de contato, etc.).
  - **`styles/`**: Estilos globais, variáveis CSS, configuração de temas ou resets.
  - **`utils/`**: Funções auxiliares que não são componentes React nem hooks.
- **`App.jsx`**: Componente principal que organiza o layout e as seções/páginas.
- **`main.jsx`**: Ponto de entrada que renderiza o `App` no DOM.

Essa estrutura promove modularidade e facilita a localização e manutenção do código.

## 3. Código Inicial dos Componentes React

A seguir, apresentamos o código inicial para os principais arquivos e componentes do seu projeto, utilizando **CSS Modules** para estilização. Escolhemos CSS Modules por sua capacidade de escopar estilos localmente para cada componente por padrão, evitando conflitos de nomes de classe e mantendo os estilos organizados junto aos componentes que os utilizam. Isso se alinha bem com a abordagem baseada em componentes do React.

**`src/main.jsx` (Ponto de Entrada)**

Este arquivo renderiza o componente `App` principal na `div#root` do `public/index.html`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'; // Importa estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**`src/styles/global.css` (Estilos Globais)**

Defina aqui resets básicos, fontes e estilos globais.

```css
/* Exemplo básico de reset e estilos globais */
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  background-color: var(
    --background-color,
    #ffffff
  ); /* Cor de fundo padrão (light) */
  color: var(--text-color, #333333); /* Cor de texto padrão (light) */
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* Transição suave para dark mode */
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

a {
  color: var(--link-color, #007bff);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Variáveis CSS para temas (serão usadas no dark mode) */
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --header-bg: #f8f9fa;
  --footer-bg: #e9ecef;
  --link-color: #007bff;
  --section-bg: #ffffff;
  --logo-filter: none; /* Para logo preta no tema claro */
}

[data-theme='dark'] {
  --background-color: #1a1a1a;
  --text-color: #e0e0e0;
  --header-bg: #2c2c2c;
  --footer-bg: #222222;
  --link-color: #64b5f6;
  --section-bg: #242424;
  --logo-filter: invert(1) brightness(1.5); /* Para logo branca no tema escuro */
}

/* Estilo para scroll suave */
html {
  scroll-behavior: smooth;
}
```

**`src/App.jsx` (Componente Raiz)**

Organiza a estrutura principal da página, incluindo Header, seções e Footer.

```jsx
import React from 'react'; // Não estritamente necessário com a nova JSX transform, mas boa prática
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection'; // Exemplo de seção
import PortfolioSection from './components/sections/PortfolioSection'; // Exemplo de seção
import ContactSection from './components/sections/ContactSection'; // Exemplo de seção
import Footer from './components/layout/Footer';
// Importe o ThemeProvider se for usar Context API para o tema
// import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Se usar Context API:
  // return (
  //   <ThemeProvider>
  //     <Header />
  //     <main>
  //       <Hero />
  //       <AboutSection />
  //       <PortfolioSection />
  //       <ContactSection />
  //     </main>
  //     <Footer />
  //   </ThemeProvider>
  // );

  // Versão sem Context API por enquanto:
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection id="sobre" />
        <PortfolioSection id="portfolio" />
        <ContactSection id="contato" />
      </main>
      <Footer />
    </>
  );
}

export default App;
```

**`src/components/layout/Header.jsx`**

Componente do cabeçalho fixo com navegação.

```jsx
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css'; // Importa CSS Module

// Supondo que as logos estão na pasta public/
const logoBlack = '/logo-black.svg';
const logoWhite = '/logo-white.svg';

function Header() {
  // Lógica simples para detectar o tema preferido do sistema (pode ser melhorada com Context API)
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Efeito para atualizar o atributo data-theme no body
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Função para alternar o tema (exemplo)
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const currentLogo = isDarkMode ? logoWhite : logoBlack;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#inicio" className={styles.logoLink}>
          <img
            src={currentLogo}
            alt="Logo ppedrord"
            className={styles.logo}
            // Aplica filtro via CSS variable se necessário para SVG ou PNG
            // style={{ filter: 'var(--logo-filter)' }}
          />
        </a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#inicio">Início</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#portfolio">Portfólio</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </nav>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
```

**`src/components/layout/Header.module.css`**

Estilos específicos para o Header.

```css
.header {
  position: fixed; /* Cabeçalho fixo */
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--header-bg, #f8f9fa);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0.8rem 0;
  transition: background-color 0.3s ease;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoLink {
  display: inline-block; /* Garante que o link se ajuste ao tamanho da imagem */
}

.logo {
  height: 40px; /* Ajuste a altura conforme necessário */
  width: auto;
  display: block; /* Remove espaço extra abaixo da imagem */
  /* O filtro para dark mode pode ser aplicado aqui ou via variável CSS global */
  /* filter: var(--logo-filter); */
}

.nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem; /* Espaçamento entre itens */
}

.nav a {
  color: var(--text-color, #333);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav a:hover {
  color: var(--link-color, #007bff);
  text-decoration: none;
}

.themeToggle {
  background: none;
  border: 1px solid var(--text-color, #ccc);
  color: var(--text-color, #333);
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.themeToggle:hover {
  background-color: var(--text-color, #eee);
  color: var(--background-color, #333);
}

/* Adicione media queries para responsividade */
@media (max-width: 768px) {
  .nav {
    display: none; /* Esconder navegação em telas menores (implementar menu hambúrguer depois) */
  }
  .container {
    justify-content: space-between; /* Ajusta logo e botão de tema */
  }
}
```

**`src/components/sections/Hero.jsx`**

Componente da seção Hero principal.

```jsx
import React from 'react';
import styles from './Hero.module.css';
import Button from '../common/Button'; // Exemplo de botão reutilizável

// Supondo que a imagem está em src/assets/images/
import heroImage from '../../assets/images/hero-image.jpg'; // Exemplo

function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Desenvolvimento Web Moderno</h1>
        <p className={styles.subtitle}>
          Criando experiências digitais incríveis com React, Vite e AWS.
        </p>
        <Button
          onClick={() => document.getElementById('contato')?.scrollIntoView()}
        >
          Entre em Contato
        </Button>
      </div>
      <div className={styles.imageContainer}>
        {/* Lazy loading será implementado depois, por enquanto, img padrão */}
        <img
          src={heroImage}
          alt="Ilustração abstrata de tecnologia web"
          className={styles.image}
        />
      </div>
    </section>
  );
}

export default Hero;
```

**`src/components/sections/Hero.module.css`**

Estilos para a seção Hero.

```css
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 1rem; /* Espaçamento interno, considerando o header fixo */
  min-height: 80vh; /* Altura mínima */
  background-color: var(--section-bg, #ffffff);
  max-width: 1100px;
  margin: 0 auto; /* Centraliza */
  gap: 2rem;
}

.content {
  flex: 1;
  max-width: 500px;
}

.title {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.2;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  opacity: 0.9;
}

.imageContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Responsividade */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 4rem 1rem;
    min-height: auto;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .imageContainer {
    margin-top: 2rem;
  }
}
```

**`src/components/common/Button.jsx` (Exemplo de Botão Reutilizável)**

```jsx
import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
```

**`src/components/common/Button.module.css`**

```css
.button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.primary {
  background-color: var(--link-color, #007bff);
  color: white;
}

.primary:hover {
  background-color: #0056b3; /* Escurece um pouco no hover */
  transform: translateY(-1px);
}

/* Adicione outras variantes (secondary, outline) se necessário */
```

**`src/components/layout/Footer.jsx`**

Componente de rodapé.

```jsx
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {currentYear} ppedrord. Todos os direitos reservados.</p>
        <div className={styles.socialLinks}>
          {/* Adicione links/ícones para redes sociais aqui */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

**`src/components/layout/Footer.module.css`**

```css
.footer {
  background-color: var(--footer-bg, #e9ecef);
  color: var(--text-color);
  padding: 2rem 0;
  margin-top: 4rem; /* Espaço acima do rodapé */
  transition: background-color 0.3s ease;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permite quebrar linha em telas menores */
  gap: 1rem;
}

.container p {
  margin: 0;
  font-size: 0.9rem;
}

.socialLinks {
  display: flex;
  gap: 1rem;
}

.socialLinks a {
  color: var(--text-color);
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.socialLinks a:hover {
  opacity: 1;
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
}
```

**`src/components/sections/AboutSection.jsx` (Exemplo de Seção Genérica)**

Componente reutilizável para seções de conteúdo.

```jsx
import React from 'react';
import styles from './ContentSection.module.css'; // Usando um CSS Module genérico

function AboutSection({ id }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sobre Mim</h2>
        <p>
          Aqui você pode adicionar uma descrição sobre você, suas habilidades,
          experiências e paixões. Fale sobre sua jornada no desenvolvimento web
          e o que te motiva a criar soluções inovadoras.
        </p>
        {/* Adicione mais conteúdo, imagens ou subcomponentes conforme necessário */}
      </div>
    </section>
  );
}

// Crie componentes similares para PortfolioSection e ContactSection
// Exemplo: PortfolioSection.jsx
function PortfolioSection({ id }) {
  return (
    <section id={id} className={`${styles.section} ${styles.alternateBg}`}>
      {' '}
      {/* Exemplo com fundo alternado */}
      <div className={styles.container}>
        <h2 className={styles.title}>Portfólio</h2>
        <p>Apresente seus projetos aqui. Use cards, imagens e links.</p>
        {/* Grid de projetos */}
      </div>
    </section>
  );
}

// Exemplo: ContactSection.jsx
function ContactSection({ id }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contato</h2>
        <p>Inclua um formulário de contato ou informações de contato direto.</p>
        {/* Formulário ou links */}
      </div>
    </section>
  );
}

export { AboutSection, PortfolioSection, ContactSection }; // Exporta todos
// Ou exporte individualmente:
// export default AboutSection;
```

**`src/components/sections/ContentSection.module.css`**

Estilos genéricos para seções de conteúdo.

```css
.section {
  padding: 4rem 1rem;
  background-color: var(--section-bg, #ffffff);
  transition: background-color 0.3s ease;
}

/* Cor de fundo alternada para variar visualmente */
.alternateBg {
  background-color: var(
    --footer-bg,
    #f8f9fa
  ); /* Reutiliza cor do footer ou define outra */
}

.container {
  max-width: 900px; /* Container um pouco mais estreito para texto */
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center; /* Centraliza títulos das seções */
}

.container p {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: var(--text-color);
  opacity: 0.9;
}
```

Lembre-se de criar os arquivos `.jsx` e `.module.css` correspondentes dentro da estrutura de pastas sugerida. Este código fornece uma base sólida para começar a construir as funcionalidades e o design do seu site.

## 4. Configuração de Dark Mode e Troca de Logo

A implementação do dark mode melhora a experiência do usuário em ambientes com pouca luz e é uma funcionalidade cada vez mais esperada. Usaremos variáveis CSS e um pouco de JavaScript para gerenciar o tema.

**Estratégia:**

1. **Variáveis CSS:** Definimos cores para os temas claro (padrão) e escuro usando variáveis CSS no `:root` e em um seletor de atributo `[data-theme='dark']` no `global.css` (já incluído na seção anterior).
2. **Detecção e Persistência:** Usaremos JavaScript para detectar a preferência do sistema (`prefers-color-scheme`), permitir que o usuário alterne o tema manualmente e, idealmente, persistir essa escolha no `localStorage`.
3. **Troca de Logo:** A logo será trocada dinamicamente com base no tema ativo.

**Implementação Detalhada:**

**a) Variáveis CSS (Revisão):**

No `src/styles/global.css`, já definimos as variáveis:

```css
/* Em :root (tema claro - padrão) */
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --header-bg: #f8f9fa;
  /* ... outras variáveis ... */
  --logo-filter: none; /* Filtro para logo preta */
}

/* Em [data-theme='dark'] (tema escuro) */
[data-theme='dark'] {
  --background-color: #1a1a1a;
  --text-color: #e0e0e0;
  --header-bg: #2c2c2c;
  /* ... outras variáveis ... */
  --logo-filter: invert(1) brightness(1.5); /* Filtro para logo branca (ajuste conforme necessário) */
}

/* Aplicação das variáveis nos elementos */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  /* ... */
}

.header {
  background-color: var(--header-bg);
  /* ... */
}

/* etc. */
```

**b) Lógica de Troca de Tema (JavaScript):**

Podemos encapsular a lógica do tema em um Hook customizado (`useDarkMode`) e/ou um Context API (`ThemeContext`) para facilitar o gerenciamento e acesso em diferentes componentes.

**Opção 1: Hook Customizado (`src/hooks/useDarkMode.js`)**

Este hook gerencia o estado do tema e aplica o atributo `data-theme` ao `<body>`.

```javascript
import { useState, useEffect } from 'react';

function useDarkMode() {
  // 1. Tenta ler do localStorage, senão usa preferência do sistema
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      return localTheme;
    }
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // 2. Efeito para aplicar o tema ao body e salvar no localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Ou document.body
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useDarkMode;
```

**Como usar o Hook no `Header.jsx` (Exemplo):**

```jsx
import React from 'react';
import styles from './Header.module.css';
import useDarkMode from '../../hooks/useDarkMode'; // Importa o hook

const logoBlack = '/logo-black.svg';
const logoWhite = '/logo-white.svg';

function Header() {
  const [theme, toggleTheme] = useDarkMode(); // Usa o hook
  const isDarkMode = theme === 'dark';
  const currentLogo = isDarkMode ? logoWhite : logoBlack;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#inicio" className={styles.logoLink}>
          <img src={currentLogo} alt="Logo ppedrord" className={styles.logo} />
        </a>
        {/* Navegação ... */}
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
```

**Opção 2: Context API (`src/contexts/ThemeContext.jsx`)**

Se precisar acessar ou modificar o tema em múltiplos componentes aninhados, um Context é mais adequado.

```jsx
import React, { createContext, useContext } from 'react';
import useDarkMode from '../hooks/useDarkMode'; // Reutiliza a lógica do hook

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**Como usar o Context:**

1. **Envolver o App:** No `src/main.jsx` ou `src/App.jsx`, envolva seu aplicativo com o `ThemeProvider`.

   ```jsx
   // Em main.jsx
   import { ThemeProvider } from './contexts/ThemeContext';
   // ...
   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <ThemeProvider>
         <App />
       </ThemeProvider>
     </React.StrictMode>
   );
   ```

2. **Consumir o Context:** Em qualquer componente filho (como `Header`), use o hook `useTheme`.

   ```jsx
   // Em Header.jsx
   import { useTheme } from '../../contexts/ThemeContext';
   // ...
   function Header() {
     const { theme, toggleTheme } = useTheme(); // Consome o contexto
     const isDarkMode = theme === 'dark';
     const currentLogo = isDarkMode ? logoWhite : logoBlack;
     // ... resto do componente usando theme e toggleTheme
   }
   ```

**c) Troca de Logo:**

Como visto nos exemplos acima, a maneira mais direta é ter duas versões da logo (preta para tema claro, branca para tema escuro) e selecionar a apropriada com base no estado do tema:

```jsx
const logoBlack = '/logo-black.svg'; // Ou .png
const logoWhite = '/logo-white.svg'; // Ou .png
// ... dentro do componente
const { theme } = useTheme(); // Ou const [theme] = useDarkMode();
const isDarkMode = theme === 'dark';
const currentLogo = isDarkMode ? logoWhite : logoBlack;
// ... no JSX
<img src={currentLogo} alt="Logo ppedrord" className={styles.logo} />;
```

**Considerações sobre Logos SVG vs PNG:**

- **SVG:** Preferível por ser vetorial (escalável sem perda de qualidade) e permitir manipulação via CSS (cores, filtros). Se usar SVGs monocromáticos, você poderia ter _um único_ SVG e alterar sua cor (`fill`) via CSS com base no tema, em vez de trocar o arquivo `src`.
- **PNG:** Use se as logos forem complexas ou se a manipulação via CSS não for viável. A troca do `src` como mostrado acima funciona perfeitamente.

**Alternativa com Filtro CSS (para logos simples):**

Se você tiver apenas a logo preta (ou uma cor base), pode usar um filtro CSS para "invertê-la" no modo escuro. Isso funciona melhor com logos simples e monocromáticas.

```css
/* Em global.css */
:root {
  /* ... */
  --logo-filter: none;
}

[data-theme='dark'] {
  /* ... */
  /* Ajuste invert() e brightness() para obter o branco desejado */
  --logo-filter: invert(100%) brightness(1.5);
}
```

```jsx
// Em Header.jsx
const logoBase = '/logo-black.svg'; // Usa sempre a mesma logo
// ...
<img
  src={logoBase}
  alt="Logo ppedrord"
  className={styles.logo}
  style={{ filter: 'var(--logo-filter)' }} // Aplica o filtro dinâmico
/>;
```

Escolha a abordagem (Hook ou Context) e a estratégia de troca de logo (arquivos separados ou filtro CSS) que melhor se adapta à complexidade do seu projeto e às suas logos.

## 5. Hosting: Bucket S3 Privado + API Gateway

Vamos configurar a hospedagem do seu site estático usando um bucket S3 privado e um API Gateway como front-door. Isso garante que os arquivos do site não sejam acessíveis publicamente via S3, apenas através do API Gateway.

**a) Criação do Bucket S3 Privado**

1. **Acesse o Console AWS:** Faça login na sua conta AWS e navegue até o serviço S3.
2. **Criar Bucket:** Clique em "Criar bucket".
   - **Nome do bucket:** Escolha um nome único globalmente (ex: `ppedrord-frontend-site-data`).
   - **Região da AWS:** Selecione a região desejada (ex: `us-east-1`).
   - **Configurações de propriedade de objeto:** Mantenha "ACLs desabilitadas" (recomendado).
   - **Bloquear acesso público:** Mantenha TODAS as opções de bloqueio de acesso público MARCADAS. Isso garante que o bucket permaneça privado.
   - **Versionamento do bucket:** Desabilitado (ou habilitado, se desejar histórico de versões).
   - **Tags:** Adicione tags se necessário (ex: `Project: ppedrord-frontend`).
   - **Criptografia padrão:** Mantenha SSE-S3 (padrão).
3. **Confirmar Criação:** Clique em "Criar bucket".

**b) Política de Acesso do Bucket (Bucket Policy)**

Precisamos permitir que o API Gateway leia (`s3:GetObject`) os arquivos do bucket. A forma mais segura é criar uma Role IAM para o API Gateway e referenciar essa Role na política do bucket. No entanto, uma abordagem comum (embora um pouco menos granular) é permitir o acesso baseado no ARN do API Gateway ou na conta AWS.

_Alternativa 1: Permitir acesso a uma Role IAM específica (Recomendado se já souber a Role)_

Se você criar uma Role IAM para a integração do API Gateway (veremos isso adiante), a política seria algo como:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAPIGatewayGetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:role/YourApiGatewayS3AccessRole"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

_Alternativa 2: Permitir acesso genérico ao serviço API Gateway (Mais simples para começar)_

Esta política permite que _qualquer_ API Gateway na sua conta acesse o bucket. Seja cauteloso se tiver múltiplas APIs.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAPIGatewayGetObject",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "ArnLike": {
          "aws:SourceArn": "arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/*"
        }
      }
    }
  ]
}
```

**Importante:**

- Substitua `YOUR_BUCKET_NAME` pelo nome exato do seu bucket.
- Substitua `ACCOUNT_ID` pelo ID da sua conta AWS.
- Substitua `REGION` pela região do seu API Gateway (ex: `us-east-1`).
- Substitua `API_ID` pelo ID do seu API Gateway (você obterá isso ao criá-lo).
- O `/*` no final do `Resource` permite acesso a todos os objetos dentro do bucket.
- A `Condition` com `aws:SourceArn` é crucial para restringir o acesso apenas à sua API específica, tornando a Alternativa 2 mais segura.

**Como aplicar a política:**

1. No console do S3, vá para o seu bucket.
2. Clique na aba "Permissões".
3. Role para baixo até "Política de bucket" e clique em "Editar".
4. Cole a política JSON escolhida (devidamente preenchida) e clique em "Salvar alterações".

**c) Criação e Configuração do API Gateway REST (Edge-Optimized)**

1. **Acesse o Console AWS:** Navegue até o serviço API Gateway.
2. **Criar API:** Clique em "Criar API".
3. **Escolha o tipo de API:** Selecione o card "API REST" (NÃO o "API REST Privado") e clique em "Construir".
4. **Configurações Iniciais:**

   - **Escolha o protocolo:** REST.
   - **Criar nova API:** Nova API.
   - **Nome da API:** `ppedrord-frontend-gateway` (ou similar).
   - **Descrição:** (Opcional) API para servir o site estático ppedrord-frontend do S3.
   - **Tipo de endpoint:** **Edge Optimized** (para melhor performance global via CloudFront gerenciado pela AWS).
   - Clique em "Criar API".

5. **Criar Recurso Proxy:**

   - No painel da API criada, clique em "Ações" > "Criar Recurso".
   - **Nome do recurso:** `proxy`
   - **Caminho do recurso:** `{proxy+}` (Isso captura qualquer caminho após o URL base da API).
   - Marque a opção "Configurar como recurso de proxy".
   - Clique em "Criar recurso".

6. **Criar Método ANY para o Proxy:**

   - Com o recurso `{proxy+}` selecionado, clique em "Ações" > "Criar Método".
   - No dropdown, selecione `ANY` e clique no ícone de confirmação (✓).
   - **Configuração da Integração:**
     - **Tipo de integração:** Serviço da AWS.
     - **Região da AWS:** Selecione a mesma região do seu bucket S3.
     - **Serviço da AWS:** S3.
     - **Subdomínio do S3:** Deixe em branco (o API Gateway usará o endpoint regional correto).
     - **Método HTTP:** GET (pois estamos apenas lendo do S3).
     - **Tipo de ação:** Usar substituição de caminho.
     - **Substituição de caminho:** `{bucket}/{key}` (Isso mapeia o bucket e o caminho da URL).
     - **Função de execução (Execution role):** Aqui você precisa de uma Role IAM que conceda ao API Gateway permissão para executar `s3:GetObject`.
       - Clique em "Criar uma nova função" ou insira o ARN de uma role existente que tenha pelo menos a permissão `s3:GetObject` para o seu bucket (`arn:aws:s3:::YOUR_BUCKET_NAME/*`). Se criar uma nova, a AWS geralmente configura as permissões básicas necessárias.
       - **Importante:** Se você usou a Alternativa 1 na política do bucket, certifique-se de que esta é a Role referenciada lá.
     - **Mapeamento de credenciais de passagem:** Deixe em branco.
     - **Configurações de tempo limite:** Mantenha o padrão (ou ajuste se necessário).
   - Clique em "Salvar". Confirme a permissão para o API Gateway invocar a função, se solicitado.

7. **Configurar Integração para o Recurso Raiz (/):**

   - Precisamos garantir que acessar a URL base da API (ex: `https://xyz.execute-api.us-east-1.amazonaws.com/prod/`) sirva o `index.html`.
   - Selecione o recurso raiz `/` na árvore de recursos à esquerda.
   - Clique em "Ações" > "Criar Método".
   - Selecione `GET` e clique no ícone de confirmação (✓).
   - **Configuração da Integração (similar ao passo 6, mas com `index.html` fixo):**
     - **Tipo de integração:** Serviço da AWS.
     - **Região da AWS:** Mesma região do bucket.
     - **Serviço da AWS:** S3.
     - **Método HTTP:** GET.
     - **Tipo de ação:** Usar substituição de caminho.
     - **Substituição de caminho:** `{bucket}/index.html` (Força a busca pelo `index.html`).
     - **Função de execução:** Use a mesma Role IAM criada/usada no passo 6.
   - Clique em "Salvar".

8. **Configurar Respostas de Integração (Content-Type):**

   - Para que o navegador interprete os arquivos corretamente (HTML, CSS, JS, imagens), precisamos mapear os tipos de conteúdo.
   - Selecione o método `ANY` do recurso `{proxy+}`.
   - Clique em "Resposta de Integração".
   - Expanda a resposta padrão (Status HTTP `200`).
   - Expanda "Mapeamento de Cabeçalhos".
   - Clique em "Adicionar cabeçalho".
     - **Nome:** `Content-Type`
     - **Mapeado de:** `integration.response.header.Content-Type`
   - Clique no ícone de confirmação (✓).
   - **Faça o mesmo para o método `GET` do recurso raiz `/`.**
   - **Importante:** O S3 geralmente retorna o `Content-Type` correto se os arquivos foram enviados com os metadados adequados. Este mapeamento garante que o API Gateway repasse esse cabeçalho.

9. **Implantar a API:**

   - Clique em "Ações" > "Implantar API".
   - **Estágio de implantação:** `[Novo Estágio]`
   - **Nome do estágio:** `prod` (ou `dev`, `v1`, etc.).
   - **Descrição da implantação:** (Opcional) Implantação inicial.
   - Clique em "Implantar".

10. **Obter URL de Invocação:**
    - Após a implantação, você verá a "URL de Invocação" do estágio (ex: `https://abcdef123.execute-api.us-east-1.amazonaws.com/prod`). Este é o URL base do seu site!
    - Teste acessando a URL no navegador. Deve carregar seu `index.html` (se já tiver sido enviado para o S3).
    - Teste acessando um caminho específico (ex: `URL_BASE/assets/image.png`) para verificar se o proxy está funcionando.

**d) (Opcional) CloudFront na Frente do API Gateway**

Embora o endpoint Edge Optimized do API Gateway já use a rede do CloudFront, colocar sua própria distribuição CloudFront na frente oferece mais controle sobre cache (TTL), WAF, certificados SSL customizados (com seu próprio domínio) e outras funcionalidades.

- Crie uma distribuição CloudFront.
- Configure a **Origem** para apontar para a **URL de Invocação** do seu API Gateway (ex: `abcdef123.execute-api.us-east-1.amazonaws.com`).
- **Importante:** Não inclua o nome do estágio (`/prod`) no domínio de origem. Configure o "Caminho de origem" para `/prod` (ou o nome do seu estágio).
- Configure comportamentos de cache, encaminhamento de cabeçalhos (especialmente `Host` e `Origin` se necessário), e outras opções desejadas.
- Aponte seu domínio personalizado (se tiver) para o nome de domínio do CloudFront.

Esta configuração S3 + API Gateway (+ CloudFront opcional) fornece uma solução robusta, segura e escalável para hospedar seu site estático React.

## 6. CI/CD – GitHub Actions para Deploy Automatizado

Para automatizar o processo de build e deploy do seu site para o S3 sempre que houver um push na branch `main`, usaremos GitHub Actions.

**a) Configuração das Credenciais AWS no GitHub Secrets**

Antes de criar o workflow, você precisa armazenar suas credenciais AWS de forma segura no seu repositório GitHub. **Nunca** coloque suas chaves de acesso diretamente no código ou no arquivo de workflow.

1. **Crie um Usuário IAM:** No console da AWS, crie um novo usuário IAM dedicado para esta automação. Conceda a ele permissões de **mínimo privilégio** necessárias para o deploy. Isso geralmente inclui:
   - `s3:PutObject`
   - `s3:GetObject` (pode não ser estritamente necessário para o sync, mas útil)
   - `s3:ListBucket` (necessário para `aws s3 sync`)
   - `s3:DeleteObject` (necessário para a flag `--delete` do `sync`)
   - (Opcional) `cloudfront:CreateInvalidation` se você usar CloudFront e quiser invalidar o cache.
   - (Opcional) Permissões para `apigateway:CreateDeployment` se precisar criar novos deployments da API.
   - **Restrinja essas permissões APENAS ao bucket S3 específico** (`arn:aws:s3:::YOUR_BUCKET_NAME/*` e `arn:aws:s3:::YOUR_BUCKET_NAME`).
2. **Gere Chaves de Acesso:** Crie um par de chaves de acesso (Access Key ID e Secret Access Key) para este usuário IAM.
3. **Adicione Secrets ao GitHub:**
   - No seu repositório GitHub, vá para `Settings` > `Secrets and variables` > `Actions`.
   - Clique em `New repository secret`.
   - Crie um secret chamado `AWS_ACCESS_KEY_ID` e cole a Access Key ID gerada.
   - Crie outro secret chamado `AWS_SECRET_ACCESS_KEY` e cole a Secret Access Key gerada.

**b) Criação do Workflow (`.github/workflows/deploy.yml`)**

Crie o diretório `.github/workflows/` na raiz do seu projeto, se ainda não existir. Dentro dele, crie o arquivo `deploy.yml` com o seguinte conteúdo:

```yaml
name: Deploy Website to S3

# Dispara o workflow em pushes para a branch main
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest # Usa a última versão estável do Ubuntu como runner

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4 # Ação para baixar o código do repositório

      - name: Set up Node.js
        uses: actions/setup-node@v4 # Ação para configurar o ambiente Node.js
        with:
          node-version: '18' # Especifique a versão do Node.js que seu projeto usa
          cache: 'npm' # Habilita cache para dependências npm

      - name: Install dependencies
        run: npm ci # Instala dependências usando package-lock.json para consistência

      - name: Build project
        run: npm run build # Executa o script de build (geralmente cria a pasta dist/)

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4 # Ação para configurar credenciais AWS
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }} # Lê a chave do GitHub Secrets
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }} # Lê a chave secreta do GitHub Secrets
          aws-region: us-east-1 # Substitua pela região do seu bucket S3 e API Gateway

      - name: Deploy static site to S3 bucket
        run: |
          aws s3 sync dist/ s3://ppedrord-frontend-site-data --delete
        # Substitua "ppedrord-frontend-site-data" pelo nome exato do seu bucket S3
        # A flag --delete remove arquivos do bucket que não existem mais na pasta dist/

      # --- Opcional: Invalidar Cache do CloudFront ---
      # Descomente e ajuste se você estiver usando CloudFront na frente do API Gateway
      # - name: Invalidate CloudFront Cache
      #   run: |
      #     aws cloudfront create-invalidation \
      #       --distribution-id YOUR_CLOUDFRONT_DISTRIBUTION_ID \
      #       --paths "/*"
      #   # Substitua YOUR_CLOUDFRONT_DISTRIBUTION_ID pelo ID da sua distribuição CloudFront

      # --- Opcional: Criar Novo Deployment no API Gateway ---
      # Geralmente não é necessário para atualizações de conteúdo estático,
      # mas pode ser útil se a estrutura da API mudar.
      # - name: Create API Gateway Deployment
      #   run: |
      #     aws apigateway create-deployment \
      #       --rest-api-id YOUR_API_GATEWAY_ID \
      #       --stage-name prod
      #   # Substitua YOUR_API_GATEWAY_ID pelo ID da sua API Gateway
      #   # Substitua prod pelo nome do seu estágio de implantação
```

**Explicação do Workflow:**

1. **`name`**: Nome do workflow que aparecerá na aba Actions do GitHub.
2. **`on`**: Define o gatilho. Aqui, ele roda sempre que houver um `push` na branch `main`.
3. **`jobs`**: Contém os trabalhos a serem executados. Temos um job chamado `deploy`.
4. **`runs-on`**: Especifica o tipo de máquina virtual que executará o job.
5. **`steps`**: Sequência de tarefas (ações ou comandos) a serem executadas:
   - **`Checkout repository`**: Baixa o código do seu repositório para o runner.
   - **`Set up Node.js`**: Instala a versão especificada do Node.js e configura o cache do `npm` para acelerar instalações futuras.
   - **`Install dependencies`**: Executa `npm ci`, que instala as dependências exatamente como definidas no `package-lock.json`.
   - **`Build project`**: Executa o comando `npm run build` (definido no seu `package.json`), que compila seu aplicativo React e gera os arquivos estáticos na pasta `dist/`.
   - **`Configure AWS Credentials`**: Usa uma ação oficial da AWS para configurar as credenciais de acesso lidas dos GitHub Secrets que você criou.
   - **`Deploy static site to S3 bucket`**: Usa o AWS CLI (pré-instalado nos runners do GitHub) para sincronizar o conteúdo da pasta `dist/` com o seu bucket S3. A flag `--delete` garante que arquivos removidos do seu build também sejam removidos do bucket.
   - **(Opcional) `Invalidate CloudFront Cache`**: Se estiver usando CloudFront, este passo (comentado por padrão) invalida o cache para que os usuários recebam a versão mais recente do site imediatamente.
   - **(Opcional) `Create API Gateway Deployment`**: Se necessário, cria um novo deployment para o estágio especificado do API Gateway.

**Como Usar:**

1. Certifique-se de que o nome do bucket (`ppedrord-frontend-site-data`) e a região (`us-east-1`) no passo `Deploy static site to S3 bucket` e `Configure AWS Credentials` estão corretos.
2. Se estiver usando CloudFront ou precisar de novos deployments da API Gateway, descomente e preencha os IDs correspondentes nos passos opcionais.
3. Faça o commit e push do arquivo `.github/workflows/deploy.yml` para o seu repositório na branch `main`.

Agora, a cada push para a branch `main`, o GitHub Actions executará automaticamente o build e o deploy do seu site para o S3.

## 7. (Opcional) Alternativa com AWS Amplify Hosting

AWS Amplify Hosting é uma alternativa poderosa e simplificada para hospedar aplicações web full-stack e sites estáticos, automatizando grande parte do processo de build e deploy.

**Vantagens do Amplify Hosting:**

- **CI/CD Integrado:** Conecta-se diretamente ao seu repositório Git (GitHub, GitLab, Bitbucket, CodeCommit) e aciona builds e deploys automaticamente em commits para branches específicas.
- **Gerenciamento Simplificado:** Provisiona e gerencia a infraestrutura necessária (incluindo CDN CloudFront por padrão) com configurações otimizadas.
- **Recursos Adicionais:** Facilita a adição de back-end (autenticação, APIs, banco de dados) através do Amplify CLI/Studio.
- **Previews de Pull Request:** Cria automaticamente ambientes temporários para cada pull request, facilitando a revisão.

**Passos para Configurar com Amplify Hosting:**

1. **Acesse o Console AWS Amplify:** Navegue até o serviço AWS Amplify no console.
2. **Criar Nova Aplicação:** Em "Host web apps", clique em "Get Started".
3. **Conectar Repositório:**

   - Escolha seu provedor Git (ex: GitHub) e clique em "Continue".
   - Autentique-se com o GitHub (se necessário) e autorize o AWS Amplify a acessar seus repositórios.
   - Selecione o repositório do seu projeto (`ppedrord-frontend`).
   - Escolha a branch que acionará os deploys de produção (geralmente `main`).
   - Marque a opção "Connecting a monorepo?" se seu projeto estiver dentro de um monorepo (não parece ser o caso aqui).
   - Clique em "Next".

4. **Configurar Definições de Build:**

   - O Amplify geralmente detecta frameworks como React/Vite e sugere configurações de build. Verifique se estão corretas.
   - **Nome da Aplicação:** `ppedrord-frontend` (ou como desejar).
   - **Build and test settings:** Clique em "Edit".

     - **Build Command:** Verifique se os comandos estão corretos. Para Vite, geralmente são:

       ```yaml
       version: 1
       frontend:
         phases:
           preBuild:
             commands:
               - npm ci # Instala dependências
           build:
             commands:
               - npm run build # Executa o build
         artifacts:
           baseDirectory: dist # Diretório de saída do build
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
       ```

     - **Environment variables:** Adicione aqui quaisquer variáveis de ambiente necessárias durante o build (ex: `VITE_API_URL` se você tivesse uma API).
     - **Amplify Role:** O Amplify criará uma Role IAM para ele mesmo. Você pode revisar/editar suas permissões se necessário (por exemplo, se o build precisar acessar outros serviços AWS).

   - Salve as configurações de build.
   - Clique em "Next".

5. **Revisar e Implantar:**

   - Revise todas as configurações.
   - Clique em "Save and deploy".

6. **Aguardar Provisionamento e Deploy:**
   - O Amplify começará a provisionar a infraestrutura e executará o primeiro build e deploy. Isso pode levar alguns minutos.
   - Você poderá acompanhar o progresso no console do Amplify.
   - Após a conclusão, o Amplify fornecerá uma URL padrão (ex: `https://main.d1234abcd.amplifyapp.com`). Acesse-a para ver seu site.

**Configurações Adicionais no Amplify:**

- **Domínios Personalizados:** Na seção "Domain management", você pode configurar seu próprio domínio.
- **Redirecionamentos e Regras de Reescrita:**
  - Para Single Page Applications (SPAs) como React, é crucial configurar uma regra de reescrita para que todas as rotas (ex: `/sobre`, `/contato`) sejam direcionadas para `index.html`, permitindo que o roteamento do lado do cliente funcione.
  - Vá para "Rewrites and redirects".
  - Adicione uma regra:
    - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>` (Regex para capturar caminhos que não são arquivos estáticos)
    - **Target address:** `/index.html`
    - **Type:** `200 (Rewrite)`
- **Variáveis de Ambiente:** Gerencie variáveis de ambiente para diferentes branches na seção "Environment variables".

**Integração com S3/API Gateway Existente (Cenário Menos Comum com Amplify):**

O cenário principal do Amplify Hosting é ele gerenciar _todo_ o processo de hospedagem (build, deploy, CDN). Usá-lo apenas para buildar e depois _manualmente_ (ou com scripts customizados no build) enviar para o seu bucket S3 privado + API Gateway _anula muitas das vantagens do Amplify_. Seria mais complexo do que usar GitHub Actions diretamente.

Se você _realmente_ quisesse que o Amplify publicasse no _seu_ bucket S3 específico em vez do gerenciado pelo Amplify, você precisaria:

1. **Modificar a Role IAM do Amplify:** Conceder à Role de serviço do Amplify (`Amplify-Backend-Deployment-Role` ou similar) as permissões `s3:PutObject`, `s3:DeleteObject`, etc., no _seu_ bucket S3.
2. **Customizar o Build Spec (`amplify.yml`):** Na fase `build` ou `postBuild`, adicionar comandos `aws s3 sync` para copiar os artefatos de `dist/` para `s3://YOUR_BUCKET_NAME --delete`, similar ao que foi feito na GitHub Action.
3. **Desativar Artefatos Padrão:** Configurar `artifacts.baseDirectory` para um local vazio ou inexistente para que o Amplify não tente servir de seu próprio bucket/CDN.

**Conclusão sobre Amplify:**

Se o objetivo é a **máxima simplicidade e automação** para hospedar o frontend estático, com CI/CD e CDN gerenciados, o **AWS Amplify Hosting é uma excelente escolha** e provavelmente mais fácil de configurar do que S3 + API Gateway + CloudFront + GitHub Actions manualmente. Ele cuida da maioria dos detalhes para você.

Se o requisito estrito é usar um **bucket S3 privado específico** com **API Gateway como front-door**, a abordagem com **GitHub Actions** detalhada na seção anterior é mais direta e alinhada a esse requisito específico.

## 8. Dicas Rápidas de Performance e Acessibilidade

Para garantir que seu site seja rápido, eficiente e acessível a todos os usuários, considere as seguintes dicas:

**Performance:**

1. **Code Splitting:** O Vite já faz code splitting automático baseado em importações dinâmicas (`import("./module.js")`). Use isso para carregar componentes ou bibliotecas pesadas apenas quando forem necessários, especialmente se você adicionar rotas ao seu SPA.
2. **Lazy Loading de Imagens:** Carregue imagens que estão fora da viewport inicial (abaixo da dobra) apenas quando o usuário rolar até elas. Use o atributo `loading="lazy"` em tags `<img>` para uma implementação nativa simples:

   ```html
   <img
     src="image.jpg"
     alt="Descrição da imagem"
     loading="lazy"
     width="..."
     height="..."
   />
   ```

   Para navegadores mais antigos ou mais controle, use bibliotecas JavaScript como `lazysizes` ou a Intersection Observer API.

3. **Otimização de Imagens:**
   - Use formatos modernos como WebP ou AVIF, que oferecem melhor compressão.
   - Redimensione as imagens para o tamanho máximo que serão exibidas.
   - Comprima as imagens usando ferramentas online (TinyPNG, Squoosh) ou bibliotecas de build.
4. **Minificação e Bundling:** O Vite (`npm run build`) já cuida da minificação de JS/CSS e do bundling eficiente.
5. **Caching:** Configure o cache corretamente no seu servidor (S3/CloudFront/API Gateway). Arquivos com nomes que incluem hashes (padrão do Vite para assets versionados) podem ter um cache longo, enquanto `index.html` deve ter um cache mais curto ou `no-cache` para garantir que os usuários sempre obtenham a versão mais recente que referencia os assets corretos.
6. **Rede de Distribuição de Conteúdo (CDN):** Usar o API Gateway Edge-Optimized ou o CloudFront (seja diretamente ou via Amplify Hosting) já coloca seus assets mais perto dos usuários globalmente, reduzindo a latência.

**Acessibilidade (a11y):**

1. **HTML Semântico:** Use tags HTML apropriadas para a estrutura do seu conteúdo (`<header>`, `<footer>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, etc.). Isso ajuda leitores de tela e tecnologias assistivas a entenderem a página.
2. **Textos Alternativos (Alt Text):** Forneça descrições significativas para todas as imagens (`alt="..."`) que transmitem informação. Para imagens puramente decorativas, use `alt=""`.
3. **Contraste de Cores:** Garanta que haja contraste suficiente entre o texto e a cor de fundo, especialmente importante com o dark mode. Use ferramentas online para verificar os rácios de contraste (WCAG AA recomenda 4.5:1 para texto normal).
4. **Navegação por Teclado:** Certifique-se de que todos os elementos interativos (links, botões, campos de formulário) sejam focáveis e operáveis usando apenas o teclado (Tab, Shift+Tab, Enter, Espaço). Mantenha uma ordem de foco lógica e visível (evite remover `outline` sem fornecer uma alternativa clara).
5. **ARIA (Accessible Rich Internet Applications):** Use atributos ARIA quando necessário para adicionar semântica a componentes complexos ou dinâmicos (ex: `aria-label`, `aria-hidden`, `role`). No entanto, prefira usar HTML semântico nativo sempre que possível.
6. **Rótulos de Formulário:** Associe `label`s a todos os campos de formulário (`<input>`, `<textarea>`, `<select>`) usando o atributo `for` ou envolvendo o input dentro do label.
7. **Títulos de Página Dinâmicos:** Atualize o `<title>` da página dinamicamente (usando `useEffect` e `document.title` ou bibliotecas como `react-helmet-async`) para refletir o conteúdo atual, especialmente em SPAs com roteamento.

Integrar essas práticas desde o início do desenvolvimento resultará em um site mais rápido, agradável e inclusivo.
