#!/usr/bin/env bash
# Pull latest from GitHub and copy site files into the Nginx html folder.
# Run on the server: triggered by GitHub Actions on push to main, or run by hand.

set -e

echo "$(date -Iseconds 2>/dev/null || date): pull-deploy started"
REPO_DIR="${REPO_DIR:-$HOME/Docker/KnoxStringing/repo}"
HTML_DIR="${HTML_DIR:-$HOME/Docker/KnoxStringing/html}"

cd "$REPO_DIR"
git fetch origin main
git reset --hard origin/main

if [ -f package.json ]; then
  echo "Running npm install and npm run build..."
  (npm ci 2>/dev/null || npm install) && npm run build
fi

# Guard: never wipe html if site/ is missing or has no index (e.g. bad pull)
if [ ! -f "$REPO_DIR/site/index.html" ]; then
  echo "ERROR: $REPO_DIR/site/index.html not found; refusing to rsync (would wipe html)."
  exit 1
fi

rsync -a --delete "$REPO_DIR/site/" "$HTML_DIR/"

# Ensure nginx (often running as nobody/nginx in container) can read everything
chmod -R a+rX "$HTML_DIR"
