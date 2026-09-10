# 🌍 EcoTwin

## AI-Powered Environmental Risk & Impact Simulator

> Predict. Simulate. Protect.

EcoTwin is an AI-powered environmental intelligence platform that helps communities understand environmental risks and explore sustainability interventions through interactive simulation.

## 🚧 Project Status

Currently under active development for **NextStep Hacks 2026 — Earth Forward**.

## 🎯 Core Features

- 🌡️ Heat Risk Analysis
- 💧 Water Stress Analysis
- 🌊 Flood Risk Analysis
- 🌫️ Pollution Risk Analysis
- 🤖 AI Environmental Analyst
- 🔥 What-If Impact Simulator
- 🌱 Environmental Impact Visualization

## 🛠️ Technology

- React
- Java
- Spring Boot
- REST APIs
- PostgreSQL
- Python
- Machine Learning
- Docker

## 📁 Project Structure

```text
ecotwin-ai/
├── frontend/
├── backend/
├── ml/
├── database/
├── docs/
├── .gitignore
└── README.md
```

## Production Deployment

### Architecture

Users open the Vercel frontend. The frontend calls the Spring Boot API on Render, which connects to the remote PostgreSQL database. The backend URL is configured at Vercel build time and is never entered by users.

### Frontend on Vercel

Set the project root to `frontend/` and configure this production environment variable:

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

Build command: `npm run build`
Output directory: `dist`

`frontend/vercel.json` provides the SPA fallback so direct navigation to routes continues to work.

### Backend on Render

Set the project root to `backend/`. Render can use the Dockerfile, or use these commands:

Build command: `./mvnw clean package -DskipTests`
Start command: `java -jar target/ecotwin-backend-0.0.1-SNAPSHOT.jar`

Spring Boot reads Render's `PORT` automatically. Configure these Render environment variables:

```text
FRONTEND_URL=https://your-vercel-domain.vercel.app
SPRING_DATASOURCE_URL=jdbc:postgresql://your-database-host:5432/your-database
SPRING_DATASOURCE_USERNAME=your-database-user
SPRING_DATASOURCE_PASSWORD=your-database-password
```

Use the Render service URL as the Vercel `VITE_API_BASE_URL` value. The health endpoints are `/health` and `/api/health`.

### CORS and database

`FRONTEND_URL` accepts a comma-separated list of exact origins when previews also need access. The backend does not enable wildcard CORS. Production must use a remotely reachable PostgreSQL database; the localhost database defaults are for local development only.

There is no file upload or local-file persistence flow in the current application. If one is added, use object storage rather than Render's ephemeral filesystem.

### Verification

Run locally before release:

```text
cd frontend && npm install && npm run build
cd ../backend && ./mvnw clean verify
```

Open the Vercel URL on another device, verify the dashboard, analyst, risk analysis, and simulator flows, and check the browser console and network requests. Confirm the Render health endpoint and database-backed profile requests respond successfully.

### Freeze a stable production release

Vercel and Render deployment settings are controlled in their dashboards and cannot be safely changed from this repository. After verifying a release:

1. Record the Vercel deployment and Render deploy/commit identifiers.
2. In Vercel, disable automatic production deployments or require a manual promotion workflow for the production branch.
3. In Render, disable automatic deploys for the production service, or pin production to the verified commit and deploy future changes manually.
4. Keep preview deployments enabled separately if desired.
5. To release intentionally, deploy a reviewed commit, run the checklist, and promote that deployment only after verification.

Never commit `.env` files or production secrets. Use `.env.example` files as placeholders only. See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for the release checks.
