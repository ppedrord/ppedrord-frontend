import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from './DeployGuidePage.module.css';
import Button from '../components/common/Button/Button';

import { LuMenu } from 'react-icons/lu';

const DeployGuidePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState('dev');
  const [diagramInfo, setDiagramInfo] = useState({
    visible: false,
    title: '',
    desc: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const decisionChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const currentYear = new Date().getFullYear();


  // Função para obter valor da variável CSS (para o gráfico)
  const getCssVariable = (variableName) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
    }
    // Fallback para SSR ou ambientes sem DOM
    if (variableName === '--text-color') return '#1e293b';
    if (variableName === '--text-color-secondary') return '#64748b';
    if (variableName === '--card-bg') return '#ffffff'; // Cor de fundo do gráfico
    return '#ffffff'; // Fallback genérico
  };

  const sections = [
    { id: 'overview', title: 'Visão Geral' },
    { id: 'comparison', title: 'Comparativo de Ferramentas' },
    { id: 'architecture', title: 'Arquitetura da Solução' },
    { id: 'implementation', title: 'Guia de Implementação' },
    { id: 'flow', title: 'Fluxo de Deploy' },
    { id: 'security', title: 'Checklist de Segurança' },
  ];

  const diagramData = {
    'diag-github': {
      title: 'GitHub: Repositório e Actions',
      desc: 'O ponto de partida. O código CDK e os workflows do pipeline vivem aqui. O GitFlow com branches `develop`, `stage` e `main` organiza o fluxo de desenvolvimento e aciona os pipelines de CI/CD.',
    },
    'diag-tooling': {
      title: 'Conta de Ferramentas (Tooling)',
      desc: 'Uma conta AWS dedicada para segurança e centralização. Ela hospeda o provedor OIDC que estabelece a confiança com o GitHub e a "Role Principal" que o GitHub Actions assume. Esta role não tem permissões diretas, apenas a capacidade de assumir outras roles.',
    },
    'diag-dev': {
      title: 'Conta de Desenvolvimento (Dev)',
      desc: 'Ambiente para desenvolvimento e testes rápidos. O deploy aqui é automático a partir da branch `develop`. A `DevDeployRole` tem permissões mais flexíveis para agilizar o trabalho da equipe.',
    },
    'diag-hml': {
      title: 'Conta de Homologação (HML)',
      desc: 'Ambiente para testes de aceitação e validação pré-produção. O deploy a partir da branch `stage` requer aprovação manual. A `HmlDeployRole` tem permissões restritas para se assemelhar ao ambiente de produção.',
    },
    'diag-prod': {
      title: 'Conta de Produção (Prod)',
      desc: 'O ambiente final, servindo usuários reais. Deploys a partir da branch `main` exigem aprovações rigorosas. A `ProdDeployRole` segue estritamente o princípio do menor privilégio, garantindo máxima segurança.',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = 'overview';
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          if (window.pageYOffset >= sectionTop - 80) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Função para criar/atualizar o gráfico
    const createOrUpdateChart = () => {
      if (decisionChartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        const ctx = decisionChartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
              'Flexibilidade',
              'Segurança (OIDC)',
              'Integração com GitHub',
            ],
            datasets: [
              {
                label: 'Fatores para Escolha do GitHub Actions',
                data: [35, 35, 30],
                backgroundColor: [
                  getCssVariable('--chart-color-1') || '#38bdf8',
                  getCssVariable('--chart-color-2') || '#0ea5e9',
                  getCssVariable('--chart-color-3') || '#0284c7',
                ],
                borderColor: getCssVariable('--card-bg') || '#fff', // Usa o fundo do card como borda
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 12,
                  font: { size: 10 },
                  color: getCssVariable('--text-color-secondary') || '#64748b',
                },
              },
              title: {
                display: true,
                text: 'Fatores de Decisão',
                font: { size: 14 },
                padding: { bottom: 15 },
                color: getCssVariable('--text-color') || '#1e293b',
              },
            },
          },
        });
      }
    };

    createOrUpdateChart(); // Cria o gráfico inicialmente

    // Observa mudanças no atributo data-theme do html (se seu ThemeContext o modificar)
    // para recriar o gráfico com as novas cores das variáveis CSS.
    const themeObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          createOrUpdateChart();
        }
      }
    });

    if (typeof window !== 'undefined') {
      themeObserver.observe(document.documentElement, { attributes: true });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      themeObserver.disconnect();
    };
  }, []); // Dependência vazia para rodar uma vez e ao observar mudanças de tema

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleDiagramNodeClick = (id) => {
    if (diagramData[id]) {
      setDiagramInfo({
        visible: true,
        title: diagramData[id].title,
        desc: diagramData[id].desc,
      });
    }
  };

  const closeDiagramInfo = () => {
    setDiagramInfo({ visible: false, title: '', desc: '' });
  };

  const implementationSteps = [
    {
      title: 'Passo 1: Configuração das Contas AWS e IAM',
      content: (
        <>
          <p>
            A base da segurança é uma configuração IAM bem definida.
            Recomendamos uma <strong>Conta de Ferramentas (Tooling)</strong>{' '}
            para centralizar a confiança com o GitHub.
          </p>
          <h3>1.1 Na Conta de Ferramentas (Tooling Account)</h3>
          <ul>
            <li>
              <strong>Criar o IAM OIDC Provider:</strong> Conecta o GitHub
              Actions à sua conta AWS de forma segura.
              <ul>
                <li>
                  URL do Provedor:{' '}
                  <code>https://token.actions.githubusercontent.com</code>
                </li>
                <li>
                  Audiência: <code>sts.amazonaws.com</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>
                Criar a Role Principal (<code>GitHubActionsRole</code>):
              </strong>{' '}
              Esta é a role que o GitHub Actions assumirá. Sua política de
              confiança deve permitir a identidade web do OIDC e ser restrita ao
              seu repositório. Suas permissões devem permitir apenas
              `sts:AssumeRole` para as roles de deploy nos outros ambientes.
            </li>
          </ul>
          <h3>1.2 Nas Contas de Ambiente (Dev, HML, Prod)</h3>
          <ul>
            <li>
              <strong>Realizar Bootstrap do CDK:</strong> Prepare cada conta
              para receber deploys do CDK, configurando a confiança na Tooling
              Account.
            </li>
            <li>
              <strong>
                Criar Roles de Deploy (<code>DevDeployRole</code>,{' '}
                <code>HmlDeployRole</code>, <code>ProdDeployRole</code>):
              </strong>{' '}
              Cada ambiente tem sua própria role. A política de confiança de
              cada uma deve permitir que a <code>GitHubActionsRole</code> da
              Tooling Account a assuma. As permissões devem seguir o{' '}
              <strong>princípio do menor privilégio</strong>, sendo mais
              restritas em HML e Prod.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Passo 2: Workflows do GitHub Actions',
      content: (
        <>
          <p>
            Crie arquivos <code>.yml</code> em <code>.github/workflows/</code>.
            Teremos um workflow para cada ambiente (Dev, HML e Prod), acionados
            por pushes nas branches correspondentes (`develop`, `stage`,
            `main`).
          </p>
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'dev' ? styles.active : ''}`}
                onClick={() => setActiveTab('dev')}
              >
                deploy-dev.yml
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'hml' ? styles.active : ''}`}
                onClick={() => setActiveTab('hml')}
              >
                deploy-hml.yml
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'prod' ? styles.active : ''}`}
                onClick={() => setActiveTab('prod')}
              >
                deploy-prod.yml
              </button>
            </div>
            <div className={styles.tabContentArea}>
              {activeTab === 'dev' && (
                <div className={styles.tabContentActive}>
                  <h4 className={styles.fontBold}>
                    Deploy para Desenvolvimento
                  </h4>
                  <p className={styles.textSm}>
                    Acionado por push na branch <code>develop</code>. Deploy
                    automático, sem aprovação manual.
                  </p>
                  <pre className={styles.codeBlock}>
                    <code>
                      {`name: Deploy to Dev

                        on:
                        push:
                            branches: [ develop ]

                        permissions:
                        id-token: write # Necessário para autenticação OIDC
                        contents: read # Necessário para checkout do código

                        jobs:
                        deploy-dev:
                            runs-on: ubuntu-latest
                            steps:
                            - name: Checkout code
                                uses: actions/checkout@v4
                            - name: Configure AWS Credentials
                                uses: aws-actions/configure-aws-credentials@v4
                                with:
                                role-to-assume: arn:aws:iam::YOUR_TOOLING_ACCOUNT_ID:role/GitHubActionsRole # Substitua pelo ID da sua conta Tooling
                                aws-region: YOUR_AWS_REGION # Ex: us-east-1
                            - name: Setup Node.js
                                uses: actions/setup-node@v4
                                with:
                                node-version: '18' # Ou a versão que seu projeto CDK usa
                                cache: 'npm'
                            - name: Install Dependencies
                                run: npm ci
                            - name: Build Project (if necessary)
                                run: npm run build # Se você tiver um passo de build
                            - name: CDK Deploy to Dev
                                env:
                                ENVIRONMENT_NAME: dev # Usado pelo bin/app.ts
                                run: >
                                npx cdk deploy --role-arn arn:aws:iam::YOUR_DEV_ACCOUNT_ID:role/DevDeployRole # Substitua pelo ID da conta Dev
                                MyApp-dev-Stack --require-approval never`}
                    </code>
                  </pre>
                </div>
              )}
              {activeTab === 'hml' && (
                <div className={styles.tabContentActive}>
                  <h4 className={styles.fontBold}>Deploy para Homologação</h4>
                  <p className={styles.textSm}>
                    Acionado por push na branch <code>stage</code>. Requer
                    aprovação manual via GitHub Environments.
                  </p>
                  <pre className={styles.codeBlock}>
                    <code>
                      {`name: Deploy to HML

                        on:
                        push:
                            branches: [ stage ]

                        permissions:
                        id-token: write
                        contents: read

                        jobs:
                        deploy-hml:
                            runs-on: ubuntu-latest
                            environment:
                            name: hml # Nome do ambiente no GitHub para aprovação
                            steps:
                            - name: Checkout code
                                uses: actions/checkout@v4
                            - name: Configure AWS Credentials
                                uses: aws-actions/configure-aws-credentials@v4
                                with:
                                role-to-assume: arn:aws:iam::YOUR_TOOLING_ACCOUNT_ID:role/GitHubActionsRole
                                aws-region: YOUR_AWS_REGION
                            - name: Setup Node.js
                                uses: actions/setup-node@v4
                                with:
                                node-version: '18'
                                cache: 'npm'
                            - name: Install Dependencies
                                run: npm ci
                            - name: Build Project (if necessary)
                                run: npm run build
                            - name: CDK Deploy to HML
                                env:
                                ENVIRONMENT_NAME: hml
                                run: >
                                npx cdk deploy --role-arn arn:aws:iam::YOUR_HML_ACCOUNT_ID:role/HmlDeployRole # Substitua pelo ID da conta HML
                                MyApp-hml-Stack --require-approval never`}
                    </code>
                  </pre>
                </div>
              )}
              {activeTab === 'prod' && (
                <div className={styles.tabContentActive}>
                  <h4 className={styles.fontBold}>Deploy para Produção</h4>
                  <p className={styles.textSm}>
                    Acionado por push na branch <code>main</code>. Requer
                    aprovação rigorosa via GitHub Environments.
                  </p>
                  <pre className={styles.codeBlock}>
                    <code>
                      {`name: Deploy to Prod

                        on:
                        push:
                            branches: [ main ]

                        permissions:
                        id-token: write
                        contents: read

                        jobs:
                        deploy-prod:
                            runs-on: ubuntu-latest
                            environment:
                            name: prod # Nome do ambiente no GitHub para aprovação
                            steps:
                            - name: Checkout code
                                uses: actions/checkout@v4
                            - name: Configure AWS Credentials
                                uses: aws-actions/configure-aws-credentials@v4
                                with:
                                role-to-assume: arn:aws:iam::YOUR_TOOLING_ACCOUNT_ID:role/GitHubActionsRole
                                aws-region: YOUR_AWS_REGION
                            - name: Setup Node.js
                                uses: actions/setup-node@v4
                                with:
                                node-version: '18'
                                cache: 'npm'
                            - name: Install Dependencies
                                run: npm ci
                            - name: Build Project (if necessary)
                                run: npm run build
                            - name: CDK Deploy to Prod
                                env:
                                ENVIRONMENT_NAME: prod
                                run: >
                                npx cdk deploy --role-arn arn:aws:iam::YOUR_PROD_ACCOUNT_ID:role/ProdDeployRole # Substitua pelo ID da conta Prod
                                MyApp-prod-Stack --require-approval never`}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Passo 3: Ajustes na Aplicação CDK',
      content: (
        <>
          <p>
            Para usar o mesmo código CDK em múltiplos ambientes, ele precisa ser
            parametrizável. A estratégia é usar arquivos de configuração JSON
            para cada ambiente e carregá-los dinamicamente.
          </p>
          <h3>Estrutura de Arquivos (Exemplo)</h3>
          <pre className={styles.codeBlock}>
            <code>
              {`meu-projeto-cdk/
                |- bin/
                |  |- app.ts        # Ponto de entrada da aplicação CDK
                |- lib/
                |  |- my-stack.ts   # Definição da stack principal
                |- config/           # Pasta para arquivos de configuração por ambiente
                |  |- dev.json
                |  |- hml.json
                |  |- prod.json
                |- package.json
                |- tsconfig.json
                ...etc
                `}
            </code>
          </pre>
          <h3>
            Exemplo: <code>bin/app.ts</code> (Typescript)
          </h3>
          <p>
            Este arquivo lê uma variável de ambiente (
            <code>ENVIRONMENT_NAME</code>, definida no workflow do GitHub
            Actions) para decidir qual arquivo de configuração carregar e
            instanciar a stack com os parâmetros corretos.
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`#!/usr/bin/env node
            import 'source-map-support/register';
            import * as cdk from 'aws-cdk-lib';
            import { MyStack } from '../lib/my-stack'; // Sua stack principal
            import * as fs from 'fs';
            import * as path from 'path';

            // Interface para a estrutura esperada do arquivo de configuração
            interface EnvConfig {
            aws: {
                accountId: string;
                region: string;
            };
            stackProps?: { // Propriedades específicas da stack, como nome de bucket, etc.
                [key: string]: any; 
            };
            // Adicione outras configurações específicas do ambiente aqui
            }

            const app = new cdk.App();

            // Obtém o nome do ambiente da variável de ambiente
            // Define 'dev' como padrão se não estiver definida
            const environmentName = process.env.ENVIRONMENT_NAME || 'dev';

            // Constrói o caminho para o arquivo de configuração do ambiente
            const configPath = path.resolve(__dirname, \`../config/\${environmentName}.json\`);

            if (!fs.existsSync(configPath)) {
            console.error(\`Arquivo de configuração não encontrado para o ambiente: \${environmentName} em \${configPath}\`);
            process.exit(1); // Encerra se o arquivo de config não existir
            }

            // Lê e parseia o arquivo de configuração
            const config: EnvConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

            // Cria a stack com as configurações do ambiente
            new MyStack(app, \`MyApp-\${environmentName}-Stack\`, { // Nome da stack parametrizado
            env: {
                account: config.aws.accountId,
                region: config.aws.region,
            },
            // Passa outras propriedades da configuração para a stack
            // Exemplo: bucketName: config.stackProps?.bucketName
            ...(config.stackProps || {}),
            });

            app.synth();`}
            </code>
          </pre>
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
      >
        <h1 className={styles.sidebarTitle}>Guia Interativo de Deploy</h1>
        <nav>
          <ul className={styles.navList}>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`${styles.navLink} ${activeSection === section.id ? styles.activeNav : ''}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <footer className={styles.sidebarFooter}>
          &copy; {currentYear} Quantum Innovations LTDA. All rights reserved.
        </footer>
      </aside>

      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={styles.menuToggle}
        aria-label="Abrir menu"
        iconOnly
        variant="secondary"
      >
        <span className={styles.menuIcon}>
          <LuMenu size={24} />
        </span>
      </Button>

      <main className={styles.mainContent}>
        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Visão Geral da Automação de Deploy
          </h2>
          <p>
            Esta aplicação transforma um relatório técnico denso em um guia
            interativo para automatizar deploys de aplicações CDK em um ambiente
            AWS multi-conta. A solução proposta utiliza GitHub Actions e OpenID
            Connect (OIDC) para criar um pipeline de CI/CD seguro, flexível e
            alinhado com o GitFlow. O objetivo é acelerar entregas, reduzir
            erros manuais e garantir a segurança em ambientes críticos como
            Homologação (HML) e Produção (Prod).
          </p>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              Diagrama Interativo da Arquitetura
            </h3>
            <p className={styles.cardSubtitle}>
              Clique nos componentes para ver detalhes.
            </p>
            <div className={styles.diagramContainer}>
              <div className={styles.diagramGrid}>
                <div
                  id="diag-github"
                  className={`${styles.diagramNode} ${styles.diagGithub}`}
                  onClick={() => handleDiagramNodeClick('diag-github')}
                >
                  <span className={styles.diagramIcon}>💻</span>
                  <p className={styles.diagramNodeTitle}>
                    GitHub Repo & Actions
                  </p>
                  <p className={styles.diagramNodeSubtitle}>
                    GitFlow (dev, stage, main)
                  </p>
                </div>

                <div
                  className={`${styles.diagramArrowContainer} ${styles.lgFlowArrow}`}
                >
                  <div
                    id="diag-tooling"
                    className={`${styles.diagramNode} ${styles.diagTooling}`}
                    onClick={() => handleDiagramNodeClick('diag-tooling')}
                  >
                    <span className={styles.diagramIcon}>🛠️</span>
                    <p
                      className={`${styles.diagramNodeTitle} ${styles.textAmber900}`}
                    >
                      AWS Tooling Account
                    </p>
                    <p
                      className={`${styles.diagramNodeSubtitle} ${styles.textAmber700}`}
                    >
                      OIDC Provider & Role Principal
                    </p>
                  </div>
                </div>

                <div className={styles.diagramEnvAccounts}>
                  <div
                    id="diag-dev"
                    className={`${styles.diagramNode} ${styles.diagDev}`}
                    onClick={() => handleDiagramNodeClick('diag-dev')}
                  >
                    <span className={styles.diagramIconSm}>🧪</span>
                    <div>
                      <p
                        className={`${styles.diagramNodeTitle} ${styles.textGreen900}`}
                      >
                        AWS Dev Account
                      </p>
                      <p
                        className={`${styles.diagramNodeSubtitle} ${styles.textGreen700}`}
                      >
                        Deploy Role (Flexível)
                      </p>
                    </div>
                  </div>
                  <div
                    id="diag-hml"
                    className={`${styles.diagramNode} ${styles.diagHml}`}
                    onClick={() => handleDiagramNodeClick('diag-hml')}
                  >
                    <span className={styles.diagramIconSm}>🚦</span>
                    <div>
                      <p
                        className={`${styles.diagramNodeTitle} ${styles.textBlue900}`}
                      >
                        AWS HML Account
                      </p>
                      <p
                        className={`${styles.diagramNodeSubtitle} ${styles.textBlue700}`}
                      >
                        Deploy Role (Restrita + Aprovação)
                      </p>
                    </div>
                  </div>
                  <div
                    id="diag-prod"
                    className={`${styles.diagramNode} ${styles.diagProd}`}
                    onClick={() => handleDiagramNodeClick('diag-prod')}
                  >
                    <span className={styles.diagramIconSm}>🚀</span>
                    <div>
                      <p
                        className={`${styles.diagramNodeTitle} ${styles.textRed900}`}
                      >
                        AWS Prod Account
                      </p>
                      <p
                        className={`${styles.diagramNodeSubtitle} ${styles.textRed700}`}
                      >
                        Deploy Role (Mínimo Privilégio + Aprovação)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {diagramInfo.visible && (
                <div className={styles.diagramInfoPanel}>
                  <h4 className={styles.diagramInfoTitle}>
                    {diagramInfo.title}
                  </h4>
                  <p className={styles.diagramInfoDesc}>{diagramInfo.desc}</p>
                  <Button
                    onClick={closeDiagramInfo}
                    variant="primary"
                    className={styles.diagramInfoCloseBtnCustom}
                  >
                    Fechar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="comparison" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Comparativo de Ferramentas: CDK Pipelines vs. GitHub Actions
          </h2>
          <p>
            A escolha da ferramenta de CI/CD é um passo fundamental. O relatório
            analisou duas opções principais para orquestrar o deploy de
            aplicações CDK: a solução nativa da AWS, CDK Pipelines, e a
            plataforma integrada ao GitHub, GitHub Actions. A decisão foi
            baseada em flexibilidade, segurança e integração com o ecossistema
            existente.
          </p>
          <div className={styles.comparisonGrid}>
            <div className={`${styles.card} ${styles.borderOrange}`}>
              <h3 className={styles.cardTitleSm}>AWS CDK Pipelines</h3>
              <p className={styles.cardSubtitleSm}>
                Uma biblioteca de alto nível para criar pipelines com AWS
                CodePipeline.
              </p>
              <div className={styles.prosCons}>
                <p className={styles.prosTitle}>Vantagens:</p>
                <ul className={styles.list}>
                  <li>
                    <strong>Integração Profunda:</strong> Pipeline é definido
                    como código (IaC) em Typescript.
                  </li>
                  <li>
                    <strong>Auto-Mutação:</strong> O pipeline se atualiza
                    automaticamente se a infraestrutura CDK mudar.
                  </li>
                  <li>
                    <strong>Permissões Simplificadas:</strong> Facilita a gestão
                    de acesso cross-account no ecossistema AWS.
                  </li>
                </ul>
              </div>
              <div>
                <p className={styles.consTitle}>Desvantagens:</p>
                <ul className={styles.list}>
                  <li>
                    <strong>Menor Flexibilidade:</strong> Mais complexo para
                    integrar com ferramentas fora da AWS.
                  </li>
                  <li>
                    <strong>Curva de Aprendizagem:</strong> Exige conhecimento
                    de CodePipeline e seus componentes.
                  </li>
                  <li>
                    <strong>Gestão Adicional:</strong> O próprio pipeline é um
                    recurso AWS que precisa ser gerenciado.
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.borderBlue}`}>
              <h3 className={styles.cardTitleSm}>GitHub Actions</h3>
              <p className={styles.cardSubtitleSm}>
                Plataforma de CI/CD integrada diretamente ao repositório GitHub.
              </p>
              <div className={styles.prosCons}>
                <p className={styles.prosTitle}>Vantagens:</p>
                <ul className={styles.list}>
                  <li>
                    <strong>Integração Nativa:</strong> Workflows em YAML,
                    próximos ao código-fonte.
                  </li>
                  <li>
                    <strong>Ecossistema Vasto:</strong> Milhares de actions
                    prontas no Marketplace.
                  </li>
                  <li>
                    <strong>Segurança com OIDC:</strong> Autenticação federada
                    com AWS, sem chaves de longa duração.
                  </li>
                  <li>
                    <strong>Controle de Aprovação:</strong> Ambientes com regras
                    de proteção e aprovação manual.
                  </li>
                </ul>
              </div>
              <div>
                <p className={styles.consTitle}>Desvantagens:</p>
                <ul className={styles.list}>
                  <li>
                    <strong>Sem Auto-Mutação Nativa:</strong> Mudanças no
                    pipeline exigem edição do arquivo YAML.
                  </li>
                  <li>
                    <strong>Setup Cross-Account:</strong> A configuração inicial
                    de IAM pode ser mais verbosa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              Decisão Final: Por que GitHub Actions?
            </h3>
            <div className={styles.decisionContainer}>
              <div className={styles.decisionText}>
                <p>
                  A abordagem recomendada é <strong>usar GitHub Actions</strong>{' '}
                  para orquestrar o pipeline. Esta escolha prioriza a{' '}
                  <strong>segurança</strong> (com OIDC), a{' '}
                  <strong>flexibilidade</strong> (ecossistema de actions) e a{' '}
                  <strong>integração</strong> com o fluxo de trabalho de
                  desenvolvimento já existente no GitHub. A ausência da
                  auto-mutação é uma troca aceitável pela centralização do
                  processo de CI/CD junto ao código-fonte e pelas robustas
                  funcionalidades de controle de acesso e aprovação.
                </p>
              </div>
              <div className={styles.decisionChartContainer}>
                <canvas ref={decisionChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Arquitetura da Solução com GitHub Actions
          </h2>
          <p>
            A arquitetura se baseia em um fluxo de confiança seguro entre o
            GitHub e a AWS, utilizando uma conta intermediária (Tooling Account)
            para centralizar a autenticação. Isso isola as credenciais e
            simplifica o gerenciamento de permissões para os múltiplos ambientes
            de aplicação (Dev, HML, Prod). Cada ambiente possui uma IAM Role com
            permissões específicas, seguindo o princípio do menor privilégio.
          </p>

          <h3 className={styles.subSectionTitle}>
            Tabela Interativa de IAM Roles
          </h3>
          <p className={styles.textSm}>
            Passe o mouse sobre uma linha para destacar a relação de confiança.
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.iamTable}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableTh}>Entidade de Origem</th>
                  <th className={styles.tableTh}>Assume a Role...</th>
                  <th className={styles.tableTh}>...Na Conta</th>
                  <th className={styles.tableTh}>Para Fazer Deploy Em</th>
                  <th className={styles.tableTh}>Propósito</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.tableTd}>GitHub Actions (OIDC)</td>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    GitHubActionsRole
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textAmber700}`}
                  >
                    Tooling
                  </td>
                  <td className={styles.tableTd}>-</td>
                  <td className={styles.tableTd}>
                    Obter credenciais temporárias na AWS.
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    GitHubActionsRole
                  </td>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    DevDeployRole
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textGreen700}`}
                  >
                    Dev
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textGreen700}`}
                  >
                    Dev
                  </td>
                  <td className={styles.tableTd}>
                    Deploy automatizado na branch `develop`.
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    GitHubActionsRole
                  </td>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    HmlDeployRole
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textBlue700}`}
                  >
                    HML
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textBlue700}`}
                  >
                    HML
                  </td>
                  <td className={styles.tableTd}>
                    Deploy com aprovação na branch `stage`.
                  </td>
                </tr>
                <tr className={styles.tableRowNoBorder}>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    GitHubActionsRole
                  </td>
                  <td className={`${styles.tableTd} ${styles.fontMono}`}>
                    ProdDeployRole
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textRed700}`}
                  >
                    Prod
                  </td>
                  <td
                    className={`${styles.tableTd} ${styles.fontSemibold} ${styles.textRed700}`}
                  >
                    Prod
                  </td>
                  <td className={styles.tableTd}>
                    Deploy com aprovação rigorosa na branch `main`.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="implementation" className={styles.section}>
          <h2 className={styles.sectionTitle}>Guia de Implementação</h2>
          <p>
            Siga estes passos para configurar o pipeline de CI/CD completo. O
            processo envolve a configuração de permissões na AWS, a criação dos
            workflows no GitHub Actions e pequenos ajustes no código da
            aplicação CDK para suportar múltiplos ambientes.
          </p>
          <div className={styles.accordionContainer}>
            {implementationSteps.map((step, index) => (
              <div key={index} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionToggle}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openAccordion === index}
                >
                  {step.title}
                  <span
                    className={`${styles.accordionIcon} ${openAccordion === index ? styles.accordionIconOpen : ''}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={styles.accordionContent}
                  style={{
                    maxHeight: openAccordion === index ? '2000px' : '0',
                  }}
                >
                  <div className={styles.accordionContentInner}>
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="flow" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Fluxo de Deploy: Do Código à Produção
          </h2>
          <p>
            O processo de promoção de código segue o modelo GitFlow, garantindo
            que as mudanças sejam testadas e aprovadas antes de chegarem à
            produção. Cada etapa do fluxo aciona validações e pipelines
            específicos, proporcionando um caminho seguro e auditável para o
            deploy.
          </p>
          <div className={styles.flowCard}>
            <div className={styles.flowGrid}>
              {/* Develop Column */}
              <div className={styles.flowColumn}>
                <div className={`${styles.flowHeader} ${styles.bgGreen600}`}>
                  BRANCH: develop
                </div>
                <div className={styles.flowBodyGreen}>
                  <div className={styles.flowStep}>
                    <h4 className={styles.fontSemibold}>
                      1. PR de `feature/*`
                    </h4>
                    <p className={styles.textXs}>
                      Executa testes, lint e `cdk diff`.
                    </p>
                  </div>
                  <div className={styles.flowSeparator}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowArrow}`}>
                    <h4 className={styles.fontSemibold}>
                      2. Merge em `develop`
                    </h4>
                    <p className={styles.textXs}>
                      Aciona deploy automático para o ambiente de Dev.
                    </p>
                  </div>
                </div>
              </div>
              {/* Stage Column */}
              <div className={styles.flowColumn}>
                <div className={`${styles.flowHeader} ${styles.bgBlue600}`}>
                  BRANCH: stage
                </div>
                <div className={styles.flowBodyBlue}>
                  <div className={styles.flowStep}>
                    <h4 className={styles.fontSemibold}>3. PR de `develop`</h4>
                    <p className={styles.textXs}>
                      Revisão de código e do `cdk diff` de HML.
                    </p>
                  </div>
                  <div className={styles.flowSeparator}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowArrow}`}>
                    <h4 className={styles.fontSemibold}>
                      4. Merge e Aprovação
                    </h4>
                    <p className={styles.textXs}>
                      Aciona deploy para HML após aprovação manual.
                    </p>
                  </div>
                </div>
              </div>
              {/* Main Column */}
              <div className={styles.flowColumn}>
                <div className={`${styles.flowHeader} ${styles.bgRed600}`}>
                  BRANCH: main
                </div>
                <div className={styles.flowBodyRed}>
                  <div className={styles.flowStep}>
                    <h4 className={styles.fontSemibold}>5. PR de `stage`</h4>
                    <p className={styles.textXs}>
                      Validação final e revisão rigorosa do `cdk diff` de Prod.
                    </p>
                  </div>
                  <div className={styles.flowSeparator}>↓</div>
                  <div className={styles.flowStep}>
                    <h4 className={styles.fontSemibold}>
                      6. Merge e Aprovação Final
                    </h4>
                    <p className={styles.textXs}>
                      Aciona deploy para Produção após aprovação de
                      stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Checklist Essencial de Segurança
          </h2>
          <p>
            A segurança é o pilar desta arquitetura. As práticas a seguir são
            integradas ao pipeline para garantir que a infraestrutura seja
            provisionada de forma segura e em conformidade com as melhores
            práticas.
          </p>
          <div className={styles.securityGrid}>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>
                  Princípio do Menor Privilégio
                </h4>
                <p className={styles.textSm}>
                  Roles de deploy em HML e Prod têm apenas as permissões mínimas
                  necessárias, nunca <code>AdministratorAccess</code>.
                </p>
              </div>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>Autenticação com OIDC</h4>
                <p className={styles.textSm}>
                  Elimina a necessidade de armazenar chaves AWS de longa duração
                  no GitHub, usando credenciais temporárias.
                </p>
              </div>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>Proteção de Branches</h4>
                <p className={styles.textSm}>
                  As branches `stage` e `main` são protegidas, exigindo PRs e
                  revisões para qualquer alteração.
                </p>
              </div>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>Aprovações Manuais</h4>
                <p className={styles.textSm}>
                  Deploys para HML e Prod são pausados e exigem aprovação manual
                  de revisores designados.
                </p>
              </div>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>
                  Análise de Segurança de IaC
                </h4>
                <p className={styles.textSm}>
                  Ferramentas como <code>cdk-nag</code> são executadas no
                  pipeline para validar a conformidade da infraestrutura.
                </p>
              </div>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.securityIcon}>✅</span>
              <div>
                <h4 className={styles.fontSemibold}>
                  Auditoria com `cdk diff`
                </h4>
                <p className={styles.textSm}>
                  Toda mudança na infraestrutura é explicitamente mostrada no PR
                  e revisada antes do deploy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DeployGuidePage;
