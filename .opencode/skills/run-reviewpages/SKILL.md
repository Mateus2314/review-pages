---
name: run-reviewpages
description: Use ONLY when asked to start, run, or launch the Review Pages project. Starts PostgreSQL (Docker), the Spring Boot backend, and the React frontend. Also handles stopping and checking status.
---

# Run Review Pages

Automação para iniciar/parar o projeto Review Pages.

## Start (iniciar tudo)

Execute em ordem:

1. **PostgreSQL:**
   ```bash
   cd /caminho/do/projeto
   docker compose up -d
   ```

2. **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Status

- PostgreSQL: `docker ps | findstr reviewpages-db`
- Backend: `curl http://localhost:8081/api/v1/stats`
- Frontend: Acessar `http://localhost:5173`

## Stop (parar tudo)

```bash
docker compose down
```

(O backend e frontend param com Ctrl+C)
