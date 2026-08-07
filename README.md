# breathebettertonight.com

Breathing and sleep health website.

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — always deployable, auto-deploys to Railway |
| `develop` | Integration branch — merge features here first |
| `feature/*` | New features (e.g. `feature/homepage`) |
| `hotfix/*` | Urgent production fixes (e.g. `hotfix/nav-bug`) |
| `release/*` | Release candidates (e.g. `release/v1.1.0`) |

## Versioning

Follows [Semantic Versioning](https://semver.org/): `vMAJOR.MINOR.PATCH`

- `MAJOR` — breaking redesigns or structural changes
- `MINOR` — new pages or significant feature additions
- `PATCH` — bug fixes, copy edits, minor style tweaks

## Project Structure

```
breathebettertonight/
├── src/
│   ├── shared/          # Reusable components (nav, footer, head meta)
│   ├── pages/           # Individual page HTML/templates
│   ├── styles/          # Shared CSS (variables, reset, typography)
│   ├── scripts/         # Shared JS utilities
│   └── assets/          # Images, fonts, icons
├── public/              # Static files served directly
├── server.js            # Express server entry point
├── package.json
├── railway.json         # Railway deployment config
└── .gitignore
```

## Deployment

- **Platform:** [Railway](https://railway.app)
- **Production URL:** https://breathebettertonight.com
- Pushes to `main` auto-deploy to Railway production.
- Pushes to `develop` auto-deploy to Railway staging (when configured).

## Local Development

```bash
npm install
npm run dev
```
