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

## Public Website

The public site is a nationwide, navy-and-teal informational experience that complements the existing provider-specific landing pages. It provides general symptom awareness and a simple request path; it does not provide diagnosis, treatment advice, or emergency services.

| Route | Purpose |
|---|---|
| `/` | National home page and primary conversion entry point. |
| `/symptom-check` | General information about common sleep-related signs. |
| `/about` | Platform purpose and operating principles. |
| `/faq` | Frequently asked questions about the request process. |
| `/contact` | Regular contact form for appointment requests, symptom conversations, or general information. |
| `/thank-you` | Confirmation page following a successful form submission. |
| `/admin` | Basic-Auth-protected lead dashboard and retained legacy landing-page index. |

The existing `/{doctor}/{variant}` landing pages, city routes, and thank-you variants remain in place.

## Lead Form and Administration

The form requires a name, phone number, email address, inquiry type, preferred contact method, and consent. It deliberately does not request detailed medical or insurance information. Submitted leads are stored as a JSON record and can be reviewed or moved through `New`, `Contacted`, `Scheduled`, and `Closed` statuses in `/admin`.

Production administration requires the `ADMIN_USER` and `ADMIN_PASS` environment variables. The application fails closed for `/admin` when these credentials are absent or use the insecure legacy default. Real credentials must never be committed to the repository.

## Persistent Lead Storage

A Railway volume should be mounted at `/data` and the `LEADS_FILE` variable should be set to `/data/leads.json`. The application provides a local fallback for development, but that fallback is not suitable for deployed lead retention because container filesystems are ephemeral.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

## Quality Checks

Run the relevant local server before route checks that expect a specific port. The responsive and supporting-page scripts start their own temporary server.

```bash
npm run qa:basics
npm run qa:routes
npm run qa:responsive
npm run qa:supporting
```
