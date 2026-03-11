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

**Getting new code onto the server:** Run `scripts/pull-deploy.sh` on a cron schedule (e.g. hourly) so the server pulls from GitHub and rsyncs into `./html`. To run the deploy once by hand (e.g. right after a push):

```bash
bash ~/Docker/KnoxStringing/repo/scripts/pull-deploy.sh
```

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks).
- [Google Fonts](https://fonts.google.com): Outfit, Instrument Serif.
- Formspree for the contact form.
- **Docker** & **Docker Compose** — run Nginx and the tunnel in containers.
- **Nginx** — static file server (gzip, caching).
- **cloudflared** — [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) for exposing the site without opening ports.

## License

© Knox Racquet Stringing. All rights reserved.
