#!/usr/bin/env node
/**
 * Validates that index.html contains valid JSON-LD with a LocalBusiness schema.
 * Exits 0 if valid, 1 with message if invalid.
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'site', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const match = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
if (!match) {
  console.error('validate-jsonld: No application/ld+json script found in index.html');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(match[1].trim());
} catch (e) {
  console.error('validate-jsonld: Invalid JSON in ld+json script:', e.message);
  process.exit(1);
}

if (data['@context'] !== 'https://schema.org') {
  console.error('validate-jsonld: Expected @context "https://schema.org", got:', data['@context']);
  process.exit(1);
}

if (data['@type'] !== 'LocalBusiness') {
  console.error('validate-jsonld: Expected @type "LocalBusiness", got:', data['@type']);
  process.exit(1);
}

const required = ['name'];
for (const key of required) {
  if (!(key in data) || data[key] === '' || data[key] == null) {
    console.error('validate-jsonld: LocalBusiness must have "' + key + '"');
    process.exit(1);
  }
}

// At least one of these is recommended for LocalBusiness
const recommended = ['url', 'telephone', 'address'];
const hasRecommended = recommended.some((k) => data[k] != null && data[k] !== '');
if (!hasRecommended) {
  console.error('validate-jsonld: LocalBusiness should have at least one of: ' + recommended.join(', '));
  process.exit(1);
}

console.log('validate-jsonld: LocalBusiness schema OK');
process.exit(0);
