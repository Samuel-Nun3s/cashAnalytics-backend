# 💰 Sistema de Gestão Financeira Pessoal com IA

> **⚠️ PROJETO EM CONSTRUÇÃO** - Este sistema está atualmente em desenvolvimento ativo.

## 📋 Sobre o Projeto

Sistema completo de gerenciamento financeiro pessoal que integra controle de finanças tradicionais com análise inteligente de investimentos através de IA. A plataforma permite que usuários controlem suas receitas e despesas enquanto recebem relatórios automatizados sobre suas ações na bolsa de valores.

### 🎯 Visão Geral

Este é um **SaaS (Software as a Service)** moderno que combina:
- 💳 **Gestão Financeira Pessoal**: Controle completo de contas, receitas e despesas
- 📈 **Gestão de Investimentos**: Acompanhamento de carteiras de ações
- 🤖 **Análise de IA**: Relatórios automáticos sobre suas ações, analisando notícias, movimentações e tendências

## ✨ Funcionalidades Principais

### 💼 Gestão Financeira
- ✅ Controle de múltiplas contas (bancárias, cartões, investimentos)
- ✅ Categorização de receitas e despesas
- ✅ Contas a pagar com alertas de vencimento
- ✅ Transações recorrentes (mensais, anuais, etc.)
- ✅ Dashboard com visão geral das finanças

### 📊 Gestão de Investimentos
- ✅ Criação de múltiplas carteiras de ações
- ✅ Acompanhamento de ações da B3, NASDAQ, NYSE e outras bolsas
- ✅ Integração com APIs de mercado em tempo real
- ✅ Histórico de preços e performance
- ✅ Cálculo automático de lucros e prejuízos

### 🤖 Inteligência Artificial
- ✅ **Relatórios Mensais Automatizados**: Análise completa do desempenho das ações
- ✅ **Análise de Notícias**: IA monitora e resume notícias relevantes sobre suas ações
- ✅ **Análise de Sentimento**: Classificação de notícias como positivas, negativas ou neutras
- ✅ **Relatórios Técnicos**: Análises fundamentalistas e técnicas
- ✅ **Fontes Rastreadas**: Todas as análises incluem referências das fontes

### 💎 Modelo SaaS
- ✅ **Plano Free**: Funcionalidades básicas gratuitas
- ✅ **Plano Premium**: Análises de IA ilimitadas e recursos avançados
- ✅ **Plano Enterprise**: Recursos ilimitados e suporte prioritário
- ✅ Sistema completo de assinaturas e pagamentos
- ✅ Controle de uso e limites por plano

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Prisma** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional

### Integrações
- **APIs de Ações**: BRAPI (B3), Alpha Vantage, Yahoo Finance
- **Stripe** - Processamento de pagamentos e assinaturas
- **IA/ML** - Para análise de notícias e geração de relatórios

## 📦 Estrutura do Banco de Dados

```
📊 Módulos Principais:

├── 🏢 SaaS
│   ├── Plan (Planos de assinatura)
│   ├── Subscription (Assinaturas dos usuários)
│   ├── PaymentHistory (Histórico de pagamentos)
│   └── UsageLimits (Controle de limites por usuário)
│
├── 👤 Usuários
│   ├── User (Dados do usuário)
│   └── UserPreferences (Preferências personalizadas)
│
├── 💰 Finanças Pessoais
│   ├── Account (Contas bancárias)
│   ├── Category (Categorias)
│   ├── Bill (Contas a pagar)
│   └── Revenue (Receitas)
│
├── 📈 Investimentos
│   ├── Portfolio (Carteiras)
│   ├── Stock (Ações - cache de API)
│   ├── PortfolioStock (Ações na carteira)
│   ├── StockPrice (Histórico de preços)
│   └── StockWatchlist (Lista de ações favoritas)
│
└── 🤖 Inteligência Artificial
    └── AiReport (Relatórios gerados pela IA)
```

## 🚀 Começando

### Pré-requisitos
```bash
- Node.js v18+
- PostgreSQL 14+
- npm ou yarn
```

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositório]

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco
npx prisma migrate dev

# Popule o banco com dados iniciais
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/finance_saas"

# Authentication
JWT_SECRET="your-secret-key"

# Payment
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stock APIs
BRAPI_BASE_URL="https://brapi.dev/api"
ALPHA_VANTAGE_API_KEY="your-key"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
```

## 📈 Roadmap

### ✅ Fase 1 - Estrutura Base (Em Desenvolvimento)
- [x] Modelagem do banco de dados
- [x] Sistema de planos e assinaturas
- [ ] APIs REST básicas
- [ ] Autenticação e autorização

### 🔄 Fase 2 - Funcionalidades Core
- [ ] CRUD de contas e transações
- [ ] Sistema de categorias
- [ ] Dashboard financeiro
- [ ] Integração com APIs de ações

### 🎯 Fase 3 - Inteligência Artificial
- [ ] Sistema de geração de relatórios
- [ ] Análise de sentimento de notícias
- [ ] Agendamento automático de relatórios
- [ ] Sistema de alertas inteligentes

### 🚀 Fase 4 - SaaS Completo
- [ ] Integração com Stripe
- [ ] Sistema de webhooks
- [ ] Área administrativa
- [ ] Analytics e métricas

### 💎 Fase 5 - Aprimoramentos
- [ ] App mobile
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Integração com Open Banking
- [ ] Multi-moeda

## 🤝 Contribuindo

Este projeto está em desenvolvimento ativo. Contribuições, sugestões e feedback são muito bem-vindos!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

**Status do Projeto**: 🚧 Em Desenvolvimento Ativo

**Última Atualização**: Outubro 2025

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!