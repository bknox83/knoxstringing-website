<div align="center">

  <img src="assets/images/knox-logo.png" alt="Knox Racquet Stringing" width="200" />

  **Knox Racquet Stringing**

  Professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.

</div>

[![CI][ci-badge]][ci-link]
[![License][license-badge]][license-link]
[![Release][release-badge]][release-link]
[![Last commit][commits-badge]][commits-link]
[![Website][website-badge]][website-link]

## Overview

[Knox Racquet Stringing][website-link] is a **static website** for a professional racquet stringing business in central Iowa. The site is plain HTML, CSS, and JavaScript (no frameworks). Contact form submissions are handled by [Formspree][formspree-link]; there is no backend in this repo. The live site is built and deployed via [CI][ci-link] on push to `main`.

## Files

This repository contains:

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
| `.github/dependabot.yml` | [Dependabot][dependabot-link] — weekly PRs for npm and GitHub Actions. |
| `lighthouserc.js` | Lighthouse CI config (score thresholds, URL to audit). |
| `scripts/` | `pull-deploy.sh` (deploy on server), `validate-jsonld.js` (LocalBusiness schema check). |
| `compose.yaml` | Docker Compose: Nginx + Cloudflare Tunnel (cloudflared). |
| `nginx.conf` | Nginx config (gzip, cache rules, `index.html` fallback). |

## Deploy

The site runs with **Docker Compose**:

- **website** — Nginx serves static files from `./html` (copy or mount the built site there, or point the volume at the repo and set `root` in `nginx.conf` accordingly).
- **tunnel** — Cloudflare Tunnel (`cloudflared`) exposes the service. Set `TUNNEL_TOKEN` in the environment (e.g. in a non-committed `.env` file).

From the directory that contains `compose.yaml` and has the site in `./html`:

```bash
docker compose up -d
```

**Getting new code onto the server:** On every push to `main`, [CI][ci-link] runs and then a **deploy** job runs on a **self-hosted runner** on the server. It executes `scripts/pull-deploy.sh`, which pulls from GitHub, runs `npm ci`/`npm install` and `npm run build`, then rsyncs into the Nginx docroot. The server must have Node.js installed.

To deploy by hand on the server:

```bash
bash ~/Docker/KnoxStringing/repo/scripts/pull-deploy.sh
```

## CI

On every **push** and **pull request** to `main`, the CI workflow runs: workflow lint ([actionlint][actionlint-link]), lockfile check, HTML validation (W3C Nu), JSON-LD and sitemap checks, build and `npm audit`, [Lighthouse CI][lighthouse-link], [Lychee][lychee-link] link check, smoke test, and [Pa11y][pa11y-link] accessibility. On **push to `main` only** (after all checks pass), the deploy job runs on the self-hosted runner. Check [CI status][ci-link] and [releases][release-link] on GitHub.

Runs on `ubuntu-latest` with Node 22. [Dependabot][dependabot-link] opens PRs for npm and Actions; enable “Allow auto-merge” in repo settings so Dependabot PRs merge when CI passes.

### Code scanning (CodeQL)

The [CodeQL][codeql-link] workflow runs on push/PR to `main` and weekly. To see results in the **Security** tab, enable Code scanning under **Settings → Code security and analysis**.

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks).
- [Google Fonts][fonts-link]: Outfit, Instrument Serif.
- [Formspree][formspree-link] for the contact form.
- **Docker** & **Docker Compose** — Nginx and Cloudflare Tunnel in containers.
- **Nginx** — static files (gzip, caching).
- **cloudflared** — [Cloudflare Tunnel][cloudflare-link] to expose the site without opening ports.

[actionlint-link]: https://github.com/rhysd/actionlint
[ci-badge]: https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/ci.yml?branch=main&label=CI&style=for-the-badge
[ci-link]: https://github.com/bknox83/knoxstringing-website/actions
[cloudflare-link]: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
[codeql-link]: https://github.com/bknox83/knoxstringing-website/blob/main/.github/workflows/codeql.yml
[commits-badge]: https://img.shields.io/github/last-commit/bknox83/knoxstringing-website?style=for-the-badge
[commits-link]: https://github.com/bknox83/knoxstringing-website/commits/main
[dependabot-link]: https://docs.github.com/en/code-security/dependabot
[fonts-link]: https://fonts.google.com
[formspree-link]: https://formspree.io
[license-badge]: https://img.shields.io/github/license/bknox83/knoxstringing-website?style=for-the-badge
[license-link]: LICENSE
[lighthouse-link]: https://github.com/GoogleChrome/lighthouse-ci
[lychee-link]: https://github.com/lycheeverse/lychee
[pa11y-link]: https://pa11y.org
[release-badge]: https://img.shields.io/github/v/release/bknox83/knoxstringing-website?style=for-the-badge
[release-link]: https://github.com/bknox83/knoxstringing-website/releases
[website-badge]: https://img.shields.io/website?url=https%3A%2F%2Fknoxstringing.com&label=site&style=for-the-badge
[website-link]: https://knoxstringing.com
