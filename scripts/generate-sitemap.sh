#!/usr/bin/env bash
# Generate site/sitemap.xml with lastmod set to today (ISO date).
# Run from repo root. Used in CI and deploy so sitemap is not static.
set -e
REPO_DIR="${REPO_DIR:-.}"
SITEMAP="$REPO_DIR/site/sitemap.xml"
LASTMOD="${LASTMOD:-$(date -u +%Y-%m-%d)}"
mkdir -p "$(dirname "$SITEMAP")"
cat > "$SITEMAP" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.knoxstringing.com/</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
EOF
echo "Generated $SITEMAP with lastmod=$LASTMOD"
