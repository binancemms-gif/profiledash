# Security policy

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability. Use the repository's private security advisory flow or contact the maintainers directly with reproduction steps and impact.

## Local secrets

Copy `.env.example` to a local environment file and fill in credentials there. Environment files containing secrets are ignored by Git. Never commit API keys, database passwords, session secrets, or production exports.

The CI workflow runs typechecking and a production static build on every pull request and push to `main`.
