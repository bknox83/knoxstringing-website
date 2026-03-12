# Knox Racquet Stringing

Professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.

---

## Contents

- [What's in this repo](#whats-in-this-repo)
- [Deploy](#deploy)
- [CI](#ci)
- [Code scanning (CodeQL)](#code-scanning-codeql)
- [Tech](#tech)
- [Code of conduct](#code-of-conduct)
- [License](#license)

---

## What's in this repo

| Path | Description |
|------|-------------|
| `index.html` | Single-page site: services, why restring, gauge & tension, overgrips, grips, process, contact. Minified CSS/JS; run `npm run build` for local preview after editing. |
| `package.json` | Scripts to minify CSS and JS (`npm run build`). |
| `assets/css/` | `styles.css` (source), `styles.min.css` (built) — layout, components, responsive. |
| `assets/js/` | `script.js` (source), `script.min.js` (built) — mobile nav, scroll reveal, year in footer. |
| `assets/images/` | Logos, hero/process backgrounds, content images (SVG, WebP, PNG). |
| `sitemap.xml` | Sitemap for search engines. |
| `robots.txt` | Crawler rules and sitemap URL. |
| `.github/workflows/ci.yml` | CI on push/PR to `main`: workflow lint, lockfile check, HTML validation, JSON-LD, sitemap, Lighthouse CI, Lychee links, smoke test, Pa11y. |
| `.github/workflows/codeql.yml` | CodeQL security analysis (JavaScript), on push/PR and weekly. |
| `.github/workflows/dependabot-auto-merge.yml` | Enables auto-merge for Dependabot PRs when CI passes. |
| `.github/dependabot.yml` | [Dependabot](https://docs.github.com/en/code-security/dependabot) — weekly PRs for npm and GitHub Actions. |
| `lighthouserc.js` | Lighthouse CI config (score thresholds, URL to audit). |
| `scripts/` | `pull-deploy.sh` (deploy on server), `validate-jsonld.js` (LocalBusiness schema check). |
| `compose.yaml` | Docker Compose: Nginx + Cloudflare Tunnel (cloudflared). |
| `nginx.conf` | Nginx config (gzip, cache rules, `index.html` fallback). |

Contact form submissions are handled by [Formspree](https://formspree.io); there is no backend in this repo.

---

## Deploy 🚀

The site runs with **Docker Compose**:

- **website** — Nginx serves static files from `./html` (copy or mount the built site there, or point the volume at the repo and set `root` in `nginx.conf` accordingly).
- **tunnel** — Cloudflare Tunnel (`cloudflared`) exposes the service. Set `TUNNEL_TOKEN` in the environment (e.g. in a non-committed `.env` file).

From the directory that contains `compose.yaml` and has the site in `./html`:

```bash
docker compose up -d
```

**Getting new code onto the server:** On every push to `main`, CI runs and then a **deploy** job runs on a **self-hosted runner** on the server. It executes `scripts/pull-deploy.sh`, which pulls from GitHub, runs `npm ci`/`npm install` and `npm run build`, then rsyncs into the Nginx docroot. The server must have Node.js installed. See [CI](#ci).

To deploy by hand on the server:

```bash
bash ~/Docker/KnoxStringing/repo/scripts/pull-deploy.sh
```

---

## CI ✅

On every **push** and **pull request** to `main`, the CI workflow runs:

| Step | What it does |
|------|----------------|
| **Workflow lint** | [actionlint](https://github.com/rhysd/actionlint) checks `.github/workflows/*.yml` for syntax and best practices. |
| **Lockfile check** | Ensures `package-lock.json` is in sync with `package.json`; fails if you need to run `npm install` and commit the lockfile. |
| **HTML validation** | [W3C Nu Validator](https://validator.github.io/validator/) (Docker) validates `index.html`. |
| **JSON-LD** | `scripts/validate-jsonld.js` checks the `application/ld+json` LocalBusiness block. |
| **Sitemap** | Validates `sitemap.xml` and runs Lychee on all sitemap URLs against the local server. |
| **Build & audit** | `npm ci` and `npm run build`; `npm audit --audit-level=high` fails on high/critical vulnerabilities. |
| **Lighthouse CI** | Single audit (performance, accessibility, best practices, SEO) with thresholds in `lighthouserc.js`. |
| **Link check** | [Lychee](https://github.com/lycheeverse/lychee) checks links (excluding `tel:`, `#`, Formspree). |
| **Smoke test** | HTTP 200 and expected content (“Knox Racquet Stringing”, “Get in Touch”). |
| **Accessibility** | [Pa11y](https://pa11y.org/) against the contact page (`pa11y.json`). |

On **push to `main` only** (after all checks pass), the **deploy** job runs on the self-hosted runner and executes `scripts/pull-deploy.sh`. See [Deploy](#deploy).

Runs on `ubuntu-latest` with Node 22. **Dependabot** opens PRs for npm and Actions; enable “Allow auto-merge” in repo settings so Dependabot PRs merge when CI passes.

---

## Code scanning (CodeQL) 🔒

The **CodeQL** workflow (`.github/workflows/codeql.yml`) runs on push/PR to `main` and weekly. It analyzes JavaScript for security issues and dependency concerns.

To see results in the **Security** tab and get alerts:

1. In the repo: **Settings → Code security and analysis**.
2. Under **Code scanning**, click **Set up** (or **Configure**) for **CodeQL analysis**.

If Code scanning is not enabled, the workflow still runs; enabling it surfaces results and optional PR checks.

---

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks).
- [Google Fonts](https://fonts.google.com): Outfit, Instrument Serif.
- [Formspree](https://formspree.io) for the contact form.
- **Docker** & **Docker Compose** — Nginx and Cloudflare Tunnel in containers.
- **Nginx** — static files (gzip, caching).
- **cloudflared** — [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) to expose the site without opening ports.

---

## Code of conduct

Participation in this project (issues, pull requests, discussions) is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
