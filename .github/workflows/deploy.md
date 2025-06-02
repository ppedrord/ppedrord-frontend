# 📄 Documentação

## Deploy com GitHub Actions e AWS S3

### ✅ Visão Geral

Este workflow automatiza o processo de build e deploy de um site estático (utilizando Vite) para buckets S3 distintos, baseando-se na branch do repositório:

* `main` → ambiente **prod**
* `hml` → ambiente **hml**
* `dev` → ambiente **dev**

Cada ambiente possui:

* **Secrets**: `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`
* **Variável de ambiente**: `BUCKET_NAME`

### 🔐 Gerenciamento de Secrets e Variáveis

#### Secrets

* **Escopo**: Definidos no nível de **ambiente** (`prod`, `hml`, `dev`).
* **Nomes**: Uniformes entre ambientes (`AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`).
* **Motivo**: Segurança aprimorada e controle granular sobre acessos.

#### Variáveis de Ambiente

* **Escopo**: Definidas no nível de **ambiente**.
* **Nome**: `BUCKET_NAME`
* **Valor**: Nome do bucket S3 correspondente ao ambiente.

### ⚙️ Workflow `deploy.yml`

```yaml
name: Deploy Website to S3

on:
  push:
    branches: [main, hml, dev]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref_name == 'main' && 'prod' || github.ref_name }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        shell: bash

      - name: Build project
        run: npm run build
        shell: bash

      - name: Export AWS credentials
        run: |
          echo "AWS_ACCESS_KEY_ID=${{ secrets.AWS_ACCESS_KEY_ID }}" >> "$GITHUB_ENV"
          echo "AWS_SECRET_ACCESS_KEY=${{ secrets.AWS_SECRET_ACCESS_KEY }}" >> "$GITHUB_ENV"
        shell: bash

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ env.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ env.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy static site to S3
        run: aws s3 sync dist/ "s3://${{ vars.BUCKET_NAME }}" --delete
        shell: bash
```

### 🛠️ Configuração dos Ambientes no GitHub

1. **Criar Ambientes**: No repositório, vá em `Settings` → `Environments` e crie os ambientes `dev`, `hml` e `prod`.
2. **Adicionar Secrets**: Em cada ambiente, adicione `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`.
3. **Adicionar Variável**: Em cada ambiente, adicione a variável `BUCKET_NAME` com o nome do bucket S3 correspondente.

### 🔒 Benefícios do Uso de Secrets e Variáveis por Ambiente

* **Segurança**: Isolamento de credenciais entre ambientes.
* **Controle de Acesso**: Possibilidade de configurar revisores obrigatórios para ambientes sensíveis como `prod`.
* **Flexibilidade**: Facilidade para alterar configurações específicas de cada ambiente sem afetar os demais.

### 📚 Referências

* [Usando Secrets no GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
* [Gerenciando Ambientes para Deploy](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
* [Armazenando Informações em Variáveis](https://docs.github.com/en/actions/learn-github-actions/variables)
