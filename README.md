<div align="center">
 
  <a href="https://knoxstringing.com"><img src="site/assets/images/knox-logo.png" alt="Knox Racquet Stringing" width="200" /></a>
  <h3>Knox Racquet Stringing</h3>

  Professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.
  <br>
  <br>

  [![CI][ci-badge]][ci-link]
  [![Prod Link Checks][linkcheck-badge]][linkcheck-link]
  [![License][license-badge]][license-link]
  <br>
  [![Release][release-badge]][release-link]
  [![Commits][commits-badge]][commits-link]
  [![Website][website-badge]][website-link]

</div>

## Overview

This is a static website for a professional racquet stringing business in central Iowa. The site is plain HTML, CSS, and JavaScript (no frameworks). All web content (HTML, assets, robots.txt, sitemap) lives in the `site/` directory. Contact form submissions are handled by [Formspree][formspree-link]. There is no backend in this repo.

Current uptime and service status for the website and related services: [status.knoxstringing.com][status-link]

## Deployment

The site runs with Docker Compose. NGINX serves static files and a Cloudflare tunnel exposes the service.

Code is automatically deployed whenever changes are pushed to the `main` branch. The `deploy-to-server` job runs after all other CI on a self-hosted runner located on the server. The job executes `scripts/pull-deploy.sh`, which pulls the latest changes from GitHub.

During deployment the script minifies javascript/css files and dynamically generates `sitemap.xml`. This keeps the production server synchronized with `main` and ensures assets are optimized before being served by NGINX.

[ci-link]:          https://github.com/bknox83/knoxstringing-website/actions/workflows/ci.yml
[commits-link]:     https://github.com/bknox83/knoxstringing-website/commits/main
[formspree-link]:   https://formspree.io
[license-link]:     ./LICENSE
[linkcheck-link]:   https://github.com/bknox83/knoxstringing-website/actions/workflows/production-link-check.yml
[release-link]:     https://github.com/bknox83/knoxstringing-website/releases/latest
[status-link]:      https://status.knoxstringing.com
[website-link]:     https://knoxstringing.com

[ci-badge]:         https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/ci.yml?branch=main&label=CI&style=for-the-badge
[commits-badge]:    https://img.shields.io/github/commits-since/bknox83/knoxstringing-website/latest?style=for-the-badge
[license-badge]:    https://img.shields.io/github/license/bknox83/knoxstringing-website?style=for-the-badge&color=orange
[linkcheck-badge]:  https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/production-link-check.yml?branch=main&label=Prod%20Link%20Checks&style=for-the-badge
[release-badge]:    https://img.shields.io/github/v/release/bknox83/knoxstringing-website?style=for-the-badge
[website-badge]:    https://img.shields.io/website?url=https%3A%2F%2Fknoxstringing.com&label=website&style=for-the-badge
