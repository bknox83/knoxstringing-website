#!/usr/bin/env bash
# Run lychee link checker. Version and download URL defined in one place.
# Usage:
#   scripts/lychee-check.sh <base-url> [--exclude PATTERN ...]
#   scripts/lychee-check.sh --stdin   (read URLs from stdin; same excludes)
set -e
LYCHEE_VERSION="v0.23.0"
LYCHEE_URL="https://github.com/lycheeverse/lychee/releases/download/lychee-${LYCHEE_VERSION}/lychee-x86_64-unknown-linux-gnu.tar.gz"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CACHE_DIR="${LYCHEE_CACHE_DIR:-$SCRIPT_DIR/../.cache/lychee}"
LYCHEE_BIN="$CACHE_DIR/lychee-$LYCHEE_VERSION"
if [ ! -x "$LYCHEE_BIN" ]; then
  mkdir -p "$CACHE_DIR"
  curl -sSfL "$LYCHEE_URL" | tar xz -C "$CACHE_DIR"
  mv "$CACHE_DIR/lychee" "$LYCHEE_BIN"
  chmod +x "$LYCHEE_BIN"
fi
LYCHEE_EXCLUDES=(--exclude '^tel:' --exclude '^#' --exclude 'formspree\.io')
if [ "$1" = "--stdin" ]; then
  exec "$LYCHEE_BIN" --no-progress "${LYCHEE_EXCLUDES[@]}" -
fi
BASE_URL="$1"
shift || true
if [ -z "$BASE_URL" ]; then
  echo "Usage: $0 <base-url> [--exclude PATTERN ...]"
  echo "       $0 --stdin   (read URLs from stdin)"
  exit 1
fi
exec "$LYCHEE_BIN" "$BASE_URL" --no-progress "${LYCHEE_EXCLUDES[@]}" "$@"
