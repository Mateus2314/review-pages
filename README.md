# Review Pages

Site para análise e registro de leituras (livros e artigos).

## Stack

- **Frontend:** React 18 + Vite 5 + TypeScript + Tailwind CSS 4
- **Backend:** Java 17 + Spring Boot 3.2.5 + PostgreSQL
- **Auth:** JWT
- **Banco:** PostgreSQL 16 (Docker)

## Pré-requisitos

- Java 17+
- Maven 3.9+
- Node.js 20+
- Docker Desktop

## Como rodar

### 1. Iniciar PostgreSQL

```bash
docker compose up -d
```

### 2. Iniciar backend

```bash
cd backend
mvn spring-boot:run
```

O backend sobe em `http://localhost:8081`.

### 3. Iniciar frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Estrutura

```
reviewpages/
├── backend/          # API Spring Boot
├── frontend/         # App React
├── designs/          # Layouts Pencil (.pen)
├── pdfs/             # Leituras em PDF (originais)
├── export/           # Arquivos gerados (Markdown, etc.)
├── .opencode/        # Agentes e skills opencode
├── opencode.json     # Config opencode
└── docker-compose.yml
```

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/v1/auth/register | Cadastro |
| POST | /api/v1/auth/login | Login |
| GET | /api/v1/readings | Listar leituras |
| POST | /api/v1/readings | Criar leitura |
| GET | /api/v1/readings/:id | Detalhe da leitura |
| PUT | /api/v1/readings/:id | Editar leitura |
| DELETE | /api/v1/readings/:id | Excluir leitura |
| POST | /api/v1/readings/:id/comments | Comentar |
| POST | /api/v1/readings/:id/like | Curtir |
| GET | /api/v1/stats | Dashboard |
| POST | /api/v1/feedback | Feedback |
