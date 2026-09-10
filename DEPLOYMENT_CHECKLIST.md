# EcoTwin Production Deployment Checklist

- [ ] Frontend production build works with `npm run build`
- [ ] Backend tests and package build work with `./mvnw clean verify`
- [ ] Render backend is reachable
- [ ] `/health` or `/api/health` returns a healthy response
- [ ] Frontend production environment contains `VITE_API_BASE_URL`
- [ ] No production API request uses localhost
- [ ] Render environment contains `FRONTEND_URL`
- [ ] CORS allows the exact Vercel production origin
- [ ] Render environment contains valid remote database credentials
- [ ] Authentication works, if enabled
- [ ] File uploads work, if enabled
- [ ] Important frontend features work from a second device
- [ ] Browser console has no critical errors
- [ ] Required environment variables are documented
- [ ] Secrets are not committed
- [ ] Vercel production deployment is verified
- [ ] Render production deployment is verified
- [ ] Automatic deployments are disabled or protected after release
- [ ] Stable production deployment identifiers are recorded

## Required production variables

### Vercel

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

### Render

```text
FRONTEND_URL=https://your-vercel-domain.vercel.app
SPRING_DATASOURCE_URL=jdbc:postgresql://your-database-host:5432/your-database
SPRING_DATASOURCE_USERNAME=your-database-user
SPRING_DATASOURCE_PASSWORD=your-database-password
```