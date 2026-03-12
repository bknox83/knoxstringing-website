<div align="center">
 
  <a href="https://knoxstringing.com"><img src="assets/images/knox-logo.png" alt="Knox Racquet Stringing" width="200" /></a>
  <h3>Knox Racquet Stringing</h3>

  Professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.
  <br>
  <br>

  [![CI][ci-badge]][ci-link]
  [![CodeQL][codeql-badge]][codeql-link]
  [![Link-Check][linkcheck-badge]][linkcheck-link]
  <br>
  [![Release][release-badge]][release-link]
  [![Commits][commits-badge]][commits-link]
  [![Website][website-badge]][website-link]
  [![License][license-badge]][license-link]

</div>

## Overview

This is a static website for a professional racquet stringing business in central Iowa. The site is plain HTML, CSS, and JavaScript (no frameworks). Contact form submissions are handled by [Formspree][formspree-link]. There is no backend in this repo.

## Deploy

The site runs with **Docker Compose**

- **Website** — NGINX serves static files from `./html`
- **Tunnel** — A Cloudflare Tunnel exposes the service.

Getting new code onto the server: On every push to `main`, a deploy job runs on a self-hosted runner on the server. It executes `scripts/pull-deploy.sh`, which pulls from GitHub.

[ci-link]:          https://github.com/bknox83/knoxstringing-website/actions/workflows/ci.yml
[codeql-link]:      https://github.com/bknox83/knoxstringing-website/actions/workflows/codeql.yml
[commits-link]:     https://github.com/bknox83/knoxstringing-website/commits/main
[formspree-link]:   https://formspree.io
[license-link]:     https://github.com/bknox83/knoxstringing-website/blob/main/LICENSE
[linkcheck-link]:   https://github.com/bknox83/knoxstringing-website/actions/workflows/production-link-check.yml
[release-link]:     https://github.com/bknox83/knoxstringing-website/releases/latest
[website-link]:     https://knoxstringing.com

[ci-badge]:         https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/ci.yml?branch=main&label=CI&style=for-the-badge
[codeql-badge]:     https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/codeql.yml?branch=main&label=CodeQL&style=for-the-badge
[commits-badge]:    https://img.shields.io/github/commits-since/bknox83/knoxstringing-website/latest?style=for-the-badge
[license-badge]:    https://img.shields.io/github/license/bknox83/knoxstringing-website?style=for-the-badge&color=orange
[linkcheck-badge]:  https://img.shields.io/github/actions/workflow/status/bknox83/knoxstringing-website/production-link-check.yml?branch=main&label=Link-Check&style=for-the-badge
[release-badge]:    https://img.shields.io/github/v/release/bknox83/knoxstringing-website?style=for-the-badge
[website-badge]:    https://img.shields.io/website?url=https%3A%2F%2Fknoxstringing.com&label=website&style=for-the-badge
