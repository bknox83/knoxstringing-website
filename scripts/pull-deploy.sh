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

rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'compose.yaml' \
  --exclude 'nginx.conf' \
  --exclude 'README.md' \
  --exclude '.gitignore' \
  --exclude 'docs' \
  --exclude 'scripts' \
  "$REPO_DIR/" "$HTML_DIR/"
