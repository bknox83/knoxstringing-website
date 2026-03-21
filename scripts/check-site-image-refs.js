#!/usr/bin/env node
/**
 * Ensures every image path referenced from site/index.html and site/assets/css/styles.css
 * exists under site/assets/images/. Catches broken refs before deploy.
 */

const fs = require('fs');
const path = require('path');

const siteRoot = path.join(__dirname, '..', 'site');
const imagesDir = path.join(siteRoot, 'assets', 'images');

const extPattern = String.raw`(?:webp|png|jpe?g|gif|svg|ico)`;
const relRe = new RegExp(String.raw`assets/images/([a-zA-Z0-9_.-]+\.${extPattern})`, 'g');
const absRe = new RegExp(
  String.raw`https://www\.knoxstringing\.com/assets/images/([a-zA-Z0-9_.-]+\.${extPattern})`,
  'g'
);
const cssRe = new RegExp(
  String.raw`url\(\s*["']?\.\./images/([a-zA-Z0-9_.-]+\.${extPattern})["']?\s*\)`,
  'g'
);

function collectFrom(content, re, into) {
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(content)) !== null) {
    into.add(m[1]);
  }
}

const basenames = new Set();

const htmlPath = path.join(siteRoot, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
collectFrom(html, relRe, basenames);
collectFrom(html, absRe, basenames);

const cssPath = path.join(siteRoot, 'assets', 'css', 'styles.css');
const css = fs.readFileSync(cssPath, 'utf8');
collectFrom(css, cssRe, basenames);

const missing = [];
for (const name of basenames) {
  const full = path.join(imagesDir, name);
  if (!fs.existsSync(full)) {
    missing.push(name);
  }
}

missing.sort();
if (missing.length) {
  console.error('check-site-image-refs: Missing files under site/assets/images/:');
  for (const n of missing) {
    console.error('  -', n);
  }
  process.exit(1);
}

console.log('check-site-image-refs: OK (' + basenames.size + ' unique image reference(s))');
process.exit(0);
