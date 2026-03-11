#!/usr/bin/env bash
# Pull latest from GitHub and copy site files into the Nginx html folder.
# Run this on the server (e.g. via cron). See docs/deploy-pull.md.

set -e

echo "$(date -Iseconds 2>/dev/null || date): pull-deploy started"
REPO_DIR="${REPO_DIR:-$HOME/Docker/KnoxStringing/repo}"
HTML_DIR="${HTML_DIR:-$HOME/Docker/KnoxStringing/html}"

cd "$REPO_DIR"
git fetch origin main
git reset --hard origin/main

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
