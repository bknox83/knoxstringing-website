# Knox Racquet Stringing

Static website for **Knox Racquet Stringing** — professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.

## What’s in this repo

- **index.html** — Single-page site (services, why restring, gauge & tension, overgrips, grips, process, contact).
- **assets/**
  - **css/** — `styles.css` (layout, components, responsive).
  - **js/** — `script.js` (mobile nav, scroll reveal, year in footer).
  - **images/** — Logos, hero/process backgrounds, content images (SVG, WebP, PNG).
- **sitemap.xml** — Sitemap for search engines.
- **robots.txt** — Crawler rules and sitemap URL.
- **.github/workflows/ci.yml** — CI on push/PR to `main`: link check (Lychee), HTML validation (W3C Nu), JSON-LD LocalBusiness check, sitemap validation and URL check, smoke test, accessibility (Pa11y).
- **scripts/** — `pull-deploy.sh` (deploy on server), `validate-jsonld.js` (LocalBusiness schema check).
- **compose.yaml** — Docker Compose: Nginx serves the site; Cloudflare Tunnel (cloudflared) exposes it.
- **nginx.conf** — Nginx config (gzip, cache rules for HTML vs assets, `index.html` fallback).

Contact form submissions are handled by [Formspree](https://formspree.io); no backend in this repo.

## Deploy (Docker)

The site is run with Docker Compose:

- **website** — Nginx serves the static files from `./html` (copy or mount this repo’s files there, or point the volume at the repo root and set `root` in `nginx.conf` to match).
- **tunnel** — Cloudflare Tunnel (`cloudflared`) exposes the service; set `TUNNEL_TOKEN` in the environment (e.g. in a `.env` file that is not committed).

From the directory that contains `compose.yaml` and has the site in `./html`:

```bash
docker compose up -d
```

**Getting new code onto the server:** On every push to `main`, the CI workflow runs tests and then runs the deploy job on a **self-hosted runner** on the server, which executes `scripts/pull-deploy.sh`. See [CI (GitHub Actions)](#ci-github-actions).

To run a deploy by hand on the server:

```bash
bash ~/Docker/KnoxStringing/repo/scripts/pull-deploy.sh
```

## CI (GitHub Actions)

On every push and pull request to `main`, the **CI** workflow runs:

- **Link check** — [Lychee](https://github.com/lycheeverse/lychee) checks that links (excluding `tel:`, `#`, and Formspree) resolve.
- **HTML validation** — [W3C Nu Validator](https://validator.github.io/validator/) (via Docker) validates `index.html`.
- **JSON-LD LocalBusiness** — `scripts/validate-jsonld.js` checks that the `application/ld+json` block in `index.html` is valid and has the required LocalBusiness schema fields.
- **Sitemap** — Validates `sitemap.xml` (well-formed XML, has `<loc>` entries), then runs Lychee on all sitemap URLs (against the local server) to assert they return 200.
- **Smoke test** — Serves the site locally and checks for HTTP 200 and expected content (“Knox Racquet Stringing”, “Get in Touch”).
- **Accessibility** — [Pa11y](https://pa11y.org/) runs against the contact page with config in `pa11y.json`.

On **push to `main` only** (after the above steps pass), a **deploy** job runs on a **self-hosted runner** on the server and executes `scripts/pull-deploy.sh` to pull the latest code and rsync into the Nginx `./html` directory. See [Deploy (Docker)](#deploy-docker).

Runs on `ubuntu-latest` with Node 22; uses `actions/checkout@v5` and `actions/setup-node@v5`.

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks).
- [Google Fonts](https://fonts.google.com): Outfit, Instrument Serif.
- Formspree for the contact form.
- **Docker** & **Docker Compose** — run Nginx and the tunnel in containers.
- **Nginx** — static file server (gzip, caching).
- **cloudflared** — [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) for exposing the site without opening ports.

## License

© Knox Racquet Stringing. All rights reserved.
