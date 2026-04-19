# .github/workflows

CI/CD workflow definitions for EK Marketplace.

## TODO

- [ ] `ci.yml` — Run TypeScript typecheck and lint on every PR
- [ ] `test.yml` — Run unit and integration tests
- [ ] `deploy-staging.yml` — Auto-deploy to staging on push to `develop`
- [ ] `deploy-production.yml` — Deploy to production on push to `main` (manual approval)
- [ ] `security.yml` — Dependency vulnerability scan (npm audit)

## Notes

- Workflows will use GitHub Actions
- Staging and production deployments SSH into the VPS and run `deploy.sh`
- Secrets (SSH key, env vars) stored in GitHub repository secrets
