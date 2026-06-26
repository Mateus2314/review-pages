<div align="center">
  <br/>
  <h1>Review Pages</h1>
  <p align="center">
    <strong>Plataforma inteligente de análise e registro de leituras</strong>
  </p>
  <p>
    Extraia insights, organize resenhas e aprofunde seu entendimento de livros e artigos — com o poder de IA integrado ao seu workflow.
  </p>
  <br/>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=fff" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Java_17-ED8B00?logo=openjdk&logoColor=fff" alt="Java 17"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=fff" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=fff" alt="PostgreSQL"/>
  <br/>
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff" alt="Vite"/>
  <img src="https://img.shields.io/badge/JWT-000000?logo=jsonwebtoken&logoColor=fff" alt="JWT"/>
  <img src="https://img.shields.io/badge/Flyway-CC0200?logo=flyway&logoColor=fff" alt="Flyway"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff" alt="Docker"/>
  <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=fff" alt="Vercel"/>
</p>

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📖 | **Cadastro de Leituras** | Registre livros e artigos com metadados, capa e notas pessoais |
| 📝 | **Resenhas por Capítulo** | Escreva análises detalhadas para cada capítulo com suporte a Markdown |
| 🔍 | **Google Books API** | Busca automática de capas e informações dos livros (fallback Open Library) |
| 💬 | **Comentários e Curtidas** | Interaja com suas leituras: comente, curta e acompanhe seu progresso |
| 📊 | **Dashboard** | Estatísticas de leitura: total de páginas, livros concluídos, engajamento |
| 👤 | **Autenticação JWT** | Sistema seguro de registro e login |
| 💄 | **Interface Moderna** | Design escuro e elegante com Playfair Display + Inter |
| 🧩 | **OpenCode + IA** | Use agentes de IA para analisar textos, extrair citações e gerar resenhas |

---

## Stack

```
┌──────────────────────────────────────────────────────────────────┐
│                        Review Pages                              │
├─────────────┬────────────────────┬──────────────────────────────┤
│  Frontend   │      Backend       │          Database            │
│             │                    │                              │
│  React 19   │  Java 17           │  PostgreSQL 16               │
│  TypeScript │  Spring Boot 3.2   │  Flyway Migrations           │
│  Tailwind 4 │  Spring Security   │  Docker Compose              │
│  Vite 5     │  JWT Auth          │                              │
│  lucide-    │  REST API v1       │                              │
│   react     │  Maven 3.9         │                              │
└─────────────┴────────────────────┴──────────────────────────────┘
```

## Quick Start

### Pre-requisitos

| Ferramenta | Versão |
|---|---|
| Java | 17+ |
| Maven | 3.9+ |
| Node.js | 20+ |
| Docker | 24+ (com Docker Compose) |

### 1. Suba o banco PostgreSQL

```bash
docker compose up -d
```

### 2. Inicie o backend

```bash
cd backend
mvn spring-boot:run
```

> O backend roda em `http://localhost:8081`. Flyway executa as migrations automaticamente na primeira inicialização.

### 3. Inicie o frontend

```bash
cd frontend
npm install
npm run dev
```

> O frontend roda em `http://localhost:5173` com proxy para `8081`.

---

## Estrutura do Projeto

```
reviewpages/
│
├── backend/                    # API REST (Spring Boot)
│   ├── src/main/java/com/reviewpages/
│   │   ├── config/             # JWT, Security, Cors
│   │   ├── controller/         # Endpoints REST
│   │   ├── dto/                # Objetos de transferência
│   │   ├── entity/             # Modelos JPA
│   │   ├── exception/          # Tratamento global de erros
│   │   ├── repository/         # Acesso a dados
│   │   └── service/            # Lógica de negócio
│   └── src/main/resources/
│       ├── application.yml     # Configurações da aplicação
│       ├── db/migration/       # Migrations Flyway
│       └── static/             # Imagens e PDFs estáticos
│
├── frontend/                   # App React + Vite
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── layouts/            # Layout principal
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── services/           # API, Auth, Google Books
│   │   ├── types/              # Tipos TypeScript
│   │   └── utils/              # Utilitários
│   ├── public/                 # Assets públicos
│   └── vite.config.ts          # Configuração Vite
│
├── designs/                    # Layouts no Pencil (.pen)
├── .opencode/                  # Configuração OpenCode
│   ├── agents/                 # Agentes customizados
│   └── skills/                 # Skills (run-reviewpages)
│
├── backend/Dockerfile          # Docker image do backend
├── docker-compose.yml          # PostgreSQL container
├── render.yaml                 # Configuração Render
├── vercel.json                 # Configuração Vercel
└── opencode.json               # Config OpenCode
```

---

## API REST

| Método | Rota | Descrição |
|--------|------|----------|
| `POST` | `/api/v1/auth/register` | Cadastro de usuário |
| `POST` | `/api/v1/auth/login` | Login (retorna JWT) |
| `GET` | `/api/v1/readings` | Listar leituras |
| `POST` | `/api/v1/readings` | Criar leitura |
| `GET` | `/api/v1/readings/{id}` | Detalhe da leitura |
| `PUT` | `/api/v1/readings/{id}` | Atualizar leitura |
| `DELETE` | `/api/v1/readings/{id}` | Excluir leitura |
| `GET` | `/api/v1/readings/{id}/chapters` | Listar capítulos |
| `GET` | `/api/v1/chapters/{id}` | Conteúdo do capítulo |
| `POST` | `/api/v1/readings/{id}/comments` | Comentar |
| `POST` | `/api/v1/readings/{id}/like` | Curtir |
| `GET` | `/api/v1/stats` | Dashboard |
| `POST` | `/api/v1/feedback` | Enviar feedback |

---

## OpenCode + Agentes de IA

Este projeto usa o [OpenCode](https://opencode.ai) como assistente de desenvolvimento. Agentes especializados ajudam em cada etapa:

| Agente | Função | Tecnologias |
|--------|--------|-------------|
| `dev-web` | Full-stack generalista | React + Spring Boot |
| `frontend` | UI/UX especialista | React, Tailwind, TypeScript |
| `backend` | API especialista | Java, Spring, PostgreSQL |
| `escritor` | Produção de artigos | Pesquisa + análise + revisão |
| `pesquisador` | Pesquisa web | Fontes e referências |
| `analista-escrita` | Qualidade textual | Gramática, clareza, tom |
| `revisor` | Revisão final | Fluência e consistência |

### Supabase MCP

Para conectar o Supabase via MCP:

1. Certifique-se de ter o plugin instalado:
   ```bash
   opencode plugin opencode-supabase
   ```
2. Dentro do OpenCode TUI, execute:
   ```
   /supabase
   ```
3. Conecte sua conta Supabase e siga as instruções para gerar o config MCP no Supabase Studio
4. Adicione o config gerado ao seu `opencode.json` e execute:
   ```bash
   opencode mcp auth supabase
   ```

### Vercel MCP

Para deploy via Vercel MCP (ja configurado):
```bash
opencode mcp auth vercel
```

---

## Deploy

| Serviço | Componente | Status |
|---------|-----------|--------|
| [Vercel](https://vercel.com) | Frontend (React) | Configurado |
| [Render](https://render.com) | Backend (Spring Boot) | Configurado |
| [Neon](https://neon.tech) | Banco PostgreSQL | Configurado |

### Deploy do Frontend na Vercel

```bash
cd frontend
npx vercel --prod
```

Configure a variavel de ambiente `VITE_API_URL` apontando para o backend em produção.

---

## Licenca

Distribuido sob a licenca MIT.

---

<div align="center">
  <p>Feito com <a href="https://opencode.ai">OpenCode</a></p>
  <p>
    <a href="https://github.com/Mateus2314/review-pages">GitHub</a>
  </p>
</div>
